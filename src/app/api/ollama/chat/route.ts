import { NextRequest, NextResponse } from "next/server"
import { checkRateLimit, sanitizeSearchQuery } from "@/lib/security"
import { retrieveEnrichedContext } from "@/lib/ai/copilotContext"

export async function POST(req: NextRequest) {
  // Rate Limiting Protection (120 req/min for local chat)
  const rateLimitResponse = checkRateLimit(req, "ollama-chat", { limit: 120, windowMs: 60000 })
  if (rateLimitResponse) return rateLimitResponse

  const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://127.0.0.1:11434"

  try {
    const body = await req.json()
    const { messages, model, stream = true, webSearch = false } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Missing messages array" }, { status: 400 })
    }

    // Auto-detect installed model if none specified
    let selectedModel = model
    if (!selectedModel) {
      try {
        const tagRes = await fetch(`${OLLAMA_HOST}/api/tags`, { signal: AbortSignal.timeout(2000) })
        if (tagRes.ok) {
          const tagData = await tagRes.json()
          if (Array.isArray(tagData.models) && tagData.models.length > 0) {
            // Prefer llama3.2:3b or qwen2.5-coder if present
            const names = tagData.models.map((m: any) => m.name || m.model)
            const preferred = names.find((n: string) => n.includes("llama3.2") || n.includes("qwen"))
            selectedModel = preferred || names[0]
          }
        }
      } catch (e) {
        // ignore
      }
    }

    if (!selectedModel) {
      selectedModel = "llama3.2:3b"
    }

    // Extract user conversation query to retrieve relevant contextual knowledge
    const lastUserMessage = [...messages].reverse().find(m => m.role === "user")?.content || ""
    const enriched = retrieveEnrichedContext(lastUserMessage, "general")

    // Web Search injection
    let webSearchContext = ""
    if (webSearch && lastUserMessage) {
      try {
        const searchUrl = new URL("/api/search", req.url)
        searchUrl.searchParams.set("q", sanitizeSearchQuery(lastUserMessage, 200))
        const searchRes = await fetch(searchUrl.toString(), { signal: AbortSignal.timeout(5000) })
        if (searchRes.ok) {
          const searchData = await searchRes.json()
          if (Array.isArray(searchData.results) && searchData.results.length > 0) {
            webSearchContext = "\n\nWEB SEARCH RESULTS (Use these as factual up-to-date context. Cite sources where relevant):\n"
            searchData.results.forEach((r: { title: string; url: string; snippet: string }, i: number) => {
              webSearchContext += `[${i + 1}] ${r.title}\n   URL: ${r.url}\n   ${r.snippet}\n\n`
            })
          }
        }
      } catch {
        // Search failed silently - continue without it
      }
    }

    // High-Intelligence System Prompt (Claude/ChatGPT grade reasoning & context awareness)
    const systemPrompt = `You are Awesome AI Copilot, an elite, highly capable, and context-aware AI assistant running locally and privately on the user's machine.
You possess state-of-the-art general intelligence, deep software engineering proficiency, and comprehensive knowledge of the "Awesome AI Tools" catalog platform.

COGNITIVE & BEHAVIORAL PRINCIPLES:
1. DEEP CONTEXT UNDERSTANDING:
   - Always analyze the user's intent, goals, and implicit requirements.
   - Maintain multi-turn conversational memory. If the user asks follow-up questions (e.g. "bagaimana dengan yang tadi?", "coba buatkan kodenya", "jelaskan poin 2"), seamlessly resolve the context from earlier messages.
   - If the user provides code, thoroughly inspect it for logic errors, edge cases, performance bottlenecks, and security flaws before answering.

2. ADAPTIVE & HELPFUL RESPONSES:
   - Provide accurate, thoughtful, and structured answers using proper Markdown: ## headings, **bold**, *italic*, - bullet lists, 1. numbered lists, and \`\`\`code blocks\`\`\`.
   - Structure responses with clear sections. Use headings for multi-topic answers. Use bullet lists for comparisons or feature lists.
   - When writing code: write production-ready, clean, well-commented code in the requested programming language or framework (TypeScript, React, Next.js, Python, Rust, Go, SQL, etc.).
   - When answering general or complex questions: think step-by-step, explain the reasoning clearly, and provide actionable takeaways.

3. REPOSITORY & ECOSYSTEM GROUNDING (Verified Live Data):
${enriched.contextPromptSnippet}${webSearchContext}

4. LANGUAGE & TONE:
   - Naturally reply in the exact language used by the user (Bahasa Indonesia or English).
   - Tone: Professional, warm, insightful, developer-friendly, and precise.
   - If web search results were provided, naturally incorporate them and cite source URLs inline using Markdown links [source](url) when relevant.`

    // Format all messages and inject the intelligent system prompt
    const formattedMessages = [
      { role: "system", content: systemPrompt },
      ...messages.filter(m => m.role !== "system").map(m => ({
        role: m.role,
        content: m.content
      }))
    ]

    // Send request to Ollama /api/chat with expanded 8k context window
    const ollamaResponse = await fetch(`${OLLAMA_HOST}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: selectedModel,
        messages: formattedMessages,
        stream: Boolean(stream),
        options: {
          num_ctx: 12288,      // Expanded context (12K tokens to fit web search results)
          temperature: 0.7,    // Optimal balance of creativity & precision
          top_p: 0.9,          // Nucleus sampling
          repeat_penalty: 1.1  // Prevent repetitive loops
        }
      })
    })

    if (!ollamaResponse.ok) {
      const errText = await ollamaResponse.text()
      let parsedErr: any = null
      try { parsedErr = JSON.parse(errText) } catch { }

      const errMsg = parsedErr?.error || errText || `Ollama returned status ${ollamaResponse.status}`
      
      if (errMsg.includes("not found") || errMsg.includes("pull")) {
        return NextResponse.json({
          error: `Model "${selectedModel}" belum terinstall. Silakan pilih model yang tersedia di dropdown atau jalankan di terminal:\n\nollama run ${selectedModel}`
        }, { status: 404 })
      }

      return NextResponse.json({ error: errMsg }, { status: ollamaResponse.status })
    }

    // Non-streaming response
    if (!stream) {
      const data = await ollamaResponse.json()
      return NextResponse.json(data)
    }

    // Streaming response (NDJSON parser)
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    const customStream = new ReadableStream({
      async start(controller) {
        if (!ollamaResponse.body) {
          controller.close()
          return
        }

        const reader = ollamaResponse.body.getReader()
        let buffer = ""

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split("\n")
            buffer = lines.pop() || ""

            for (const line of lines) {
              const trimmed = line.trim()
              if (!trimmed) continue

              try {
                const parsed = JSON.parse(trimmed)
                const textChunk = parsed.message?.content || ""
                if (textChunk) {
                  controller.enqueue(encoder.encode(textChunk))
                }
              } catch (err) {
                // Ignore parse errors on partial chunks
              }
            }
          }

          if (buffer.trim()) {
            try {
              const parsed = JSON.parse(buffer.trim())
              const textChunk = parsed.message?.content || ""
              if (textChunk) {
                controller.enqueue(encoder.encode(textChunk))
              }
            } catch { }
          }
        } catch (error) {
          controller.error(error)
        } finally {
          controller.close()
        }
      }
    })

    return new Response(customStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no"
      }
    })

  } catch (err: any) {
    return NextResponse.json({
      error: `Gagal terhubung ke Ollama lokal: ${err.message || err}. Pastikan Ollama aktif di http://localhost:11434`
    }, { status: 500 })
  }
}

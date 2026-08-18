import { NextRequest, NextResponse } from "next/server"
import { TOOLS, CATEGORIES, AI_SKILLS } from "@/data/mock"

export async function POST(req: NextRequest) {
  const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://127.0.0.1:11434"

  try {
    const body = await req.json()
    const { messages, model, stream = true } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Missing messages array" }, { status: 400 })
    }

    // Check available models first
    let selectedModel = model
    if (!selectedModel) {
      try {
        const tagRes = await fetch(`${OLLAMA_HOST}/api/tags`, { signal: AbortSignal.timeout(2000) })
        if (tagRes.ok) {
          const tagData = await tagRes.json()
          if (Array.isArray(tagData.models) && tagData.models.length > 0) {
            selectedModel = tagData.models[0].name || tagData.models[0].model
          }
        }
      } catch (e) {
        // ignore
      }
    }

    if (!selectedModel) {
      selectedModel = "qwen2.5-coder:latest"
    }

    // System prompt with grounded Awesome AI Tools knowledge
    const systemPrompt = `You are Awesome AI Copilot, a helpful and knowledgeable local AI assistant running offline via local Ollama.
You are embedded inside the "Awesome AI Tools" catalog platform.

KNOWLEDGE BASE:
- Total Tools: ${TOOLS.length} AI developer tools across ${CATEGORIES.length} categories.
- Popular tools: Cursor (AI IDE), GitHub Copilot, Ollama (Local AI runner), LangChain, Midjourney, Vercel AI SDK, DeepSeek-R1, Claude 3.7 Sonnet, Qwen 2.5 Coder, Trae, Cline, Roo Code, OpenHands, Goose.
- Categories: ${CATEGORIES.map(c => c.name).join(", ")}.
- Total AI Skills: ${AI_SKILLS.length} production-grade agent skills and prompts.
- Proxy Router: Integrated local proxy server running on /router and /api/v1/chat/completions compatible with OpenAI API specs.
- Documentation: Available at /docs with guides for Ollama setup, API reference, and IDE integration.

INSTRUCTIONS:
1. Answer the user's questions clearly, concisely, and accurately.
2. If asked about AI tools or recommendations, refer to relevant tools in the catalog and explain why they fit.
3. If asked about coding or Ollama setup, provide actionable step-by-step CLI commands and code snippets.
4. Reply in the same language as the user's input (Indonesian or English).
5. Always be polite, modern, and developer-friendly.`

    // Prepare messages with system prompt at top
    const formattedMessages = [
      { role: "system", content: systemPrompt },
      ...messages.filter(m => m.role !== "system")
    ]

    // Send request to Ollama /api/chat
    const ollamaResponse = await fetch(`${OLLAMA_HOST}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: selectedModel,
        messages: formattedMessages,
        stream: Boolean(stream)
      })
    })

    if (!ollamaResponse.ok) {
      const errText = await ollamaResponse.text()
      let parsedErr: any = null
      try { parsedErr = JSON.parse(errText) } catch { }

      const errMsg = parsedErr?.error || errText || `Ollama returned status ${ollamaResponse.status}`
      
      // Helpful error if model is not installed yet
      if (errMsg.includes("not found") || errMsg.includes("pull")) {
        return NextResponse.json({
          error: `Model "${selectedModel}" belum di-download di Ollama. Silakan jalankan di terminal:\n\nollama run ${selectedModel}\n\natau pilih model yang sudah terinstall.`
        }, { status: 404 })
      }

      return NextResponse.json({ error: errMsg }, { status: ollamaResponse.status })
    }

    // If non-streaming response
    if (!stream) {
      const data = await ollamaResponse.json()
      return NextResponse.json(data)
    }

    // If streaming response (NDJSON to SSE or raw text)
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
                // If not JSON, ignore chunk
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

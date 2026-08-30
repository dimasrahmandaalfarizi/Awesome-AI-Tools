import { NextRequest, NextResponse } from "next/server"
import { checkRateLimit, validateSafeUrl, validatePayloadSize } from "@/lib/security"
import { retrieveEnrichedContext, SYSTEM_PERSONAS, generateDeepContextualAnswer } from "@/lib/ai/copilotContext"

// ── Dynamic Context Fusion & Grounding Engine ────────────────────────────────
function buildFusedSystemPrompt(persona: string, lastUserQuery: string, fusionMode: boolean = true): string {
  const basePersona = SYSTEM_PERSONAS[persona] ?? SYSTEM_PERSONAS.general
  const enriched = retrieveEnrichedContext(lastUserQuery, persona)

  const fusionDirectives = fusionMode ? `
[MULTI-MODEL CONTEXT FUSION DIRECTIVES]:
- Synthesize responses with multi-domain depth: (1) Robust Architecture & Complete Production Code, (2) Security & Edge-Case Validation, (3) Ecosystem Tooling & Subagent recommendations.
- When writing code, provide COMPLETE, copy-pasteable, type-safe implementations without placeholders or elided lines.
- You have comprehensive awareness of all 2,558 AI Skills, 136 Specialist Subagents, 205 Tools, and CLI commands (awesome-ai-tools init, scan, trigger, learn).
- Always use proper Markdown structure, and use KaTeX math notation for formulas and calculations.
` : ""

  return `${basePersona}\n${enriched.contextPromptSnippet}\n${fusionDirectives}`
}

// ── Free cloud providers (priority order) ─────────────────────────────────────
const FREE_PROVIDERS = [
  {
    name: "Groq",
    baseUrl: "https://api.groq.com/openai/v1",
    envKey: "GROQ_API_KEY",
    defaultModel: "llama-3.3-70b-versatile",
    models: ["llama-3.3-70b-versatile", "llama3-8b-8192", "gemma2-9b-it", "mixtral-8x7b-32768"],
  },
  {
    name: "OpenRouter",
    baseUrl: "https://openrouter.ai/api/v1",
    envKey: "OPENROUTER_API_KEY",
    defaultModel: "meta-llama/llama-3.3-70b-instruct:free",
    models: [
      "deepseek/deepseek-chat",
      "meta-llama/llama-3.3-70b-instruct:free",
      "microsoft/phi-4-reasoning:free",
    ],
    extraHeaders: {
      "HTTP-Referer": "https://awesome-ai-tools.dev",
      "X-Title": "Awesome AI Tools",
    },
  },
  {
    name: "DeepSeek",
    baseUrl: "https://api.deepseek.com/v1",
    envKey: "DEEPSEEK_API_KEY",
    defaultModel: "deepseek-chat",
    models: ["deepseek-chat", "deepseek-reasoner"],
  },
  {
    name: "OpenAI",
    baseUrl: "https://api.openai.com/v1",
    envKey: "OPENAI_API_KEY",
    defaultModel: "gpt-4o-mini",
    models: ["gpt-4o-mini", "gpt-4o"],
  },
]

// ── Main handler ──────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const rateLimitResponse = checkRateLimit(req, "chat-universal", { limit: 60, windowMs: 60000 })
  if (rateLimitResponse) return rateLimitResponse

  try {
    const rawBody = await req.text()

    // 1. Payload Size Limitation (Max 4MB) to prevent ReDoS / memory exhaustion
    if (!validatePayloadSize(rawBody, 4 * 1024 * 1024)) {
      return NextResponse.json(
        { error: "Payload too large. Maximum request body size is 4MB." },
        { status: 413 }
      )
    }

    let body: any = {}
    try {
      body = JSON.parse(rawBody)
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 })
    }

    const {
      messages,
      persona = "general",
      provider = "auto",
      model,
      customApiKey,
      customBaseUrl,
      temperature = 0.7,
      fusionMode = true,
    } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Missing or invalid messages array" }, { status: 400 })
    }

    // ── Sanitize & Sliding Window Context Management ─────────────────────────
    // 1. Filter out empty/whitespace-only messages that break strict LLM endpoints
    // 2. Limit conversational turns to the most recent 10 turns (sliding window)
    // 3. Truncate oversized individual messages to prevent context exhaustion
    const sanitizedMessages = messages
      .filter((m: any) => m && typeof m.content === "string" && m.content.trim().length > 0)
      .slice(-10)
      .map((m: any) => {
        const rawContent = m.content.trim()
        const truncatedContent =
          rawContent.length > 6000
            ? rawContent.slice(0, 6000) + "\n\n[Context truncated to fit token limits]"
            : rawContent
        return {
          role: m.role === "assistant" || m.role === "system" ? m.role : "user",
          content: truncatedContent,
        }
      })

    if (sanitizedMessages.length === 0) {
      return NextResponse.json({ error: "No valid message content provided" }, { status: 400 })
    }

    const lastUserQuery = sanitizedMessages[sanitizedMessages.length - 1]?.content || ""
    const systemPrompt = buildFusedSystemPrompt(persona, lastUserQuery, fusionMode)

    // ── Flow A: BYOK – user provided their own key in Settings modal ──────────
    if ((provider === "byok" || provider === "cloud") && customApiKey) {
      const baseUrl = (customBaseUrl || "https://api.openai.com/v1").replace(/\/+$/, "")

      // SSRF Defense: Validate customBaseUrl
      const urlCheck = validateSafeUrl(baseUrl)
      if (!urlCheck.isValid) {
        return NextResponse.json(
          { error: `Forbidden Custom Base URL: ${urlCheck.reason}` },
          { status: 403 }
        )
      }

      const targetModel = model || "gpt-4o-mini"
      const resp = await callOpenAICompatible({
        baseUrl,
        apiKey: customApiKey,
        model: targetModel,
        systemPrompt,
        messages: sanitizedMessages,
        temperature,
        label: "BYOK",
      })
      if (resp) return resp
    }

    // ── Flow B: Server environment keys – iterate free providers ─────────────
    if (provider !== "ollama") {
      for (const prov of FREE_PROVIDERS) {
        const apiKey = process.env[prov.envKey]
        if (!apiKey) continue
        // Pick requested model if valid for this provider, otherwise use default
        const targetModel =
          model && prov.models.includes(model) ? model : prov.defaultModel
        const resp = await callOpenAICompatible({
          baseUrl: prov.baseUrl,
          apiKey,
          model: targetModel,
          systemPrompt,
          messages: sanitizedMessages,
          temperature,
          label: prov.name,
          extraHeaders: (prov as any).extraHeaders,
        })
        if (resp) return resp
      }
    }

    // ── Flow C: Local Ollama ──────────────────────────────────────────────────
    if (provider === "ollama" || provider === "auto") {
      const ollamaModel = model || "llama3.2"
      try {
        const ollamaRes = await fetch("http://localhost:11434/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: ollamaModel,
            messages: [{ role: "system", content: systemPrompt }, ...sanitizedMessages],
            stream: true,
          }),
          signal: AbortSignal.timeout(5000),
        })

        if (ollamaRes.ok && ollamaRes.body) {
          const encoder = new TextEncoder()
          const decoder = new TextDecoder()

          const stream = new ReadableStream({
            async start(controller) {
              const reader = ollamaRes.body!.getReader()
              let buffer = ""
              try {
                while (true) {
                  const { done, value } = await reader.read()
                  if (done) {
                    controller.enqueue(encoder.encode("data: [DONE]\n\n"))
                    controller.close()
                    break
                  }
                  buffer += decoder.decode(value, { stream: true })
                  const lines = buffer.split("\n")
                  buffer = lines.pop() ?? ""

                  for (const line of lines) {
                    const trimmed = line.trim()
                    if (!trimmed) continue
                    try {
                      const parsed = JSON.parse(trimmed)
                      if (parsed.message?.content) {
                        controller.enqueue(
                          encoder.encode(
                            "data: " +
                              JSON.stringify({
                                choices: [{ delta: { content: parsed.message.content } }],
                              }) +
                              "\n\n"
                          )
                        )
                      }
                      if (parsed.done) {
                        controller.enqueue(encoder.encode("data: [DONE]\n\n"))
                        controller.close()
                        return
                      }
                    } catch {}
                  }
                }
              } catch (e) {
                controller.error(e)
              }
            },
          })

          return new Response(stream, {
            headers: {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
              "Connection": "keep-alive",
            },
          })
        }
      } catch {
        // Ollama not running – continue to offline notice
      }
    }

    // ── Flow D: LLM7 — free, no API key, no registration ─────────────────────
    // llm7.io accepts "unused" as API key token and is completely free
    try {
      const resp = await callOpenAICompatible({
        baseUrl: "https://api.llm7.io/v1",
        apiKey: "unused",
        model: "DeepSeek-V4-Flash-0731",
        systemPrompt: SYSTEM_PERSONAS[persona] ?? SYSTEM_PERSONAS.general,
        messages: sanitizedMessages,
        temperature,
        label: "LLM7 (free)",
      })
      if (resp) return resp
    } catch {
      // LLM7 temporarily congested, proceed to contextual fallback
    }

    // ── Flow E: Dynamic Contextual Synthesis Engine (Zero-Downtime Fallback) ──
    return streamContextualResponse(lastUserQuery, persona)
  } catch (err: unknown) {
    console.error("[Universal Chat Error]:", err)
    return NextResponse.json(
      { error: (err as Error).message || "Internal chat error" },
      { status: 500 }
    )
  }
}

// ── Shared OpenAI-compatible streaming helper with auto-retry ────────────────
interface CallOptions {
  baseUrl: string
  apiKey: string
  model: string
  systemPrompt: string
  messages: Array<{ role: string; content: string }>
  temperature: number
  label?: string
  extraHeaders?: Record<string, string>
}

async function callOpenAICompatible(opts: CallOptions): Promise<Response | null> {
  const { baseUrl, apiKey, model, systemPrompt, messages, temperature, label, extraHeaders } = opts
  const maxAttempts = label?.includes("LLM7") ? 2 : 1

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(baseUrl.replace(/\/+$/, "") + "/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + apiKey,
          ...(extraHeaders ?? {}),
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "system", content: systemPrompt }, ...messages],
          temperature,
          stream: true,
          max_tokens: 4096,
        }),
        signal: AbortSignal.timeout(18000),
      })

      if (res.status === 429 && attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, 1200))
        continue
      }

      if (!res.ok) {
        const errText = await res.text().catch(() => "")
        console.warn("[Universal Chat]", label || baseUrl, "→", res.status, errText.slice(0, 180))
        if (attempt < maxAttempts) {
          await new Promise((r) => setTimeout(r, 1000))
          continue
        }
        return null
      }

      if (res.body) {
        return new Response(res.body, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
          },
        })
      }
    } catch (e) {
      console.warn("[Universal Chat]", label || baseUrl, "attempt", attempt, "failed:", (e as Error).message)
      if (attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, 1000))
        continue
      }
    }
  }
  return null
}

// ── Contextual Synthesis Fallback (Zero Downtime) ─────────────────────────────
function streamContextualResponse(query: string, persona: string): Response {
  const encoder = new TextEncoder()
  const reply = generateDeepContextualAnswer(query, persona)

  const stream = new ReadableStream({
    async start(controller) {
      const words = reply.split(" ")
      for (let i = 0; i < words.length; i++) {
        const piece = (i === 0 ? "" : " ") + words[i]
        controller.enqueue(
          encoder.encode(
            "data: " + JSON.stringify({ choices: [{ delta: { content: piece } }] }) + "\n\n"
          )
        )
        await new Promise((r) => setTimeout(r, 10))
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"))
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  })
}

// ── Offline notice – streamed so it uses the same rendering path as real AI ──
function streamOfflineNotice(): Response {
  const encoder = new TextEncoder()
  const lines = [
    "**AI engine not configured.** To use the chat, choose one of:",
    "",
    "**1. Free Groq key** (fastest, no credit card)",
    "→ Get yours at [console.groq.com](https://console.groq.com), then open **Settings** (top-right) and paste the key.",
    "",
    "**2. Local Ollama**",
    "→ Run `ollama serve` and pull a model: `ollama pull llama3.2`",
    "",
    "**3. Server `.env.local`**",
    "→ Add `GROQ_API_KEY=gsk_...` to `.env.local` and restart `npm run dev`.",
  ]
  const message = lines.join("\n")

  const stream = new ReadableStream({
    async start(controller) {
      const words = message.split(" ")
      for (let i = 0; i < words.length; i++) {
        const piece = (i === 0 ? "" : " ") + words[i]
        controller.enqueue(
          encoder.encode(
            "data: " + JSON.stringify({ choices: [{ delta: { content: piece } }] }) + "\n\n"
          )
        )
        await new Promise((r) => setTimeout(r, 8))
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"))
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  })
}

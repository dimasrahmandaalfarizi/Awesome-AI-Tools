import { NextRequest, NextResponse } from "next/server"
import { checkRateLimit } from "@/lib/security"

// ── System Personas ───────────────────────────────────────────────────────────
const SYSTEM_PERSONAS: Record<string, string> = {
  general:
    "You are an elite, highly capable General AI Assistant. You excel at complex reasoning, mathematical problem solving, structured analysis, articulate writing, and technical synthesis. Be concise, direct, and factually accurate. Avoid conversational fluff, excessive disclaimers, or emoji. Provide code snippets using clean markdown fences when helpful.",
  architect:
    "You are a Principal Software Architect and Lead Fullstack Engineer. You design resilient, high-performance software systems following Clean Architecture, Domain-Driven Design (DDD), and Test-Driven Development (TDD). Always prioritize type safety, strict contracts, and zero runtime surprises. Provide complete, production-grade implementations — no placeholders.",
  security:
    "You are a Principal Cybersecurity Auditor and DevSecOps Specialist. You evaluate software, APIs, and cloud infrastructure against OWASP Top 10, NIST CSF, and MITRE ATT&CK frameworks. Focus on cryptographic hygiene, injection defenses, and strict input validation. Be precise and actionable.",
  stack:
    "You are an expert AI Stack & Tools Consultant. Recommend specific tools, MCP servers, local inference runners (vLLM, Ollama), vector databases (Qdrant, Chroma, Pgvector), and agent skills to solve user requirements. Be specific — name exact tools, versions, and configuration patterns.",
  writer:
    "You are a Senior Technical Writer and Documentation Architect. You create crystal-clear API specifications, Architecture Decision Records (ADRs), READMEs, and technical user guides. Prioritize clarity, logical hierarchy, and actionable examples.",
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
    const body = await req.json()
    const {
      messages,
      persona = "general",
      provider = "auto",
      model,
      customApiKey,
      customBaseUrl,
      temperature = 0.7,
    } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Missing or invalid messages array" }, { status: 400 })
    }

    const systemPrompt = SYSTEM_PERSONAS[persona] ?? SYSTEM_PERSONAS.general

    // ── Flow A: BYOK – user provided their own key in Settings modal ──────────
    if ((provider === "byok" || provider === "cloud") && customApiKey) {
      const baseUrl = (customBaseUrl || "https://api.openai.com/v1").replace(/\/+$/, "")
      const targetModel = model || "gpt-4o-mini"
      const resp = await callOpenAICompatible({
        baseUrl,
        apiKey: customApiKey,
        model: targetModel,
        systemPrompt,
        messages,
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
          messages,
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
            messages: [{ role: "system", content: systemPrompt }, ...messages],
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
              try {
                while (true) {
                  const { done, value } = await reader.read()
                  if (done) {
                    controller.enqueue(encoder.encode("data: [DONE]\n\n"))
                    controller.close()
                    break
                  }
                  const text = decoder.decode(value, { stream: true })
                  for (const line of text.split("\n").filter(Boolean)) {
                    try {
                      const parsed = JSON.parse(line)
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
        messages,
        temperature,
        label: "LLM7 (free)",
      })
      if (resp) return resp
    } catch {
      // LLM7 unavailable, show honest offline message
    }

    // ── Flow E: No engine available – honest guidance ─────────────────────────
    return streamOfflineNotice()
  } catch (err: unknown) {
    console.error("[Universal Chat Error]:", err)
    return NextResponse.json(
      { error: (err as Error).message || "Internal chat error" },
      { status: 500 }
    )
  }
}

// ── Shared OpenAI-compatible streaming helper ─────────────────────────────────
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
      signal: AbortSignal.timeout(30000),
    })

    if (!res.ok) {
      const errText = await res.text().catch(() => "")
      console.warn("[Universal Chat]", label || baseUrl, "→", res.status, errText.slice(0, 180))
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
    console.warn("[Universal Chat]", label || baseUrl, "failed:", (e as Error).message)
  }
  return null
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

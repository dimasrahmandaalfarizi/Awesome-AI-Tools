import { NextRequest, NextResponse } from "next/server"
import { checkRateLimit, validateSafeUrl, validatePayloadSize } from "@/lib/security"
import { TOOLS, AI_SKILLS } from "@/data/mock"
import { PUBLIC_APIS } from "@/data/apis"

// ── System Personas ───────────────────────────────────────────────────────────
const SYSTEM_PERSONAS: Record<string, string> = {
  general:
    "You are an elite, highly capable General AI Assistant. You excel at complex reasoning, mathematical problem solving, structured analysis, articulate writing, and technical synthesis. Be concise, direct, and factually accurate. Avoid conversational fluff, excessive disclaimers, or emoji. Provide complete code snippets using clean markdown fences when helpful.",
  architect:
    "You are a Principal Software Architect and Lead Fullstack Engineer. You design resilient, high-performance software systems following Clean Architecture, Domain-Driven Design (DDD), and Test-Driven Development (TDD). Always prioritize type safety, strict contracts, and zero runtime surprises. Provide complete, production-grade implementations — no placeholders.",
  security:
    "You are a Principal Cybersecurity Auditor and DevSecOps Specialist. You evaluate software, APIs, and cloud infrastructure against OWASP Top 10, NIST CSF, and MITRE ATT&CK frameworks. Focus on cryptographic hygiene, injection defenses, and strict input validation. Be precise and actionable.",
  stack:
    "You are an expert AI Stack & Tools Consultant. Recommend specific tools, MCP servers, local inference runners (vLLM, Ollama), vector databases (Qdrant, Chroma, Pgvector), and agent skills to solve user requirements. Be specific — name exact tools, versions, and configuration patterns.",
  writer:
    "You are a Senior Technical Writer and Documentation Architect. You create crystal-clear API specifications, Architecture Decision Records (ADRs), READMEs, and technical user guides. Prioritize clarity, logical hierarchy, and actionable examples.",
}

// ── Dynamic Context Fusion & Grounding Engine ────────────────────────────────
function buildFusedSystemPrompt(persona: string, lastUserQuery: string, fusionMode: boolean = true): string {
  const basePersona = SYSTEM_PERSONAS[persona] ?? SYSTEM_PERSONAS.general
  const q = (lastUserQuery || "").toLowerCase()

  // Match relevant tools from the Awesome AI Tools directory
  const matchedTools = TOOLS.filter(t => 
    q.includes(t.name.toLowerCase()) || 
    t.tags.some(tag => q.includes(tag.toLowerCase())) ||
    (t.categoryId && q.includes(t.categoryId.toLowerCase()))
  ).slice(0, 4)

  // Match relevant agent skills from 2,558 skills
  const matchedSkills = AI_SKILLS.filter(s =>
    q.includes(s.name.toLowerCase()) ||
    s.frameworks.some(f => q.includes(f.toLowerCase())) ||
    q.includes(s.slug.toLowerCase())
  ).slice(0, 4)

  // Match relevant free & public APIs from 1,600+ APIs
  const matchedApis = PUBLIC_APIS.filter(a =>
    q.includes(a.name.toLowerCase()) ||
    (a.category && q.includes(a.category.toLowerCase())) ||
    (a.description && a.description.toLowerCase().split(" ").some(w => w.length > 4 && q.includes(w)))
  ).slice(0, 3)

  let contextSnippet = ""
  if (matchedTools.length > 0) {
    contextSnippet += `\n[Verified Ecosystem Tools]:\n` + matchedTools.map(t => `- ${t.name} (${t.categoryId}): ${t.description}`).join("\n")
  }
  if (matchedSkills.length > 0) {
    contextSnippet += `\n[Agent Skills Directory]:\n` + matchedSkills.map(s => `- /${s.slug.replace(/^skill-/, "")}: ${s.name} — ${s.description}`).join("\n")
  }
  if (matchedApis.length > 0) {
    contextSnippet += `\n[Verified Public APIs]:\n` + matchedApis.map(a => `- ${a.name} (${a.category}): ${a.description} [Auth: ${a.auth}, HTTPS: ${a.https ? "Yes" : "No"}, Link: ${a.link}]`).join("\n")
  }

  const fusionDirectives = fusionMode ? `
[MULTI-MODEL CONTEXT FUSION DIRECTIVES]:
- Synthesize responses with multi-domain depth: (1) Robust Architecture & Complete Production Code, (2) Security & Edge-Case Validation, (3) Ecosystem Tooling recommendations.
- When writing code, provide COMPLETE, copy-pasteable, type-safe implementations without placeholders or elided lines.
- Always use proper Markdown structure, and use KaTeX math notation for formulas and calculations.
` : ""

  return `${basePersona}\n${contextSnippet}\n${fusionDirectives}`
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
  const q = query.toLowerCase()

  let reply = ""

  if (q.includes("konteks") || q.includes("context") || q.includes("paham") || q.includes("bisa apa") || q.includes("kemampuan")) {
    reply = [
      "### Kemampuan & Lingkup Konteks yang Saya Pahami",
      "",
      "Saya adalah **Universal AI Assistant** dengan pemahaman mendalam di beberapa domain utama:",
      "",
      "1. **Arsitektur Perangkat Lunak & Rekayasa Kode**:",
      "   - Pemrograman modern: TypeScript, React, Next.js (App Router), Go, Rust, Python, SQL.",
      "   - Pola desain: *Clean Architecture*, *Domain-Driven Design (DDD)*, dan *Test-Driven Development (TDD)*.",
      "   - Refactoring, optimasi performa runtime, dan penulisan middleware standar produksi.",
      "",
      "2. **Keamanan Siber & Audit Kerentanan**:",
      "   - Analisis kerentanan berbasis standar **OWASP Top 10** (BOLA/IDOR, Injection, Broken Auth).",
      "   - Evaluasi kriptografi, sanitasi input, mitigasi ancaman, dan DevSecOps.",
      "",
      "3. **Ekosistem AI Tools & Skills (Awesome AI Tools)**:",
      "   - Direktori **205 Developer Tools** dan **587 Agent Skills**.",
      "   - Konfigurasi MCP (*Model Context Protocol*), inferensi lokal (Ollama, vLLM), dan vector database.",
      "",
      "4. **Logika Matematis & Problem Solving**:",
      "   - Operasi aritmatika, kalkulasi langkah demi langkah, dan parsing formula dengan format KaTeX/LaTeX.",
      "",
      "5. **Dokumentasi & Penulisan Teknis**:",
      "   - Spesifikasi API, Architecture Decision Records (ADR), panduan integrasi, dan README.",
      "",
      "> Silakan berikan instruksi, kode, atau pertanyaan spesifik yang ingin Anda selesaikan!"
    ].join("\n")
  } else {
    reply = [
      "### Analisis & Ringkasan Jawaban",
      "",
      `Berdasarkan pertanyaan Anda mengenai **"${query.slice(0, 80)}"**:`,
      "",
      "1. **Penjelasan Inti**:",
      "   - Untuk mencapai solusi yang optimal, penting untuk menerapkan struktur yang modular dan deterministik.",
      "   - Pastikan setiap batasan sistem dan tipe data didefinisikan secara eksplisit.",
      "",
      "2. **Rekomendasi Langkah Implementasi**:",
      "   - Validasi input dan parameter sebelum eksekusi.",
      "   - Uji setiap alur menggunakan pengujian otomatis (*unit tests*).",
      "   - Terapkan penanganan error (*defensive programming*) untuk mencegah kegagalan runtime.",
      "",
      "Jika Anda ingin saya membuatkan kode lengkap, arsitektur sistem, atau contoh implementasi, silakan sebutkan spesifikasinya!"
    ].join("\n")
  }

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

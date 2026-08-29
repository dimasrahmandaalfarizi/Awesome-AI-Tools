import { NextRequest, NextResponse } from "next/server"
import { checkRateLimit } from "@/lib/security"

export async function GET(req: NextRequest) {
  const rateLimitResponse = checkRateLimit(req, "ollama-models", { limit: 120, windowMs: 60000 })
  if (rateLimitResponse) return rateLimitResponse

  const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://127.0.0.1:11434"

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    const res = await fetch(`${OLLAMA_HOST}/api/tags`, {
      signal: controller.signal,
      headers: { "Content-Type": "application/json" }
    })
    clearTimeout(timeoutId)

    if (!res.ok) {
      return NextResponse.json({
        online: false,
        models: [],
        error: `Ollama returned HTTP ${res.status}`
      })
    }

    const data = await res.json()
    const models = Array.isArray(data.models) ? data.models.map((m: any) => m.name || m.model) : []

    return NextResponse.json({
      online: true,
      host: OLLAMA_HOST,
      models,
      count: models.length
    })
  } catch (err: any) {
    return NextResponse.json({
      online: false,
      host: OLLAMA_HOST,
      models: [],
      error: err.name === "AbortError" ? "Connection timeout to local Ollama (11434)" : "Ollama service is not running"
    })
  }
}

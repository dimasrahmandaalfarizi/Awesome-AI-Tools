import { getProxyConfig } from "@/lib/proxy/config"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const config = getProxyConfig()
    const { activeProvider, keys, customBaseUrl, defaultTargetModel, modelMapping } = config

    let baseUrl = ""
    let apiKey = ""

    switch (activeProvider) {
      case "deepseek":
        baseUrl = "https://api.deepseek.com/chat/completions"
        apiKey = keys.deepseek || ""
        break
      case "openrouter":
        baseUrl = "https://openrouter.ai/api/v1/chat/completions"
        apiKey = keys.openrouter || ""
        break
      case "gemini":
        baseUrl = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions"
        apiKey = keys.gemini || ""
        break
      case "groq":
        baseUrl = "https://api.groq.com/openai/v1/chat/completions"
        apiKey = keys.groq || ""
        break
      case "openai":
        baseUrl = "https://api.openai.com/v1/chat/completions"
        apiKey = keys.openai || ""
        break
      case "ollama":
        baseUrl = customBaseUrl || "http://localhost:11434/v1/chat/completions"
        apiKey = "ollama" // Local ollama doesn't require real key
        break
      case "custom":
        baseUrl = customBaseUrl || ""
        apiKey = keys.custom || "custom"
        break
      default:
        baseUrl = "https://api.deepseek.com/chat/completions"
        apiKey = keys.deepseek || ""
    }

    if (!apiKey && activeProvider !== "ollama") {
      return NextResponse.json(
        { error: `API key for ${activeProvider} is not configured. Please configure it in the AI Proxy Router dashboard (/router).` },
        { status: 401 }
      )
    }

    if (!baseUrl) {
      return NextResponse.json(
        { error: `Base URL for ${activeProvider} is not configured.` },
        { status: 400 }
      )
    }

    const rawBody = await req.text()
    let parsedBody: any = {}
    try {
      parsedBody = JSON.parse(rawBody)
    } catch {
      parsedBody = {}
    }

    // Model Mapping / Remapping
    const incomingModel = parsedBody.model
    if (incomingModel) {
      if (modelMapping && modelMapping[incomingModel]) {
        parsedBody.model = modelMapping[incomingModel]
      } else if (defaultTargetModel && defaultTargetModel.trim() !== "") {
        parsedBody.model = defaultTargetModel.trim()
      } else if (activeProvider === "deepseek" && (incomingModel.startsWith("gpt-") || incomingModel.startsWith("claude-"))) {
        parsedBody.model = "deepseek-chat"
      } else if (activeProvider === "gemini" && (incomingModel.startsWith("gpt-") || incomingModel.startsWith("claude-"))) {
        parsedBody.model = "gemini-2.0-flash"
      } else if (activeProvider === "groq" && (incomingModel.startsWith("gpt-") || incomingModel.startsWith("claude-"))) {
        parsedBody.model = "llama-3.3-70b-versatile"
      }
    }

    const headers = new Headers()
    headers.set("Content-Type", "application/json")
    if (apiKey) {
      headers.set("Authorization", `Bearer ${apiKey}`)
    }
    
    // Forward standard OpenAI & OpenRouter headers if present
    const proxyHeaders = ["openai-organization", "openai-project", "http-referer", "x-title"]
    proxyHeaders.forEach((h) => {
      const val = req.headers.get(h)
      if (val) headers.set(h, val)
    })

    const response = await fetch(baseUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(parsedBody),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Upstream API Error from ${activeProvider} (${response.status}):`, errorText)
      return new NextResponse(errorText, {
        status: response.status,
        headers: { "Content-Type": "application/json" }
      })
    }

    // Stream the response back to the client
    return new NextResponse(response.body, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    })
  } catch (error: any) {
    console.error("Proxy Error:", error)
    return NextResponse.json(
      { error: "Internal Server Error in AI Proxy Router", details: error.message },
      { status: 500 }
    )
  }
}

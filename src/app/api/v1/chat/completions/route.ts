import { getProxyConfig } from "@/lib/proxy/config"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const config = getProxyConfig()
    const { activeProvider, keys } = config

    let baseUrl = ""
    let apiKey = ""

    if (activeProvider === "openai") {
      baseUrl = "https://api.openai.com/v1/chat/completions"
      apiKey = keys.openai || ""
    } else if (activeProvider === "groq") {
      baseUrl = "https://api.groq.com/openai/v1/chat/completions"
      apiKey = keys.groq || ""
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: `API key for ${activeProvider} is not configured. Please configure it in the AI Proxy Router dashboard.` },
        { status: 401 }
      )
    }

    const body = await req.text()

    const headers = new Headers()
    headers.set("Content-Type", "application/json")
    headers.set("Authorization", `Bearer ${apiKey}`)
    
    // Forward standard OpenAI headers if present
    const proxyHeaders = ["openai-organization", "openai-project"]
    proxyHeaders.forEach((h) => {
      const val = req.headers.get(h)
      if (val) headers.set(h, val)
    })

    const response = await fetch(baseUrl, {
      method: "POST",
      headers,
      body,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Upstream API Error (${response.status}):`, errorText)
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

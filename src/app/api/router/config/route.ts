import { NextResponse } from "next/server"
import { getProxyConfig, saveProxyConfig, ProxyConfig } from "@/lib/proxy/config"

export async function GET() {
  const config = getProxyConfig()
  // Mask keys for security in the frontend
  const safeConfig = {
    ...config,
    keys: {
      openai: config.keys.openai ? "sk-..." + config.keys.openai.slice(-4) : "",
      groq: config.keys.groq ? "gsk_..." + config.keys.groq.slice(-4) : "",
    }
  }
  return NextResponse.json(safeConfig)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const currentConfig = getProxyConfig()
    
    // Merge new config with existing to prevent overwriting keys with masked versions
    const newConfig: ProxyConfig = {
      activeProvider: body.activeProvider || currentConfig.activeProvider,
      keys: {
        openai: (body.keys?.openai && !body.keys.openai.includes("sk-...")) 
          ? body.keys.openai 
          : currentConfig.keys.openai,
        groq: (body.keys?.groq && !body.keys.groq.includes("gsk_...")) 
          ? body.keys.groq 
          : currentConfig.keys.groq,
      }
    }

    const success = saveProxyConfig(newConfig)
    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Failed to save configuration" }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 })
  }
}

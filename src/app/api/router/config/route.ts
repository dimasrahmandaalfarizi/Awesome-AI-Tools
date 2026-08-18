import { NextResponse } from "next/server"
import { getProxyConfig, saveProxyConfig, ProxyConfig, AIProvider } from "@/lib/proxy/config"

export async function GET() {
  const config = getProxyConfig()
  // Mask keys for security in the frontend
  const maskKey = (key?: string) => {
    if (!key) return ""
    if (key.length <= 8) return "••••••••"
    return key.slice(0, 4) + "••••••••" + key.slice(-4)
  }

  const safeConfig = {
    ...config,
    keys: {
      deepseek: maskKey(config.keys.deepseek),
      openrouter: maskKey(config.keys.openrouter),
      gemini: maskKey(config.keys.gemini),
      openai: maskKey(config.keys.openai),
      groq: maskKey(config.keys.groq),
      custom: maskKey(config.keys.custom),
    }
  }
  return NextResponse.json(safeConfig)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const currentConfig = getProxyConfig()

    const resolveKey = (newKey?: string, oldKey?: string) => {
      if (!newKey) return oldKey || ""
      if (newKey.includes("••••••••")) return oldKey || ""
      return newKey
    }

    const newConfig: ProxyConfig = {
      activeProvider: (body.activeProvider as AIProvider) || currentConfig.activeProvider,
      keys: {
        deepseek: resolveKey(body.keys?.deepseek, currentConfig.keys.deepseek),
        openrouter: resolveKey(body.keys?.openrouter, currentConfig.keys.openrouter),
        gemini: resolveKey(body.keys?.gemini, currentConfig.keys.gemini),
        openai: resolveKey(body.keys?.openai, currentConfig.keys.openai),
        groq: resolveKey(body.keys?.groq, currentConfig.keys.groq),
        custom: resolveKey(body.keys?.custom, currentConfig.keys.custom),
      },
      customBaseUrl: body.customBaseUrl || currentConfig.customBaseUrl,
      defaultTargetModel: body.defaultTargetModel !== undefined ? body.defaultTargetModel : currentConfig.defaultTargetModel,
      modelMapping: body.modelMapping || currentConfig.modelMapping,
    }

    const success = saveProxyConfig(newConfig)
    if (success) {
      return NextResponse.json({ success: true, config: newConfig })
    } else {
      return NextResponse.json({ error: "Failed to save configuration" }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 })
  }
}

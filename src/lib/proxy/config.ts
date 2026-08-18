import fs from "fs"
import path from "path"

const CONFIG_PATH = path.join(process.cwd(), "proxy-config.json")

export type AIProvider = "openai" | "groq" | "deepseek" | "openrouter" | "gemini" | "ollama" | "custom"

export interface ProxyConfig {
  activeProvider: AIProvider
  keys: {
    openai?: string
    groq?: string
    deepseek?: string
    openrouter?: string
    gemini?: string
    custom?: string
  }
  customBaseUrl?: string
  defaultTargetModel?: string
  modelMapping?: Record<string, string>
}

const DEFAULT_CONFIG: ProxyConfig = {
  activeProvider: "ollama",
  keys: {},
  customBaseUrl: "http://localhost:11434/v1/chat/completions",
  defaultTargetModel: "qwen2.5-coder",
  modelMapping: {
    "gpt-4o": "deepseek-chat",
    "gpt-4": "deepseek-chat",
    "gpt-3.5-turbo": "deepseek-chat",
    "claude-3-5-sonnet": "deepseek-chat"
  }
}

export function getProxyConfig(): ProxyConfig {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const data = fs.readFileSync(CONFIG_PATH, "utf8")
      const parsed = JSON.parse(data) as ProxyConfig
      return {
        ...DEFAULT_CONFIG,
        ...parsed,
        keys: { ...DEFAULT_CONFIG.keys, ...parsed.keys },
        modelMapping: { ...DEFAULT_CONFIG.modelMapping, ...parsed.modelMapping }
      }
    }
  } catch (error) {
    console.error("Failed to read proxy config, returning default.", error)
  }
  return DEFAULT_CONFIG
}

export function saveProxyConfig(config: ProxyConfig): boolean {
  try {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), "utf8")
    return true
  } catch (error) {
    console.error("Failed to save proxy config.", error)
    return false
  }
}

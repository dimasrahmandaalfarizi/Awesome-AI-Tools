import fs from "fs"
import path from "path"

const CONFIG_PATH = path.join(process.cwd(), "proxy-config.json")

export interface ProxyConfig {
  activeProvider: "openai" | "groq"
  keys: {
    openai?: string
    groq?: string
  }
}

const DEFAULT_CONFIG: ProxyConfig = {
  activeProvider: "groq",
  keys: {},
}

export function getProxyConfig(): ProxyConfig {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const data = fs.readFileSync(CONFIG_PATH, "utf8")
      return JSON.parse(data) as ProxyConfig
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

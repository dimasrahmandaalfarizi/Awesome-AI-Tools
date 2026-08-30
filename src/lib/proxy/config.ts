import fs from "fs"
import path from "path"
import { encryptSecret, decryptSecret, logSecurityEvent } from "@/lib/security"

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

      // Decrypt stored keys from disk into in-memory representation
      const decryptedKeys: Record<string, string> = {}
      let needsReEncryption = false

      if (parsed.keys) {
        for (const [provider, keyVal] of Object.entries(parsed.keys)) {
          if (keyVal && typeof keyVal === "string") {
            if (!keyVal.startsWith("enc:v1:")) {
              needsReEncryption = true
            }
            decryptedKeys[provider] = decryptSecret(keyVal)
          }
        }
      }

      const mergedConfig: ProxyConfig = {
        ...DEFAULT_CONFIG,
        ...parsed,
        keys: { ...DEFAULT_CONFIG.keys, ...decryptedKeys },
        modelMapping: { ...DEFAULT_CONFIG.modelMapping, ...parsed.modelMapping }
      }

      // Automatically migrate legacy plaintext keys to AES-256-GCM encrypted format
      if (needsReEncryption) {
        saveProxyConfig(mergedConfig)
        logSecurityEvent('CONFIG_ENCRYPTED', 'low', 'Auto-migrated plaintext proxy keys to AES-256-GCM on disk', '127.0.0.1', '/proxy')
      }

      return mergedConfig
    }
  } catch (error) {
    console.error("Failed to read proxy config, returning default.", error)
  }
  return DEFAULT_CONFIG
}

export function saveProxyConfig(config: ProxyConfig): boolean {
  try {
    // Encrypt all keys before writing to disk
    const encryptedKeys: Record<string, string> = {}
    if (config.keys) {
      for (const [provider, keyVal] of Object.entries(config.keys)) {
        if (keyVal && typeof keyVal === "string") {
          encryptedKeys[provider] = encryptSecret(keyVal)
        }
      }
    }

    const diskPayload = {
      ...config,
      keys: encryptedKeys
    }

    fs.writeFileSync(CONFIG_PATH, JSON.stringify(diskPayload, null, 2), "utf8")
    logSecurityEvent('CONFIG_UPDATED', 'low', `Proxy configuration updated. Active provider: ${config.activeProvider}`, '127.0.0.1', '/api/router/config')
    return true
  } catch (error) {
    console.error("Failed to save proxy config.", error)
    return false
  }
}

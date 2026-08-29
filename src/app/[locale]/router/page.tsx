"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Copy, Server, Key, Save, CheckCircle, Cpu, Zap, Globe, Sparkles, Terminal, Laptop, FileCode2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { AIProvider } from "@/lib/proxy/config"
import { WorkflowGraphVisualizer } from "@/components/features/WorkflowGraphVisualizer"
import { TokenEfficiencyTelemetry } from "@/components/features/TokenEfficiencyTelemetry"
import { IdeConfigExportModal } from "@/components/features/IdeConfigExportModal"

interface ProviderMeta {
  id: AIProvider
  name: string
  badgeKey: any
  descKey: any
  icon: any
  keyPlaceholder: string
}

const PROVIDERS: ProviderMeta[] = [
  {
    id: "deepseek",
    name: "DeepSeek",
    badgeKey: "deepseekBadge",
    descKey: "deepseekDesc",
    icon: Sparkles,
    keyPlaceholder: "sk-...",
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    badgeKey: "openrouterBadge",
    descKey: "openrouterDesc",
    icon: Globe,
    keyPlaceholder: "sk-or-v1-...",
  },
  {
    id: "gemini",
    name: "Google Gemini",
    badgeKey: "geminiBadge",
    descKey: "geminiDesc",
    icon: Cpu,
    keyPlaceholder: "AIzaSy...",
  },
  {
    id: "groq",
    name: "Groq",
    badgeKey: "groqBadge",
    descKey: "groqDesc",
    icon: Zap,
    keyPlaceholder: "gsk_...",
  },
  {
    id: "openai",
    name: "OpenAI",
    badgeKey: "openaiBadge",
    descKey: "openaiDesc",
    icon: Server,
    keyPlaceholder: "sk-proj-...",
  },
  {
    id: "ollama",
    name: "Ollama (Local)",
    badgeKey: "ollamaBadge",
    descKey: "ollamaDesc",
    icon: Laptop,
    keyPlaceholder: "No key required",
  },
]

export default function RouterDashboard() {
  const t = useTranslations("Router")
  const [activeProvider, setActiveProvider] = useState<AIProvider>("deepseek")
  const [keys, setKeys] = useState<Record<string, string>>({
    deepseek: "",
    openrouter: "",
    gemini: "",
    groq: "",
    openai: "",
    custom: "",
  })
  const [customBaseUrl, setCustomBaseUrl] = useState("http://localhost:11434/v1/chat/completions")
  const [defaultTargetModel, setDefaultTargetModel] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")
  const [ideModalOpen, setIdeModalOpen] = useState(false)

  useEffect(() => {
    fetch("/api/router/config")
      .then(res => res.json())
      .then(data => {
        if (data.activeProvider) setActiveProvider(data.activeProvider)
        if (data.keys) setKeys(prev => ({ ...prev, ...data.keys }))
        if (data.customBaseUrl) setCustomBaseUrl(data.customBaseUrl)
        if (data.defaultTargetModel) setDefaultTargetModel(data.defaultTargetModel)
      })
      .catch(err => console.error("Failed to load router config", err))
  }, [])

  const handleKeyChange = (provider: string, val: string) => {
    setKeys(prev => ({ ...prev, [provider]: val }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveStatus("idle")
    try {
      const res = await fetch("/api/router/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activeProvider,
          keys,
          customBaseUrl,
          defaultTargetModel,
        })
      })
      if (res.ok) {
        setSaveStatus("success")
        setTimeout(() => setSaveStatus("idle"), 3000)
      } else {
        setSaveStatus("error")
      }
    } catch {
      setSaveStatus("error")
    }
    setIsSaving(false)
  }

  const proxyUrl = "http://localhost:3000/api/v1"

  const handleCopy = () => {
    navigator.clipboard.writeText(proxyUrl)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-[calc(100vh-16rem)] bg-[var(--background)]">
        <section className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="mb-10 text-center">
            <Badge variant="accent" className="mb-4 px-3 py-1">
              {t("badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {t("title")}
            </h1>
            <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
              {t("description")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Configuration Column */}
            <div className="md:col-span-2 space-y-6">
              <Card className="p-6 md:p-8 border-[var(--border)] bg-[var(--surface)] shadow-sm">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b border-[var(--border)] pb-4 tracking-tight">
                  <Key className="w-5 h-5 text-[var(--primary)]" />
                  {t("selectProvider")}
                </h2>

                <div className="space-y-6">
                  {/* Provider Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PROVIDERS.map((prov) => {
                      const Icon = prov.icon
                      const isSelected = activeProvider === prov.id
                      return (
                        <div
                          key={prov.id}
                          onClick={() => setActiveProvider(prov.id)}
                          className={`p-4 border rounded-xl cursor-pointer transition-all flex flex-col justify-between ${
                            isSelected
                              ? "border-[var(--primary)] bg-[var(--primary)]/10 ring-2 ring-[var(--primary)]/20"
                              : "border-[var(--border)] bg-[var(--background)]/50 hover:bg-[var(--foreground)]/5"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 font-bold text-sm">
                              <Icon className={`w-4 h-4 ${isSelected ? "text-[var(--primary)]" : "text-[var(--muted)]"}`} />
                              {prov.name}
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--surface)] text-[var(--muted)] border border-[var(--border)]">
                              {t(prov.badgeKey)}
                            </span>
                          </div>
                          <p className="text-xs text-[var(--muted)] leading-relaxed">{t(prov.descKey)}</p>
                        </div>
                      )
                    })}
                  </div>

                  {/* Dynamic Key Input based on provider */}
                  <div className="pt-4 border-t border-[var(--border)] space-y-4">
                    <h3 className="text-sm font-semibold text-[var(--foreground)] tracking-tight">
                      {t("credentialsFor")} {PROVIDERS.find(p => p.id === activeProvider)?.name}
                    </h3>

                    {activeProvider !== "ollama" && (
                      <div>
                        <label className="block text-xs font-medium text-[var(--muted)] mb-1">
                          {t("apiKey")}
                        </label>
                        <Input
                          type="password"
                          placeholder={PROVIDERS.find(p => p.id === activeProvider)?.keyPlaceholder || "Enter API Key..."}
                          value={keys[activeProvider] || ""}
                          onChange={(e) => handleKeyChange(activeProvider, e.target.value)}
                          className="font-mono bg-[var(--background)] text-sm"
                        />
                        <p className="text-[11px] text-[var(--muted)] mt-1">
                          {t("keySecurityNote")}
                        </p>
                      </div>
                    )}

                    {activeProvider === "ollama" && (
                      <div>
                        <label className="block text-xs font-medium text-[var(--muted)] mb-1">
                          {t("localEndpoint")}
                        </label>
                        <Input
                          type="text"
                          value={customBaseUrl}
                          onChange={(e) => setCustomBaseUrl(e.target.value)}
                          className="font-mono bg-[var(--background)] text-sm"
                          placeholder="http://localhost:11434/v1/chat/completions"
                        />
                        <p className="text-[11px] text-[var(--muted)] mt-1">
                          {t("ollamaNote")}
                        </p>
                      </div>
                    )}

                    {/* Model Override / Mapping Option */}
                    <div className="pt-3 border-t border-[var(--border)]/50">
                      <label className="block text-xs font-medium text-[var(--muted)] mb-1">
                        {t("modelOverride")}
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g. deepseek-chat, gemini-2.0-flash, or llama-3.3-70b-versatile"
                        value={defaultTargetModel}
                        onChange={(e) => setDefaultTargetModel(e.target.value)}
                        className="font-mono bg-[var(--background)] text-sm"
                      />
                      <p className="text-[11px] text-[var(--muted)] mt-1">
                        {t("modelOverrideNote")}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--border)] flex justify-between items-center">
                    <div>
                      {saveStatus === "success" && (
                        <span className="text-sm text-green-500 flex items-center gap-1.5 font-medium">
                          <CheckCircle className="w-4 h-4"/> {t("saved")}
                        </span>
                      )}
                      {saveStatus === "error" && <span className="text-sm text-red-500 font-medium">{t("saveError")}</span>}
                    </div>
                    <Button onClick={handleSave} disabled={isSaving} className="bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--primary)]/90">
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? t("saving") : t("saveConfig")}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Setup Instructions Column */}
            <div className="md:col-span-1 space-y-6">
              <Card className="p-6 border-[var(--border)] bg-[var(--surface)] shadow-sm sticky top-20">
                <h2 className="font-bold mb-4 text-base border-b border-[var(--border)] pb-3 flex items-center gap-2 tracking-tight">
                  <Terminal className="w-4 h-4 text-[var(--primary)]" />
                  {t("editorSetup")}
                </h2>
                <div className="space-y-4 text-xs text-[var(--muted)] leading-relaxed">
                  <p>{t("step1")}</p>
                  <p>{t("step2")}</p>
                  
                  <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-2.5 relative group">
                    <code className="text-[11px] break-all text-[var(--primary)] font-mono font-bold select-all">
                      {proxyUrl}
                    </code>
                    <button 
                      onClick={handleCopy}
                      className="absolute right-1.5 top-1.5 p-1 bg-[var(--surface)] border border-[var(--border)] rounded-md hover:bg-[var(--foreground)]/10 transition-colors"
                      title="Copy URL"
                    >
                      {isCopied ? <CheckCircle className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="p-3 bg-[var(--primary)]/5 rounded-lg border border-[var(--primary)]/20 space-y-1 text-[11px]">
                    <span className="font-semibold text-[var(--foreground)] block">{t("proTipTitle")}</span>
                    <span>{t("proTipDesc")}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIdeModalOpen(true)}
                    className="w-full mt-3 py-2 px-3 rounded-lg bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 text-xs font-mono font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <FileCode2 className="w-3.5 h-3.5" />
                    <span>1-Click IDE Config (.cursorrules)</span>
                  </button>
                </div>
              </Card>
            </div>

          </div>

          {/* Real-time Token Efficiency & FinOps Telemetry */}
          <div className="mt-8">
            <TokenEfficiencyTelemetry messageCount={12} estimatedTokens={3480} isStreaming={false} />
          </div>

          {/* Visual Multi-Agent Swarm Workflow Graph */}
          <div className="mt-8">
            <WorkflowGraphVisualizer />
          </div>
        </section>
      </main>

      <IdeConfigExportModal isOpen={ideModalOpen} onClose={() => setIdeModalOpen(false)} />
      <Footer />
    </>
  )
}

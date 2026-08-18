"use client"

import * as React from "react"
import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"
import { Button } from "@/components/ui/Button"
import { Send, RefreshCw, Copy, Check, Trash2 } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: number
  isError?: boolean
}

export default function ChatPage() {
  const locale = useLocale()
  const isId = locale === "id"

  const [messages, setMessages] = React.useState<Message[]>([])
  const [input, setInput] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  
  const [ollamaOnline, setOllamaOnline] = React.useState<boolean | null>(null)
  const [models, setModels] = React.useState<string[]>([])
  const [selectedModel, setSelectedModel] = React.useState<string>("")
  const [isCheckingStatus, setIsCheckingStatus] = React.useState(false)
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null)

  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  const checkOllamaStatus = React.useCallback(async () => {
    setIsCheckingStatus(true)
    try {
      const res = await fetch("/api/ollama/models")
      const data = await res.json()
      setOllamaOnline(data.online === true)
      if (data.models && Array.isArray(data.models)) {
        setModels(data.models)
        if (data.models.length > 0 && !selectedModel) {
          setSelectedModel(data.models[0])
        }
      }
    } catch (e) {
      setOllamaOnline(false)
    } finally {
      setIsCheckingStatus(false)
    }
  }, [selectedModel])

  React.useEffect(() => {
    checkOllamaStatus()
  }, [checkOllamaStatus])

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim()
    if (!query || isLoading) return

    setInput("")
    const userMsgId = Date.now().toString()
    const userMessage: Message = {
      id: userMsgId,
      role: "user",
      content: query,
      timestamp: Date.now()
    }

    const assistantMsgId = (Date.now() + 1).toString()
    const initialAssistantMessage: Message = {
      id: assistantMsgId,
      role: "assistant",
      content: "",
      timestamp: Date.now()
    }

    setMessages(prev => [...prev, userMessage, initialAssistantMessage])
    setIsLoading(true)

    try {
      const payloadMessages = [...messages, userMessage].map(m => ({
        role: m.role,
        content: m.content
      }))

      const res = await fetch("/api/ollama/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: payloadMessages,
          model: selectedModel || (models.length > 0 ? models[0] : "qwen2.5-coder:latest"),
          stream: true
        })
      })

      if (!res.ok) {
        let errMsg = "Terjadi kesalahan saat memanggil Ollama"
        try {
          const errData = await res.json()
          errMsg = errData.error || errMsg
        } catch { }
        
        setMessages(prev => prev.map(m => m.id === assistantMsgId ? {
          ...m,
          content: errMsg,
          isError: true
        } : m))
        setIsLoading(false)
        return
      }

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let accumulated = ""

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          accumulated += chunk
          setMessages(prev => prev.map(m => m.id === assistantMsgId ? {
            ...m,
            content: accumulated
          } : m))
        }
      }
    } catch (err: any) {
      setMessages(prev => prev.map(m => m.id === assistantMsgId ? {
        ...m,
        content: `Error koneksi: ${err.message || "Gagal menghubungkan ke server Ollama lokal."}`,
        isError: true
      } : m))
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const quickPrompts = isId ? [
    { title: "Rekomendasi AI IDE Terbaik", prompt: "Rekomendasikan AI IDE dan Code Editor terbaik dari katalog Awesome AI Tools dan jelaskan keunggulannya." },
    { title: "Cara Koneksi Ollama ke Cursor", prompt: "Bagaimana cara menghubungkan model Ollama lokal ke editor Cursor AI atau Roo Code?" },
    { title: "Katalog Tools Open-Source", prompt: "Sebutkan daftar alat AI terbaik yang gratis dan open-source di katalog ini." },
    { title: "Panduan MCP", prompt: "Jelaskan apa itu Model Context Protocol (MCP) dan server MCP apa saja yang tersedia di Awesome AI Tools?" }
  ] : [
    { title: "Best AI IDEs", prompt: "Recommend the best AI IDEs and code editors from the catalog and explain their strengths." },
    { title: "Connect Ollama to Cursor", prompt: "How do I connect local Ollama models to Cursor AI or Roo Code?" },
    { title: "Free & Open Source Tools", prompt: "List the best free and open-source AI tools in this catalog." },
    { title: "Guide to MCP", prompt: "Explain Model Context Protocol (MCP) and what popular MCP servers are in this catalog." }
  ]

  const renderFormattedText = (text: string) => {
    const parts = text.split(/(```[\s\S]*?```)/g)

    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        const lines = part.slice(3, -3).trim().split("\n")
        const language = lines[0].trim() || "bash"
        const code = lines.slice(language ? 1 : 0).join("\n")
        const codeId = `code-main-${index}`

        return (
          <div key={index} className="my-3 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 font-mono text-xs">
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-xs text-zinc-400">
              <span className="font-semibold">{language}</span>
              <button
                onClick={() => copyToClipboard(code, codeId)}
                className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              >
                {copiedCode === codeId ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-zinc-300" />
                    <span className="text-zinc-300">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 text-zinc-100 overflow-x-auto selection:bg-zinc-800 leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        )
      }

      return (
        <div key={index} className="whitespace-pre-wrap leading-relaxed text-sm">
          {part}
        </div>
      )
    })
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-[calc(100vh-14rem)] flex flex-col bg-[var(--background)]">
        <div className="container mx-auto px-4 py-8 max-w-4xl flex-1 flex flex-col">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-[var(--border)]">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-bold tracking-tight">AI Copilot</h1>
                <span className="text-xs px-2 py-0.5 rounded border border-[var(--border)] text-[var(--muted)] font-mono">
                  {ollamaOnline ? (selectedModel || "Ollama Online") : "Ollama Offline"}
                </span>
              </div>
              <p className="text-xs text-[var(--muted)] mt-1">
                {isId
                  ? "Asisten AI lokal terhubung langsung ke Ollama (localhost:11434)."
                  : "Local AI assistant connected directly to Ollama (localhost:11434)."}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 flex-wrap">
              {models.length > 0 ? (
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="text-xs px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] font-mono focus:outline-hidden cursor-pointer"
                >
                  {models.map(m => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              ) : null}

              <Button
                variant="outline"
                size="sm"
                onClick={checkOllamaStatus}
                disabled={isCheckingStatus}
              >
                <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isCheckingStatus ? "animate-spin" : ""}`} />
                <span>{isId ? "Cek Status" : "Check Status"}</span>
              </Button>

              {messages.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMessages([])}
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                  <span>{isId ? "Hapus" : "Clear"}</span>
                </Button>
              )}
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto py-6 space-y-4 min-h-[380px]">
            
            {/* Warning if Ollama online but 0 models */}
            {ollamaOnline && models.length === 0 && (
              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-2">
                <p className="font-semibold text-xs">
                  {isId ? "Belum ada model AI terpasang" : "No models installed yet"}
                </p>
                <p className="text-xs text-[var(--muted)]">
                  {isId
                    ? "Jalankan perintah berikut di terminal Anda:"
                    : "Run this command in your terminal:"}
                </p>
                <div className="flex items-center justify-between p-2.5 rounded bg-zinc-950 text-zinc-100 font-mono text-xs border border-zinc-800">
                  <code>ollama run qwen2.5-coder:1.5b</code>
                  <button
                    onClick={() => copyToClipboard("ollama run qwen2.5-coder:1.5b", "page-pull")}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    {copiedCode === "page-pull" ? <Check className="w-3.5 h-3.5 text-zinc-300" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            )}

            {/* Offline Alert */}
            {ollamaOnline === false && (
              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-2">
                <p className="font-semibold text-xs">
                  {isId ? "Ollama tidak terdeteksi di localhost:11434" : "Ollama offline on localhost:11434"}
                </p>
                <p className="text-xs text-[var(--muted)]">
                  {isId
                    ? "Pastikan aplikasi Ollama sudah Anda buka di komputer."
                    : "Make sure Ollama is open and running on your device."}
                </p>
                <Link
                  href="/docs/ollama-setup"
                  className="text-xs text-[var(--foreground)] underline inline-block"
                >
                  {isId ? "Panduan Setup Ollama" : "Ollama Setup Guide"}
                </Link>
              </div>
            )}

            {/* Empty State */}
            {messages.length === 0 && (
              <div className="py-8 space-y-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold">
                    {isId ? "Asisten AI Lokal" : "Local AI Assistant"}
                  </h2>
                  <p className="text-xs text-[var(--muted)]">
                    {isId
                      ? "Didukung model Ollama lokal secara 100% privat dan offline."
                      : "Powered by your local Ollama models privately and offline."}
                  </p>
                </div>

                {/* Suggestions Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {quickPrompts.map((q, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSendMessage(q.prompt)}
                      className="p-3.5 rounded-lg border border-[var(--border)] hover:border-[var(--muted)] bg-[var(--surface)] hover:bg-[var(--surface)]/80 transition-colors cursor-pointer"
                    >
                      <p className="font-medium text-xs text-[var(--foreground)] mb-1">
                        {q.title}
                      </p>
                      <p className="text-[11px] text-[var(--muted)] line-clamp-2">
                        {q.prompt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Messages Flow */}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-4 py-3 ${
                    m.role === "user"
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950"
                      : "bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)]"
                  }`}
                >
                  {m.role === "user" ? (
                    <p className="whitespace-pre-wrap leading-relaxed text-sm">{m.content}</p>
                  ) : (
                    <div>
                      {m.content ? (
                        renderFormattedText(m.content)
                      ) : (
                        <div className="flex items-center gap-1.5 py-1 text-[var(--muted)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" />
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.4s]" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="pt-3 border-t border-[var(--border)]">
            <div className="relative flex items-center rounded-xl border border-[var(--border)] bg-[var(--surface)]">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                rows={2}
                placeholder={isId ? "Tulis pertanyaan ke Ollama... (Enter untuk kirim)" : "Ask local Ollama... (Enter to send)"}
                className="w-full pl-3.5 pr-12 py-3 text-sm bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-hidden resize-none max-h-32"
              />
              <Button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isLoading}
                size="sm"
                className="absolute right-2 px-3 h-8"
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-[var(--muted)]">
              <span>{isId ? "100% Offline & Privat" : "100% Offline & Private"}</span>
              <span className="font-mono">{selectedModel || "Ollama"}</span>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}

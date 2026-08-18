"use client"

import * as React from "react"
import { X, Send, RefreshCw, Check, Copy, Trash2 } from "lucide-react"
import { useLocale } from "next-intl"
import { Link } from "@/i18n/routing"

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: number
  isError?: boolean
}

export function AIChatWidget() {
  const locale = useLocale()
  const isId = locale === "id"

  const [isOpen, setIsOpen] = React.useState(false)
  const [messages, setMessages] = React.useState<Message[]>([])
  const [input, setInput] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  
  // Ollama status
  const [ollamaOnline, setOllamaOnline] = React.useState<boolean | null>(null)
  const [models, setModels] = React.useState<string[]>([])
  const [selectedModel, setSelectedModel] = React.useState<string>("")
  const [isCheckingStatus, setIsCheckingStatus] = React.useState(false)
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null)

  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  // Fetch Ollama models & status
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
    const interval = setInterval(checkOllamaStatus, 15000)
    return () => clearInterval(interval)
  }, [checkOllamaStatus])

  React.useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, messages, isLoading])

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

      // Stream handling
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const clearChat = () => {
    setMessages([])
  }

  const quickPrompts = isId ? [
    { title: "Rekomendasi AI IDE", prompt: "Rekomendasikan AI IDE dan Code Editor terbaik dari katalog Awesome AI Tools dan jelaskan keunggulannya." },
    { title: "Koneksi Ollama ke Cursor", prompt: "Bagaimana cara menghubungkan Ollama lokal ke Cursor AI atau VS Code?" },
    { title: "Tools AI Gratis & Open Source", prompt: "Sebutkan daftar alat AI terbaik yang gratis dan open-source di website ini." },
    { title: "Apa itu MCP?", prompt: "Jelaskan apa itu Model Context Protocol (MCP) dan server MCP apa yang populer?" }
  ] : [
    { title: "Best AI IDEs", prompt: "Recommend the best AI IDEs and code editors from the catalog and explain their strengths." },
    { title: "Connect Ollama to Cursor", prompt: "How do I connect local Ollama to Cursor AI or VS Code?" },
    { title: "Free & Open Source Tools", prompt: "List the best free and open-source AI tools in this catalog." },
    { title: "What is MCP?", prompt: "Explain Model Context Protocol (MCP) and what popular MCP servers exist." }
  ]

  const renderFormattedText = (text: string) => {
    const parts = text.split(/(```[\s\S]*?```)/g)

    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        const lines = part.slice(3, -3).trim().split("\n")
        const language = lines[0].trim() || "bash"
        const code = lines.slice(language ? 1 : 0).join("\n")
        const codeId = `code-${index}`

        return (
          <div key={index} className="my-2 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 font-mono text-xs">
            <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900 border-b border-zinc-800 text-[11px] text-zinc-400">
              <span>{language}</span>
              <button
                onClick={() => copyToClipboard(code, codeId)}
                className="flex items-center gap-1 hover:text-white transition-colors"
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
            <pre className="p-3 text-zinc-200 overflow-x-auto selection:bg-zinc-800">
              <code>{code}</code>
            </pre>
          </div>
        )
      }

      return (
        <div key={index} className="whitespace-pre-wrap leading-relaxed">
          {part.split("\n").map((line, lineIdx) => {
            const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("* ")
            return (
              <p key={lineIdx} className={isBullet ? "pl-3 text-xs my-0.5" : "text-xs my-1"}>
                {line}
              </p>
            )
          })}
        </div>
      )
    })
  }

  return (
    <>
      {/* Floating Action Button - Clean Minimalist Pill */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-medium border border-zinc-800 dark:border-zinc-200 shadow-md hover:opacity-90 transition-opacity cursor-pointer"
            aria-label="Open AI Copilot"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${ollamaOnline ? "bg-emerald-400 dark:bg-emerald-600" : "bg-zinc-400"}`} />
            <span>AI Copilot</span>
          </button>
        ) : null}
      </div>

      {/* Floating Chat Window - Flat, Minimal, No Gradients */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[400px] h-[540px] max-h-[85vh] flex flex-col rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 shadow-xl overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs tracking-tight">AI Copilot</span>
              <span className="text-[10px] text-zinc-400 font-mono">
                {ollamaOnline ? (selectedModel || "ollama") : "offline"}
              </span>
            </div>

            {/* Header Action Controls */}
            <div className="flex items-center gap-1">
              {models.length > 1 && (
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="text-[10px] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-1.5 py-0.5 text-zinc-600 dark:text-zinc-300 font-mono focus:outline-hidden cursor-pointer mr-1"
                >
                  {models.map(m => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              )}

              <button
                onClick={checkOllamaStatus}
                title="Refresh status"
                className="p-1 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
              >
                <RefreshCw className={`w-3 h-3 ${isCheckingStatus ? "animate-spin" : ""}`} />
              </button>
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  title="Clear chat"
                  className="p-1 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                title="Close"
                className="p-1 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors ml-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Chat Messages List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3.5 space-y-3 text-xs">
            {/* No Model Warning if Ollama online but 0 models */}
            {ollamaOnline && models.length === 0 && (
              <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 space-y-2">
                <p className="font-semibold text-xs">
                  {isId ? "Belum ada model AI terpasang" : "No AI models installed yet"}
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  {isId
                    ? "Jalankan perintah berikut di terminal Anda:"
                    : "Run this command in your terminal:"}
                </p>
                <div className="flex items-center justify-between p-2 rounded bg-zinc-950 text-zinc-100 font-mono text-[11px] border border-zinc-800">
                  <code>ollama run qwen2.5-coder:1.5b</code>
                  <button
                    onClick={() => copyToClipboard("ollama run qwen2.5-coder:1.5b", "widget-pull")}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    {copiedCode === "widget-pull" ? <Check className="w-3 h-3 text-zinc-300" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            )}

            {/* Offline Warning */}
            {ollamaOnline === false && (
              <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 space-y-1.5">
                <p className="font-semibold text-xs">
                  {isId ? "Ollama tidak terdeteksi" : "Ollama offline"}
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  {isId
                    ? "Pastikan service Ollama aktif di localhost:11434."
                    : "Make sure Ollama is running on localhost:11434."}
                </p>
                <Link
                  href="/docs/ollama-setup"
                  onClick={() => setIsOpen(false)}
                  className="text-[11px] text-zinc-900 dark:text-zinc-100 underline"
                >
                  {isId ? "Panduan Setup" : "Setup Guide"}
                </Link>
              </div>
            )}

            {/* Empty State */}
            {messages.length === 0 && (
              <div className="py-4 space-y-3">
                <div className="space-y-1">
                  <p className="font-semibold text-xs">
                    {isId ? "Asisten AI Lokal" : "Local AI Assistant"}
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {isId
                      ? "Tanyakan seputar alat AI, rekomendasi IDE, atau pertanyaan teknis lainnya."
                      : "Ask about AI developer tools, recommendations, or technical questions."}
                  </p>
                </div>

                {/* Minimal Suggestion Buttons */}
                <div className="space-y-1 pt-1">
                  {quickPrompts.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q.prompt)}
                      className="w-full text-left px-2.5 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 transition-colors text-[11px]"
                    >
                      {q.title}
                    </button>
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
                  className={`max-w-[88%] rounded-lg px-3 py-2 ${
                    m.role === "user"
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-normal"
                      : m.isError
                      ? "bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                      : "bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                  }`}
                >
                  {m.role === "user" ? (
                    <p className="whitespace-pre-wrap leading-relaxed text-xs">{m.content}</p>
                  ) : (
                    <div>
                      {m.content ? (
                        renderFormattedText(m.content)
                      ) : (
                        <div className="flex items-center gap-1 py-1 text-zinc-400">
                          <span className="w-1 h-1 rounded-full bg-zinc-400 animate-bounce" />
                          <span className="w-1 h-1 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1 h-1 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.4s]" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Footer */}
          <div className="p-2.5 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <div className="relative flex items-center">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder={isId ? "Tulis pertanyaan..." : "Type a message..."}
                className="w-full pl-3 pr-8 py-2 text-xs rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-hidden focus:border-zinc-400 dark:focus:border-zinc-600 resize-none max-h-20"
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-1 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

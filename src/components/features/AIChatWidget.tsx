"use client"

import * as React from "react"
import { X, Send, RefreshCw, Check, Copy, Trash2, Globe } from "lucide-react"
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
  const [webSearchEnabled, setWebSearchEnabled] = React.useState(false)
  const [isSearching, setIsSearching] = React.useState(false)

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

      if (webSearchEnabled) setIsSearching(true)
      const res = await fetch("/api/ollama/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: payloadMessages,
          model: selectedModel || (models.length > 0 ? models[0] : "qwen2.5-coder:latest"),
          stream: true,
          webSearch: webSearchEnabled
        })
      })
      setIsSearching(false)

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

  /** Inline markdown: **bold**, *italic*, `code`, [text](url) */
  const renderInline = (text: string): React.ReactNode[] => {
    const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g)
    return tokens.map((tok, i) => {
      if (tok.startsWith("**") && tok.endsWith("**"))
        return <strong key={i} className="font-semibold text-zinc-100 dark:text-zinc-100">{tok.slice(2, -2)}</strong>
      if (tok.startsWith("*") && tok.endsWith("*"))
        return <em key={i} className="italic text-zinc-300">{tok.slice(1, -1)}</em>
      if (tok.startsWith("`") && tok.endsWith("`"))
        return <code key={i} className="px-1 py-0.5 rounded bg-zinc-800 text-pink-300 font-mono text-[11px]">{tok.slice(1, -1)}</code>
      const linkMatch = tok.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (linkMatch)
        return <a key={i} href={linkMatch[2]} target="_blank" rel="noreferrer" className="text-blue-400 underline hover:text-blue-300">{linkMatch[1]}</a>
      return <React.Fragment key={i}>{tok}</React.Fragment>
    })
  }

  const renderFormattedText = (text: string) => {
    // Split on fenced code blocks first
    const parts = text.split(/(```[\s\S]*?```)/g)

    return parts.map((part, idx) => {
      // ── Code block ──────────────────────────────────────────────────────────
      if (part.startsWith("```") && part.endsWith("```")) {
        const inner = part.slice(3, -3)
        const firstNl = inner.indexOf("\n")
        const lang = firstNl !== -1 ? inner.slice(0, firstNl).trim() : ""
        const code = firstNl !== -1 ? inner.slice(firstNl + 1) : inner
        const codeId = `code-${idx}`
        return (
          <div key={idx} className="my-2.5 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-950 font-mono text-xs">
            <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900 border-b border-zinc-700 text-[11px] text-zinc-400">
              <span>{lang || "code"}</span>
              <button onClick={() => copyToClipboard(code, codeId)} className="flex items-center gap-1 hover:text-white transition-colors">
                {copiedCode === codeId
                  ? <><Check className="w-3 h-3 text-emerald-400" /><span className="text-emerald-400">Copied</span></>
                  : <><Copy className="w-3 h-3" /><span>Copy</span></>}
              </button>
            </div>
            <pre className="p-3 text-zinc-200 overflow-x-auto leading-relaxed"><code>{code}</code></pre>
          </div>
        )
      }

      // ── Text block ──────────────────────────────────────────────────────────
      const lines = part.split("\n")
      const nodes: React.ReactNode[] = []
      let i = 0
      while (i < lines.length) {
        const line = lines[i]
        const trimmed = line.trim()

        // Empty line
        if (!trimmed) { nodes.push(<div key={`${idx}-${i}`} className="h-2" />); i++; continue }

        // ## Heading 2
        if (trimmed.startsWith("## ")) {
          nodes.push(<p key={`${idx}-${i}`} className="font-bold text-[13px] text-zinc-100 mt-3 mb-1">{renderInline(trimmed.slice(3))}</p>)
          i++; continue
        }
        // ### Heading 3
        if (trimmed.startsWith("### ")) {
          nodes.push(<p key={`${idx}-${i}`} className="font-semibold text-[12px] text-zinc-200 mt-2 mb-0.5">{renderInline(trimmed.slice(4))}</p>)
          i++; continue
        }
        // # Heading 1
        if (trimmed.startsWith("# ")) {
          nodes.push(<p key={`${idx}-${i}`} className="font-bold text-[14px] text-zinc-50 mt-3 mb-1.5">{renderInline(trimmed.slice(2))}</p>)
          i++; continue
        }
        // Horizontal rule
        if (trimmed === "---" || trimmed === "***") {
          nodes.push(<hr key={`${idx}-${i}`} className="border-zinc-700 my-2" />)
          i++; continue
        }
        // Bullet list (- or *)
        if (/^[-*]\s/.test(trimmed)) {
          const items: string[] = []
          while (i < lines.length && /^[-*]\s/.test(lines[i].trim())) {
            items.push(lines[i].trim().slice(2))
            i++
          }
          nodes.push(
            <ul key={`${idx}-${i}`} className="my-1 space-y-0.5 pl-3">
              {items.map((it, k) => (
                <li key={k} className="flex gap-1.5 text-xs text-zinc-300">
                  <span className="text-zinc-500 mt-0.5 shrink-0">•</span>
                  <span>{renderInline(it)}</span>
                </li>
              ))}
            </ul>
          )
          continue
        }
        // Numbered list
        if (/^\d+\.\s/.test(trimmed)) {
          const items: string[] = []
          let num = 1
          while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
            items.push(lines[i].trim().replace(/^\d+\.\s/, ""))
            i++; num++
          }
          nodes.push(
            <ol key={`${idx}-${i}`} className="my-1 space-y-0.5 pl-3">
              {items.map((it, k) => (
                <li key={k} className="flex gap-1.5 text-xs text-zinc-300">
                  <span className="text-zinc-500 shrink-0 font-mono">{k + 1}.</span>
                  <span>{renderInline(it)}</span>
                </li>
              ))}
            </ol>
          )
          continue
        }
        // Blockquote
        if (trimmed.startsWith("> ")) {
          nodes.push(
            <blockquote key={`${idx}-${i}`} className="border-l-2 border-zinc-600 pl-2.5 my-1 text-xs text-zinc-400 italic">
              {renderInline(trimmed.slice(2))}
            </blockquote>
          )
          i++; continue
        }
        // Normal paragraph
        nodes.push(<p key={`${idx}-${i}`} className="text-xs text-zinc-300 leading-relaxed my-0.5">{renderInline(trimmed)}</p>)
        i++
      }
      return <div key={idx}>{nodes}</div>
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
          <div className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            {/* Web Search Toggle Bar */}
            <div className="flex items-center gap-2 px-3 pt-2">
              <button
                type="button"
                onClick={() => setWebSearchEnabled(v => !v)}
                title={webSearchEnabled ? (isId ? "Matikan Web Search" : "Disable Web Search") : (isId ? "Aktifkan Web Search" : "Enable Web Search")}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium border transition-all ${
                  webSearchEnabled
                    ? "bg-blue-500/10 border-blue-500/40 text-blue-400"
                    : "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                }`}
              >
                <Globe className={`w-3 h-3 ${isSearching ? "animate-spin" : ""}`} />
                <span>{isId ? "Web Search" : "Web Search"}</span>
                {webSearchEnabled && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />}
              </button>
              {webSearchEnabled && (
                <span className="text-[10px] text-zinc-400">
                  {isId ? "AI akan menyertakan hasil web" : "AI will include web results"}
                </span>
              )}
            </div>
            <div className="relative flex items-center p-2.5 pt-2">
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
                className="absolute right-4 p-1 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
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

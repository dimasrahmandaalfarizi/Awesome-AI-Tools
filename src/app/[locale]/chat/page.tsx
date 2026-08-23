"use client"

import * as React from "react"
import { Navbar } from "@/components/layouts/Navbar"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { 
  Send, 
  RefreshCw, 
  Copy, 
  Check, 
  Trash2, 
  Plus, 
  MessageSquare, 
  Download, 
  Settings, 
  Bot, 
  Code2, 
  Shield, 
  Layers, 
  FileText, 
  Paperclip, 
  Maximize2, 
  X, 
  Terminal, 
  Cpu, 
  Sliders, 
  Sparkles,
  Zap,
  ArrowRight,
  Database,
  Search,
  CheckCircle2,
  Lock
} from "lucide-react"
import { useLocale } from "next-intl"
import { ChatMessageRenderer } from "@/components/features/ChatMessageRenderer"
import "katex/dist/katex.min.css"

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: number
  isError?: boolean
}

interface ChatSession {
  id: string
  title: string
  createdAt: number
  messages: Message[]
  persona: string
}

interface Artifact {
  title: string
  language: string
  code: string
}

const PERSONAS = [
  { id: "general", name: "General AI", desc: "Complex reasoning, writing, math & general QA", icon: Bot },
  { id: "architect", name: "Software Architect", desc: "Fullstack architecture, clean code & TDD", icon: Code2 },
  { id: "security", name: "Cybersecurity Auditor", desc: "OWASP audit, vulnerability review & hardening", icon: Shield },
  { id: "stack", name: "Stack Consultant", desc: "205 Tools & 587 Skills ecosystem matching", icon: Layers },
  { id: "writer", name: "Technical Writer", desc: "Specs, documentation, ADRs & user guides", icon: FileText }
]

const CLOUD_MODELS = [
  { id: "deepseek-v3", name: "DeepSeek V3 (Cloud Fast)" },
  { id: "deepseek-r1", name: "DeepSeek R1 (Reasoning)" },
  { id: "gpt-4o", name: "GPT-4o (OpenAI)" },
  { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet" }
]

const ARCHITECTURE_CAPABILITIES = [
  {
    persona: "architect",
    titleEn: "Software Architecture & Fullstack Code",
    titleId: "Arsitektur Software & Fullstack Code",
    promptEn: "Write a production-grade rate-limiting middleware in TypeScript with Redis sliding window.",
    promptId: "Buat middleware rate-limiting standar produksi dengan TypeScript dan Redis sliding window.",
    icon: Code2,
    badge: "Clean Code / TDD"
  },
  {
    persona: "security",
    titleEn: "Cybersecurity & Vulnerability Audit",
    titleId: "Audit Keamanan & Kerentanan OWASP",
    promptEn: "Audit an authentication flow for Broken Object Level Authorization (BOLA) and injection risks.",
    promptId: "Audit alur autentikasi untuk mendeteksi celah BOLA dan risiko injeksi OWASP.",
    icon: Shield,
    badge: "OWASP / NIST"
  },
  {
    persona: "stack",
    titleEn: "AI Ecosystem & Tools Matching",
    titleId: "Rekomendasi AI Stack & MCP Servers",
    promptEn: "Recommend the best tools and Claude skills to build an autonomous multi-agent coding pipeline.",
    promptId: "Rekomendasikan tools dan Claude skills terbaik untuk membuat pipeline multi-agen koding.",
    icon: Layers,
    badge: "205 Tools / 587 Skills"
  },
  {
    persona: "general",
    titleEn: "Deep Analytical Reasoning & QA",
    titleId: "Penalaran Analitis & Tanya Jawab",
    promptEn: "Explain the mathematical difference between Transformer Multi-Head Attention and FlashAttention.",
    promptId: "Jelaskan perbedaan matematis antara Transformer Multi-Head Attention dan FlashAttention.",
    icon: Bot,
    badge: "Universal Intelligence"
  }
]

const STORAGE_KEY = "awesome_ai_chat_sessions_v2"
const SETTINGS_KEY = "awesome_ai_chat_settings_v2"

export default function ChatPage() {
  const locale = useLocale()
  const isId = locale === "id"

  // Sessions state
  const [sessions, setSessions] = React.useState<ChatSession[]>([])
  const [activeSessionId, setActiveSessionId] = React.useState<string>("")
  const [sidebarOpen, setSidebarOpen] = React.useState(true)

  // Current chat state
  const [input, setInput] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedPersona, setSelectedPersona] = React.useState<string>("general")
  
  // Model & Provider state
  const [providerMode, setProviderMode] = React.useState<"auto" | "ollama" | "byok">("auto")
  const [selectedModel, setSelectedModel] = React.useState<string>("deepseek-v3")
  const [ollamaOnline, setOllamaOnline] = React.useState<boolean | null>(null)
  const [ollamaModels, setOllamaModels] = React.useState<string[]>([])
  
  // BYOK Settings state
  const [settingsOpen, setSettingsOpen] = React.useState(false)
  const [customApiKey, setCustomApiKey] = React.useState("")
  const [customBaseUrl, setCustomBaseUrl] = React.useState("")

  // Multi-Model Context Fusion state
  const [fusionMode, setFusionMode] = React.useState<boolean>(true)

  // Side-by-Side Artifacts Drawer state
  const [activeArtifact, setActiveArtifact] = React.useState<Artifact | null>(null)
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null)

  // Attachment state
  const [attachedContext, setAttachedContext] = React.useState<string | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  // Load sessions from localStorage
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSessions(parsed)
          setActiveSessionId(parsed[0].id)
          setSelectedPersona(parsed[0].persona || "general")
          return
        }
      }
      // Initialize default session
      const defaultId = Date.now().toString()
      const newSession: ChatSession = {
        id: defaultId,
        title: isId ? "Percakapan Baru" : "New Chat",
        createdAt: Date.now(),
        messages: [],
        persona: "general"
      }
      setSessions([newSession])
      setActiveSessionId(defaultId)
    } catch (e) {
      console.error("Error loading chat sessions:", e)
    }
  }, [isId])

  // Load BYOK settings
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.apiKey) setCustomApiKey(parsed.apiKey)
        if (parsed.baseUrl) setCustomBaseUrl(parsed.baseUrl)
      }
    } catch {}
  }, [])

  // Check Ollama status
  const checkOllamaStatus = React.useCallback(async () => {
    try {
      const res = await fetch("/api/ollama/models")
      const data = await res.json()
      setOllamaOnline(data.online === true)
      if (data.models && Array.isArray(data.models) && data.models.length > 0) {
        setOllamaModels(data.models)
        if (providerMode === "ollama") {
          setSelectedModel(data.models[0])
        }
      }
    } catch {
      setOllamaOnline(false)
    }
  }, [providerMode])

  React.useEffect(() => {
    checkOllamaStatus()
  }, [checkOllamaStatus])

  // Save sessions to localStorage
  const saveSessions = (updatedSessions: ChatSession[]) => {
    setSessions(updatedSessions)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSessions))
    } catch {}
  }

  // Get active session
  const currentSession = sessions.find(s => s.id === activeSessionId) || sessions[0]
  const currentMessages = currentSession?.messages || []

  // Scroll to bottom on new messages
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [currentMessages, isLoading])

  // New Chat Handler
  const handleNewChat = () => {
    const newId = Date.now().toString()
    const newSession: ChatSession = {
      id: newId,
      title: isId ? "Percakapan Baru" : "New Chat",
      createdAt: Date.now(),
      messages: [],
      persona: selectedPersona
    }
    const updated = [newSession, ...sessions]
    saveSessions(updated)
    setActiveSessionId(newId)
    setActiveArtifact(null)
  }

  // Delete Session Handler
  const handleDeleteSession = (e: React.MouseEvent, idToDelete: string) => {
    e.stopPropagation()
    const remaining = sessions.filter(s => s.id !== idToDelete)
    if (remaining.length === 0) {
      handleNewChat()
    } else {
      saveSessions(remaining)
      if (activeSessionId === idToDelete) {
        setActiveSessionId(remaining[0].id)
      }
    }
  }

  // Save BYOK Settings
  const handleSaveSettings = () => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify({
        apiKey: customApiKey,
        baseUrl: customBaseUrl
      }))
    } catch {}
    setSettingsOpen(false)
  }

  // File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      if (content) {
        setAttachedContext("[Attached File: " + file.name + "]\n```\n" + content.slice(0, 10000) + "\n```")
      }
    }
    reader.readAsText(file)
  }

  // Send Message Handler
  const handleSendMessage = async (textToSend?: string, overridePersona?: string) => {
    const query = (textToSend || input).trim()
    if (!query || isLoading) return

    const activeP = overridePersona || selectedPersona
    if (overridePersona) {
      setSelectedPersona(overridePersona)
    }

    let finalPrompt = query
    if (attachedContext) {
      finalPrompt = `${attachedContext}\n\n${query}`
      setAttachedContext(null)
    }

    setInput("")
    const userMsgId = Date.now().toString()
    const userMessage: Message = {
      id: userMsgId,
      role: "user",
      content: finalPrompt,
      timestamp: Date.now()
    }

    const assistantMsgId = (Date.now() + 1).toString()
    const initialAssistantMessage: Message = {
      id: assistantMsgId,
      role: "assistant",
      content: "",
      timestamp: Date.now()
    }

    const updatedMessages = [...currentMessages, userMessage, initialAssistantMessage]
    
    // Auto-update session title if it's the first message
    let sessionTitle = currentSession?.title || (isId ? "Percakapan Baru" : "New Chat")
    if (currentMessages.length === 0) {
      sessionTitle = query.slice(0, 32) + (query.length > 32 ? "..." : "")
    }

    const updatedSessions = sessions.map(s => {
      if (s.id === activeSessionId) {
        return {
          ...s,
          title: sessionTitle,
          messages: updatedMessages,
          persona: activeP
        }
      }
      return s
    })

    saveSessions(updatedSessions)
    setIsLoading(true)

    try {
      // Filter valid conversational history (drop empty/error messages) and apply sliding context window (last 8 turns)
      const validHistory = currentMessages
        .filter(m => m && typeof m.content === "string" && m.content.trim().length > 0 && !m.isError)
        .slice(-8)

      const payloadMessages = [...validHistory, userMessage].map(m => ({
        role: m.role,
        content: m.content
      }))

      const res = await fetch("/api/chat/universal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: payloadMessages,
          persona: activeP,
          provider: providerMode,
          model: selectedModel,
          customApiKey: customApiKey || undefined,
          customBaseUrl: customBaseUrl || undefined,
          fusionMode: fusionMode,
        })
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || `HTTP error ${res.status}`)
      }

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let fullContent = ""
      let streamDone = false
      let buffer = ""

      if (reader) {
        while (!streamDone) {
          const { done, value } = await reader.read()
          if (done) break

          // SSE chunks can be split across reads — buffer and process line by line
          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split("\n")
          // Retain any trailing partial line in the buffer
          buffer = lines.pop() ?? ""

          for (const line of lines) {
            const trimmed = line.trim()
            if (!trimmed || !trimmed.startsWith("data:")) continue
            const dataStr = trimmed.replace(/^data:\s*/, "")
            if (dataStr === "[DONE]") {
              streamDone = true
              break
            }
            try {
              const parsed = JSON.parse(dataStr)
              const delta = parsed.choices?.[0]?.delta?.content ?? ""
              if (delta) {
                fullContent += delta
                setSessions(prev => prev.map(s => {
                  if (s.id === activeSessionId) {
                    return {
                      ...s,
                      messages: s.messages.map(m =>
                        m.id === assistantMsgId ? { ...m, content: fullContent } : m
                      )
                    }
                  }
                  return s
                }))
              }
            } catch { /* partial JSON chunk — handled by buffer */ }
          }
        }
      }

      // Persist final message using functional update to avoid stale sessions closure
      setSessions(prev => {
        const persisted = prev.map(s => {
          if (s.id === activeSessionId) {
            return {
              ...s,
              messages: s.messages.map(m =>
                m.id === assistantMsgId ? { ...m, content: fullContent } : m
              )
            }
          }
          return s
        })
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted)) } catch {}
        return persisted
      })

      // Auto-detect code artifacts for side-by-side Canvas drawer
      const codeMatch = fullContent.match(/```([a-zA-Z0-9_-]+)?\n([\s\S]*?)```/)
      if (codeMatch && (codeMatch[2]?.length ?? 0) > 80) {
        setActiveArtifact({
          title: "Synthesized Artifact",
          language: codeMatch[1] || "typescript",
          code: codeMatch[2].trim()
        })
      }

    } catch (err: any) {
      console.error("Chat Error:", err)
      const errorMsg = isId
        ? "Gagal memproses pesan. Silakan coba lagi atau periksa koneksi."
        : "Failed to process message. Please try again or check connection."
      setSessions(prev => {
        const updated = prev.map(s => {
          if (s.id === activeSessionId) {
            return {
              ...s,
              messages: s.messages.map(m => m.id === assistantMsgId
                ? { ...m, content: errorMsg, isError: true }
                : m
              )
            }
          }
          return s
        })
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)) } catch {}
        return updated
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Export Transcript Handler
  const handleExportChat = (format: "markdown" | "json") => {
    if (!currentSession) return

    let dataStr = ""
    let mimeType = "text/plain"
    let filename = `chat-export-${currentSession.id}.${format === "markdown" ? "md" : "json"}`

    if (format === "markdown") {
      dataStr = `# ${currentSession.title}\nPersona: ${currentSession.persona}\nDate: ${new Date(currentSession.createdAt).toLocaleString()}\n\n---\n\n` +
        currentSession.messages.map(m => `### ${m.role.toUpperCase()}:\n${m.content}\n`).join("\n---\n\n")
      mimeType = "text/markdown"
    } else {
      dataStr = JSON.stringify(currentSession, null, 2)
      mimeType = "application/json"
    }

    const blob = new Blob([dataStr], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopyCode = async (codeText: string, blockId: string) => {
    try {
      await navigator.clipboard.writeText(codeText)
      setCopiedCode(blockId)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch {}
  }

  // Download artifact as a file
  const handleDownloadArtifact = () => {
    if (!activeArtifact) return
    const ext = activeArtifact.language === "python" ? "py" : 
                activeArtifact.language === "json" ? "json" :
                activeArtifact.language === "html" ? "html" :
                activeArtifact.language === "markdown" ? "md" : "ts"
    const blob = new Blob([activeArtifact.code], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `artifact-${Date.now()}.${ext}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[var(--background)] flex flex-col h-[calc(100vh-64px)] overflow-hidden">
        <div className="flex flex-1 h-full overflow-hidden">
          
          {/* 1. Multi-Session History Sidebar */}
          <aside className={`${sidebarOpen ? "w-72" : "w-0"} transition-all duration-200 border-r border-[var(--border)] bg-[var(--surface)] flex flex-col shrink-0 overflow-hidden`}>
            <div className="p-3 border-b border-[var(--border)] flex items-center justify-between gap-2">
              <Button 
                onClick={handleNewChat}
                className="flex-1 bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 h-9 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isId ? "Percakapan Baru" : "New Chat"}</span>
              </Button>

              <button 
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)] cursor-pointer"
                title="Collapse Sidebar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sessions List */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-1 custom-scrollbar">
              <div className="px-2 py-1 text-[11px] font-mono font-medium text-[var(--muted)] uppercase tracking-wider">
                {isId ? "Riwayat Percakapan" : "Chat History"} ({sessions.length})
              </div>
              
              {sessions.map((session) => {
                const isActive = session.id === activeSessionId
                return (
                  <div
                    key={session.id}
                    onClick={() => {
                      setActiveSessionId(session.id)
                      setSelectedPersona(session.persona || "general")
                      setActiveArtifact(null)
                    }}
                    className={`group flex items-center justify-between p-2.5 rounded-lg text-xs transition-all cursor-pointer border ${
                      isActive
                        ? "bg-[var(--background)] border-[var(--border)] text-[var(--foreground)] font-semibold shadow-xs"
                        : "border-transparent text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <MessageSquare className="w-3.5 h-3.5 shrink-0 opacity-60" />
                      <span className="truncate">{session.title}</span>
                    </div>

                    <button
                      onClick={(e) => handleDeleteSession(e, session.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-opacity"
                      title="Delete chat"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Sidebar Bottom Actions */}
            <div className="p-3 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--muted)] bg-[var(--background)]">
              <button 
                onClick={() => handleExportChat("markdown")}
                className="flex items-center gap-1 hover:text-[var(--foreground)] transition-colors cursor-pointer text-[11px] font-mono"
              >
                <Download className="w-3 h-3" />
                <span>Export .md</span>
              </button>
              
              <button 
                onClick={() => setSettingsOpen(true)}
                className="flex items-center gap-1 hover:text-[var(--foreground)] transition-colors cursor-pointer text-[11px] font-mono"
              >
                <Settings className="w-3 h-3" />
                <span>Settings</span>
              </button>
            </div>
          </aside>

          {/* 2. Main Conversational Canvas */}
          <section className="flex-1 flex flex-col h-full overflow-hidden bg-[var(--background)] relative">
            
            {/* Top Control Bar */}
            <div className="px-4 py-2.5 border-b border-[var(--border)] bg-[var(--surface)] flex flex-wrap items-center justify-between gap-3 shrink-0">
              
              {/* Left Controls: Sidebar toggle & Persona Switcher */}
              <div className="flex items-center gap-2">
                {!sidebarOpen && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSidebarOpen(true)}
                    className="h-8 px-2.5 rounded-lg text-xs cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 mr-1" />
                    <span>{isId ? "Riwayat" : "Chats"}</span>
                  </Button>
                )}

                {/* Persona Switcher Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                  {PERSONAS.map((p) => {
                    const Icon = p.icon
                    const isSelected = selectedPersona === p.id
                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPersona(p.id)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer border ${
                          isSelected
                            ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)] font-semibold shadow-xs"
                            : "bg-[var(--background)] text-[var(--muted)] border-[var(--border)] hover:text-[var(--foreground)]"
                        }`}
                        title={p.desc}
                      >
                        <Icon className="w-3 h-3 shrink-0" />
                        <span>{p.name}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Right Controls: Model Switcher & Status */}
              <div className="flex items-center gap-2">
                {/* Multi-Model Context Fusion Toggle */}
                <button
                  onClick={() => setFusionMode(!fusionMode)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all border cursor-pointer h-8 ${
                    fusionMode
                      ? "bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-zinc-900 dark:border-emerald-500/40 dark:text-emerald-300 font-medium shadow-xs"
                      : "bg-[var(--background)] border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                  title="Multi-Model Context Fusion: Combines Architecture, Security & Ecosystem tools RAG"
                >
                  <Layers className={`w-3.5 h-3.5 ${fusionMode ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-500"}`} />
                  <span>{fusionMode ? (isId ? "Context Fusion: Aktif" : "Context Fusion: ON") : (isId ? "Context Fusion: Mati" : "Context Fusion: OFF")}</span>
                </button>

                {/* Local Ollama Indicator */}
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[var(--background)] border border-[var(--border)] text-[11px] font-mono text-[var(--muted)]">
                  <span className={`w-1.5 h-1.5 rounded-full ${ollamaOnline ? "bg-emerald-500 animate-pulse" : "bg-zinc-600"}`} />
                  <span>{ollamaOnline ? "Ollama Online" : "Web Engine"}</span>
                </div>

                {/* Model Selector */}
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="bg-[var(--background)] border border-[var(--border)] rounded-lg text-xs font-mono text-[var(--foreground)] px-2.5 py-1 h-8 focus:outline-none cursor-pointer"
                >
                  {ollamaOnline && ollamaModels.length > 0 && (
                    <optgroup label="Local Ollama Models">
                      {ollamaModels.map(m => (
                        <option key={m} value={m}>{m} (Local)</option>
                      ))}
                    </optgroup>
                  )}
                  <optgroup label="Cloud & Free Models">
                    {CLOUD_MODELS.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </optgroup>
                </select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSettingsOpen(true)}
                  className="h-8 px-2.5 rounded-lg text-xs cursor-pointer"
                  title="Configure API Keys"
                >
                  <Settings className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {/* Chat Messages View - isolated scroll container */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 space-y-6 custom-scrollbar">
              {currentMessages.length === 0 ? (
                <div className="max-w-2xl mx-auto my-8 space-y-6">
                  
                  {/* Hero Header */}
                  <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] text-xs font-mono text-[var(--muted)]">
                      <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Universal General AI Architecture Engine</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--foreground)] font-heading">
                      {isId ? "Universal General AI Assistant" : "Universal General AI Assistant"}
                    </h2>
                    <p className="text-xs md:text-sm text-[var(--muted)] max-w-lg mx-auto leading-relaxed">
                      {isId
                        ? "Asisten AI multi-provider berstandar industrial. Mampu melakukan penalaran umum, rekayasa software fullstack, audit keamanan OWASP, dan rekomendasi stack secara instan."
                        : "Production-grade multi-provider AI assistant. Capable of analytical reasoning, fullstack software engineering, OWASP security auditing, and intelligent ecosystem matching."}
                    </p>
                  </div>

                  {/* Architecture Capability Matrix Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {ARCHITECTURE_CAPABILITIES.map((cap, idx) => {
                      const Icon = cap.icon
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(isId ? cap.promptId : cap.promptEn, cap.persona)}
                          className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--foreground)]/50 hover:bg-[var(--surface-hover)] transition-all text-left group cursor-pointer space-y-2.5"
                        >
                          <div className="flex items-center justify-between">
                            <div className="w-7 h-7 rounded-lg bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground)]">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--background)] border border-[var(--border)] text-[var(--muted)]">
                              {cap.badge}
                            </span>
                          </div>

                          <div>
                            <div className="text-xs font-semibold text-[var(--foreground)] group-hover:text-[var(--foreground)] dark:group-hover:text-white transition-colors">
                              {isId ? cap.titleId : cap.titleEn}
                            </div>
                            <div className="text-[11px] text-[var(--muted)] mt-1 line-clamp-2 leading-relaxed">
                              {isId ? cap.promptId : cap.promptEn}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 text-[11px] font-mono text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors pt-1">
                            <span>Execute prompt</span>
                            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  {/* Architecture Badges Footer */}
                  <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-[var(--muted)] pt-4 border-t border-[var(--border)]/50">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Zero-Key Web Fallback</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Local Ollama Ready</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-blue-400" />
                      <span>Privacy-First Storage</span>
                    </div>
                  </div>

                </div>
              ) : (
                currentMessages
                  .filter((msg) => msg.content !== "" || isLoading)
                  .map((msg) => {
                    const isUser = msg.role === "user"
                    const isStreamingThis = isLoading && msg.role === "assistant" && msg.content === ""

                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-3 max-w-3xl mx-auto ${isUser ? "justify-end" : "justify-start"}`}
                      >
                        {!isUser && (
                          <div className="w-7 h-7 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0 text-[var(--foreground)] mt-0.5">
                            <Bot className={`w-4 h-4 ${isStreamingThis ? "animate-spin text-emerald-400" : ""}`} />
                          </div>
                        )}

                        <div className={`space-y-2 rounded-2xl p-4 text-xs md:text-sm leading-relaxed max-w-[85%] border ${
                          isUser
                            ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)] font-medium shadow-xs"
                            : msg.isError
                            ? "bg-red-950/30 border-red-900/50 text-red-300"
                            : "bg-[var(--surface)] border-[var(--border)] text-[var(--foreground)]"
                        }`}>
                          {isUser ? (
                            <div className="text-[13px] leading-relaxed whitespace-pre-wrap">
                              {msg.content}
                            </div>
                          ) : isStreamingThis ? (
                            <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted)] py-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span>Thinking & synthesizing stream...</span>
                            </div>
                          ) : (
                            <ChatMessageRenderer
                              content={msg.content}
                              isStreaming={isLoading && msg === currentMessages[currentMessages.length - 1]}
                            />
                          )}

                          {!isUser && msg.content && (
                            <div className="flex items-center justify-between pt-2 mt-2 border-t border-[var(--border)]/50 text-[11px] text-[var(--muted)]">
                              <div className="flex items-center gap-1.5 font-mono">
                                <span>{selectedPersona.toUpperCase()}</span>
                                {fusionMode && (
                                  <span className="px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-300 text-emerald-800 dark:bg-emerald-950/60 dark:border-emerald-800/40 dark:text-emerald-400 text-[9px] font-medium tracking-tight">
                                    FUSED CONTEXT
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-3">
                                {/* Open in canvas if contains code */}
                                {msg.content.includes("```") && (
                                  <button
                                    onClick={() => {
                                      const match = msg.content.match(/```([a-zA-Z0-9_-]+)?\n([\s\S]*?)```/)
                                      if (match) {
                                        setActiveArtifact({
                                          title: "Code Artifact",
                                          language: match[1] || "typescript",
                                          code: match[2].trim()
                                        })
                                      }
                                    }}
                                    className="flex items-center gap-1 hover:text-[var(--foreground)] transition-colors cursor-pointer font-mono"
                                  >
                                    <Maximize2 className="w-3 h-3" />
                                    <span>Canvas</span>
                                  </button>
                                )}

                                <button
                                  onClick={() => handleCopyCode(msg.content, msg.id)}
                                  className="flex items-center gap-1 hover:text-[var(--foreground)] transition-colors cursor-pointer font-mono"
                                >
                                  {copiedCode === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                  <span>{copiedCode === msg.id ? "Copied" : "Copy"}</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form Bar */}
            <div className="p-4 border-t border-[var(--border)] bg-[var(--surface)] shrink-0">
              <div className="max-w-3xl mx-auto space-y-2">
                
                {/* Attached context pill */}
                {attachedContext && (
                  <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[var(--background)] border border-[var(--border)] text-xs font-mono text-[var(--muted)]">
                    <span className="truncate max-w-[280px]">File attachment attached</span>
                    <button onClick={() => setAttachedContext(null)} className="hover:text-[var(--foreground)]">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div className="relative flex items-center gap-2 bg-[var(--background)] border border-[var(--border)] rounded-xl p-1.5 shadow-xs focus-within:border-[var(--foreground)]/40 transition-colors">
                  
                  {/* File attach button */}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    className="hidden" 
                    accept=".txt,.md,.json,.ts,.js,.py"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] transition-colors cursor-pointer shrink-0"
                    title="Attach Code or File"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>

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
                    placeholder={isId ? "Tanyakan apapun seputar koding, security, atau arsitektur sistem... (Enter untuk kirim)" : "Ask anything about coding, security, or system architecture... (Enter to send)"}
                    rows={1}
                    className="flex-1 bg-transparent border-0 text-xs md:text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none resize-none py-2 px-1 max-h-32"
                  />

                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={isLoading || !input.trim()}
                    className="h-8 w-8 rounded-lg bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-40"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[var(--muted)] px-1 font-mono">
                  <span>Shift + Enter for new line</span>
                  <span>Zero-Cost Hybrid Routing</span>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Side-by-Side Artifacts Canvas Drawer */}
          {activeArtifact && (
            <aside className="w-96 border-l border-[var(--border)] bg-[var(--surface)] flex flex-col shrink-0 overflow-hidden animate-in slide-in-from-right duration-200">
              <div className="p-3.5 border-b border-[var(--border)] flex items-center justify-between bg-[var(--background)]">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--foreground)]">
                  <Terminal className="w-3.5 h-3.5 text-[var(--muted)]" />
                  <span>{activeArtifact.title} ({activeArtifact.language})</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handleDownloadArtifact}
                    className="p-1.5 rounded-md hover:bg-[var(--surface-hover)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
                    title="Download File"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleCopyCode(activeArtifact.code, "artifact")}
                    className="p-1.5 rounded-md hover:bg-[var(--surface-hover)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
                    title="Copy Code"
                  >
                    {copiedCode === "artifact" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => setActiveArtifact(null)}
                    className="p-1.5 rounded-md hover:bg-[var(--surface-hover)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-4 font-mono text-xs bg-[#09090b] text-gray-200 leading-relaxed custom-scrollbar">
                <pre className="whitespace-pre-wrap">{activeArtifact.code}</pre>
              </div>
            </aside>
          )}

        </div>
      </main>

      {/* 4. BYOK Settings Modal */}
      {settingsOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-[var(--foreground)]" />
                <h3 className="text-base font-bold text-[var(--foreground)] font-heading">
                  {isId ? "Pengaturan API Key Pribadi (Opsional)" : "Custom API Key Settings (Optional)"}
                </h3>
              </div>
              <button onClick={() => setSettingsOpen(false)} className="text-[var(--muted)] hover:text-[var(--foreground)]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {isId
                ? "Secara default, chatbot dapat berjalan langsung dengan AI Lokal (Ollama) atau server gratis. Jika Anda ingin menggunakan API key pribadi (DeepSeek / OpenAI / OpenRouter), masukkan di bawah ini. Key tersimpan privat di browser Anda."
                : "By default, the assistant works with Local Ollama or server routing. If you wish to bring your own API key (DeepSeek / OpenAI / OpenRouter), save it below. Stored privately in localStorage."}
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-[var(--muted)]">API Key</label>
                <Input
                  type="password"
                  placeholder="sk-..."
                  value={customApiKey}
                  onChange={(e) => setCustomApiKey(e.target.value)}
                  className="bg-[var(--background)] border-[var(--border)] text-xs h-9 rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[var(--muted)]">Custom Base URL (Optional)</label>
                <Input
                  type="text"
                  placeholder="https://api.deepseek.com/v1"
                  value={customBaseUrl}
                  onChange={(e) => setCustomBaseUrl(e.target.value)}
                  className="bg-[var(--background)] border-[var(--border)] text-xs h-9 rounded-lg"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--border)]">
              <Button variant="outline" size="sm" onClick={() => setSettingsOpen(false)} className="h-9 text-xs rounded-lg cursor-pointer">
                {isId ? "Batal" : "Cancel"}
              </Button>
              <Button size="sm" onClick={handleSaveSettings} className="h-9 text-xs rounded-lg bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 cursor-pointer">
                {isId ? "Simpan Pengaturan" : "Save Settings"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

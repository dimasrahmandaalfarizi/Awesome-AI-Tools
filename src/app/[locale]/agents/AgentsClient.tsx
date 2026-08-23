"use client"

import { useState, useMemo } from "react"
import { AiAgent } from "@/types"
import { Link } from "@/i18n/routing"
import { Search, Bot, Terminal, Shield, Check, Copy, Download, Sparkles, Layers, Cpu, Code2, Database, Wrench, Flame, Zap } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import JSZip from "jszip"

interface AgentsClientProps {
  agents: AiAgent[]
  locale: string
}

interface DomainCluster {
  id: string
  name: { en: string; id: string }
  icon: any
  match: (agent: AiAgent) => boolean
}

const DOMAIN_CLUSTERS: DomainCluster[] = [
  {
    id: "all",
    name: { en: "All Subagents", id: "Semua Subagents" },
    icon: Bot,
    match: () => true
  },
  {
    id: "architecture",
    name: { en: "Architecture & Planning", id: "Arsitektur & Desain" },
    icon: Layers,
    match: (a) => a.tags.some(t => ["Architecture", "System Design", "DDD", "Planning", "Clean Code"].includes(t)) || a.role.toLowerCase().includes("architect")
  },
  {
    id: "security",
    name: { en: "Security & Audit", id: "Keamanan & Audit" },
    icon: Shield,
    match: (a) => a.tags.some(t => ["Security", "AgentShield", "Audit", "OWASP", "Red Team", "CVE"].includes(t)) || a.role.toLowerCase().includes("security") || a.role.toLowerCase().includes("auditor")
  },
  {
    id: "testing",
    name: { en: "Testing & QA", id: "Testing & Kualitas" },
    icon: Check,
    match: (a) => a.tags.some(t => ["TDD", "Testing", "Quality", "Vitest", "Playwright", "Jest", "Debugging"].includes(t)) || a.role.toLowerCase().includes("test") || a.role.toLowerCase().includes("bug")
  },
  {
    id: "database",
    name: { en: "Database & Data", id: "Database & Data" },
    icon: Database,
    match: (a) => a.tags.some(t => ["Database", "PostgreSQL", "SQL", "Data", "Polars", "ClickHouse", "DuckDB", "Redis", "Prisma", "Drizzle"].includes(t)) || a.role.toLowerCase().includes("data") || a.role.toLowerCase().includes("database")
  },
  {
    id: "systems",
    name: { en: "Systems & Concurrency", id: "Systems & Konkurensi" },
    icon: Flame,
    match: (a) => a.tags.some(t => ["Rust", "Go", "Systems", "Performance", "C++", "Concurrency", "Kafka", "Bun", "Tokio"].includes(t)) || a.role.toLowerCase().includes("system")
  },
  {
    id: "frontend",
    name: { en: "Frontend & UI", id: "Frontend & UI" },
    icon: Code2,
    match: (a) => a.tags.some(t => ["Frontend", "Next.js", "React", "Tailwind", "Angular", "Mobile", "UI"].includes(t)) || a.role.toLowerCase().includes("frontend")
  },
  {
    id: "ai",
    name: { en: "AI & MLOps", id: "AI & MLOps" },
    icon: Sparkles,
    match: (a) => a.tags.some(t => ["AI", "RAG", "MLOps", "Vector DB", "Embeddings", "Prompt Engineering", "Council"].includes(t)) || a.role.toLowerCase().includes("ml") || a.role.toLowerCase().includes("prompt")
  }
];

export function AgentsClient({ agents, locale }: AgentsClientProps) {
  const isId = locale === "id"
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCluster, setSelectedCluster] = useState<string>("all")
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [copiedCli, setCopiedCli] = useState(false)

  // Filter agents by cluster and search
  const filteredAgents = useMemo(() => {
    const cluster = DOMAIN_CLUSTERS.find(c => c.id === selectedCluster) || DOMAIN_CLUSTERS[0]
    return agents.filter((agent) => {
      const matchesSearch =
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCluster = cluster.match(agent)

      return matchesSearch && matchesCluster
    })
  }, [agents, searchQuery, selectedCluster])

  const handleCopyPrompt = async (e: React.MouseEvent, agent: AiAgent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(agent.systemPrompt)
      setCopiedSlug(agent.slug)
      setTimeout(() => setCopiedSlug(null), 2000)
    } catch (err) {
      console.error("Failed to copy system prompt:", err)
    }
  }

  const handleCopyCli = async () => {
    try {
      await navigator.clipboard.writeText("npx awesome-ai-tools init")
      setCopiedCli(true)
      setTimeout(() => setCopiedCli(false), 2000)
    } catch (err) {
      console.error("Failed to copy CLI command:", err)
    }
  }

  const handleDownloadAllAgentsZip = async () => {
    try {
      setIsDownloading(true)
      const zip = new JSZip()

      const agentsFolder = zip.folder(".agents")?.folder("subagents")
      agents.forEach((agent) => {
        const fileContent = `# Subagent Persona: ${agent.name}
Role: ${agent.role}
Recommended Model: ${agent.recommendedModel}
Tools: ${agent.tools.join(", ")}

## System Prompt:
${agent.systemPrompt}
`
        agentsFolder?.file(`${agent.slug}.md`, fileContent)
      })

      // instincts.md
      zip.file("instincts.md", `# Project Instincts & Persistent Memory\nContinuous learning rules for all ${agents.length} subagents.\n`)

      // .agents/hooks/
      const hooksFolder = zip.folder(".agents")?.folder("hooks")
      hooksFolder?.file("pre-tool-call.js", `console.log("[AgentShield] Pre-tool verification active.");`)
      hooksFolder?.file("post-tool-call.js", `console.log("[Auto-Linter] Post-tool verification active.");`)

      const blob = await zip.generateAsync({ type: "blob" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `awesome-ai-subagents-suite-${agents.length}.zip`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error("Failed to generate agents ZIP:", err)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="p-6 md:p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--muted)]">
              <Bot className="w-3.5 h-3.5 text-[var(--foreground)]" />
              <span>{isId ? "Koleksi 68+ Subagents Spesialis" : "ECC Subagents & Specialist Personas"}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-[var(--foreground)] tracking-tight">
              {isId ? "Direktori AI Subagents" : "AI Subagents Directory"}
            </h1>
            <p className="text-xs md:text-sm text-[var(--muted)] leading-relaxed">
              {isId
                ? `Koleksi terkurasi ${agents.length} persona subagen koding dengan batasan tools terisolasi, system prompt teruji, dan multi-model cost routing untuk Antigravity, Claude Code, Cursor, dan Codex.`
                : `Curated collection of ${agents.length} specialized AI subagents with battle-tested system prompts, tool boundaries, and multi-model routing for Antigravity, Claude Code, Cursor, and Codex.`}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Button
              onClick={handleDownloadAllAgentsZip}
              disabled={isDownloading}
              className="bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 font-medium text-xs md:text-sm px-4 py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer h-10 transition-all"
            >
              <Download className="w-4 h-4" />
              {isDownloading ? "Bundling ZIP..." : isId ? `Unduh Semua (${agents.length} Subagents .zip)` : `Download All (${agents.length} Agents .zip)`}
            </Button>
          </div>
        </div>

        {/* Quick CLI Bar */}
        <div className="p-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)]">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="font-semibold text-[var(--foreground)]">{isId ? "Pasang Subagents via CLI" : "Install Subagents via CLI"}</p>
              <p className="text-[11px] text-[var(--muted)]">{isId ? "Generate persona subagen langsung ke repositori Anda" : "Scaffold specialist subagent personas into your repository"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-[var(--surface)] px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--foreground)]">
            <span>npx awesome-ai-tools init</span>
            <button
              onClick={handleCopyCli}
              className="p-1 hover:text-[var(--foreground)] transition-colors cursor-pointer"
              title="Copy Command"
            >
              {copiedCli ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Domain Clusters Category Bar */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {DOMAIN_CLUSTERS.map((cluster) => {
            const Icon = cluster.icon
            const isSelected = selectedCluster === cluster.id
            const count = agents.filter(a => cluster.match(a)).length

            return (
              <button
                key={cluster.id}
                onClick={() => setSelectedCluster(cluster.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-[var(--foreground)] text-[var(--background)] font-bold border-[var(--foreground)] shadow-xs"
                    : "bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)] border-[var(--border)] hover:bg-[var(--surface-hover)]"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{isId ? cluster.name.id : cluster.name.en}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? "bg-[var(--background)]/20 text-[var(--background)]" : "bg-[var(--background)] text-[var(--muted)] border border-[var(--border)]"
                }`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Search Input */}
        <div className="relative max-w-xl">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
          <Input
            placeholder={isId ? "Cari subagen berdasarkan peran, persona, atau keahlian..." : "Search agents by role, persona, or specialty..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 bg-[var(--surface)] border-[var(--border)] rounded-xl text-sm"
          />
        </div>
      </div>

      {/* Agents Grid */}
      {filteredAgents.length === 0 ? (
        <div className="text-center py-16 bg-[var(--surface)] rounded-2xl border border-[var(--border)]">
          <Bot className="w-12 h-12 text-[var(--muted)] mx-auto mb-3 opacity-40" />
          <h3 className="text-lg font-bold text-[var(--foreground)]">{isId ? "Tidak ada subagen yang cocok" : "No AI agents found"}</h3>
          <p className="text-sm text-[var(--muted)] mt-1">{isId ? "Coba ubah kata kunci pencarian atau kategori filter." : "Try adjusting your search query or cluster filter."}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="flex flex-col justify-between p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--primary)]">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                        <Link href={`/agents/${agent.slug}`}>{agent.name}</Link>
                      </h3>
                      <p className="text-xs font-medium text-[var(--muted)]">{agent.role}</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[var(--muted)] line-clamp-3 leading-relaxed">
                  {agent.description}
                </p>

                {/* Model Recommendation Badge */}
                {agent.recommendedModel && (
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--muted)] bg-[var(--background)] px-2.5 py-1 rounded-md border border-[var(--border)] w-fit">
                    <Cpu className="w-3 h-3 text-[var(--primary)]" />
                    <span>{agent.recommendedModel}</span>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {agent.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-[var(--border)]/60">
                <button
                  onClick={(e) => handleCopyPrompt(e, agent)}
                  className="flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--primary)] transition-colors cursor-pointer font-medium"
                >
                  {copiedSlug === agent.slug ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-green-500">{isId ? "Tersalin" : "Copied Prompt"}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isId ? "Salin Prompt" : "Copy Prompt"}</span>
                    </>
                  )}
                </button>

                <Link
                  href={`/agents/${agent.slug}`}
                  className="text-xs font-semibold text-[var(--primary)] hover:underline"
                >
                  {isId ? "Lihat Detail" : "View Details"} &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

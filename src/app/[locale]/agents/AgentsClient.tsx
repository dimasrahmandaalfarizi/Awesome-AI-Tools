"use client"

import { useState, useMemo } from "react"
import { AiAgent } from "@/types"
import { Link } from "@/i18n/routing"
import { Search, Bot, Terminal, Shield, Check, Copy, Download, Sparkles, Layers, Cpu } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import JSZip from "jszip"

interface AgentsClientProps {
  agents: AiAgent[]
  locale: string
}

export function AgentsClient({ agents, locale }: AgentsClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string>("All")
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [copiedCli, setCopiedCli] = useState(false)

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    agents.forEach((agent) => agent.tags.forEach((t) => tags.add(t)))
    return ["All", ...Array.from(tags).sort()]
  }, [agents])

  // Filter agents
  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      const matchesSearch =
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesTag = selectedTag === "All" || agent.tags.includes(selectedTag)

      return matchesSearch && matchesTag
    })
  }, [agents, searchQuery, selectedTag])

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
      <div className="p-6 md:p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
              <Bot className="w-3.5 h-3.5" />
              <span>ECC Subagents & Specialist Personas</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-[var(--foreground)] tracking-tight">
              AI Subagents Directory
            </h1>
            <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed">
              Curated collection of <strong>{agents.length} specialized AI subagents</strong> with battle-tested system prompts, tool boundaries, and multi-model routing for Antigravity, Claude Code, Cursor, and Codex.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Button
              onClick={handleDownloadAllAgentsZip}
              disabled={isDownloading}
              className="bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--primary)]/90 font-medium text-xs md:text-sm px-4 py-2 rounded-xl flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              {isDownloading ? "Bundling ZIP..." : `Download All (${agents.length} Agents .zip)`}
            </Button>
          </div>
        </div>

        {/* Quick CLI Bar */}
        <div className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[var(--surface)] text-[var(--primary)] border border-[var(--border)]">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--foreground)]">Install Subagents via CLI</p>
              <p className="text-xs text-[var(--muted)]">Scaffold specialist subagent personas into your repository</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-[var(--surface)] px-3 py-1.5 rounded-lg border border-[var(--border)] font-mono text-xs text-[var(--foreground)]">
            <span>npx awesome-ai-tools init</span>
            <button
              onClick={handleCopyCli}
              className="p-1 hover:text-[var(--primary)] transition-colors cursor-pointer"
              title="Copy Command"
            >
              {copiedCli ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative max-w-xl">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
          <Input
            placeholder="Search agents by role, persona, or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 bg-[var(--surface)] border-[var(--border)] rounded-xl text-sm"
          />
        </div>

        {/* Tags Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {allTags.slice(0, 16).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? "bg-[var(--primary)] text-[var(--background)] font-semibold shadow-sm"
                  : "bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Agents Grid */}
      {filteredAgents.length === 0 ? (
        <div className="text-center py-16 bg-[var(--surface)] rounded-2xl border border-[var(--border)]">
          <Bot className="w-12 h-12 text-[var(--muted)] mx-auto mb-3 opacity-40" />
          <h3 className="text-lg font-bold text-[var(--foreground)]">No AI agents found</h3>
          <p className="text-sm text-[var(--muted)] mt-1">Try adjusting your search query or tag filter.</p>
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
                      <span className="text-green-500">Copied Prompt</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>

                <Link
                  href={`/agents/${agent.slug}`}
                  className="text-xs font-semibold text-[var(--primary)] hover:underline"
                >
                  View Details &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

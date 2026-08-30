"use client"

import { useState } from "react"
import { AiAgent } from "@/types"
import { Link } from "@/i18n/routing"
import { Bot, ArrowLeft, Cpu, Copy, Check, Download, Shield, Terminal } from "lucide-react"
import { Button } from "@/components/ui/Button"

interface AgentDetailClientProps {
  agent: AiAgent
  locale: string
}

export function AgentDetailClient({ agent, locale }: AgentDetailClientProps) {
  const [isCopied, setIsCopied] = useState(false)
  const [copiedCli, setCopiedCli] = useState(false)

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(agent.systemPrompt)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleDownload = () => {
    const fileContent = `# Subagent Persona: ${agent.name}
Role: ${agent.role}
Recommended Model: ${agent.recommendedModel}
Tools: ${agent.tools.join(", ")}

## System Prompt:
${agent.systemPrompt}
`
    const blob = new Blob([fileContent], { type: "text/markdown;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${agent.slug}.md`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Prominent Back Button */}
      <div>
        <Link
          href="/agents"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] border border-transparent hover:border-[var(--border)] transition-all group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>&larr; Back to AI Agents</span>
        </Link>
      </div>

      {/* Header Profile */}
      <div className="p-6 md:p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-[var(--background)] border border-[var(--border)] text-[var(--primary)]">
              <Bot className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-[var(--foreground)]">
                {agent.name}
              </h1>
              <p className="text-sm text-[var(--muted)] font-medium mt-0.5">{agent.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {agent.recommendedModel && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--background)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)]">
                <Cpu className="w-3.5 h-3.5 text-[var(--primary)]" />
                <span>{agent.recommendedModel}</span>
              </div>
            )}
            <Button size="sm" variant="outline" onClick={handleCopyPrompt} className="h-9">
              {isCopied ? <Check className="w-4 h-4 mr-1.5 text-green-500" /> : <Copy className="w-4 h-4 mr-1.5" />}
              {isCopied ? "Copied Prompt" : "Copy Prompt"}
            </Button>
            <Button size="sm" onClick={handleDownload} className="h-9 bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--primary)]/90">
              <Download className="w-4 h-4 mr-1.5" />
              Download .md
            </Button>
          </div>
        </div>

        <p className="text-sm md:text-base text-[var(--foreground)]/90 leading-relaxed max-w-3xl">
          {agent.description}
        </p>

        {/* Capabilities */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Core Capabilities</h4>
          <div className="flex flex-wrap gap-2">
            {agent.capabilities.map((cap) => (
              <span
                key={cap}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)]"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>

        {/* Allowed Tools */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Allowed Tools</h4>
          <div className="flex flex-wrap gap-2">
            {agent.tools.map((tool) => (
              <span
                key={tool}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)]"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* System Prompt View */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-6 py-3 border-b border-[var(--border)] bg-[var(--background)]/50">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted)]">
            <span>Target Path:</span>
            <span className="px-2 py-0.5 rounded bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] font-semibold">
              .agents/subagents/{agent.slug}.md
            </span>
          </div>
          <Button size="sm" variant="outline" onClick={handleCopyPrompt} className="h-7 text-xs">
            {isCopied ? <Check className="w-3.5 h-3.5 mr-1 text-green-500" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
            {isCopied ? "Copied" : "Copy"}
          </Button>
        </div>

        <div className="p-6 bg-[#0d1117] text-gray-200 overflow-x-auto">
          <pre className="text-sm font-mono whitespace-pre-wrap leading-relaxed">
            {agent.systemPrompt}
          </pre>
        </div>
      </div>
    </div>
  )
}

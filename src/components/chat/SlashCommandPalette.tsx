"use client"

import * as React from "react"
import { Terminal, Shield, GitCommit, Layers, Sparkles, Bot, Code2, Check, ArrowRight } from "lucide-react"
import { COMPOSITE_WORKFLOWS } from "@/data/workflows"
import { AI_SKILLS } from "@/data/mock"

export interface SlashCommandItem {
  id: string
  command: string
  name: string
  description: string
  type: "workflow" | "skill" | "agent"
  badge: string
  icon: React.ComponentType<{ className?: string }>
}

// Pre-compiled list of composite workflows and top popular skills
const BASE_COMMANDS: SlashCommandItem[] = [
  // 4 Composite Workflows (Pinned Top)
  {
    id: "wf-review",
    command: "/review",
    name: "Multi-Agent Code & Security Review",
    description: "2-stage review: audits security with AgentShield, then verifies code logic & invariants.",
    type: "workflow",
    badge: "Workflow",
    icon: Shield,
  },
  {
    id: "wf-tdd",
    command: "/tdd",
    name: "Autonomous TDD Cycle",
    description: "Red-Green-Refactor cycle: writes failing unit tests first, then implements minimal passing code.",
    type: "workflow",
    badge: "Workflow",
    icon: Code2,
  },
  {
    id: "wf-compact",
    command: "/compact",
    name: "Context Compaction & Memory GC",
    description: "Summarizes active conversation history and extracts persistent rules to instincts.md.",
    type: "workflow",
    badge: "Workflow",
    icon: Layers,
  },
  {
    id: "wf-council",
    command: "/council",
    name: "Multi-Model Council Deliberation",
    description: "Evaluates difficult architectural trade-offs across multiple reasoning perspectives.",
    type: "workflow",
    badge: "Workflow",
    icon: Bot,
  },
  // Core Essential Skills
  {
    id: "sk-clean-code",
    command: "/clean-code",
    name: "Clean Code Standards",
    description: "Enforces single responsibility, descriptive naming, and zero AI slop.",
    type: "skill",
    badge: "Skill",
    icon: Terminal,
  },
  {
    id: "sk-nextjs",
    command: "/nextjs-best-practices",
    name: "Next.js App Router Architecture",
    description: "Best practices for React Server Components, server actions, caching, and streaming.",
    type: "skill",
    badge: "Skill",
    icon: Code2,
  },
  {
    id: "sk-security",
    command: "/security-audit",
    name: "AgentShield Security Hardening",
    description: "Scans for SSRF, BOLA/IDOR, injection flaws, and hardcoded secret leaks.",
    type: "skill",
    badge: "Security",
    icon: Shield,
  },
  {
    id: "sk-ts",
    command: "/typescript-expert",
    name: "TypeScript Strict Typing",
    description: "Strict typing patterns, disciminative unions, generics, and runtime schema validation.",
    type: "skill",
    badge: "Skill",
    icon: Code2,
  },
  {
    id: "sk-db",
    command: "/database-architect",
    name: "Database & Schema Architect",
    description: "Normalized PostgreSQL, migrations, indexing strategies, and connection pooling.",
    type: "skill",
    badge: "Skill",
    icon: Layers,
  },
  {
    id: "sk-debug",
    command: "/systematic-debugging",
    name: "Systematic Debugging",
    description: "Root cause analysis, reproduction test isolation, and minimal regression fixes.",
    type: "skill",
    badge: "Skill",
    icon: Terminal,
  },
  {
    id: "sk-grill",
    command: "/grill-me",
    name: "Grill Me Design Review",
    description: "Relentless architectural interview to sharpen plans and unearth edge-cases.",
    type: "skill",
    badge: "Skill",
    icon: Sparkles,
  },
  {
    id: "sk-agent",
    command: "/agent-creator",
    name: "Subagent Creator",
    description: "Scaffolds specialized subagent personas with bounded system prompts and tool access.",
    type: "skill",
    badge: "Skill",
    icon: Bot,
  },
]

interface SlashCommandPaletteProps {
  query: string
  isOpen: boolean
  onSelect: (command: string) => void
  onClose: () => void
  selectedIndex: number
  setSelectedIndex: (idx: number) => void
}

export function SlashCommandPalette({
  query,
  isOpen,
  onSelect,
  onClose,
  selectedIndex,
  setSelectedIndex,
}: SlashCommandPaletteProps) {
  // Extract search term after the slash
  const searchTerm = query.startsWith("/") ? query.slice(1).toLowerCase().trim() : query.toLowerCase().trim()

  // Filter base commands + search dynamic skills from mock if searching
  const filteredItems = React.useMemo(() => {
    if (!searchTerm) {
      return BASE_COMMANDS
    }

    // Filter base commands first
    const matchedBase = BASE_COMMANDS.filter(
      (c) =>
        c.command.toLowerCase().includes(searchTerm) ||
        c.name.toLowerCase().includes(searchTerm) ||
        c.description.toLowerCase().includes(searchTerm)
    )

    // Match additional skills from the 2,558 AI_SKILLS dataset
    const matchedFromRepo: SlashCommandItem[] = AI_SKILLS.filter(
      (s) =>
        s.slug.toLowerCase().includes(searchTerm) ||
        s.name.toLowerCase().includes(searchTerm) ||
        s.description.toLowerCase().includes(searchTerm)
    )
      .slice(0, 15)
      .map((s) => ({
        id: `repo-${s.slug}`,
        command: `/${s.slug.replace(/^skill-/, "")}`,
        name: s.name,
        description: s.description,
        type: "skill" as const,
        badge: "Skill",
        icon: Terminal,
      }))

    // Combine and deduplicate
    const combined = [...matchedBase]
    for (const item of matchedFromRepo) {
      if (!combined.some((c) => c.command === item.command)) {
        combined.push(item)
      }
    }

    return combined.slice(0, 20)
  }, [searchTerm])

  // Keep selectedIndex within bounds
  React.useEffect(() => {
    if (selectedIndex >= filteredItems.length) {
      setSelectedIndex(0)
    }
  }, [filteredItems.length, selectedIndex, setSelectedIndex])

  if (!isOpen || filteredItems.length === 0) return null

  return (
    <div className="absolute bottom-full left-0 mb-2 w-full max-w-xl bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 backdrop-blur-md">
      {/* Header bar */}
      <div className="px-3 py-2 border-b border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--muted)] bg-[var(--background)]/80">
        <div className="flex items-center gap-1.5 font-medium text-[var(--foreground)]">
          <Terminal className="w-3.5 h-3.5" />
          <span>Skills & Slash Commands ({filteredItems.length})</span>
        </div>
        <div className="flex items-center gap-2">
          <span><kbd className="px-1 py-0.5 rounded bg-[var(--surface-hover)] border border-[var(--border)]">↑↓</kbd> navigate</span>
          <span><kbd className="px-1 py-0.5 rounded bg-[var(--surface-hover)] border border-[var(--border)]">Enter</kbd> select</span>
          <span><kbd className="px-1 py-0.5 rounded bg-[var(--surface-hover)] border border-[var(--border)]">Esc</kbd> dismiss</span>
        </div>
      </div>

      {/* Commands List */}
      <div className="max-h-72 overflow-y-auto p-1.5 space-y-1">
        {filteredItems.map((item, index) => {
          const isSelected = index === selectedIndex
          const Icon = item.icon

          return (
            <button
              key={item.id}
              type="button"
              onMouseEnter={() => setSelectedIndex(index)}
              onClick={() => onSelect(item.command)}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-start justify-between gap-3 transition-colors cursor-pointer ${
                isSelected
                  ? "bg-[var(--surface-hover)] border border-[var(--border)]"
                  : "hover:bg-[var(--surface-hover)]/60 border border-transparent"
              }`}
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <div className={`p-1.5 rounded-md mt-0.5 shrink-0 ${
                  item.type === "workflow" 
                    ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" 
                    : item.badge === "Security"
                    ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                    : "bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)]"
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-[var(--foreground)]">
                      {item.command}
                    </span>
                    <span className="text-xs text-[var(--foreground)] font-medium truncate">
                      {item.name}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--muted)] truncate mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 mt-0.5">
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${
                  item.type === "workflow"
                    ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                    : "bg-[var(--background)] text-[var(--muted)] border border-[var(--border)]"
                }`}>
                  {item.badge}
                </span>
                {isSelected && (
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--foreground)] animate-in fade-in" />
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

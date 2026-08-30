"use client"

import * as React from "react"
import { Copy, Check, Download, X, Terminal, FileCode2, Layers, Cpu } from "lucide-react"

interface IdeConfigExportModalProps {
  isOpen: boolean
  onClose: () => void
  initialStack?: string
}

export function IdeConfigExportModal({
  isOpen,
  onClose,
  initialStack = "nextjs-tailwind",
}: IdeConfigExportModalProps) {
  const [selectedEditor, setSelectedEditor] = React.useState<"cursor" | "continue" | "mcp" | "windsurf">("cursor")
  const [selectedStack, setSelectedStack] = React.useState<string>(initialStack)
  const [copied, setCopied] = React.useState(false)

  if (!isOpen) return null

  // Generate configurations dynamically based on chosen editor and stack
  const getConfigurationContent = () => {
    switch (selectedEditor) {
      case "cursor":
        return `# .cursorrules — Awesome AI Tools Industrial Configuration
# Architecture Standard: Next.js 16 + TypeScript + Tailwind CSS v4

[Core Guidelines]
1. Zero-Emoji Rule: NEVER use Unicode emojis in UI/code. Always use 'lucide-react' vector icons.
2. Monochrome System: Adhere to strict Zinc-950/900 palette with 1px hairline borders. Avoid rainbow gradients.
3. Design System: Use 'tracking-tight' on headings, JetBrains Mono ('font-mono') for commands, and rounded-lg for buttons.
4. Concurrency & Safety: Validate external inputs with Zod schemas. Prevent SSRF, IDOR, and asynchronous race conditions.

[Available Workflows]
- /review: 2-stage review (Stage 1: AgentShield AST security audit, Stage 2: Code Reviewer logic invariants).
- /tdd: Strict Red-Green-Refactor cycle. Write failing unit tests first.
- /compact: Summarize history, prune low-entropy tokens, and persist rules to instincts.md.
- /council: Deliberate complex architectural trade-offs across Architect, Security, and SRE personas.

[Continuous Learning]
Read 'instincts.md' on every turn. Persist new learned patterns via:
$ npx awesome-ai-tools learn "<rule>"
`
      case "continue":
        return JSON.stringify(
          {
            models: [
              {
                title: "DeepSeek V3 (Local Ollama)",
                provider: "ollama",
                model: "deepseek-v3:latest",
              },
              {
                title: "DeepSeek R1 Reasoning",
                provider: "ollama",
                model: "deepseek-r1:14b",
              },
            ],
            tabAutocompleteModel: {
              title: "StarCoder2 Autocomplete",
              provider: "ollama",
              model: "starcoder2:3b",
            },
            customCommands: [
              {
                name: "review",
                prompt: "Run 2-stage security and code correctness review on the selected diff.",
                description: "AgentShield + Code Reviewer",
              },
              {
                name: "tdd",
                prompt: "Follow strict TDD cycle: write failing unit tests first, then minimal passing implementation.",
                description: "Autonomous TDD Cycle",
              },
              {
                name: "compact",
                prompt: "Summarize conversation milestones and extract durable rules to instincts.md.",
                description: "Context Compaction & Memory GC",
              },
            ],
          },
          null,
          2
        )
      case "mcp":
        return JSON.stringify(
          {
            mcpServers: {
              "awesome-ai-tools": {
                command: "npx",
                args: ["awesome-ai-tools", "scan"],
                env: {
                  NODE_ENV: "production",
                },
              },
              filesystem: {
                command: "npx",
                args: ["-y", "@modelcontextprotocol/server-filesystem", process.cwd() || "."],
              },
            },
          },
          null,
          2
        )
      case "windsurf":
        return `# .windsurfrules — Awesome AI Tools Rules
# Engineering Ruleset for Autonomous Cascade Agents

- Rule 1 (Code Standards): Strict TypeScript strict mode. No 'any' types without explicit rationale.
- Rule 2 (UI Integrity): Zinc monochrome palette, hairline borders, no emojis in user-facing JSX.
- Rule 3 (Security Guardrails): All external URLs must pass SSRF validation. Never expose raw API keys.
- Rule 4 (Workflows): Support /review, /tdd, /compact, and /council composite triggers.
- Rule 5 (Memory Sync): Store project-specific preferences in 'instincts.md'.
`
    }
  }

  const configText = getConfigurationContent()

  const getFileName = () => {
    switch (selectedEditor) {
      case "cursor":
        return ".cursorrules"
      case "continue":
        return "config.json"
      case "mcp":
        return "claude_desktop_config.json"
      case "windsurf":
        return ".windsurfrules"
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(configText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([configText], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = getFileName()
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150 font-sans">
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 border-b border-[var(--border)] bg-[var(--background)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)]">
              <FileCode2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--foreground)] tracking-tight">
                Export IDE Agent Configuration
              </h3>
              <p className="text-[11px] text-[var(--muted)]">
                1-Click presets for Cursor, VS Code Continue, Claude Desktop, and Windsurf
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Editor Selector Tabs */}
        <div className="p-3 border-b border-[var(--border)] bg-[var(--surface)] flex items-center gap-2">
          {[
            { id: "cursor" as const, name: "Cursor (.cursorrules)" },
            { id: "continue" as const, name: "VS Code (Continue.dev)" },
            { id: "mcp" as const, name: "Claude Desktop (MCP)" },
            { id: "windsurf" as const, name: "Windsurf (.windsurfrules)" },
          ].map((e) => {
            const isSelected = selectedEditor === e.id
            return (
              <button
                key={e.id}
                onClick={() => setSelectedEditor(e.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[var(--foreground)] text-[var(--background)] shadow-xs"
                    : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
                }`}
              >
                {e.name}
              </button>
            )
          })}
        </div>

        {/* Code Preview Area */}
        <div className="p-4 bg-[var(--background)]">
          <div className="flex items-center justify-between mb-2 text-[11px] font-mono text-[var(--muted)]">
            <span>Target file: <strong className="text-[var(--foreground)]">{getFileName()}</strong></span>
            <span>UTF-8 Plain Text</span>
          </div>

          <div className="relative rounded-xl border border-[var(--border)] bg-zinc-950 p-4 font-mono text-xs text-zinc-100 max-h-72 overflow-y-auto custom-scrollbar leading-relaxed">
            <pre className="whitespace-pre-wrap">{configText}</pre>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[var(--border)] bg-[var(--surface)] flex items-center justify-between">
          <p className="text-[11px] text-[var(--muted)] font-mono">
            Place this file in your project root or IDE config folder.
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--surface-hover)] text-xs font-mono font-medium text-[var(--foreground)] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy File"}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download {getFileName()}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "../ui/Button"
import { Copy, Download, Check, Terminal } from "lucide-react"
import { useTranslations } from "next-intl"

interface ExportSkillProps {
  slug: string
  content: string
  description?: string
}

type Editor = "cursor-mdc" | "claude-cmd" | "continue" | "copilot-prompt" | "agent-skill" | "windsurf" | "cline" | "claude" | "cursor-legacy"

interface EditorOption {
  id: Editor
  name: string
  filename: string
  triggerHint: string
  displayPath: (slug: string) => string
  formatContent: (slug: string, content: string, description?: string) => string
}

function toCommandName(slug: string): string {
  return slug.replace(/^skill-/, "").replace(/[^a-zA-Z0-9_-]/g, "-").toLowerCase()
}

const EDITORS: EditorOption[] = [
  {
    id: "cursor-mdc",
    name: "Cursor IDE (@rule)",
    filename: ".mdc",
    triggerHint: "Type @rule-name in Cursor Chat",
    displayPath: (slug) => `.cursor/rules/${toCommandName(slug)}.mdc`,
    formatContent: (slug, content, description) => `---
description: ${description || "AI Agent Rule & Guideline"}
globs: *
alwaysApply: true
---

# ${slug}

${content}`
  },
  {
    id: "claude-cmd",
    name: "Claude Code (/command)",
    filename: ".md",
    triggerHint: "Type /command-name in Claude CLI",
    displayPath: (slug) => `.claude/commands/${toCommandName(slug)}.md`,
    formatContent: (slug, content, description) => `# /${toCommandName(slug)}

${description || "AI Agent Workflow Rule"}

## Instructions for AI Agent:
When this command is triggered:
1. Follow the guidelines and patterns below strictly.
2. Maintain high verification standards without hallucinating APIs.

---

${content}`
  },
  {
    id: "continue",
    name: "Continue.dev (/command)",
    filename: ".prompt",
    triggerHint: "Type /command-name in Continue sidebar",
    displayPath: (slug) => `.continue/prompts/${toCommandName(slug)}.prompt`,
    formatContent: (slug, content, description) => `temperature: 0.2
description: ${description || "AI Agent Skill"}
---
# ${slug} Directive
{{{ input }}}

---
Guidelines:
${content}`
  },
  {
    id: "copilot-prompt",
    name: "GitHub Copilot (/prompt)",
    filename: ".prompt.md",
    triggerHint: "Type /prompt-name in Copilot Chat",
    displayPath: (slug) => `.github/prompts/${toCommandName(slug)}.prompt.md`,
    formatContent: (slug, content, description) => `---
name: ${toCommandName(slug)}
description: ${description || "AI Agent Skill"}
---

${content}`
  },
  {
    id: "agent-skill",
    name: "Antigravity / Codex (SKILL.md)",
    filename: "SKILL.md",
    triggerHint: "Auto-loaded by Agentic Engine",
    displayPath: (slug) => `.agents/skills/${slug}/SKILL.md`,
    formatContent: (slug, content, description) => `---
name: ${slug}
description: ${description || "AI Agent Skill"}
---

${content}`
  },
  {
    id: "windsurf",
    name: "Windsurf Cascade",
    filename: ".md",
    triggerHint: "Auto-read by Cascade Agent",
    displayPath: (slug) => `.windsurf/workflows/${toCommandName(slug)}.md`,
    formatContent: (_, content) => content
  },
  {
    id: "cline",
    name: "Cline / Roo Code",
    filename: ".clinerules",
    triggerHint: "Directives in .clinerules",
    displayPath: () => ".clinerules",
    formatContent: (_, content) => content
  },
  {
    id: "claude",
    name: "CLAUDE.md (Root)",
    filename: "CLAUDE.md",
    triggerHint: "Read by Claude Code on init",
    displayPath: () => "CLAUDE.md",
    formatContent: (slug, content) => `\n## Project Skill: ${slug}\n${content}\n`
  },
  {
    id: "cursor-legacy",
    name: "Legacy .cursorrules",
    filename: ".cursorrules",
    triggerHint: "Root level legacy rule",
    displayPath: () => ".cursorrules",
    formatContent: (_, content) => content
  }
]

export function ExportSkill({ slug, content, description }: ExportSkillProps) {
  const t = useTranslations("Skills")
  const [selectedEditor, setSelectedEditor] = useState<Editor>("cursor-mdc")
  const [isCopied, setIsCopied] = useState(false)

  const activeEditor = EDITORS.find(e => e.id === selectedEditor) || EDITORS[0]
  const formattedContent = activeEditor.formatContent(slug, content, description)
  const displayPath = activeEditor.displayPath(slug)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedContent)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const handleDownload = () => {
    const downloadFilename = activeEditor.id === "cursor-mdc" 
      ? `${slug}.mdc` 
      : activeEditor.filename

    const blob = new Blob([formattedContent], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = downloadFilename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
      {/* Editor Selection Tabs */}
      <div className="flex overflow-x-auto border-b border-[var(--border)] bg-[var(--background)]/50 no-scrollbar">
        {EDITORS.map((editor) => (
          <button
            key={editor.id}
            onClick={() => setSelectedEditor(editor.id)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
              selectedEditor === editor.id
                ? "border-[var(--primary)] text-[var(--foreground)] bg-[var(--primary)]/5"
                : "border-transparent text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/5"
            }`}
          >
            {editor.name}
          </button>
        ))}
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-[var(--surface)] border-b border-[var(--border)]/50 flex-wrap gap-2">
        <div className="flex items-center gap-3 text-xs font-mono text-[var(--muted)] flex-wrap">
          <div>
            {t("targetFile")} <span className="ml-1.5 px-2 py-0.5 bg-[var(--background)] rounded text-[var(--foreground)] font-semibold border border-[var(--border)]">
              {displayPath}
            </span>
          </div>
          {activeEditor.triggerHint && (
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--foreground)] font-medium">
              <Terminal className="w-3 h-3 text-[var(--muted)]" />
              <span>{activeEditor.triggerHint}</span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy} className="h-8">
            {isCopied ? <Check className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
            {isCopied ? t("copied") : t("copyRule")}
          </Button>
          <Button size="sm" onClick={handleDownload} className="h-8 bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--primary)]/90">
            <Download className="w-4 h-4 mr-2" />
            {t("downloadFile")}
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 relative max-h-[500px] overflow-y-auto bg-[#0d1117] text-gray-200">
        <pre className="text-sm font-mono whitespace-pre-wrap leading-relaxed">
          {formattedContent}
        </pre>
      </div>
    </div>
  )
}

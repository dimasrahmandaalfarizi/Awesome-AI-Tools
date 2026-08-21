"use client"

import { useState } from "react"
import { Button } from "../ui/Button"
import { Copy, Download, Check } from "lucide-react"
import { useTranslations } from "next-intl"

interface ExportSkillProps {
  slug: string
  content: string
  description?: string
}

type Editor = "claude-cmd" | "agent-skill" | "cursor-mdc" | "claude" | "windsurf" | "cline" | "copilot" | "cursor-legacy"

interface EditorOption {
  id: Editor
  name: string
  filename: string
  displayPath: (slug: string) => string
  formatContent: (slug: string, content: string, description?: string) => string
}

function toCommandName(slug: string): string {
  return slug.replace(/^skill-/, "").replace(/[^a-zA-Z0-9_-]/g, "-").toLowerCase()
}

const EDITORS: EditorOption[] = [
  {
    id: "claude-cmd",
    name: "Claude Slash Command (/...)",
    filename: ".md",
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
    id: "agent-skill",
    name: "Universal Agent (Codex/Antigravity)",
    filename: "SKILL.md",
    displayPath: (slug) => `.agents/skills/${slug}/SKILL.md`,
    formatContent: (slug, content, description) => `---
name: ${slug}
description: ${description || "AI Agent Skill"}
---

${content}`
  },
  {
    id: "cursor-mdc",
    name: "Cursor (.mdc)",
    filename: ".mdc",
    displayPath: (slug) => `.cursor/rules/${slug}.mdc`,
    formatContent: (slug, content, description) => `---
description: ${description || "AI Agent Rule & Guideline"}
globs: *
alwaysApply: true
---

${content}`
  },
  {
    id: "claude",
    name: "Claude Code (CLAUDE.md)",
    filename: "CLAUDE.md",
    displayPath: () => "CLAUDE.md",
    formatContent: (slug, content) => `\n## Project Skill: ${slug}\n${content}\n`
  },
  {
    id: "windsurf",
    name: "Windsurf",
    filename: ".windsurfrules",
    displayPath: () => ".windsurfrules",
    formatContent: (_, content) => content
  },
  {
    id: "cline",
    name: "Cline / Roo Code",
    filename: ".clinerules",
    displayPath: () => ".clinerules",
    formatContent: (_, content) => content
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    filename: "copilot-instructions.md",
    displayPath: () => ".github/copilot-instructions.md",
    formatContent: (_, content) => content
  },
  {
    id: "cursor-legacy",
    name: "Cursor Legacy (.cursorrules)",
    filename: ".cursorrules",
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
        <div className="flex items-center text-xs font-mono text-[var(--muted)]">
          {t("targetFile")} <span className="ml-2 px-2.5 py-1 bg-[var(--background)] rounded text-[var(--primary)] font-semibold border border-[var(--border)]">
            {displayPath}
          </span>
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

"use client"

import { useState } from "react"
import { Button } from "../ui/Button"
import { Copy, Download, Check } from "lucide-react"

interface ExportSkillProps {
  slug: string
  content: string
}

type Editor = "cursor" | "windsurf" | "cline" | "claude" | "copilot"

const EDITORS: { id: Editor; name: string; filename: string }[] = [
  { id: "cursor", name: "Cursor", filename: ".cursorrules" },
  { id: "windsurf", name: "Windsurf", filename: ".windsurfrules" },
  { id: "cline", name: "Cline", filename: ".clinerules" },
  { id: "claude", name: "Claude Code", filename: "system-prompt.md" },
  { id: "copilot", name: "GitHub Copilot", filename: "instructions.md" },
]

export function ExportSkill({ slug, content }: ExportSkillProps) {
  const [selectedEditor, setSelectedEditor] = useState<Editor>("cursor")
  const [isCopied, setIsCopied] = useState(false)

  const activeEditor = EDITORS.find(e => e.id === selectedEditor)!

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const handleDownload = () => {
    const filename = activeEditor.id === "claude" || activeEditor.id === "copilot" 
      ? `${slug}-${activeEditor.filename}` 
      : activeEditor.filename

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
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
                ? "border-[var(--primary)] text-[var(--foreground)]"
                : "border-transparent text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/5"
            }`}
          >
            {editor.name}
          </button>
        ))}
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-[var(--surface)] border-b border-[var(--border)]/50">
        <div className="flex items-center text-xs font-mono text-[var(--muted)]">
          Filename: <span className="ml-2 px-2 py-1 bg-[var(--background)] rounded text-[var(--foreground)] border border-[var(--border)]">
            {activeEditor.id === "claude" || activeEditor.id === "copilot" ? `${slug}-${activeEditor.filename}` : activeEditor.filename}
          </span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy} className="h-8">
            {isCopied ? <Check className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
            {isCopied ? "Copied!" : "Copy"}
          </Button>
          <Button size="sm" onClick={handleDownload} className="h-8 bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--primary)]/90">
            <Download className="w-4 h-4 mr-2" />
            Download File
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 relative max-h-[500px] overflow-y-auto">
        <pre className="text-sm font-mono whitespace-pre-wrap text-[var(--foreground)] leading-relaxed">
          {content}
        </pre>
      </div>
    </div>
  )
}

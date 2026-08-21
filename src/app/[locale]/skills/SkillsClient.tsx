"use client"

import { useState, useMemo } from "react"
import { Link } from "@/i18n/routing"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { useTranslations } from "next-intl"
import { Terminal, Download, Copy, Check, Sparkles } from "lucide-react"
import JSZip from "jszip"
import type { AiSkill } from "@/types"

interface SkillsClientProps {
  skills: AiSkill[]
}

function toCommandName(slug: string): string {
  return slug.replace(/^skill-/, "").replace(/[^a-zA-Z0-9_-]/g, "-").toLowerCase()
}

export function SkillsClient({ skills }: SkillsClientProps) {
  const t = useTranslations("Skills")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFramework, setSelectedFramework] = useState<string>("All")
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [cliCopied, setCliCopied] = useState(false)

  const allFrameworks = useMemo(() => {
    const frameworks = new Set<string>()
    skills.forEach(s => s.frameworks.forEach(fw => frameworks.add(fw)))
    return ["All", ...Array.from(frameworks).sort()]
  }, [skills])

  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const matchesSearch = 
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        toCommandName(skill.slug).includes(searchQuery.toLowerCase().replace(/^\//, ""))
      
      const matchesFramework = 
        selectedFramework === "All" || 
        skill.frameworks.includes(selectedFramework)

      return matchesSearch && matchesFramework
    })
  }, [skills, searchQuery, selectedFramework])

  const handleCopyCli = async () => {
    try {
      await navigator.clipboard.writeText("npx awesome-ai-tools init")
      setCliCopied(true)
      setTimeout(() => setCliCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy CLI command:", err)
    }
  }

  const handleCopySlashCommand = async (e: React.MouseEvent, cmd: string) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(`/${cmd}`)
      setCopiedCmd(cmd)
      setTimeout(() => setCopiedCmd(null), 2000)
    } catch (err) {
      console.error("Failed to copy slash command:", err)
    }
  }

  const handleDownloadZip = async () => {
    try {
      setIsDownloading(true)
      const zip = new JSZip()

      // 1. .claude/commands folder
      const claudeCmdFolder = zip.folder(".claude")?.folder("commands")
      skills.forEach((skill) => {
        const cmdName = toCommandName(skill.slug)
        const fileContent = `# /${cmdName} — ${skill.name}

${skill.description}

## Instructions for AI Agent:
When this command is triggered:
1. Apply the **${skill.name}** pattern and guidelines immediately.
2. Ensure all changes adhere strictly to the rules below without hallucination.

---

${skill.content}
`
        claudeCmdFolder?.file(`${cmdName}.md`, fileContent)
      })

      // 2. .agents/skills folder (Universal Antigravity / Codex)
      const agentsFolder = zip.folder(".agents")?.folder("skills")
      skills.forEach((skill) => {
        const skillFolder = agentsFolder?.folder(skill.slug)
        const fileContent = `---
name: ${skill.name}
description: ${skill.description}
frameworks: [${skill.frameworks.join(", ")}]
---

${skill.content}
`
        skillFolder?.file("SKILL.md", fileContent)
      })

      // 3. .cursor/rules folder (Cursor IDE @rule)
      const cursorRulesFolder = zip.folder(".cursor")?.folder("rules")
      skills.forEach((skill) => {
        const cmdName = toCommandName(skill.slug)
        const fileContent = `---
description: ${skill.description}
globs: *
alwaysApply: false
---

# ${skill.name}

${skill.content}
`
        cursorRulesFolder?.file(`${cmdName}.mdc`, fileContent)
      })

      // 4. .continue/prompts folder (Continue.dev /command)
      const continueFolder = zip.folder(".continue")?.folder("prompts")
      skills.forEach((skill) => {
        const cmdName = toCommandName(skill.slug)
        const fileContent = `temperature: 0.2
description: ${skill.description}
---
# ${skill.name} Directive
{{{ input }}}

---
Guidelines:
${skill.content}
`
        continueFolder?.file(`${cmdName}.prompt`, fileContent)
      })

      // 5. .github/prompts folder (GitHub Copilot /prompt)
      const copilotFolder = zip.folder(".github")?.folder("prompts")
      skills.forEach((skill) => {
        const cmdName = toCommandName(skill.slug)
        const fileContent = `---
name: ${cmdName}
description: ${skill.description}
---

${skill.content}
`
        copilotFolder?.file(`${cmdName}.prompt.md`, fileContent)
      })

      // 6. .windsurf/workflows folder (Windsurf Cascade)
      const windsurfFolder = zip.folder(".windsurf")?.folder("workflows")
      skills.forEach((skill) => {
        const cmdName = toCommandName(skill.slug)
        const fileContent = `# Windsurf Workflow: ${skill.name}

${skill.description}

## Rules:
${skill.content}
`
        windsurfFolder?.file(`${cmdName}.md`, fileContent)
      })

      // 7. Master AGENTS.md Index
      const agentsMdContent = `# Universal AI Agent Guidelines & Skills Suite

This repository is equipped with **Awesome AI Tools & ECC Skills Suite** (${skills.length} active skills) supporting both **CLI Agents** (Claude Code, Codex) and **AI IDEs** (Cursor, Antigravity, Windsurf, Copilot, Continue).

## Triggering Skills in your AI Environment:
- **Claude Code CLI**: Type \`/<command>\` (e.g. \`/tdd-workflow\`, \`/plan-first\`, \`/security-scan\`)
- **Cursor IDE**: Mention \`@<command>\` or rules apply based on context
- **Continue.dev**: Type \`/<command>\` in the Continue sidebar
- **GitHub Copilot**: Type \`/<command>\` in Copilot Chat
- **Antigravity / Codex**: Automatically read from \`.agents/skills/\`

## Available Skills:
${skills.map(s => `- \`/${toCommandName(s.slug)}\` (\`@${toCommandName(s.slug)}\`): **${s.name}** — ${s.description}`).join("\n")}
`
      zip.file("AGENTS.md", agentsMdContent)

      const blob = await zip.generateAsync({ type: "blob" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `awesome-ai-skills-suite-all-ides-${skills.length}.zip`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error("Failed to generate ZIP:", err)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* ECC Flow Interactive Hero Banner */}
      <div className="p-6 md:p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--foreground)]">
              <Terminal className="w-3.5 h-3.5 text-[var(--primary)]" />
              <span>ECC Universal Flow: Install Once, Works Everywhere</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
              Access all {skills.length} Skills via <span className="font-mono text-[var(--primary)]">/slash-commands</span>
            </h2>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              Install the complete skill suite into your local workspace. Once added, you can instantly trigger any engineering mode directly in your AI coding terminal by typing <code className="font-mono px-1.5 py-0.5 rounded bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)]">/tdd-workflow</code>, <code className="font-mono px-1.5 py-0.5 rounded bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)]">/plan-first</code>, <code className="font-mono px-1.5 py-0.5 rounded bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)]">/security-scan</code>, and more.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 min-w-[240px]">
            <Button 
              onClick={handleDownloadZip}
              disabled={isDownloading}
              className="w-full bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 h-10 font-medium text-sm transition-all"
            >
              <Download className="w-4 h-4 mr-2" />
              {isDownloading ? "Bundling ZIP..." : `Download All (${skills.length} Skills .zip)`}
            </Button>
            <div className="text-[11px] text-center text-[var(--muted)] font-mono">
              Generates .claude/commands & .agents/skills
            </div>
          </div>
        </div>

        {/* 1-Line CLI Box */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)] font-mono text-xs">
          <div className="flex items-center gap-2 w-full overflow-x-auto no-scrollbar text-[var(--foreground)]">
            <span className="text-[var(--muted)] select-none">$</span>
            <span className="text-[var(--primary)] font-semibold">npx</span>
            <span>awesome-ai-tools init</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCopyCli}
            className="h-8 px-3 text-xs w-full sm:w-auto shrink-0"
          >
            {cliCopied ? <Check className="w-3.5 h-3.5 mr-1.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
            {cliCopied ? "Copied" : "Copy Command"}
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 bg-[var(--surface)] p-4 rounded-xl border border-[var(--border)]">
        <div className="w-full max-w-md">
          <Input 
            type="search" 
            placeholder={t("searchPlaceholder")} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 w-full">
          <span className="text-sm text-[var(--muted)] whitespace-nowrap sm:mt-1.5 font-medium">
            {t("filterByTool")}
          </span>
          <div className="flex flex-wrap gap-2">
            {allFrameworks.map(fw => (
              <button
                key={fw}
                onClick={() => setSelectedFramework(fw)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedFramework === fw 
                    ? "bg-[var(--foreground)] text-[var(--background)]" 
                    : "bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--foreground)]"
                }`}
              >
                {fw === "All" ? t("all") : fw}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredSkills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map(skill => {
            const cmdName = toCommandName(skill.slug)
            const isCmdCopied = copiedCmd === cmdName

            return (
              <Link 
                key={skill.id} 
                href={`/skills/${skill.slug}`}
                className="group relative flex flex-col p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--foreground)] transition-all hover:shadow-sm"
              >
                {/* Header & Command Trigger */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-bold text-base text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors leading-snug">
                    {skill.name}
                  </h3>
                  <button
                    onClick={(e) => handleCopySlashCommand(e, cmdName)}
                    title={`Copy /${cmdName}`}
                    className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-mono font-medium bg-[var(--background)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-colors shrink-0"
                  >
                    {isCmdCopied ? <Check className="w-3 h-3 text-green-500" /> : <Terminal className="w-3 h-3 text-[var(--primary)]" />}
                    <span>/{cmdName}</span>
                  </button>
                </div>

                <p className="text-[var(--muted)] text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">
                  {skill.description}
                </p>

                <div className="mt-auto pt-4 border-t border-[var(--border)]">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {skill.frameworks.slice(0, 3).map(fw => (
                      <Badge key={fw} variant="secondary" className="text-[11px] font-normal">{fw}</Badge>
                    ))}
                    {skill.frameworks.length > 3 && (
                      <Badge variant="outline" className="text-[11px] font-normal text-[var(--muted)]">
                        +{skill.frameworks.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                    <span>{t("byAuthor")} {skill.author || "ECC / Community"}</span>
                    <span className="font-mono text-[11px] text-[var(--primary)] group-hover:underline">View details →</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-[var(--border)] rounded-2xl bg-[var(--surface)]/30">
          <p className="text-[var(--muted)] text-lg">{t("noSkills")}</p>
          <button 
            onClick={() => {
              setSearchQuery("")
              setSelectedFramework("All")
            }}
            className="mt-4 text-[var(--primary)] hover:underline"
          >
            {t("clearFilters")}
          </button>
        </div>
      )}
    </div>
  )
}


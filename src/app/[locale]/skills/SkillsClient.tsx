"use client"

import { useState, useMemo, useEffect } from "react"
import { Link } from "@/i18n/routing"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { useTranslations, useLocale } from "next-intl"
import { Terminal, Download, Copy, Check, Search, Shield, Layers, Code2, Bot, Database, Zap, Cpu, CheckCircle2, ChevronLeft, ChevronRight, X, Sparkles } from "lucide-react"
import JSZip from "jszip"
import type { AiSkill } from "@/types"

interface SkillsClientProps {
  skills: AiSkill[]
}

function toCommandName(slug: string): string {
  return slug.replace(/^skill-/, "").replace(/[^a-zA-Z0-9_-]/g, "-").toLowerCase()
}

// 8 Professional Domain Clusters for 587 Skills
const DOMAIN_CLUSTERS = [
  { id: "all", labelEn: "All Skills", labelId: "Semua Skills", icon: Layers },
  { id: "cybersecurity", labelEn: "Cybersecurity & Audit", labelId: "Keamanan & Audit", icon: Shield },
  { id: "architecture", labelEn: "Architecture & Planning", labelId: "Arsitektur & Desain", icon: Cpu },
  { id: "testing", labelEn: "Testing & QA", labelId: "Pengujian & QA", icon: CheckCircle2 },
  { id: "frontend", labelEn: "Frontend & UI", labelId: "Frontend & Desain", icon: Code2 },
  { id: "ai-agents", labelEn: "AI & Multi-Agent", labelId: "AI & Agen Otonom", icon: Bot },
  { id: "database-cloud", labelEn: "Database & Cloud DevOps", labelId: "Database & Cloud", icon: Database },
  { id: "performance", labelEn: "Performance & SRE", labelId: "Performa & Sistem", icon: Zap }
]

function matchesCluster(skill: AiSkill, clusterId: string): boolean {
  if (clusterId === "all") return true
  const text = (skill.name + " " + skill.slug + " " + skill.description + " " + skill.frameworks.join(" ")).toLowerCase()

  switch (clusterId) {
    case "cybersecurity":
      return text.includes("cyber") || text.includes("security") || text.includes("mitre") || 
             text.includes("owasp") || text.includes("audit") || text.includes("vulnerability") || 
             text.includes("forensic") || text.includes("exploit") || text.includes("nist") || 
             text.includes("threat") || text.includes("hardening") || text.includes("smart-contract")
    case "architecture":
      return text.includes("architect") || text.includes("plan") || text.includes("spec") || 
             text.includes("refactor") || text.includes("clean-code") || text.includes("design") || 
             text.includes("adr") || text.includes("review") || text.includes("ddd")
    case "testing":
      return text.includes("test") || text.includes("tdd") || text.includes("qa") || 
             text.includes("playwright") || text.includes("fuzz") || text.includes("e2e")
    case "frontend":
      return text.includes("front") || text.includes("react") || text.includes("next") || 
             text.includes("tailwind") || text.includes("ui") || text.includes("css") || 
             text.includes("animat") || text.includes("figma") || text.includes("svelte")
    case "ai-agents":
      return text.includes("agent") || text.includes("prompt") || text.includes("llm") || 
             text.includes("memory") || text.includes("rag") || text.includes("eval") || 
             text.includes("langchain") || text.includes("crew")
    case "database-cloud":
      return text.includes("data") || text.includes("sql") || text.includes("postgres") || 
             text.includes("docker") || text.includes("kuber") || text.includes("aws") || 
             text.includes("azure") || text.includes("cloud") || text.includes("terraform")
    case "performance":
      return text.includes("perf") || text.includes("optimiz") || text.includes("trace") || 
             text.includes("sre") || text.includes("observ") || text.includes("monitor") || 
             text.includes("async") || text.includes("concurren")
    default:
      return true
  }
}

// Popular Quick Target Tools
const POPULAR_TOOLS = [
  "All",
  "Claude Code",
  "Cursor",
  "Antigravity",
  "TypeScript",
  "Python",
  "Next.js",
  "Cybersecurity",
  "DevOps"
]

const ITEMS_PER_PAGE = 24

export function SkillsClient({ skills }: SkillsClientProps) {
  const t = useTranslations("Skills")
  const locale = useLocale()
  const isId = locale === "id"

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCluster, setSelectedCluster] = useState("all")
  const [selectedToolTag, setSelectedToolTag] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [cliCopied, setCliCopied] = useState(false)

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCluster, selectedToolTag])

  // Dynamic cluster counts computation
  const clusterCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    DOMAIN_CLUSTERS.forEach(cluster => {
      counts[cluster.id] = cluster.id === "all" 
        ? skills.length 
        : skills.filter(s => matchesCluster(s, cluster.id)).length
    })
    return counts
  }, [skills])

  // Filter skills
  const filteredSkills = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return skills.filter(skill => {
      // 1. Cluster filter
      if (!matchesCluster(skill, selectedCluster)) return false

      // 2. Tool tag filter
      if (selectedToolTag !== "All") {
        const text = (skill.name + " " + skill.slug + " " + skill.description + " " + skill.frameworks.join(" ")).toLowerCase()
        if (!text.includes(selectedToolTag.toLowerCase())) return false
      }

      // 3. Search query
      if (q) {
        const cmd = toCommandName(skill.slug)
        const matchesName = skill.name.toLowerCase().includes(q)
        const matchesDesc = skill.description.toLowerCase().includes(q)
        const matchesCmd = cmd.includes(q.replace(/^\//, ""))
        const matchesFw = skill.frameworks.some(f => f.toLowerCase().includes(q))
        if (!matchesName && !matchesDesc && !matchesCmd && !matchesFw) return false
      }

      return true
    })
  }, [skills, searchQuery, selectedCluster, selectedToolTag])

  // Paginated skills
  const totalPages = Math.ceil(filteredSkills.length / ITEMS_PER_PAGE) || 1
  const paginatedSkills = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredSkills.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredSkills, currentPage])

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

      // 4. instincts.md (Continuous Learning)
      const instinctsContent = `# Project Instincts & Persistent Memory (Continuous Learning)
This file stores permanent codebase instincts and developer preferences.
AI Coding Agents MUST read and adhere to these rules.

## Codebase & Architecture Invariants
- Framework: Next.js (App Router, Server Components by default)
- Styling: Tailwind CSS with clean, flat monochrome aesthetics (Zero AI slop)
- Verification: Always run verification builds before completing tasks.

## Anti-Patterns
- Zero Raw Secrets: Always use .env files.
- Zero AI Slop: No rainbow gradient overlays, decorative emojis, or meaningless icons.
`
      zip.file("instincts.md", instinctsContent)

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
      <div className="p-6 md:p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--foreground)]">
              <Terminal className="w-3.5 h-3.5 text-[var(--primary)]" />
              <span>ECC Universal Flow: Install Once, Works Everywhere</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-heading text-[var(--foreground)]">
              {isId ? `Akses ${skills.length} Skills via` : `Access all ${skills.length} Skills via`} <span className="font-mono text-[var(--primary)]">/slash-commands</span>
            </h2>
            <p className="text-xs md:text-sm text-[var(--muted)] leading-relaxed">
              {isId 
                ? `Pasang seluruh skill AI ke workspace lokal Anda. Pemicu instan di terminal koding dengan mengetik /tdd-workflow, /security-audit, /plan-first, dan lainnya.`
                : `Install the complete skill suite into your local workspace. Once added, you can instantly trigger any engineering mode directly in your AI coding terminal by typing /tdd-workflow, /security-audit, /plan-first, and more.`}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 min-w-[240px]">
            <Button 
              onClick={handleDownloadZip}
              disabled={isDownloading}
              className="w-full bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 h-10 font-medium text-xs md:text-sm rounded-xl cursor-pointer transition-all"
            >
              <Download className="w-4 h-4 mr-2" />
              {isDownloading ? "Bundling ZIP..." : isId ? `Unduh Semua (${skills.length} Skills .zip)` : `Download All (${skills.length} Skills .zip)`}
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
            className="h-8 px-3 text-xs w-full sm:w-auto shrink-0 rounded-lg cursor-pointer"
          >
            {cliCopied ? <Check className="w-3.5 h-3.5 mr-1.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
            {cliCopied ? (isId ? "Tersalin" : "Copied") : (isId ? "Salin Perintah" : "Copy Command")}
          </Button>
        </div>
      </div>

      {/* 8 Domain Clusters Filter Tabs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-[var(--muted)] uppercase tracking-wider px-1">
          <span>{isId ? "Klaster Domain Kategori" : "Domain Clusters"}</span>
          <span className="font-mono text-[var(--primary)]">{filteredSkills.length} {isId ? "Skills Ditemukan" : "Skills Matched"}</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {DOMAIN_CLUSTERS.map((cluster) => {
            const Icon = cluster.icon
            const isSelected = selectedCluster === cluster.id
            const label = isId ? cluster.labelId : cluster.labelEn

            return (
              <button
                key={cluster.id}
                onClick={() => setSelectedCluster(cluster.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer shrink-0 border ${
                  isSelected
                    ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)] shadow-xs font-bold"
                    : "bg-[var(--surface)] text-[var(--muted)] border-[var(--border)] hover:text-[var(--foreground)] hover:border-[var(--muted)]"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                  isSelected 
                    ? "bg-[var(--background)] text-[var(--foreground)] font-semibold" 
                    : "bg-[var(--background)] text-[var(--muted)] border border-[var(--border)]"
                }`}>
                  {clusterCounts[cluster.id]?.toLocaleString() || 0}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Search Input and Secondary Tool Filter */}
      <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
          <Input 
            type="text" 
            placeholder={isId ? "Cari nama skill, /slash-command, atau aturan..." : "Search skill name, /slash-command, or rule..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-9 h-10 text-xs md:text-sm bg-[var(--background)] border-[var(--border)] rounded-xl w-full"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-[var(--muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Secondary Tool Tag Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto no-scrollbar">
          {POPULAR_TOOLS.map((tool) => (
            <button
              key={tool}
              onClick={() => setSelectedToolTag(tool)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors whitespace-nowrap cursor-pointer shrink-0 border ${
                selectedToolTag === tool
                  ? "bg-[var(--primary)]/15 text-[var(--primary)] border-[var(--primary)]/30 font-semibold"
                  : "bg-[var(--background)] text-[var(--muted)] border-[var(--border)] hover:text-[var(--foreground)]"
              }`}
            >
              {tool}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      {paginatedSkills.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedSkills.map((skill) => {
              const cmdName = toCommandName(skill.slug)
              const isCmdCopied = copiedCmd === cmdName

              return (
                <div 
                  key={skill.id}
                  className="group relative flex flex-col p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50 transition-all hover:shadow-xs justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    {/* Header & Command Trigger */}
                    <div className="flex items-start justify-between gap-2">
                      <Link href={`/skills/${skill.slug}`} className="hover:text-[var(--primary)] transition-colors">
                        <h3 className="font-bold text-sm text-[var(--foreground)] leading-snug tracking-tight">
                          {skill.name}
                        </h3>
                      </Link>
                      <button
                        onClick={(e) => handleCopySlashCommand(e, cmdName)}
                        title={`Copy /${cmdName}`}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-[var(--background)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--primary)] hover:border-[var(--primary)]/40 transition-colors shrink-0 cursor-pointer"
                      >
                        {isCmdCopied ? <Check className="w-3 h-3 text-green-500" /> : <Terminal className="w-3 h-3 text-[var(--primary)]" />}
                        <span>/{cmdName}</span>
                      </button>
                    </div>

                    <p className="text-[var(--muted)] text-xs line-clamp-3 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[var(--border)]/50 space-y-2.5">
                    <div className="flex flex-wrap gap-1">
                      {skill.frameworks.slice(0, 3).map((fw) => (
                        <span key={fw} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--background)] border border-[var(--border)] text-[var(--muted)]">
                          {fw}
                        </span>
                      ))}
                      {skill.frameworks.length > 3 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded text-[var(--muted)]">
                          +{skill.frameworks.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[var(--muted)] pt-1">
                      <span className="truncate max-w-[140px]">{skill.author || "ECC / Community"}</span>
                      <Link href={`/skills/${skill.slug}`} className="font-semibold text-[var(--primary)] hover:underline">
                        {isId ? "Lihat Detail →" : "View Rule →"}
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Clean Numbered Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[var(--border)]">
              <div className="text-xs text-[var(--muted)] font-mono">
                {isId ? "Menampilkan" : "Showing"} <span className="text-[var(--foreground)] font-bold">{(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredSkills.length)}</span> {isId ? "dari" : "of"} <span className="text-[var(--foreground)] font-bold">{filteredSkills.length}</span> Skills
              </div>

              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage(p => Math.max(1, p - 1))
                    window.scrollTo({ top: 350, behavior: "smooth" })
                  }}
                  className="h-8 px-2.5 text-xs rounded-lg cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                {/* Page Numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum = i + 1
                  if (totalPages > 5) {
                    if (currentPage > 3 && currentPage < totalPages - 2) {
                      pageNum = currentPage - 2 + i
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    }
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setCurrentPage(pageNum)
                        window.scrollTo({ top: 350, behavior: "smooth" })
                      }}
                      className={`w-8 h-8 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center justify-center ${
                        currentPage === pageNum
                          ? "bg-[var(--foreground)] text-[var(--background)] font-bold shadow-xs"
                          : "bg-[var(--surface)] text-[var(--muted)] border border-[var(--border)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage(p => Math.min(totalPages, p + 1))
                    window.scrollTo({ top: 350, behavior: "smooth" })
                  }}
                  className="h-8 px-2.5 text-xs rounded-lg cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-[var(--border)] rounded-2xl bg-[var(--surface)]/30 space-y-3">
          <Layers className="w-8 h-8 mx-auto text-[var(--muted)] opacity-50" />
          <p className="text-[var(--muted)] text-sm">{isId ? "Tidak ada skill yang cocok dengan filter yang dipilih." : "No skills found matching your filters."}</p>
          <Button 
            variant="link"
            size="sm"
            onClick={() => {
              setSearchQuery("")
              setSelectedCluster("all")
              setSelectedToolTag("All")
            }}
            className="text-xs text-[var(--primary)]"
          >
            {isId ? "Reset Filter" : "Clear Filters"}
          </Button>
        </div>
      )}
    </div>
  )
}

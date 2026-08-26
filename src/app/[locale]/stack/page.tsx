"use client"

import * as React from "react"
import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"
import { useBookmarks } from "@/components/providers/BookmarkProvider"
import { TOOLS, CATEGORIES, AI_SKILLS, AI_AGENTS } from "@/data/mock"
import { getLocalizedCategory, getLocalizedTool } from "@/lib/localizeData"
import { useLocale, useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { ToolLogo } from "@/components/ui/ToolLogo"
import { BookmarkButton } from "@/components/ui/BookmarkButton"
import { Copy, Download, Trash2, Layers, ExternalLink, ArrowRight, Check, Code, FileText, Settings, Terminal, Sparkles, Bot, Shield, Cpu } from "lucide-react"
import JSZip from "jszip"

export default function StackPage() {
  const locale = useLocale()
  const isId = locale === "id"
  const tNav = useTranslations("Navbar")
  const { bookmarks, clearBookmarks, setBookmarkList, count } = useBookmarks()

  const [activeTab, setActiveTab] = React.useState<"cursor" | "claude" | "skills" | "mcp" | "markdown">("cursor")
  const [copied, setCopied] = React.useState(false)
  const [isDownloading, setIsDownloading] = React.useState(false)

  const savedTools = TOOLS.filter(t => bookmarks.includes(t.id)).map(t => getLocalizedTool(t, locale))

  // Group tools by categories
  const categoriesCovered = Array.from(new Set(savedTools.map(t => t.categoryId)))
  const openSourceCount = savedTools.filter(t => t.isOpenSource).length

  // Smart Matching for Skills and Subagents based on active stack tools
  const recommendedSkills = React.useMemo(() => {
    if (savedTools.length === 0) return AI_SKILLS.slice(0, 4)
    const toolKeywords = savedTools.flatMap(t => [t.name.toLowerCase(), ...t.tags.map(tag => tag.toLowerCase())])
    
    const matched = AI_SKILLS.filter(s => 
      toolKeywords.some(kw => 
        s.name.toLowerCase().includes(kw) || 
        s.slug.toLowerCase().includes(kw) ||
        s.frameworks.some(f => f.toLowerCase().includes(kw))
      )
    )

    return matched.length > 0 ? matched.slice(0, 6) : AI_SKILLS.slice(0, 4)
  }, [savedTools])

  const recommendedAgents = React.useMemo(() => {
    if (savedTools.length === 0) return AI_AGENTS.slice(0, 4)
    const toolKeywords = savedTools.flatMap(t => [t.name.toLowerCase(), ...t.tags.map(tag => tag.toLowerCase())])
    
    const matched = AI_AGENTS.filter(a => 
      toolKeywords.some(kw => 
        a.name.toLowerCase().includes(kw) || 
        a.role.toLowerCase().includes(kw) ||
        a.tags.some(t => t.toLowerCase().includes(kw))
      )
    )

    return matched.length > 0 ? matched.slice(0, 6) : AI_AGENTS.slice(0, 4)
  }, [savedTools])

  
  // 1-Click Project Presets
  const STACK_PRESETS = [
    {
      id: "nextjs-saas",
      title: isId ? "Fullstack Next.js SaaS" : "Fullstack Next.js SaaS",
      desc: isId ? "Next.js App Router, Cursor, v0 UI, Postgres MCP, GitHub & Langfuse" : "Next.js, Cursor, v0 UI, Postgres MCP, GitHub & Langfuse",
      icon: Layers,
      slugs: ["cursor", "deepseek-v3", "v0-vercel", "postgresql-mcp", "github-mcp", "langfuse-observability"]
    },
    {
      id: "autonomous-agent",
      title: isId ? "Autonomous AI Agent" : "Autonomous AI Agent",
      desc: isId ? "Cline / Roo Code, Claude 3.5 Sonnet, LangGraph, Qdrant & Memory MCP" : "Cline / Roo Code, Claude 3.5 Sonnet, LangGraph, Qdrant & Memory MCP",
      icon: Bot,
      slugs: ["cline-agent", "claude-3-5-sonnet", "langgraph", "qdrant-vector-db", "memory-mcp", "sentry-mcp"]
    },
    {
      id: "local-offline",
      title: isId ? "100% Offline / Local AI" : "100% Offline / Local AI",
      desc: isId ? "Ollama, LM Studio, vLLM, Qwen 2.5 Coder, SQLite MCP & ChromaDB" : "Ollama, LM Studio, vLLM, Qwen 2.5 Coder, SQLite MCP & ChromaDB",
      icon: Cpu,
      slugs: ["ollama", "lm-studio", "vllm-inference", "qwen-2-5-coder-32b", "sqlite-mcp", "chromadb"]
    },
    {
      id: "mobile-crossplatform",
      title: isId ? "Mobile & Fast Backend" : "Mobile & Fast Backend",
      desc: isId ? "Windsurf, Supermaven, Gemini Flash, Fetch MCP & Pgvector" : "Windsurf, Supermaven, Gemini Flash, Fetch MCP & Pgvector",
      icon: ExternalLink,
      slugs: ["windsurf-editor", "supermaven", "gemini-1-5-flash", "fetch-mcp", "pgvector"]
    }
  ];

  const handleApplyPreset = (presetSlugs: string[]) => {
    const matchedToolIds = TOOLS.filter(t => presetSlugs.includes(t.slug)).map(t => t.id);
    if (matchedToolIds.length > 0) {
      setBookmarkList(matchedToolIds);
    }
  };

  // Generate .cursorrules content
  const generateCursorRules = () => {
    if (savedTools.length === 0) return "# Simpan alat AI ke Stack Anda untuk membuat .cursorrules otomatis"
    
    return `# .cursorrules - Custom AI Developer Stack
# Generated by Awesome AI Tools (https://awesome-ai-tools.local)
# Date: ${new Date().toISOString().split("T")[0]}

# 1. ACTIVE AI TECH STACK
${savedTools.map(t => `- ${t.name}: ${t.description} (Category: ${CATEGORIES.find(c => c.id === t.categoryId)?.name || "General"})`).join("\n")}

# 2. GENERAL CODING STANDARDS & WORKFLOW
- Always write clean, maintainable, type-safe code with TypeScript and modern best practices.
- Prefer modular architecture, single-responsibility functions, and explicit error handling.
- Verify that imports and library versions match the active project ecosystem.

# 3. AI AGENT & PROMPT GUIDELINES
- When scaffolding components or backend logic, align with tools: ${savedTools.map(t => t.name).join(", ")}.
- Keep answers concise, actionable, and free from redundant commentary.
- Provide full, copy-paste ready code blocks with filename annotations.
`
  }

  // Generate CLAUDE.md content
  const generateClaudeMd = () => {
    if (savedTools.length === 0) return "# Simpan alat AI ke Stack Anda untuk membuat CLAUDE.md otomatis"

    return `# CLAUDE.md - AI Agent Operating Manual
# Project AI Stack generated via Awesome AI Tools

## Active Stack & Tooling
${savedTools.map(t => `### ${t.name}
- **Category**: ${CATEGORIES.find(c => c.id === t.categoryId)?.name || "General"}
- **Website**: ${t.website}
- **Description**: ${t.description}
- **Pricing**: ${t.pricing} (${t.isOpenSource ? "Open-Source" : "Proprietary"})
`).join("\n")}

## Development Philosophy
1. Focus on deterministic, test-driven implementations.
2. Avoid AI slop, bloated wrappers, and unnecessary abstractions.
3. Optimize for developer velocity and local-first inference whenever possible.
`
  }

  // Generate mcp-config.json
  const generateMcpConfig = () => {
    const mcpServers: Record<string, any> = {}

    savedTools.forEach(t => {
      const slug = t.name.toLowerCase().replace(/[^a-z0-9]/g, "-")
      mcpServers[slug] = {
        command: "npx",
        args: ["-y", `@modelcontextprotocol/server-${slug}`],
        env: {
          API_KEY: `\${${slug.toUpperCase().replace(/-/g, "_")}_API_KEY}`
        }
      }
    })

    return JSON.stringify({ mcpServers }, null, 2)
  }

  // Generate Markdown summary
  const generateMarkdown = () => {
    if (savedTools.length === 0) return ""

    return `## My AI Developer Stack

${savedTools.map(t => `- **${t.name}**: ${t.description} [${t.website}](${t.website})`).join("\n")}

*Generated with [Awesome AI Tools](https://awesome-ai-tools.local)*
`
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadFile = (filename: string, content: string) => {
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

  const handleDownloadFullStackZip = async () => {
    try {
      setIsDownloading(true)
      const zip = new JSZip()

      // 1. Config files
      zip.file(".cursorrules", generateCursorRules())
      zip.file("CLAUDE.md", generateClaudeMd())
      zip.file("mcp-config.json", generateMcpConfig())
      zip.file("STACK.md", generateMarkdown())
      zip.file("instincts.md", `# Project Instincts & Stack Invariants\nActive Tools: ${savedTools.map(t => t.name).join(", ")}\n`)

      // 2. Cursor rules folder
      const cursorFolder = zip.folder(".cursor")?.folder("rules")
      recommendedSkills.forEach(skill => {
        cursorFolder?.file(`${skill.slug}.mdc`, `---\ndescription: ${skill.description}\nglobs: *\nalwaysApply: true\n---\n\n# ${skill.name}\n\n${skill.content}`)
      })

      // 3. Claude commands folder
      const claudeFolder = zip.folder(".claude")?.folder("commands")
      recommendedSkills.forEach(skill => {
        claudeFolder?.file(`${skill.slug}.md`, `# /${skill.slug} — ${skill.name}\n\n${skill.content}`)
      })

      // 4. Subagents folder
      const agentsFolder = zip.folder(".agents")?.folder("subagents")
      recommendedAgents.forEach(agent => {
        agentsFolder?.file(`${agent.slug}.md`, `# Subagent: ${agent.name}\nRole: ${agent.role}\nModel: ${agent.recommendedModel}\n\n${agent.systemPrompt}`)
      })

      const blob = await zip.generateAsync({ type: "blob" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `my-ai-stack-bundle-${savedTools.length}-tools.zip`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error("Failed to generate zip:", err)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-[calc(100vh-16rem)] bg-[var(--background)]">
        <section className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1.5 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                  <Layers className="w-5 h-5" />
                </span>
                <h1 className="text-3xl font-bold tracking-tight font-heading">
                  {isId ? "Stack AI Saya" : "My AI Stack"}
                </h1>
              </div>
              <p className="text-sm text-[var(--muted)]">
                {isId 
                  ? "Koleksi alat AI pilihan Anda untuk menghasilkan file konfigurasi IDE dan aturan agen secara otomatis."
                  : "Your curated AI developer tools. Export configuration files and tailored prompt rules in one click."}
              </p>
            </div>

            {savedTools.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Button 
                  onClick={handleDownloadFullStackZip}
                  disabled={isDownloading}
                  className="bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--primary)]/90 text-xs font-semibold h-9 rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isDownloading ? "Bundling ZIP..." : isId ? "Unduh Paket Stack Lengkap (.zip)" : "Download Full Stack Bundle (.zip)"}</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearBookmarks}
                  className="text-xs text-red-500 hover:text-red-600 hover:bg-red-500/10 border-red-500/20 h-9 rounded-xl cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  {isId ? "Kosongkan" : "Clear All"}
                </Button>
              </div>
            )}
          </div>

          
          {/* 1-Click Stack Presets Wizard */}
          <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-[var(--foreground)] flex items-center gap-2 tracking-tight">
                  <Sparkles className="w-4 h-4 text-[var(--primary)]" />
                  <span>{isId ? "Stack Builder Wizard (1-Klik Preset)" : "Stack Builder Wizard (1-Click Presets)"}</span>
                </h2>
                <p className="text-xs text-[var(--muted)]">
                  {isId 
                    ? "Pilih template proyek untuk mengisi otomatis stack dengan alat, MCP servers, dan aturan IDE yang optimal."
                    : "Pick a project template to auto-populate your stack with tailored tools, MCP servers, and IDE rules."}
                </p>
              </div>
              <span className="text-[11px] font-mono text-[var(--muted)]">
                {isId ? "Siap diekspor ke .zip" : "Ready for 1-click ZIP bundle"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {STACK_PRESETS.map((preset) => {
                const Icon = preset.icon
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleApplyPreset(preset.slugs)}
                    className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:border-[var(--foreground)] hover:bg-[var(--surface)] text-left transition-all group cursor-pointer flex flex-col justify-between space-y-2"
                  >
                    <div className="space-y-2">
                      <div className="p-1.5 rounded-lg bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] w-fit">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-xs font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                        {preset.title}
                      </div>
                      <div className="text-[11px] text-[var(--muted)] line-clamp-2 leading-relaxed">
                        {preset.desc}
                      </div>
                    </div>
                    <div className="text-[10px] font-mono text-[var(--muted)] group-hover:text-[var(--foreground)] pt-1 flex items-center gap-1">
                      <span>{isId ? "Terapkan Preset" : "Apply Preset"}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Empty State */}
          {savedTools.length === 0 ? (
            <div className="py-16 text-center border border-dashed border-[var(--border)] rounded-2xl bg-[var(--surface)]/30 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center mx-auto text-[var(--muted)]">
                <Layers className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold tracking-tight">{isId ? "Belum ada alat yang disimpan" : "No tools saved yet"}</h3>
                <p className="text-xs text-[var(--muted)] max-w-sm mx-auto">
                  {isId 
                    ? "Jelajahi katalog alat AI dan klik ikon bookmark untuk menambahkannya ke stack koding Anda."
                    : "Browse our curated tools catalog and click the bookmark icon to start crafting your personalized developer stack."}
                </p>
              </div>
              <Button asChild size="sm" className="bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--primary)]/90 text-xs rounded-xl">
                <Link href="/categories">
                  {isId ? "Jelajahi Alat AI" : "Explore AI Tools"}
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              
              {/* Stack Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                  <div className="text-xs text-[var(--muted)]">{isId ? "Total Alat" : "Total Tools"}</div>
                  <div className="text-2xl font-bold font-heading text-[var(--foreground)] mt-1">{savedTools.length}</div>
                </div>
                <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                  <div className="text-xs text-[var(--muted)]">{isId ? "Kategori Terliput" : "Categories"}</div>
                  <div className="text-2xl font-bold font-heading text-[var(--foreground)] mt-1">{categoriesCovered.length}</div>
                </div>
                <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                  <div className="text-xs text-[var(--muted)]">Open Source</div>
                  <div className="text-2xl font-bold font-heading text-[var(--foreground)] mt-1">{openSourceCount}</div>
                </div>
                <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                  <div className="text-xs text-[var(--muted)]">{isId ? "Skills Tercocok" : "Matched Skills"}</div>
                  <div className="text-2xl font-bold font-heading text-[var(--primary)] mt-1">{recommendedSkills.length}</div>
                </div>
              </div>

              {/* Saved Tools Grid */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[var(--foreground)] tracking-tight">
                  {isId ? "Alat di Stack Anda" : "Tools in your Stack"} ({savedTools.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedTools.map(tool => (
                    <Card key={tool.id} className="bg-[var(--surface)] border-[var(--border)] flex flex-col justify-between">
                      <CardHeader className="p-4 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <ToolLogo name={tool.name} website={tool.website} logo={tool.logo} size="sm" />
                            <div>
                              <CardTitle className="text-sm font-bold tracking-tight">
                                <Link href={`/tools/${tool.slug}`} className="hover:text-[var(--primary)] transition-colors">
                                  {tool.name}
                                </Link>
                              </CardTitle>
                              <span className="text-[11px] text-[var(--muted)] font-mono">
                                {CATEGORIES.find(c => c.id === tool.categoryId)?.name}
                              </span>
                            </div>
                          </div>
                          <BookmarkButton toolId={tool.id} />
                        </div>
                        <CardDescription className="text-xs line-clamp-2">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="p-4 pt-0 flex items-center justify-between border-t border-[var(--border)]/50 mt-2">
                        <Badge variant="secondary" className="text-[10px]">
                          {tool.pricing}
                        </Badge>
                        <a 
                          href={tool.website} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] flex items-center gap-1"
                        >
                          <span>Visit</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Smart Recommendations Section */}
              <div className="p-6 rounded-2xl border border-[var(--primary)]/30 bg-[var(--primary)]/5 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span>{isId ? "Rekomendasi Cerdas Berdasarkan Stack Anda" : "Smart Recommendations Tailored to your Stack"}</span>
                  </div>
                  <h3 className="text-xl font-bold font-heading text-[var(--foreground)] tracking-tight">
                    {isId ? "Skills & Subagents yang Direkomendasikan" : "Recommended Skills & Subagents"}
                  </h3>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    {isId 
                      ? "Berdasarkan alat yang Anda pilih, agen AI Anda akan bekerja lebih optimal jika dilengkapi skills & personas berikut."
                      : "Based on your active tools, these specialist prompt skills and personas will dramatically increase your AI coding velocity."}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Recommended Skills */}
                  <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--foreground)] flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-[var(--primary)]" />
                        Matched AI Skills ({recommendedSkills.length})
                      </span>
                      <Link href="/skills" className="text-[11px] text-[var(--primary)] hover:underline">View All &rarr;</Link>
                    </div>
                    <div className="space-y-2">
                      {recommendedSkills.map(skill => (
                        <div key={skill.id} className="p-2.5 rounded-lg bg-[var(--background)] border border-[var(--border)] flex items-center justify-between text-xs">
                          <div>
                            <span className="font-semibold text-[var(--foreground)]">{skill.name}</span>
                            <span className="ml-2 font-mono text-[10px] text-pink-400">/{skill.slug}</span>
                          </div>
                          <Link href={`/skills/${skill.slug}`} className="text-[10px] font-mono text-[var(--primary)] hover:underline">
                            Details
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Subagents */}
                  <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--foreground)] flex items-center gap-1.5">
                        <Bot className="w-3.5 h-3.5 text-[var(--primary)]" />
                        Matched Subagents ({recommendedAgents.length})
                      </span>
                      <Link href="/agents" className="text-[11px] text-[var(--primary)] hover:underline">View All &rarr;</Link>
                    </div>
                    <div className="space-y-2">
                      {recommendedAgents.map(agent => (
                        <div key={agent.id} className="p-2.5 rounded-lg bg-[var(--background)] border border-[var(--border)] flex items-center justify-between text-xs">
                          <div>
                            <span className="font-semibold text-[var(--foreground)]">{agent.name}</span>
                            <span className="ml-2 text-[10px] text-[var(--muted)]">({agent.role})</span>
                          </div>
                          <Link href={`/agents/${agent.slug}`} className="text-[10px] font-mono text-[var(--primary)] hover:underline">
                            Details
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Export Tabs Panel */}
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-sm">
                
                {/* Tabs */}
                <div className="flex overflow-x-auto border-b border-[var(--border)] bg-[var(--background)]/50 no-scrollbar">
                  <button
                    onClick={() => setActiveTab("cursor")}
                    className={`px-4 py-3 text-xs font-medium whitespace-nowrap transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
                      activeTab === "cursor"
                        ? "border-[var(--primary)] text-[var(--foreground)] bg-[var(--primary)]/5 font-semibold"
                        : "border-transparent text-[var(--muted)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>.cursorrules</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("claude")}
                    className={`px-4 py-3 text-xs font-medium whitespace-nowrap transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
                      activeTab === "claude"
                        ? "border-[var(--primary)] text-[var(--foreground)] bg-[var(--primary)]/5 font-semibold"
                        : "border-transparent text-[var(--muted)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>CLAUDE.md</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("mcp")}
                    className={`px-4 py-3 text-xs font-medium whitespace-nowrap transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
                      activeTab === "mcp"
                        ? "border-[var(--primary)] text-[var(--foreground)] bg-[var(--primary)]/5 font-semibold"
                        : "border-transparent text-[var(--muted)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>mcp-config.json</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("markdown")}
                    className={`px-4 py-3 text-xs font-medium whitespace-nowrap transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
                      activeTab === "markdown"
                        ? "border-[var(--primary)] text-[var(--foreground)] bg-[var(--primary)]/5 font-semibold"
                        : "border-transparent text-[var(--muted)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Markdown Readme</span>
                  </button>
                </div>

                {/* Tab Action Bar */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-[var(--border)]/60 bg-[var(--surface)] flex-wrap gap-2">
                  <span className="text-xs font-mono text-[var(--muted)]">
                    {activeTab === "cursor" && "Target: .cursorrules in project root"}
                    {activeTab === "claude" && "Target: CLAUDE.md in project root"}
                    {activeTab === "mcp" && "Target: .claude/mcp.json or .cursor/mcp.json"}
                    {activeTab === "markdown" && "Target: README.md"}
                  </span>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        const content = activeTab === "cursor" ? generateCursorRules()
                          : activeTab === "claude" ? generateClaudeMd()
                          : activeTab === "mcp" ? generateMcpConfig()
                          : generateMarkdown()
                        handleCopy(content)
                      }}
                      className="h-8 text-xs cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 mr-1 text-green-500" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                      {copied ? (isId ? "Tersalin" : "Copied") : (isId ? "Salin" : "Copy")}
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => {
                        if (activeTab === "cursor") handleDownloadFile(".cursorrules", generateCursorRules())
                        if (activeTab === "claude") handleDownloadFile("CLAUDE.md", generateClaudeMd())
                        if (activeTab === "mcp") handleDownloadFile("mcp-config.json", generateMcpConfig())
                        if (activeTab === "markdown") handleDownloadFile("STACK.md", generateMarkdown())
                      }}
                      className="h-8 text-xs bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--primary)]/90 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 mr-1" />
                      {isId ? "Unduh Berkas" : "Download File"}
                    </Button>
                  </div>
                </div>

                {/* Code Preview Area */}
                <div className="p-6 bg-[#0d1117] text-gray-200 overflow-x-auto max-h-[400px]">
                  <pre className="text-xs font-mono whitespace-pre-wrap leading-relaxed">
                    {activeTab === "cursor" && generateCursorRules()}
                    {activeTab === "claude" && generateClaudeMd()}
                    {activeTab === "mcp" && generateMcpConfig()}
                    {activeTab === "markdown" && generateMarkdown()}
                  </pre>
                </div>
              </div>

            </div>
          )}

        </section>
      </main>
      <Footer />
    </>
  )
}

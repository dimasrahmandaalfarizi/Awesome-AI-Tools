"use client"

import { useState, useEffect, useRef } from "react"
import { motion, type Variants } from "framer-motion"
import { ArrowRight, Star, ExternalLink, Bot, Shield, Terminal, Sparkles, Layers, Cpu, Code2, Download, Check, Copy } from "lucide-react"
import { Link } from "@/i18n/routing"
import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"
import { Button } from "@/components/ui/Button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { BookmarkButton } from "@/components/ui/BookmarkButton"
import { ToolLogo } from "@/components/ui/ToolLogo"
import { CATEGORIES, TOOLS, AI_SKILLS, AI_AGENTS } from "@/data/mock"
import { getLocalizedCategory, getLocalizedTool } from "@/lib/localizeData"
import { useTranslations, useLocale } from "next-intl"

// ─── Framer Motion Variants ─────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
}

// ─── Code Lines Definition ───────────────────────────────────────────────────

// ─── Interactive CLI Sandbox Definition ──────────────────────────────────────────

interface CliTab {
  id: string
  label: string
  cmd: string
  descEn: string
  descId: string
  preview: string
}

const CLI_TABS: CliTab[] = [
  {
    id: "init",
    label: "1. Scaffold (init)",
    cmd: "npx awesome-ai-tools init",
    descEn: "Installs 2,582 skills, 68 subagents, safety hooks & instincts into Cursor, Claude, or Antigravity.",
    descId: "Memasang 2.582 skills, 68 subagents, runtime hooks & instincts ke Cursor, Claude, atau Antigravity.",
    preview: `[*] Scaffolding 2,582 skills, 68 subagents, hooks & instincts...
[+] Installed Agent Hooks Runtime in .claude/hooks/
[+] Generated 2,582 Skills + 68 Subagents in .agents/
[+] Generated master AGENTS.md index in project root.
[+] Setup Complete! Total 2,653 configuration files generated.`
  },
  {
    id: "scan",
    label: "2. Security Audit (scan)",
    cmd: "npx awesome-ai-tools scan",
    descEn: "Runs AgentShield auditor across workspace: scans API key leaks, prompt injection, and dangerous hooks.",
    descId: "Menjalankan auditor AgentShield: memindai kebocoran kunci API, prompt injection, dan hook berbahaya.",
    preview: `[+] AgentShield Security Report — Grade: A+ (Score: 100/100)
[i] Total Files Scanned: 489
[!] Critical: 0 | High: 0 | Medium: 0 | Low: 0
[+] Clean Workspace! No security risks or leaked secrets found.`
  },
  {
    id: "trigger",
    label: "3. Trigger Skills (/slash)",
    cmd: "/tdd | /review | @software-architect",
    descEn: "Activate autonomous engineering modes directly inside Claude Code CLI, Cursor Composer, or Antigravity.",
    descId: "Aktifkan mode rekayasa otonom langsung di Claude Code CLI, Cursor Composer, atau Antigravity.",
    preview: `> /tdd-workflow
[RED]   Writing failing unit tests for AuthService.spec.ts...
[GREEN] Implementing minimal type-safe auth handler...
[CLEAN] Safe refactor with 100% test coverage preserved.`
  },
  {
    id: "learn",
    label: "4. Continuous Memory (learn)",
    cmd: 'npx awesome-ai-tools learn "Enforce strict TypeScript types"',
    descEn: "Persist architectural rules permanently into instincts.md for all future AI agent sessions.",
    descId: "Menyimpan aturan arsitektur secara permanen ke instincts.md untuk seluruh sesi agen AI masa depan.",
    preview: `[+] Instinct Saved! Added to instincts.md:
    "Enforce strict TypeScript types"
All future AI Agent sessions will strictly adhere to this rule.`
  }
]

function InteractiveCliSandbox({ isId }: { isId: boolean }) {
  const [activeTab, setActiveTab] = useState<string>("init")
  const [copied, setCopied] = useState(false)

  const currentTab = CLI_TABS.find((t) => t.id === activeTab) || CLI_TABS[0]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentTab.cmd)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 text-left bg-[var(--surface)] rounded-2xl overflow-hidden border border-[var(--border)] shadow-sm">
      {/* Window Chrome & Tabs */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-[var(--surface-hover)] border-b border-[var(--border)] gap-2">
        <div className="flex space-x-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80 border border-red-500/30" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80 border border-amber-500/30" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 border border-emerald-500/30" />
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {CLI_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer shrink-0 ${
                activeTab === tab.id
                  ? "bg-[var(--background)] text-[var(--foreground)] font-semibold border border-[var(--border)] shadow-2xs"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="text-xs font-mono text-[var(--muted)] hover:text-[var(--foreground)] flex items-center gap-1.5 cursor-pointer transition-colors px-2 py-0.5 rounded-md hover:bg-[var(--background)] shrink-0"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? (isId ? "Tersalin" : "Copied") : (isId ? "Salin" : "Copy")}</span>
        </button>
      </div>

      {/* Command Bar */}
      <div className="px-5 py-3 bg-[var(--background)]/70 border-b border-[var(--border)] flex items-center gap-2 font-mono text-xs md:text-sm text-[var(--foreground)]">
        <span className="text-[var(--muted)] select-none">$</span>
        <span className="font-semibold">{currentTab.cmd}</span>
      </div>

      {/* Terminal Output Preview */}
      <div className="p-5 font-mono text-xs text-[var(--muted)] bg-[var(--surface)] whitespace-pre-wrap leading-relaxed min-h-[120px]">
        {currentTab.preview}
      </div>

      {/* Tab Explanation Footer */}
      <div className="px-5 py-2.5 bg-[var(--surface-hover)] border-t border-[var(--border)] text-[11px] text-[var(--muted)] flex items-center justify-between">
        <span>{isId ? currentTab.descId : currentTab.descEn}</span>
        <span className="font-mono text-[10px] text-[var(--primary)] uppercase tracking-wider font-semibold">Active</span>
      </div>
    </div>
  )
}

export default function HomePage() {
  const t = useTranslations("Home")
  const locale = useLocale()
  const isId = locale === "id"

  const featuredTools = TOOLS.filter((t) => t.featured).map((t) => getLocalizedTool(t, locale))

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[var(--background)]">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 border-b border-[var(--border)]">
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-medium rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{`${TOOLS.length} Tools • ${AI_SKILLS.length.toLocaleString()} AI Skills • ${AI_AGENTS.length} Subagents • 1,700+ APIs`}</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--foreground)] font-heading leading-tight max-w-3xl mx-auto">
                {t("heroTitle")}{" "}
                <span className="text-[var(--foreground)] underline decoration-[var(--border)] dark:decoration-zinc-700 underline-offset-8">
                  {t("heroTitleHighlight")}
                </span>
              </h1>

              <p className="text-sm md:text-base text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
                {t("heroDescription")}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Button size="lg" className="w-full sm:w-auto bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 text-xs md:text-sm font-medium rounded-xl cursor-pointer h-11 px-6 shadow-xs" asChild>
                  <Link href="/skills">
                    {isId ? `Jelajahi ${AI_SKILLS.length.toLocaleString()} AI Skills` : `Explore ${AI_SKILLS.length.toLocaleString()} AI Skills`}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-xs md:text-sm font-medium rounded-xl cursor-pointer h-11 px-6 border-[var(--border)]" asChild>
                  <Link href="/agents">
                    <Bot className="w-4 h-4 mr-2 text-[var(--muted)]" />
                    {isId ? `Direktori Subagents (${AI_AGENTS.length})` : `Subagents Directory (${AI_AGENTS.length})`}
                  </Link>
                </Button>
              </div>

              {/* 4-Metric Ecosystem Strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4 text-left">
                <Link 
                  href="/skills" 
                  className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50 hover:shadow-xs transition-all group"
                >
                  <div className="text-xl md:text-2xl font-bold font-mono tracking-tight text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                    {AI_SKILLS.length.toLocaleString()}+
                  </div>
                  <div className="text-xs font-semibold text-[var(--foreground)] mt-0.5">
                    {isId ? "AI Agent Skills" : "AI Agent Skills"}
                  </div>
                  <div className="text-[11px] text-[var(--muted)] mt-1 line-clamp-1">
                    {isId ? "Cyber, TDD, Clean Code" : "Cyber, TDD, Architecture"}
                  </div>
                </Link>

                <Link 
                  href="/agents" 
                  className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50 hover:shadow-xs transition-all group"
                >
                  <div className="text-xl md:text-2xl font-bold font-mono tracking-tight text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                    {AI_AGENTS.length}+
                  </div>
                  <div className="text-xs font-semibold text-[var(--foreground)] mt-0.5">
                    {isId ? "Subagent Personas" : "Subagent Personas"}
                  </div>
                  <div className="text-[11px] text-[var(--muted)] mt-1 line-clamp-1">
                    {isId ? "Architect, Security, SRE" : "Architect, Security, SRE"}
                  </div>
                </Link>

                <Link 
                  href="/categories" 
                  className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50 hover:shadow-xs transition-all group"
                >
                  <div className="text-xl md:text-2xl font-bold font-mono tracking-tight text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                    {TOOLS.length}+
                  </div>
                  <div className="text-xs font-semibold text-[var(--foreground)] mt-0.5">
                    {isId ? "Developer Tools" : "Developer Tools"}
                  </div>
                  <div className="text-[11px] text-[var(--muted)] mt-1 line-clamp-1">
                    {isId ? "Models, Frameworks, Runners" : "Models, Runners, Frameworks"}
                  </div>
                </Link>

                <Link 
                  href="/apis" 
                  className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50 hover:shadow-xs transition-all group"
                >
                  <div className="text-xl md:text-2xl font-bold font-mono tracking-tight text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                    1,700+
                  </div>
                  <div className="text-xs font-semibold text-[var(--foreground)] mt-0.5">
                    {isId ? "Public APIs Gratis" : "Free Public APIs"}
                  </div>
                  <div className="text-[11px] text-[var(--muted)] mt-1 line-clamp-1">
                    {isId ? "50+ Kategori & No-Auth" : "50+ Categories & REST"}
                  </div>
                </Link>
              </div>

              {/* Interactive CLI Sandbox */}
              <InteractiveCliSandbox isId={isId} />
            </motion.div>
          </div>
        </section>

        {/* Ecosystem 4-Pillar Showcase */}
        <section className="container mx-auto px-4 py-16 border-b border-[var(--border)]">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-heading text-[var(--foreground)]">
              {isId ? "Ekosistem Terpadu untuk AI Developer" : "Unified Ecosystem for AI Developers"}
            </h2>
            <p className="text-xs md:text-sm text-[var(--muted)]">
              {isId
                ? "Semua yang Anda butuhkan untuk membangun, mengaudit, dan menjalankan agen koding otonom di semua AI IDE & CLI."
                : "Everything you need to build, audit, and orchestrate autonomous AI coding agents across all AI IDEs."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Pillar 1: Skills */}
            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50 transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--primary)] w-fit">
                  <Terminal className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors tracking-tight">
                  {`${AI_SKILLS.length.toLocaleString()}+ AI Skills Suite`}
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  {isId
                    ? "Koleksi aturan modular terlengkap (Cybersecurity, TDD, Clean Architecture, DevSecOps, Frameworks) siap dipicu via /command dan @rules."
                    : "Comprehensive modular prompt rules enforcing Cybersecurity, TDD, clean architecture, and framework standards across every editor."}
                </p>
              </div>
              <Link href="/skills" className="text-xs font-semibold text-[var(--primary)] hover:underline pt-4 mt-4 border-t border-[var(--border)]/60 flex items-center justify-between">
                <span>{isId ? "Buka Katalog Skills" : "Explore Skills"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 2: Subagents */}
            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50 transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--primary)] w-fit">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors tracking-tight">
                  {`${AI_AGENTS.length}+ AI Subagents`}
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  {isId
                    ? "Persona spesialis (Architect, TDD Driver, Security Auditor, DBA, SRE) dengan system prompt teruji dan batasan alat terisolasi."
                    : "Specialist personas (Architect, TDD Driver, Security Auditor, DBA) with isolated tool permissions and cost routing."}
                </p>
              </div>
              <Link href="/agents" className="text-xs font-semibold text-[var(--primary)] hover:underline pt-4 mt-4 border-t border-[var(--border)]/60 flex items-center justify-between">
                <span>{isId ? "Buka Direktori Agen" : "Browse Subagents"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 3: AgentShield */}
            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50 transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--primary)] w-fit">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors tracking-tight">
                  AgentShield Security
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  {isId
                    ? "Engine audit 4 lapisan: mendeteksi kebocoran API key, celah prompt injection, dan script hook berbahaya di repositori Anda."
                    : "4-layer security scanner auditing secret leaks, adversarial prompt injections, and dangerous command hooks."}
                </p>
              </div>
              <Link href="/docs/agentshield-security" className="text-xs font-semibold text-[var(--primary)] hover:underline pt-4 mt-4 border-t border-[var(--border)]/60 flex items-center justify-between">
                <span>{isId ? "Pelajari Keamanan" : "Security Guide"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 4: Router */}
            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50 transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--primary)] w-fit">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors tracking-tight">
                  Zero-Cost AI Router
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  {isId
                    ? "Proxy lokal kompatibel OpenAI dengan dynamic model remapping untuk menghubungkan Cursor ke Ollama gratis."
                    : "OpenAI-compatible local proxy router remapping paid models to free local Ollama instances with streaming SSE."}
                </p>
              </div>
              <Link href="/router" className="text-xs font-semibold text-[var(--primary)] hover:underline pt-4 mt-4 border-t border-[var(--border)]/60 flex items-center justify-between">
                <span>{isId ? "Buka AI Router" : "Open Router"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">{t("exploreCategories")}</h2>
            <Link href="/categories">
              <Button variant="ghost" className="text-[var(--primary)]">
                {t("viewAll")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Staggered category cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {CATEGORIES.slice(0, 4).map((c) => {
              const category = getLocalizedCategory(c, locale)
              return (
                <motion.div key={category.id} variants={cardVariants}>
                  <Link href={`/categories/${category.slug}`}>
                    <Card className="hover:border-[var(--primary)]/50 transition-colors cursor-pointer h-full group">
                      <CardHeader>
                        <CardTitle className="group-hover:text-[var(--primary)] transition-colors tracking-tight">
                          {category.name}
                        </CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </section>

        {/* Trending Tools */}
        <section className="container mx-auto px-4 py-16 border-t border-[var(--border)]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{t("trendingTools")}</h2>
              <p className="text-[var(--muted)] mt-1">{t("trendingDesc")}</p>
            </div>
          </div>

          {/* Staggered tool cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {featuredTools.map((tool) => (
              <motion.div key={tool.id} variants={cardVariants} className="flex">
                <Card className="flex flex-col h-full w-full hover:shadow-md transition-shadow group">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant={tool.isOpenSource ? "accent" : "secondary"}>
                        {tool.isOpenSource ? t("openSource") : tool.pricing}
                      </Badge>
                      <div className="text-[11px] font-mono font-medium text-[var(--muted)] bg-[var(--surface-hover)] px-2.5 py-0.5 rounded-md border border-[var(--border)]">
                        {(() => {
                          const cat = CATEGORIES.find((c) => c.id === tool.categoryId)
                          return cat ? getLocalizedCategory(cat, locale).name : ""
                        })()}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <ToolLogo name={tool.name} website={tool.website} logo={tool.logo} size="md" />
                      <Link href={`/tools/${tool.slug}`} className="hover:underline">
                        <CardTitle className="text-xl group-hover:text-[var(--primary)] transition-colors tracking-tight">
                          {tool.name}
                        </CardTitle>
                      </Link>
                    </div>
                    <CardDescription className="line-clamp-2 mt-3">{tool.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto pt-6 flex justify-between items-center border-t border-[var(--border)]/50">
                    <div className="flex flex-wrap gap-1.5">
                      {tool.tags.map((tag) => (
                        <span key={tag} className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[var(--surface-hover)] text-[var(--muted)] border border-[var(--border)]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <BookmarkButton toolId={tool.id} toolName={tool.name} size="sm" />
                      <a
                        href={tool.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors p-1 rounded-md hover:bg-[var(--surface-hover)]"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  )
}

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

type CodeLine = {
  id: string
  jsx: React.ReactNode
  mb?: string
}

const CODE_LINES: CodeLine[] = [
  {
    id: "c1",
    jsx: <span className="text-gray-500">{"// 1. Scaffold 413 skills & 68 subagents into your project"}</span>,
  },
  {
    id: "init",
    jsx: (
      <span className="font-semibold text-gray-100">
        <span className="text-pink-400">npx</span> awesome-ai-tools init
      </span>
    ),
    mb: "mb-4",
  },
  {
    id: "c2",
    jsx: <span className="text-gray-500">{"// 2. Audit repository security with AgentShield"}</span>,
  },
  {
    id: "scan",
    jsx: (
      <span className="font-semibold text-gray-100">
        <span className="text-pink-400">npx</span> awesome-ai-tools scan
      </span>
    ),
    mb: "mb-4",
  },
  {
    id: "c3",
    jsx: <span className="text-gray-500">{"// 3. Trigger skills in Claude Code, Continue, or Cursor"}</span>,
  },
  {
    id: "trigger",
    jsx: (
      <span>
        <span className="text-purple-400">/tdd-workflow</span>
        {"  |  "}
        <span className="text-amber-400">@security-auditor</span>
        {"  |  "}
        <span className="text-green-300">/review</span>
      </span>
    ),
  },
]

function TypewriterCodeBlock() {
  const [renderedCount, setRenderedCount] = useState(0)

  useEffect(() => {
    if (renderedCount >= CODE_LINES.length) return
    const timeout = setTimeout(() => {
      setRenderedCount((prev) => prev + 1)
    }, 450)
    return () => clearTimeout(timeout)
  }, [renderedCount])

  return (
    <pre className="p-5 font-mono text-xs md:text-sm text-gray-200 overflow-x-auto min-h-[170px]">
      <code>
        {CODE_LINES.slice(0, renderedCount).map((line) => (
          <div key={line.id} className={line.mb ?? ""}>
            {line.jsx}
          </div>
        ))}
      </code>
    </pre>
  )
}

export default function HomePage() {
  const t = useTranslations("Home")
  const locale = useLocale()
  const isId = locale === "id"
  const [copiedCli, setCopiedCli] = useState(false)

  const featuredTools = TOOLS.filter((t) => t.featured).map((t) => getLocalizedTool(t, locale))

  const handleCopyCli = async () => {
    try {
      await navigator.clipboard.writeText("npx awesome-ai-tools init")
      setCopiedCli(true)
      setTimeout(() => setCopiedCli(false), 2000)
    } catch (err) {
      console.error("Failed to copy CLI command:", err)
    }
  }

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
              className="max-w-3xl mx-auto space-y-6"
            >
              <Badge variant="outline" className="px-3.5 py-1.5 text-xs font-semibold rounded-full border-[var(--primary)] text-[var(--primary)]">
                <Sparkles className="w-3.5 h-3.5 mr-1.5 inline" />
                {isId ? "1.000+ Alat AI • 413 Skills • 68 Subagents • AgentShield" : "1,000+ AI Tools • 413 Skills • 68 Subagents • AgentShield"}
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--foreground)] font-heading leading-tight">
                {t("heroTitle")}{" "}
                <span className="text-[var(--primary)]">
                  {t("heroTitleHighlight")}
                </span>
              </h1>

              <p className="text-base md:text-lg text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
                {t("heroDescription")}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Button size="lg" className="w-full sm:w-auto bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--primary)]/90 text-sm font-semibold rounded-xl" asChild>
                  <Link href="/skills">
                    {isId ? "Jelajahi 413 AI Skills" : "Explore 413 AI Skills"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-sm font-semibold rounded-xl" asChild>
                  <Link href="/agents">
                    <Bot className="w-4 h-4 mr-2" />
                    {isId ? "Direktori Subagents (68)" : "Subagents Directory (68)"}
                  </Link>
                </Button>
              </div>

              {/* Typewriter Code Snippet */}
              <div className="max-w-2xl mx-auto mt-10 text-left bg-[#0d1117] rounded-xl overflow-hidden border border-[#30363d] shadow-2xl">
                {/* Window chrome */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="text-xs font-mono text-gray-400">awesome-ai-tools cli</div>
                  <button
                    onClick={handleCopyCli}
                    className="text-xs font-mono text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedCli ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCli ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                <TypewriterCodeBlock />
              </div>
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
                <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                  413 AI Skills Suite
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  {isId
                    ? "Koleksi aturan modular lengkap (TDD, clean architecture, security, framework best practices) siap dipicu via /command dan @rules."
                    : "Comprehensive modular prompt rules enforcing TDD, clean architecture, and framework standards across every editor."}
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
                <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                  68+ AI Subagents
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
                <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
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
                <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
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
                        <CardTitle className="group-hover:text-[var(--primary)] transition-colors">
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
                      <div className="text-xs text-[var(--muted)] bg-[var(--background)] px-2 py-1 rounded-full border border-[var(--border)]">
                        {(() => {
                          const cat = CATEGORIES.find((c) => c.id === tool.categoryId)
                          return cat ? getLocalizedCategory(cat, locale).name : ""
                        })()}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <ToolLogo name={tool.name} website={tool.website} logo={tool.logo} size="md" />
                      <Link href={`/tools/${tool.slug}`} className="hover:underline">
                        <CardTitle className="text-xl group-hover:text-[var(--primary)] transition-colors">
                          {tool.name}
                        </CardTitle>
                      </Link>
                    </div>
                    <CardDescription className="line-clamp-2 mt-3">{tool.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto pt-6 flex justify-between items-center border-t border-[var(--border)]/50">
                    <div className="flex gap-2">
                      {tool.tags.map((tag) => (
                        <span key={tag} className="text-xs text-[var(--muted)]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <BookmarkButton toolId={tool.id} toolName={tool.name} size="sm" />
                      <a
                        href={tool.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
                      >
                        <ExternalLink className="h-5 w-5" />
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

"use client"

import { useState, useEffect, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"
import { Input } from "@/components/ui/Input"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { BookmarkButton } from "@/components/ui/BookmarkButton"
import { Search as SearchIcon, ExternalLink, SlidersHorizontal, Sparkles, Loader2, ArrowRight, Code, Bot, Wrench, Layers, Globe } from "lucide-react"
import { Link } from "@/i18n/routing"
import { useTranslations, useLocale } from "next-intl"
import { TOOLS, CATEGORIES, AI_SKILLS, AI_AGENTS } from "@/data/mock"
import { PUBLIC_APIS } from "@/data/apis"
import { getLocalizedCategory, getLocalizedTool } from "@/lib/localizeData"
import { ToolLogo } from "@/components/ui/ToolLogo"
import { Tool } from "@/types"
import { motion, AnimatePresence } from "framer-motion"

interface SemanticResultItem {
  tool: Tool
  score: number
  matchReason: string
}

function SearchContent() {
  const t = useTranslations("Search")
  const tHome = useTranslations("Home")
  const locale = useLocale()
  const isId = locale === "id"
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [query, setQuery] = useState(initialQuery)
  const [searchMode, setSearchMode] = useState<"standard" | "semantic">("standard")
  const [activeTypeTab, setActiveTypeTab] = useState<"all" | "tools" | "skills" | "agents" | "apis">("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [pricingFilter, setPricingFilter] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  // Semantic search state
  const [semanticResults, setSemanticResults] = useState<SemanticResultItem[]>([])
  const [isSearchingSemantic, setIsSearchingSemantic] = useState(false)

  // Fetch semantic search results with debouncing
  useEffect(() => {
    if (searchMode !== "semantic" || !query.trim()) {
      setSemanticResults([])
      return
    }

    const timer = setTimeout(async () => {
      setIsSearchingSemantic(true)
      try {
        const res = await fetch("/api/ai/semantic-search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: query.trim(), locale })
        })
        if (res.ok) {
          const data = await res.json()
          setSemanticResults(data.results || [])
        }
      } catch (err) {
        console.error("Semantic search failed", err)
      } finally {
        setIsSearchingSemantic(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query, searchMode, locale])

  // Instant In-Memory Filter for Tools
  const localizedTools = useMemo(() => TOOLS.map(t => getLocalizedTool(t, locale)), [locale])
  
  const filteredTools = useMemo(() => {
    const q = query.toLowerCase().trim()
    return localizedTools.filter(tool => {
      const matchesSearch = !q || 
        tool.name.toLowerCase().includes(q) || 
        tool.description.toLowerCase().includes(q) ||
        tool.tags.some(tag => tag.toLowerCase().includes(q))
      
      const matchesCategory = selectedCategory === "all" || tool.categoryId === selectedCategory
      const matchesPricing = pricingFilter === "all" || 
                             (pricingFilter === "open-source" && tool.isOpenSource) ||
                             (pricingFilter === "free" && ((tool.pricing as string) === "Free" || (tool.pricing as string) === "Freemium" || (tool.pricing as string) === "Gratis"))

      return matchesSearch && matchesCategory && matchesPricing
    })
  }, [localizedTools, query, selectedCategory, pricingFilter])

  // Instant In-Memory Filter for AI Skills
  const filteredSkills = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return AI_SKILLS.slice(0, 8)
    return AI_SKILLS.filter(s => 
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.slug.toLowerCase().includes(q) ||
      s.frameworks.some(f => f.toLowerCase().includes(q))
    )
  }, [query])

  // Instant In-Memory Filter for AI Agents
  const filteredAgents = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return AI_AGENTS.slice(0, 6)
    return AI_AGENTS.filter(a => 
      a.name.toLowerCase().includes(q) ||
      a.role.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    )
  }, [query])

  // Instant In-Memory Filter for Public APIs
  const filteredApis = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return PUBLIC_APIS.slice(0, 9)
    return PUBLIC_APIS.filter(api =>
      api.name.toLowerCase().includes(q) ||
      api.description.toLowerCase().includes(q) ||
      api.category.toLowerCase().includes(q) ||
      api.auth.toLowerCase().includes(q)
    )
  }, [query])

  const isSemantic = searchMode === "semantic"
  const totalCount = filteredTools.length + 
    (activeTypeTab === "all" || activeTypeTab === "skills" ? filteredSkills.length : 0) + 
    (activeTypeTab === "all" || activeTypeTab === "agents" ? filteredAgents.length : 0) +
    (activeTypeTab === "all" || activeTypeTab === "apis" ? filteredApis.length : 0)

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-heading text-[var(--foreground)]">{t("title")}</h1>
        <p className="text-[var(--muted)] text-sm md:text-base leading-relaxed">
          {isId 
            ? `Cari di seluruh ${TOOLS.length} alat developer, ${AI_SKILLS.length.toLocaleString()} AI skills, ${AI_AGENTS.length} subagents, dan ${PUBLIC_APIS.length.toLocaleString()} public APIs secara instan.`
            : `Search across ${TOOLS.length} developer tools, ${AI_SKILLS.length.toLocaleString()} AI skills, ${AI_AGENTS.length} subagents, and ${PUBLIC_APIS.length.toLocaleString()} public APIs in real-time.`}
        </p>
      </div>

      {/* Mode & Entity Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Entity Tabs */}
        <div className="inline-flex p-1 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs font-medium w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setActiveTypeTab("all")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${activeTypeTab === "all" ? "bg-[var(--background)] text-[var(--foreground)] font-bold shadow-xs" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isId ? "Semua" : "All Ecosystem"}</span>
          </button>
          <button
            onClick={() => setActiveTypeTab("tools")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${activeTypeTab === "tools" ? "bg-[var(--background)] text-[var(--foreground)] font-bold shadow-xs" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Tools ({filteredTools.length})</span>
          </button>
          <button
            onClick={() => setActiveTypeTab("skills")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${activeTypeTab === "skills" ? "bg-[var(--background)] text-[var(--foreground)] font-bold shadow-xs" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Skills ({filteredSkills.length})</span>
          </button>
          <button
            onClick={() => setActiveTypeTab("agents")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${activeTypeTab === "agents" ? "bg-[var(--background)] text-[var(--foreground)] font-bold shadow-xs" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Agents ({filteredAgents.length})</span>
          </button>
          <button
            onClick={() => setActiveTypeTab("apis")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${activeTypeTab === "apis" ? "bg-[var(--background)] text-[var(--foreground)] font-bold shadow-xs" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>APIs ({filteredApis.length})</span>
          </button>
        </div>

        {/* Search Mode Toggle */}
        <div className="inline-flex p-1 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs font-medium">
          <button
            onClick={() => setSearchMode("standard")}
            className={`px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${!isSemantic ? "bg-[var(--background)] text-[var(--foreground)] shadow-xs font-semibold" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
          >
            <SearchIcon className="w-3.5 h-3.5" />
            <span>{isId ? "Standar" : "Standard"}</span>
          </button>
          <button
            onClick={() => setSearchMode("semantic")}
            className={`px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${isSemantic ? "bg-[var(--background)] text-[var(--foreground)] shadow-xs font-semibold" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--primary)]" />
            <span>AI Semantic</span>
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1 group">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--muted)] group-focus-within:text-[var(--primary)] transition-colors" />
          <Input
            type="text"
            placeholder={
              isSemantic
                ? (isId ? "Cari dengan bahasa alami (contoh: 'bantu saya buat landing page')..." : "Search with natural language (e.g. 'help me build landing page')...")
                : (isId ? "Ketik nama alat, skill prompt, MCP server, atau teknologi..." : "Type tool name, skill prompt, MCP server, or stack...")
            }
            className="h-12 pl-12 pr-10 text-sm md:text-base rounded-xl shadow-xs border-[var(--border)] focus-visible:ring-1 focus-visible:ring-[var(--primary)] bg-[var(--surface)]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {isSearchingSemantic && (
            <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--primary)] animate-spin" />
          )}
        </div>
        <Button 
          variant="outline" 
          className="h-12 px-5 rounded-xl text-sm cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" /> {t("filters")}
        </Button>
      </div>

      {/* Expandable Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-4">
              <div>
                <label className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wider mb-2 block">
                  {t("categories")}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <Badge 
                    variant={selectedCategory === "all" ? "default" : "outline"}
                    className="cursor-pointer text-xs"
                    onClick={() => setSelectedCategory("all")}
                  >
                    {t("all")}
                  </Badge>
                  {CATEGORIES.slice(0, 12).map((cat) => {
                    const locCat = getLocalizedCategory(cat, locale)
                    return (
                      <Badge
                        key={cat.id}
                        variant={selectedCategory === cat.id ? "default" : "outline"}
                        className="cursor-pointer text-xs"
                        onClick={() => setSelectedCategory(cat.id)}
                      >
                        {locCat.name}
                      </Badge>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Section */}
      <div className="space-y-8">
        {/* Tools Results */}
        {(activeTypeTab === "all" || activeTypeTab === "tools") && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
              <h2 className="text-base font-bold text-[var(--foreground)] flex items-center gap-2 tracking-tight">
                <Wrench className="w-4 h-4 text-[var(--primary)]" />
                <span>Developer Tools ({filteredTools.length})</span>
              </h2>
            </div>
            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTools.slice(0, 18).map((tool) => (
                  <Card key={tool.id} className="flex flex-col justify-between h-full bg-[var(--surface)] border-[var(--border)] hover:border-[var(--muted)] transition-all">
                    <CardHeader className="p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <Badge variant={tool.isOpenSource ? "accent" : "secondary"} className="text-[10px]">
                          {tool.isOpenSource ? t("openSource") : tool.pricing}
                        </Badge>
                        <span className="text-[10px] text-[var(--muted)] font-mono">
                          {CATEGORIES.find(c => c.id === tool.categoryId)?.name || "General"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 mt-1">
                        <ToolLogo name={tool.name} website={tool.website} logo={tool.logo} size="sm" />
                        <Link href={`/tools/${tool.slug}`} className="hover:text-[var(--primary)] transition-colors">
                          <CardTitle className="text-sm font-bold tracking-tight">{tool.name}</CardTitle>
                        </Link>
                      </div>
                      <CardDescription className="text-xs line-clamp-2">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center border-t border-[var(--border)]/30 mt-2">
                      <div className="flex gap-1 flex-wrap">
                        {tool.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[10px] text-[var(--muted)]">#{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookmarkButton toolId={tool.id} toolName={tool.name} size="sm" />
                        <a href={tool.website} target="_blank" rel="noreferrer" className="text-[var(--muted)] hover:text-[var(--primary)]">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-[var(--muted)] bg-[var(--surface)]/30 rounded-xl border border-[var(--border)]">
                {isId ? "Tidak ada alat yang cocok dengan filter." : "No tools matched your search."}
              </div>
            )}
          </div>
        )}

        {/* AI Skills Results */}
        {(activeTypeTab === "all" || activeTypeTab === "skills") && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
              <h2 className="text-base font-bold text-[var(--foreground)] flex items-center gap-2 tracking-tight">
                <Code className="w-4 h-4 text-emerald-500" />
                <span>AI Agent Skills ({filteredSkills.length})</span>
              </h2>
              <Link href="/skills" className="text-xs text-[var(--primary)] hover:underline flex items-center gap-1">
                <span>{isId ? `Lihat Semua ${AI_SKILLS.length.toLocaleString()} Skills` : `View all ${AI_SKILLS.length.toLocaleString()} Skills`}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSkills.slice(0, 9).map((skill) => (
                <div key={skill.id} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[var(--foreground)]">/{skill.slug}</span>
                      <span className="text-[10px] text-[var(--muted)]">{skill.author || "Community"}</span>
                    </div>
                    <h3 className="text-sm font-bold text-[var(--foreground)] tracking-tight">{skill.name}</h3>
                    <p className="text-xs text-[var(--muted)] line-clamp-2 leading-relaxed">{skill.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]/40 text-[11px]">
                    <span className="text-[var(--muted)]">{skill.frameworks.slice(0, 2).join(", ")}</span>
                    <Link href={`/skills/${skill.slug}`} className="text-[var(--primary)] font-semibold hover:underline flex items-center gap-1">
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Agents Results */}
        {(activeTypeTab === "all" || activeTypeTab === "agents") && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
              <h2 className="text-base font-bold text-[var(--foreground)] flex items-center gap-2 tracking-tight">
                <Bot className="w-4 h-4 text-indigo-500" />
                <span>Specialized AI Subagents ({filteredAgents.length})</span>
              </h2>
              <Link href="/agents" className="text-xs text-[var(--primary)] hover:underline flex items-center gap-1">
                <span>{isId ? `Lihat Semua ${AI_AGENTS.length} Subagents` : `View all ${AI_AGENTS.length} Subagents`}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAgents.slice(0, 6).map((agent) => (
                <div key={agent.id} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 font-bold">
                        {agent.role}
                      </span>
                      <span className="text-[10px] text-[var(--muted)]">{agent.recommendedModel}</span>
                    </div>
                    <h3 className="text-sm font-bold text-[var(--foreground)] tracking-tight">{agent.name}</h3>
                    <p className="text-xs text-[var(--muted)] line-clamp-2 leading-relaxed">{agent.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]/40 text-[11px]">
                    <span className="text-[var(--muted)]">{agent.tags.slice(0, 2).join(", ")}</span>
                    <Link href={`/agents/${agent.slug}`} className="text-[var(--primary)] font-semibold hover:underline flex items-center gap-1">
                      <span>Inspect Agent</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Public APIs Results */}
        {(activeTypeTab === "all" || activeTypeTab === "apis") && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
              <h2 className="text-base font-bold text-[var(--foreground)] flex items-center gap-2 tracking-tight">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>Public APIs ({filteredApis.length})</span>
              </h2>
              <Link href="/apis" className="text-xs text-[var(--primary)] hover:underline flex items-center gap-1">
                <span>{isId ? `Lihat Semua ${PUBLIC_APIS.length.toLocaleString()} APIs` : `View all ${PUBLIC_APIS.length.toLocaleString()} APIs`}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredApis.slice(0, 9).map((api) => (
                <div key={api.id} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[var(--background)] text-[var(--muted)] border border-[var(--border)]">
                        {api.category}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 font-medium">
                        {api.auth === "No" || api.auth === "None" ? "Free / No Auth" : api.auth}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-[var(--foreground)] tracking-tight">{api.name}</h3>
                    <p className="text-xs text-[var(--muted)] line-clamp-2 leading-relaxed">{api.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]/40 text-[11px]">
                    <span className="text-[var(--muted)] font-mono text-[10px]">HTTPS: {api.https ? "Yes" : "No"} | CORS: {api.cors}</span>
                    <a href={api.link} target="_blank" rel="noreferrer" className="text-[var(--primary)] font-semibold hover:underline flex items-center gap-1">
                      <span>Docs</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-[calc(100vh-14rem)] bg-[var(--background)]">
        <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center text-sm text-[var(--muted)]">Memuat pencarian...</div>}>
          <SearchContent />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

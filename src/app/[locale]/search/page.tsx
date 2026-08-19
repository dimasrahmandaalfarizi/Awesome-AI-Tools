"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"
import { Input } from "@/components/ui/Input"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { BookmarkButton } from "@/components/ui/BookmarkButton"
import { Search as SearchIcon, ExternalLink, SlidersHorizontal, Sparkles, Loader2, ArrowRight } from "lucide-react"
import { Link } from "@/i18n/routing"
import { useTranslations, useLocale } from "next-intl"
import { TOOLS, CATEGORIES } from "@/data/mock"
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

  // Standard filtering logic
  const localizedTools = TOOLS.map(t => getLocalizedTool(t, locale))
  const standardFilteredTools = localizedTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(query.toLowerCase()) || 
                          tool.description.toLowerCase().includes(query.toLowerCase()) ||
                          tool.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    
    const matchesCategory = selectedCategory === "all" || tool.categoryId === selectedCategory
    const matchesPricing = pricingFilter === "all" || 
                           (pricingFilter === "open-source" && tool.isOpenSource) ||
                           (pricingFilter === "free" && ((tool.pricing as string) === "Free" || (tool.pricing as string) === "Freemium" || (tool.pricing as string) === "Gratis"))

    return matchesSearch && matchesCategory && matchesPricing
  })

  // Semantic filtered tools
  const semanticFilteredTools = semanticResults
    .map(item => ({
      ...item,
      tool: getLocalizedTool(item.tool, locale)
    }))
    .filter(({ tool }) => {
      const matchesCategory = selectedCategory === "all" || tool.categoryId === selectedCategory
      const matchesPricing = pricingFilter === "all" || 
                             (pricingFilter === "open-source" && tool.isOpenSource) ||
                             (pricingFilter === "free" && ((tool.pricing as string) === "Free" || (tool.pricing as string) === "Freemium" || (tool.pricing as string) === "Gratis"))
      return matchesCategory && matchesPricing
    })

  const isSemantic = searchMode === "semantic"
  const activeCount = isSemantic ? (query.trim() ? semanticFilteredTools.length : 0) : standardFilteredTools.length

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-[var(--muted)] text-base max-w-xl mx-auto">{t("description")}</p>
        </div>

        {/* Search Mode Toggle */}
        <div className="flex items-center justify-center">
          <div className="inline-flex p-1 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs font-medium">
            <button
              onClick={() => setSearchMode("standard")}
              className={`px-4 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                !isSemantic
                  ? "bg-[var(--background)] text-[var(--foreground)] shadow-xs font-semibold"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <SearchIcon className="w-3.5 h-3.5" />
              <span>{isId ? "Pencarian Standar" : "Standard Search"}</span>
            </button>
            <button
              onClick={() => setSearchMode("semantic")}
              className={`px-4 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                isSemantic
                  ? "bg-[var(--background)] text-[var(--foreground)] shadow-xs font-semibold"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>{isId ? "AI Semantic Search" : "AI Semantic Search"}</span>
            </button>
          </div>
        </div>

        {/* Search Bar & Filter Toggle */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1 group">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--muted)] group-focus-within:text-[var(--primary)] transition-colors" />
            <Input
              type="text"
              placeholder={
                isSemantic
                  ? (isId ? "Cari dengan bahasa alami (contoh: 'bantu saya buat landing page tanpa koding')..." : "Search with natural language (e.g. 'help me build landing page without coding')...")
                  : t("placeholder")
              }
              className="h-13 pl-12 pr-10 text-sm md:text-base rounded-xl shadow-xs border-[var(--border)] focus-visible:ring-1 focus-visible:ring-[var(--primary)] bg-[var(--surface)]"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {isSearchingSemantic && (
              <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--primary)] animate-spin" />
            )}
          </div>
          <Button 
            variant="outline" 
            className="h-13 px-5 rounded-xl text-sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" /> {t("filters")}
          </Button>
        </div>

        {/* Semantic Search Hint Pill */}
        {isSemantic && (
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--muted)]">
            <span className="font-semibold text-[var(--foreground)]">AI Semantic Mode:</span>
            <span>{isId ? "Mencari berdasarkan niat masalah, fitur, dan relasi topik secara cerdas." : "Searches based on semantic intent, problem solved, and topic relevance."}</span>
          </div>
        )}

        {/* Expandable Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 space-y-5">
                {/* Category Filters */}
                <div>
                  <label className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wider mb-2.5 block">
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
                    {CATEGORIES.map((cat) => {
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

                {/* Pricing Filters */}
                <div>
                  <label className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wider mb-2.5 block">
                    {t("pricing")}
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge 
                      variant={pricingFilter === "all" ? "default" : "outline"}
                      className="cursor-pointer text-xs"
                      onClick={() => setPricingFilter("all")}
                    >
                      {t("all")}
                    </Badge>
                    <Badge 
                      variant={pricingFilter === "free" ? "default" : "outline"}
                      className="cursor-pointer text-xs"
                      onClick={() => setPricingFilter("free")}
                    >
                      {isId ? "Gratis & Freemium" : "Free & Freemium"}
                    </Badge>
                    <Badge 
                      variant={pricingFilter === "open-source" ? "default" : "outline"}
                      className="cursor-pointer text-xs"
                      onClick={() => setPricingFilter("open-source")}
                    >
                      {tHome("openSource")}
                    </Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Header */}
        <div>
          <div className="mb-5 flex justify-between items-end">
            <h2 className="text-lg font-semibold">
              {t("results")} ({activeCount})
            </h2>
          </div>

          {/* Semantic Results Flow */}
          {isSemantic ? (
            query.trim() === "" ? (
              <div className="text-center py-16 text-[var(--muted)] bg-[var(--surface)]/30 rounded-xl border border-[var(--border)]">
                <Sparkles className="h-8 w-8 mx-auto mb-3 opacity-40 text-indigo-500" />
                <p className="text-sm font-medium">{isId ? "Ketik kebutuhan Anda untuk pencarian semantik" : "Type your requirement for semantic search"}</p>
                <p className="text-xs mt-1 max-w-sm mx-auto text-[var(--muted)]">
                  {isId ? "Contoh: 'bantu scraping web', 'transkripsi audio lokal', atau 'framework multi-agent'" : "Examples: 'web scraping tool', 'local audio transcription', or 'multi-agent framework'"}
                </p>
              </div>
            ) : semanticFilteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {semanticFilteredTools.map(({ tool, score, matchReason }) => (
                  <Card key={tool.id} className="flex flex-col h-full hover:border-[var(--muted)] hover:shadow-sm transition-all group">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant={tool.isOpenSource ? "accent" : "secondary"}>
                            {tool.isOpenSource ? t("openSource") : tool.pricing}
                          </Badge>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 font-bold">
                            {score}% Match
                          </span>
                        </div>
                        <div className="text-[11px] text-[var(--muted)] bg-[var(--background)] px-2 py-0.5 rounded-full border border-[var(--border)] shrink-0">
                          {(() => {
                            const cat = CATEGORIES.find(c => c.id === tool.categoryId)
                            return cat ? getLocalizedCategory(cat, locale).name : ""
                          })()}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mt-1">
                        <ToolLogo name={tool.name} website={tool.website} logo={tool.logo} size="md" />
                        <Link href={`/tools/${tool.slug}`} className="hover:underline">
                          <CardTitle className="text-lg group-hover:text-[var(--primary)] transition-all">
                            {tool.name}
                          </CardTitle>
                        </Link>
                      </div>

                      <CardDescription className="line-clamp-2 mt-2 text-xs">
                        {tool.description}
                      </CardDescription>

                      {/* Match Reason Pill */}
                      <div className="mt-3 p-2 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[11px] text-[var(--muted)]">
                        <span className="font-semibold text-[var(--foreground)]">Alasan: </span>
                        {matchReason}
                      </div>
                    </CardHeader>

                    <CardFooter className="mt-auto pt-4 flex justify-between items-center border-t border-[var(--border)]/50">
                      <div className="flex gap-1.5 flex-wrap">
                        {tool.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[11px] text-[var(--muted)]">#{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookmarkButton toolId={tool.id} toolName={tool.name} size="sm" />
                        <a href={tool.website} target="_blank" rel="noreferrer" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-[var(--muted)] bg-[var(--surface)]/30 rounded-xl border border-[var(--border)]">
                <SearchIcon className="h-8 w-8 mx-auto mb-3 opacity-40" />
                <p className="text-base font-medium">{t("noResults")}</p>
                <Button variant="link" onClick={() => { setQuery(""); setSelectedCategory("all"); setPricingFilter("all") }} className="text-xs mt-1">
                  {t("clearFilters")}
                </Button>
              </div>
            )
          ) : (
            /* Standard Results Flow */
            standardFilteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {standardFilteredTools.map((tool) => (
                  <Card key={tool.id} className="flex flex-col h-full hover:border-[var(--muted)] hover:shadow-sm transition-all group">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant={tool.isOpenSource ? "accent" : "secondary"}>
                          {tool.isOpenSource ? t("openSource") : tool.pricing}
                        </Badge>
                        <div className="text-[11px] text-[var(--muted)] bg-[var(--background)] px-2 py-0.5 rounded-full border border-[var(--border)]">
                          {(() => {
                            const cat = CATEGORIES.find(c => c.id === tool.categoryId)
                            return cat ? getLocalizedCategory(cat, locale).name : ""
                          })()}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <ToolLogo name={tool.name} website={tool.website} logo={tool.logo} size="md" />
                        <Link href={`/tools/${tool.slug}`} className="hover:underline">
                          <CardTitle className="text-lg group-hover:text-[var(--primary)] transition-all">
                            {tool.name}
                          </CardTitle>
                        </Link>
                      </div>
                      <CardDescription className="line-clamp-2 mt-2 text-xs">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto pt-4 flex justify-between items-center border-t border-[var(--border)]/50">
                      <div className="flex gap-1.5 flex-wrap">
                        {tool.tags.map(tag => (
                          <span key={tag} className="text-[11px] text-[var(--muted)]">#{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookmarkButton toolId={tool.id} toolName={tool.name} size="sm" />
                        <a href={tool.website} target="_blank" rel="noreferrer" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-[var(--muted)] bg-[var(--surface)]/30 rounded-xl border border-[var(--border)]">
                <SearchIcon className="h-8 w-8 mx-auto mb-3 opacity-40" />
                <p className="text-base font-medium">{t("noResults")}</p>
                <Button variant="link" onClick={() => { setQuery(""); setSelectedCategory("all"); setPricingFilter("all") }} className="text-xs mt-1">
                  {t("clearFilters")}
                </Button>
              </div>
            )
          )}

        </div>
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

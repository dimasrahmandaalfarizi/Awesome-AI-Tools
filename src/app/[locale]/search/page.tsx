"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"
import { Input } from "@/components/ui/Input"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Search as SearchIcon, ExternalLink, SlidersHorizontal } from "lucide-react"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import { TOOLS, CATEGORIES } from "@/data/mock"
import { ToolLogo } from "@/components/ui/ToolLogo"
import { motion, AnimatePresence } from "framer-motion"

function SearchContent() {
  const t = useTranslations("Search")
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [query, setQuery] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [pricingFilter, setPricingFilter] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  // Filtering logic
  const filteredTools = TOOLS.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(query.toLowerCase()) || 
                          tool.description.toLowerCase().includes(query.toLowerCase()) ||
                          tool.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    
    const matchesCategory = selectedCategory === "all" || tool.categoryId === selectedCategory
    const matchesPricing = pricingFilter === "all" || 
                           (pricingFilter === "open-source" && tool.isOpenSource) ||
                           (pricingFilter === "free" && (tool.pricing === "Free" || tool.pricing === "Freemium"))

    return matchesSearch && matchesCategory && matchesPricing
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-[var(--muted)] text-lg">{t("description")}</p>
        </div>

        {/* Search Bar & Filter Toggle */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--muted)] group-focus-within:text-[var(--primary)] transition-colors" />
            <Input
              type="text"
              placeholder={t("placeholder")}
              className="h-14 pl-12 text-lg rounded-xl shadow-sm border-[var(--border)] focus-visible:ring-[var(--primary)] bg-[var(--surface)]"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            className="h-14 px-6 rounded-xl"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="mr-2 h-5 w-5" /> {t("filters")}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] mt-4">
                <div>
                  <h3 className="font-semibold mb-3 text-sm">{t("category")}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      variant={selectedCategory === "all" ? "default" : "secondary"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory("all")}
                    >
                      {t("all")}
                    </Badge>
                    {CATEGORIES.map(cat => (
                      <Badge 
                        key={cat.id}
                        variant={selectedCategory === cat.id ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => setSelectedCategory(cat.id)}
                      >
                        {cat.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-sm">{t("pricing")}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      variant={pricingFilter === "all" ? "default" : "secondary"}
                      className="cursor-pointer"
                      onClick={() => setPricingFilter("all")}
                    >
                      {t("all")}
                    </Badge>
                    <Badge 
                      variant={pricingFilter === "open-source" ? "accent" : "secondary"}
                      className="cursor-pointer"
                      onClick={() => setPricingFilter("open-source")}
                    >
                      {t("openSource")}
                    </Badge>
                    <Badge 
                      variant={pricingFilter === "free" ? "default" : "secondary"}
                      className="cursor-pointer"
                      onClick={() => setPricingFilter("free")}
                    >
                      Free / Freemium
                    </Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <div>
          <div className="mb-6 flex justify-between items-end">
            <h2 className="text-xl font-semibold">{t("results")} ({filteredTools.length})</h2>
          </div>
          
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTools.map((tool) => (
                <Card key={tool.id} className="flex flex-col h-full hover:border-[var(--muted)] hover:shadow-md transition-all group">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant={tool.isOpenSource ? "accent" : "secondary"}>
                        {tool.isOpenSource ? "Open Source" : tool.pricing}
                      </Badge>
                      <div className="text-xs text-[var(--muted)] bg-[var(--background)] px-2 py-1 rounded-full border border-[var(--border)]">
                        {CATEGORIES.find(c => c.id === tool.categoryId)?.name}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <ToolLogo name={tool.name} website={tool.website} logo={tool.logo} size="md" />
                      <Link href={`/tools/${tool.slug}`} className="hover:underline">
                        <CardTitle className="text-xl group-hover:text-[var(--primary)] transition-all">
                          {tool.name}
                        </CardTitle>
                      </Link>
                    </div>
                    <CardDescription className="line-clamp-2 mt-3">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto pt-6 flex justify-between items-center border-t border-[var(--border)]/50">
                    <div className="flex gap-2 flex-wrap">
                      {tool.tags.map(tag => (
                        <span key={tag} className="text-xs text-[var(--muted)]">#{tag}</span>
                      ))}
                    </div>
                    <a href={tool.website} target="_blank" rel="noreferrer" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors shrink-0">
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-[var(--muted)] bg-[var(--surface)]/30 rounded-xl border border-[var(--border)] backdrop-blur-md">
              <SearchIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">{t("noResults")}</p>
              <Button variant="link" onClick={() => { setQuery(""); setSelectedCategory("all"); setPricingFilter("all") }}>
                {t("clearFilters")}
              </Button>
            </div>
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
      <main className="flex-1 min-h-[calc(100vh-16rem)]">
        <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center">Loading search...</div>}>
          <SearchContent />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

"use client"

import { useState, useMemo, useEffect } from "react"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { useTranslations, useLocale } from "next-intl"
import {
  Search,
  ExternalLink,
  Copy,
  Check,
  Globe,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Key,
  Unlock,
  Layers,
  Download,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle2,
  RefreshCw
} from "lucide-react"
import type { PublicApi } from "@/types"
import type { PublicApiCategory } from "@/data/apis"

interface PublicApisClientProps {
  apis: PublicApi[]
  categories: PublicApiCategory[]
}

const ITEMS_PER_PAGE = 24

// Priority categories to show as quick filter pills
const FEATURED_CATEGORIES = [
  "All",
  "Development",
  "Machine Learning",
  "Security",
  "Data Validation",
  "Geocoding",
  "Text Analysis",
  "Cloud Storage & File Sharing",
  "Finance",
  "Open Data",
  "Science & Math",
  "Weather"
]

export function PublicApisClient({ apis, categories }: PublicApisClientProps) {
  const t = useTranslations("PublicApis")
  const locale = useLocale()
  const isId = locale === "id"

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedAuth, setSelectedAuth] = useState("All")
  const [corsOnly, setCorsOnly] = useState(false)
  const [httpsOnly, setHttpsOnly] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, selectedAuth, corsOnly, httpsOnly])

  // Filtered APIs calculation
  const filteredApis = useMemo(() => {
    return apis.filter((api) => {
      // Search matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchName = api.name.toLowerCase().includes(q)
        const matchDesc = api.description.toLowerCase().includes(q)
        const matchCat = api.category.toLowerCase().includes(q)
        const matchAuth = api.auth.toLowerCase().includes(q)
        if (!matchName && !matchDesc && !matchCat && !matchAuth) return false
      }

      // Category matching
      if (selectedCategory !== "All" && api.category !== selectedCategory) {
        return false
      }

      // Auth matching
      if (selectedAuth === "No Auth") {
        if (api.auth.toLowerCase() !== "no" && api.auth.trim() !== "") return false
      } else if (selectedAuth === "apiKey") {
        if (!api.auth.toLowerCase().includes("apikey")) return false
      } else if (selectedAuth === "OAuth") {
        if (!api.auth.toLowerCase().includes("oauth")) return false
      }

      // CORS matching
      if (corsOnly && api.cors !== "yes") {
        return false
      }

      // HTTPS matching
      if (httpsOnly && !api.https) {
        return false
      }

      return true
    })
  }, [apis, searchQuery, selectedCategory, selectedAuth, corsOnly, httpsOnly])

  // Aggregate stats
  const stats = useMemo(() => {
    const freeCount = apis.filter((a) => a.auth.toLowerCase() === "no" || a.auth === "").length
    const corsCount = apis.filter((a) => a.cors === "yes").length
    const httpsCount = apis.filter((a) => a.https).length
    return {
      total: apis.length,
      free: freeCount,
      cors: corsCount,
      https: httpsCount,
      categoriesCount: categories.length
    }
  }, [apis, categories])

  // Pagination slicing
  const totalPages = Math.ceil(filteredApis.length / ITEMS_PER_PAGE) || 1
  const paginatedApis = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredApis.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredApis, currentPage])

  const handleCopyLink = async (id: string, link: string) => {
    try {
      await navigator.clipboard.writeText(link)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      // Fallback
    }
  }

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(filteredApis, null, 2)], {
      type: "application/json"
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `public-apis-${selectedCategory.toLowerCase().replace(/\s+/g, "-")}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setSelectedAuth("All")
    setCorsOnly(false)
    setHttpsOnly(false)
  }

  return (
    <div className="space-y-8">
      {/* Stats Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-xs">
          <div className="flex items-center gap-2 text-[var(--muted)] text-xs font-mono uppercase tracking-wider mb-1">
            <Globe className="h-3.5 w-3.5 text-[var(--primary)]" />
            {t("statTotal")}
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--foreground)]">
            {stats.total.toLocaleString()}
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-xs">
          <div className="flex items-center gap-2 text-[var(--muted)] text-xs font-mono uppercase tracking-wider mb-1">
            <Unlock className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            {t("statFree")}
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-emerald-600 dark:text-emerald-400">
            {stats.free.toLocaleString()}
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-xs">
          <div className="flex items-center gap-2 text-[var(--muted)] text-xs font-mono uppercase tracking-wider mb-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            {t("statCors")}
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--foreground)]">
            {stats.cors.toLocaleString()}
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-xs">
          <div className="flex items-center gap-2 text-[var(--muted)] text-xs font-mono uppercase tracking-wider mb-1">
            <Layers className="h-3.5 w-3.5 text-[var(--primary)]" />
            {t("statCategories")}
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--foreground)]">
            {stats.categoriesCount}
          </div>
        </div>
      </div>

      {/* Control Bar: Search & Action buttons */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted)]" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="pl-10 h-11 bg-[var(--surface)] border-[var(--border)] rounded-lg text-sm focus:border-[var(--primary)]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[var(--muted)] hover:text-[var(--foreground)] px-1.5 py-0.5 rounded bg-[var(--background)] border border-[var(--border)]"
            >
              ESC
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportJson}
            className="h-11 px-4 gap-2 rounded-lg border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-xs font-mono"
          >
            <Download className="h-4 w-4" />
            {t("exportJson")}
          </Button>
        </div>
      </div>

      {/* Filter Tabs & Selectors */}
      <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]/30 space-y-4">
        {/* Category Quick Pills */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-[var(--muted)] font-mono">
            <span className="flex items-center gap-1.5 uppercase tracking-wider">
              <Layers className="h-3.5 w-3.5" />
              {t("filterCategory")}
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-md px-2 py-1 text-xs text-[var(--foreground)] font-mono focus:outline-none focus:border-[var(--primary)] cursor-pointer"
            >
              <option value="All">{isId ? "Semua Kategori (51)" : "All Categories (51)"}</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.name}>
                  {c.name} ({c.count})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {FEATURED_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-[var(--foreground)] text-[var(--background)] font-semibold shadow-sm"
                      : "bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--foreground)]/30"
                  }`}
                >
                  {cat === "All" ? (isId ? "Semua" : "All") : cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* Second Row: Auth, CORS, HTTPS Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--border)] text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[var(--muted)] font-mono uppercase tracking-wider flex items-center gap-1">
              <Key className="h-3 w-3" />
              {t("filterAuth")}:
            </span>
            {[
              { id: "All", label: t("all") },
              { id: "No Auth", label: t("noAuth") },
              { id: "apiKey", label: t("apiKey") },
              { id: "OAuth", label: t("oauth") }
            ].map((authOpt) => (
              <button
                key={authOpt.id}
                onClick={() => setSelectedAuth(authOpt.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                  selectedAuth === authOpt.id
                    ? "bg-[var(--primary)]/15 text-[var(--primary)] border border-[var(--primary)]/30 font-semibold"
                    : "bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {authOpt.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCorsOnly(!corsOnly)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono flex items-center gap-1.5 transition-colors border ${
                corsOnly
                  ? "bg-blue-500/15 text-blue-400 border-blue-500/40 font-semibold"
                  : "bg-[var(--surface)] border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <CheckCircle2 className="h-3 w-3" />
              {t("corsOnly")}
            </button>

            <button
              onClick={() => setHttpsOnly(!httpsOnly)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono flex items-center gap-1.5 transition-colors border ${
                httpsOnly
                  ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/40 font-semibold"
                  : "bg-[var(--surface)] border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <ShieldCheck className="h-3 w-3" />
              {t("httpsOnly")}
            </button>

            {(searchQuery || selectedCategory !== "All" || selectedAuth !== "All" || corsOnly || httpsOnly) && (
              <button
                onClick={clearAllFilters}
                className="px-2.5 py-1 rounded-md text-xs font-mono text-[var(--muted)] hover:text-red-400 hover:bg-red-500/10 transition-colors"
              >
                {t("clearFilters")}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-[var(--muted)] font-mono">
        <div>
          {t("showing", {
            from: filteredApis.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1,
            to: Math.min(currentPage * ITEMS_PER_PAGE, filteredApis.length),
            total: filteredApis.length.toLocaleString()
          })}
        </div>
        {totalPages > 1 && (
          <div>
            Page {currentPage} of {totalPages}
          </div>
        )}
      </div>

      {/* Grid of Public APIs */}
      {paginatedApis.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedApis.map((api) => {
            const isCopied = copiedId === api.id
            const isNoAuth = api.auth.toLowerCase() === "no" || api.auth === ""

            return (
              <div
                key={api.id}
                className="group flex flex-col justify-between p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/40 transition-all shadow-xs hover:shadow-md"
              >
                <div className="space-y-3">
                  {/* Category & Status Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
                      {api.category}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {isNoAuth ? (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-600/20 dark:border-emerald-500/30">
                          <Unlock className="h-2.5 w-2.5" />
                          FREE
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono text-[var(--muted)] bg-[var(--surface-hover)] border border-[var(--border)]">
                          <Key className="h-2.5 w-2.5" />
                          {api.auth}
                        </span>
                      )}

                      {api.cors === "yes" && (
                        <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono font-medium bg-blue-500/10 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-600/20 dark:border-blue-500/30">
                          CORS
                        </span>
                      )}

                      {api.https ? (
                        <span className="p-1 rounded-md text-emerald-600 dark:text-emerald-400" title="HTTPS Secure">
                          <ShieldCheck className="h-3 w-3" />
                        </span>
                      ) : (
                        <span className="p-1 rounded-md text-amber-600 dark:text-amber-400" title="HTTP (Unencrypted)">
                          <ShieldAlert className="h-3 w-3" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-base font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors flex items-center justify-between">
                      <span className="line-clamp-1">{api.name}</span>
                    </h3>
                    <p className="mt-1.5 text-xs text-[var(--muted)] leading-relaxed line-clamp-2">
                      {api.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleCopyLink(api.id, api.link)}
                    className="flex items-center gap-1.5 text-xs font-mono text-[var(--muted)] hover:text-[var(--foreground)] transition-colors px-2 py-1 rounded-md hover:bg-[var(--surface-hover)]"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{t("copied")}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>{t("copyLink")}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={api.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono font-medium text-[var(--primary)] hover:underline px-2 py-1 rounded-md hover:bg-[var(--surface-hover)] transition-colors"
                  >
                    <span>{t("visitDocs")}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)]/20 space-y-4">
          <div className="w-12 h-12 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center mx-auto text-[var(--muted)]">
            <Search className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold tracking-tight">{t("noResults")}</h3>
            <p className="text-xs text-[var(--muted)]">
              {isId
                ? "Coba ubah kata kunci pencarian atau sesuaikan opsi filter Anda."
                : "Try adjusting your search query or reset the active filters."}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            className="rounded-lg text-xs font-mono"
          >
            {t("clearFilters")}
          </Button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage((p) => Math.max(p - 1, 1))
              window.scrollTo({ top: 300, behavior: "smooth" })
            }}
            className="h-9 px-3 rounded-lg border-[var(--border)] text-xs font-mono"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Prev
          </Button>

          <div className="flex items-center gap-1 text-xs font-mono">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum = i + 1
              if (totalPages > 5 && currentPage > 3) {
                pageNum = currentPage - 3 + i
                if (pageNum + 4 > totalPages) {
                  pageNum = totalPages - 4 + i
                }
              }
              if (pageNum < 1 || pageNum > totalPages) return null

              return (
                <button
                  key={pageNum}
                  onClick={() => {
                    setCurrentPage(pageNum)
                    window.scrollTo({ top: 300, behavior: "smooth" })
                  }}
                  className={`w-8 h-8 rounded-lg text-xs font-mono transition-colors ${
                    currentPage === pageNum
                      ? "bg-[var(--foreground)] text-[var(--background)] font-bold"
                      : "bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => {
              setCurrentPage((p) => Math.min(p + 1, totalPages))
              window.scrollTo({ top: 300, behavior: "smooth" })
            }}
            className="h-9 px-3 rounded-lg border-[var(--border)] text-xs font-mono"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  )
}

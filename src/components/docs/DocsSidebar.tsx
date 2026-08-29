"use client"

import * as React from "react"
import { Link } from "@/i18n/routing"
import { useLocale } from "next-intl"
import { Search, ExternalLink, Rocket, Shield, Layers, Terminal, BookOpen, X } from "lucide-react"
import { DOC_SECTIONS } from "@/data/docs"

export interface DocsSidebarProps {
  currentSlug: string
  activeTab: "guide" | "integrations" | "api-reference"
  isOpen?: boolean
  onClose?: () => void
}

function getSectionIcon(title: string) {
  const t = title.toLowerCase()
  if (t.includes("start") || t.includes("mulai")) return Rocket
  if (t.includes("skill") || t.includes("agent") || t.includes("keamanan")) return Shield
  if (t.includes("ide") || t.includes("integrasi")) return Layers
  if (t.includes("api") || t.includes("router")) return Terminal
  return BookOpen
}

export function DocsSidebar({ currentSlug, activeTab, isOpen, onClose }: DocsSidebarProps) {
  const locale = useLocale()
  const isId = locale === "id"
  const [filterQuery, setFilterQuery] = React.useState("")

  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"))
  }

  const sections = React.useMemo(() => {
    const base = DOC_SECTIONS.filter(s => s.tab === activeTab || activeTab === "guide")
    if (!filterQuery.trim()) return base

    const q = filterQuery.toLowerCase().trim()
    return base
      .map(section => ({
        ...section,
        items: section.items.filter(item => 
          item.title.en.toLowerCase().includes(q) || 
          item.title.id.toLowerCase().includes(q) ||
          item.slug.toLowerCase().includes(q)
        )
      }))
      .filter(section => section.items.length > 0)
  }, [activeTab, filterQuery])

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-40 w-72 flex flex-col border-r border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-md transition-transform duration-200 lg:translate-x-0 ${
        isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      }`}
    >
      {/* Brand & Version Header */}
      <div className="flex h-14 items-center justify-between px-5 border-b border-[var(--border)]">
        <Link href="/docs/quickstart" className="flex items-center gap-2 font-semibold text-[var(--foreground)] hover:opacity-85 transition-opacity text-sm tracking-tight">
          <BookOpen className="w-4 h-4 text-[var(--primary)]" />
          <span>Documentation</span>
        </Link>
        <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[var(--background)] border border-[var(--border)] text-[var(--muted)]">
          v2.5
        </span>
      </div>

      {/* Live Search & Filter Bar */}
      <div className="px-4 pt-3.5 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--muted)]" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !filterQuery) handleOpenSearch()
            }}
            placeholder={isId ? "Filter dokumen..." : "Filter docs..."}
            className="w-full pl-8 pr-12 py-1.5 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)] transition-all"
          />
          {filterQuery ? (
            <button
              onClick={() => setFilterQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-[var(--muted)] hover:text-[var(--foreground)] cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleOpenSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[9px] font-mono rounded bg-[var(--surface-hover)] text-[var(--muted)] border border-[var(--border)] cursor-pointer"
              title="Global Search"
            >
              Ctrl K
            </button>
          )}
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-3 py-3 space-y-6 text-sm">
        {sections.map((section, idx) => {
          const SectionIcon = getSectionIcon(section.title.en)

          return (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between px-2.5 py-1 text-xs font-semibold text-[var(--foreground)] tracking-wide">
                <div className="flex items-center gap-1.5">
                  <SectionIcon className="w-3.5 h-3.5 text-[var(--muted)]" />
                  <span>{isId ? section.title.id : section.title.en}</span>
                </div>
                <span className="text-[10px] font-mono text-[var(--muted)]">{section.items.length}</span>
              </div>

              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = currentSlug === item.slug
                  return (
                    <li key={item.slug}>
                      <Link
                        href={`/docs/${item.slug}`}
                        onClick={onClose}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isActive
                            ? "bg-[var(--foreground)] text-[var(--background)] font-semibold shadow-2xs"
                            : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
                        }`}
                      >
                        {isActive && <span className="w-1 h-1 rounded-full bg-[var(--background)]" />}
                        <span className="truncate">{isId ? item.title.id : item.title.en}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}

        {/* Quick Links Section */}
        <div className="pt-3 border-t border-[var(--border)] space-y-1">
          <div className="px-2.5 py-1 text-xs font-semibold text-[var(--foreground)] tracking-wide flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[var(--muted)]" />
            <span>{isId ? "Tautan Cepat" : "Quick Links"}</span>
          </div>
          <ul className="space-y-0.5 text-xs">
            <li>
              <Link
                href="/skills"
                className="flex items-center justify-between px-3 py-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-colors"
              >
                <span>AI Agent Skills (2,582)</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </Link>
            </li>
            <li>
              <Link
                href="/agents"
                className="flex items-center justify-between px-3 py-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-colors"
              >
                <span>Subagent Directory (136)</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </Link>
            </li>
            <li>
              <Link
                href="/apis"
                className="flex items-center justify-between px-3 py-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-colors"
              >
                <span>Free Public APIs (1,700+)</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </Link>
            </li>
            <li>
              <Link
                href="/router"
                className="flex items-center justify-between px-3 py-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-colors"
              >
                <span>AI Proxy Router</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}

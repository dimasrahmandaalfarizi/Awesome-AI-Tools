"use client"

import * as React from "react"
import { Link } from "@/i18n/routing"
import { useLocale } from "next-intl"
import { Search, ExternalLink } from "lucide-react"
import { DOC_SECTIONS } from "@/data/docs"

export interface DocsSidebarProps {
  currentSlug: string
  activeTab: "guide" | "integrations" | "api-reference"
  isOpen?: boolean
  onClose?: () => void
}

export function DocsSidebar({ currentSlug, activeTab, isOpen, onClose }: DocsSidebarProps) {
  const locale = useLocale()
  const isId = locale === "id"

  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"))
  }

  const sections = DOC_SECTIONS.filter(s => s.tab === activeTab || activeTab === "guide")

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-40 w-72 flex flex-col border-r border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-black/95 transition-transform duration-200 lg:translate-x-0 ${
        isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      }`}
    >
      {/* Brand & Theme Header */}
      <div className="flex h-14 items-center px-5 border-b border-zinc-200/80 dark:border-zinc-800/60">
        <Link href="/docs/quickstart" className="font-semibold text-zinc-900 dark:text-white hover:opacity-80 transition-opacity text-sm tracking-tight">
          Documentation
        </Link>
      </div>

      {/* Search Input Bar (Ctrl+K) */}
      <div className="px-4 pt-4 pb-2">
        <button
          type="button"
          onClick={handleOpenSearch}
          className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm transition-all"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-zinc-400" />
            <span>{isId ? "Cari dokumen..." : "Search..."}</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-3 space-y-6 text-sm">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-1.5">
            <h4 className="px-2 text-xs font-bold text-zinc-900 dark:text-zinc-100 tracking-wider">
              {isId ? section.title.id : section.title.en}
            </h4>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = currentSlug === item.slug
                return (
                  <li key={item.slug}>
                    <Link
                      href={`/docs/${item.slug}`}
                      onClick={onClose}
                      className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? "bg-zinc-200/70 dark:bg-zinc-800/80 text-zinc-900 dark:text-white font-semibold shadow-xs"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900/60"
                      }`}
                    >
                      <span>{isId ? item.title.id : item.title.en}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}

        {/* More Information Section */}
        <div className="pt-2 border-t border-zinc-200/80 dark:border-zinc-800/60 space-y-1.5">
          <h4 className="px-2 text-xs font-bold text-zinc-900 dark:text-zinc-100 tracking-wider">
            {isId ? "Informasi Lainnya" : "More information"}
          </h4>
          <ul className="space-y-0.5 text-xs">
            <li>
              <a
                href="https://ollama.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-3 py-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 transition-colors"
              >
                <span>Download Ollama</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </li>
            <li>
              <Link
                href="/router"
                className="flex items-center justify-between px-3 py-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 transition-colors"
              >
                <span>AI Proxy Router</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </Link>
            </li>
            <li>
              <Link
                href="/skills"
                className="flex items-center justify-between px-3 py-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 transition-colors"
              >
                <span>AI Agent Skills</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}

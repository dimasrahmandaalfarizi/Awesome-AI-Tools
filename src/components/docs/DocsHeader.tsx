"use client"

import * as React from "react"
import { Link, usePathname, useRouter } from "@/i18n/routing"
import { useLocale } from "next-intl"
import { Search, Globe, ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

export interface DocsHeaderProps {
  activeTab: "guide" | "integrations" | "api-reference"
  onTabChange?: (tab: "guide" | "integrations" | "api-reference") => void
}

export function DocsHeader({ activeTab }: DocsHeaderProps) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const isId = locale === "id"

  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"))
  }

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "id" : "en"
    router.replace(pathname, { locale: nextLocale })
  }

  const tabs = [
    { id: "guide" as const, label: isId ? "Panduan" : "Guide", href: "/docs/quickstart" },
    { id: "integrations" as const, label: isId ? "Integrasi" : "Integrations", href: "/docs/cursor" },
    { id: "api-reference" as const, label: isId ? "Referensi API" : "API Reference", href: "/docs/chat-completions" },
  ]

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-[var(--border)] bg-[var(--background)]/85 px-4 sm:px-8 backdrop-blur-md transition-colors">
      {/* Center/Left: Navigation Tabs */}
      <div className="flex items-center gap-6 text-sm">
        <nav className="flex items-center gap-1 sm:gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[var(--surface-hover)] text-[var(--foreground)] font-semibold border border-[var(--border)] shadow-2xs"
                    : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
                }`}
              >
                {tab.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Right: Quick Action Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Desktop Quick Search Button */}
        <button
          type="button"
          onClick={handleOpenSearch}
          className="hidden md:flex items-center gap-2 px-2.5 py-1 text-xs rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--muted)] transition-all cursor-pointer shadow-2xs"
          title="Search docs"
        >
          <Search className="w-3.5 h-3.5" />
          <span>{isId ? "Cari..." : "Search..."}</span>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-[var(--background)] text-[var(--muted)] border border-[var(--border)]">
            Ctrl K
          </kbd>
        </button>

        {/* Language Switcher */}
        <button
          type="button"
          onClick={toggleLanguage}
          className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] transition-colors cursor-pointer border border-transparent hover:border-[var(--border)]"
          title="Toggle Language"
        >
          <Globe className="w-3.5 h-3.5" />
          <span className="uppercase text-[11px] font-mono font-semibold">{locale}</span>
        </button>

        {/* Theme Toggle */}
        <div className="scale-90">
          <ThemeToggle />
        </div>

        <div className="h-4 w-px bg-[var(--border)] mx-0.5 hidden sm:block" />

        {/* Back to Tools Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors px-2 py-1 rounded-lg hover:bg-[var(--surface)]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isId ? "Kembali" : "Back to Home"}</span>
        </Link>
      </div>
    </header>
  )
}

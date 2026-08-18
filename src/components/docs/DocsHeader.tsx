"use client"

import * as React from "react"
import { Link } from "@/i18n/routing"
import { useLocale } from "next-intl"

export interface DocsHeaderProps {
  activeTab: "guide" | "integrations" | "api-reference"
  onTabChange?: (tab: "guide" | "integrations" | "api-reference") => void
}

export function DocsHeader({ activeTab }: DocsHeaderProps) {
  const locale = useLocale()
  const isId = locale === "id"

  const tabs = [
    { id: "guide" as const, label: isId ? "Panduan" : "Guide", href: "/docs/quickstart" },
    { id: "integrations" as const, label: isId ? "Integrasi" : "Integrations", href: "/docs/cursor" },
    { id: "api-reference" as const, label: isId ? "Referensi API" : "API Reference", href: "/docs/chat-completions" },
  ]

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-black/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-8 text-sm">
        <nav className="flex items-center gap-6">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`relative py-4 font-medium transition-colors ${
                  isActive
                    ? "text-zinc-900 dark:text-white font-semibold"
                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-900 dark:bg-white" />
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="flex items-center gap-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
        <Link
          href="/"
          className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
        >
          {isId ? "← Kembali ke Direktori Alat" : "← Back to Tools"}
        </Link>
      </div>
    </header>
  )
}

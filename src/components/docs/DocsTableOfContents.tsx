"use client"

import * as React from "react"
import { useLocale } from "next-intl"
import { List, Bot, ArrowUp } from "lucide-react"
import { DocTocItem } from "@/data/docs"
import { Link } from "@/i18n/routing"

export interface DocsTableOfContentsProps {
  toc: DocTocItem[]
}

export function DocsTableOfContents({ toc }: DocsTableOfContentsProps) {
  const locale = useLocale()
  const isId = locale === "id"
  const [activeId, setActiveId] = React.useState<string>("")

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0% 0% -60% 0%" }
    )

    toc.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [toc])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!toc || toc.length === 0) return null

  return (
    <div className="hidden xl:block w-64 shrink-0 py-8 pr-6">
      <div className="sticky top-20 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-[var(--foreground)] uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <List className="w-3.5 h-3.5 text-[var(--muted)]" />
              <span>{isId ? "Di halaman ini" : "On this page"}</span>
            </div>
            <button
              onClick={scrollToTop}
              className="text-[11px] text-[var(--muted)] hover:text-[var(--foreground)] flex items-center gap-1 cursor-pointer transition-colors"
              title="Scroll to top"
            >
              <ArrowUp className="w-3 h-3" />
              <span>Top</span>
            </button>
          </div>

          <nav className="relative space-y-0.5 text-xs border-l border-[var(--border)] pl-3">
            {toc.map((item) => {
              const isActive = activeId === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block py-1 transition-all -ml-[13px] pl-3 border-l-2 ${
                    isActive
                      ? "text-[var(--foreground)] font-semibold border-[var(--foreground)]"
                      : "text-[var(--muted)] hover:text-[var(--foreground)] border-transparent"
                  }`}
                >
                  {isId ? item.title.id : item.title.en}
                </a>
              )
            })}
          </nav>
        </div>

        {/* AI Assistant Quick Prompt Card */}
        <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs space-y-2 shadow-2xs">
          <div className="flex items-center gap-2 font-semibold text-[var(--foreground)]">
            <Bot className="w-4 h-4 text-[var(--primary)]" />
            <span>{isId ? "Butuh Bantuan?" : "Need Help?"}</span>
          </div>
          <p className="text-[11px] text-[var(--muted)] leading-relaxed">
            {isId
              ? "Tanyakan apa pun tentang panduan ini langsung ke AI Copilot."
              : "Ask questions about this guide directly to the AI Copilot."}
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center justify-center w-full px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all"
          >
            {isId ? "Mulai Tanya Copilot →" : "Ask Copilot →"}
          </Link>
        </div>
      </div>
    </div>
  )
}

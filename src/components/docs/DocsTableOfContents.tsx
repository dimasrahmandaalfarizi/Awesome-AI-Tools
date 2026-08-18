"use client"

import * as React from "react"
import { useLocale } from "next-intl"
import { List } from "lucide-react"
import { DocTocItem } from "@/data/docs"

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

  if (!toc || toc.length === 0) return null

  return (
    <div className="hidden xl:block w-64 shrink-0 py-8 pr-6">
      <div className="sticky top-20 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider">
          <List className="w-3.5 h-3.5" />
          <span>{isId ? "Di halaman ini" : "On this page"}</span>
        </div>

        <nav className="space-y-1 text-xs">
          {toc.map((item) => {
            const isActive = activeId === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`block py-1 transition-colors ${
                  isActive
                    ? "text-zinc-900 dark:text-white font-medium pl-2 border-l-2 border-zinc-900 dark:border-white"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 pl-2 border-l-2 border-transparent"
                }`}
              >
                {isId ? item.title.id : item.title.en}
              </a>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

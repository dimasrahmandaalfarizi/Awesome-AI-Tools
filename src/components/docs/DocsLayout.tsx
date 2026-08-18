"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"
import { DocPage } from "@/data/docs"
import { DocsSidebar } from "./DocsSidebar"
import { DocsHeader } from "./DocsHeader"
import { DocsContent } from "./DocsContent"
import { DocsTableOfContents } from "./DocsTableOfContents"

export interface DocsLayoutProps {
  doc: DocPage
}

export function DocsLayout({ doc }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
      {/* Mobile Topbar */}
      <div className="lg:hidden flex h-14 items-center justify-between px-4 border-b border-zinc-200 dark:border-zinc-800/80 bg-white/90 dark:bg-black/90 sticky top-0 z-50 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 -ml-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
          aria-label="Toggle Navigation"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <span className="font-semibold text-sm">Documentation</span>
        <div className="w-8" />
      </div>

      {/* Backdrop for mobile drawer */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Main Container */}
      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <DocsSidebar
          currentSlug={doc.slug}
          activeTab={doc.tab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Content Area offset by Sidebar width on Desktop (w-72 = 18rem) */}
        <div className="flex-1 flex flex-col lg:pl-72 min-w-0">
          {/* Desktop & Tablet Tabs Header */}
          <DocsHeader activeTab={doc.tab} />

          {/* Body Content & Right TOC */}
          <main className="flex-1 flex justify-center w-full">
            <div className="w-full max-w-6xl flex justify-between">
              <DocsContent doc={doc} />
              <DocsTableOfContents toc={doc.toc} />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

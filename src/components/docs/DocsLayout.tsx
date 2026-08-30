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
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col font-sans selection:bg-[var(--surface-hover)]">
      {/* Mobile Topbar */}
      <div className="lg:hidden flex h-14 items-center justify-between px-4 border-b border-[var(--border)] bg-[var(--background)]/90 sticky top-0 z-50 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 -ml-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
          aria-label="Toggle Navigation"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <span className="font-semibold text-sm font-heading">Documentation</span>
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

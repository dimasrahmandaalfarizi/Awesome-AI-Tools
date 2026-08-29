"use client"

import * as React from "react"
import { Compass, Home, BookOpen, Terminal } from "lucide-react"
import { useLocale } from "next-intl"
import { Link } from "@/i18n/routing"

export default function NotFound() {
  const locale = useLocale()
  const isId = locale === "id"

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] text-[var(--foreground)] px-4 font-sans">
      <div className="max-w-md w-full p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm text-center space-y-6">
        <div className="w-12 h-12 rounded-xl bg-[var(--foreground)]/5 border border-[var(--border)] text-[var(--foreground)] flex items-center justify-center mx-auto">
          <Compass className="w-6 h-6 animate-pulse" />
        </div>

        <div className="space-y-2">
          <div className="text-[11px] font-mono text-[var(--muted)] uppercase tracking-widest">
            HTTP 404
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            {isId ? "Halaman Tidak Ditemukan" : "Page Not Found"}
          </h1>
          <p className="text-xs text-[var(--muted)] leading-relaxed">
            {isId
              ? "URL yang Anda tuju tidak tersedia atau telah dipindahkan ke direktori baru."
              : "The resource you requested does not exist or has been relocated to another path."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 text-xs font-mono font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{isId ? "Kembali ke Beranda" : "Back to Home"}</span>
          </Link>

          <Link
            href="/docs"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--surface-hover)] text-xs font-mono font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isId ? "Dokumentasi" : "Docs"}</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-[var(--border)]/60 text-[11px] text-[var(--muted)] flex items-center justify-center gap-1.5 font-mono">
          <Terminal className="w-3 h-3" />
          <span>Awesome AI Tools — 2,582 Skills & 68 Subagents</span>
        </div>
      </div>
    </div>
  )
}

"use client"

import * as React from "react"
import { AlertTriangle, RotateCcw, Home, Terminal } from "lucide-react"
import { useLocale } from "next-intl"
import { Link } from "@/i18n/routing"

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const locale = useLocale()
  const isId = locale === "id"

  React.useEffect(() => {
    // Log exception to telemetry / console in production
    console.error("[Awesome AI Tools Application Error]:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] text-[var(--foreground)] px-4 font-sans">
      <div className="max-w-md w-full p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm text-center space-y-6">
        <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-bold tracking-tight">
            {isId ? "Terjadi Kendala Sistem" : "Something Went Wrong"}
          </h1>
          <p className="text-xs text-[var(--muted)] leading-relaxed">
            {isId
              ? "Aplikasi mendeteksi error tak terduga pada sesi ini. Log telah dicatat secara aman."
              : "An unexpected runtime exception occurred. Error diagnostics have been securely logged."}
          </p>
          {error?.digest && (
            <p className="text-[10px] font-mono text-[var(--muted)]/70 bg-[var(--background)] py-1 px-2 rounded-md border border-[var(--border)] inline-block">
              Digest ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 text-xs font-mono font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isId ? "Coba Lagi" : "Try Again"}</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--surface-hover)] text-xs font-mono font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{isId ? "Beranda" : "Home"}</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-[var(--border)]/60 text-[11px] text-[var(--muted)] flex items-center justify-center gap-1.5 font-mono">
          <Terminal className="w-3 h-3" />
          <span>Awesome AI Tools Agentic Suite</span>
        </div>
      </div>
    </div>
  )
}

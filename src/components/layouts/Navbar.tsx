"use client"

import { Link, usePathname, useRouter } from "@/i18n/routing"
import { useTranslations, useLocale } from "next-intl"
import { Search, Sparkles, Server, Globe, Scale } from "lucide-react"
import { Button } from "../ui/Button"

export function Navbar() {
  const t = useTranslations("Navbar")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleOpenCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"))
  }

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "id" : "en"
    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand & Navigation */}
        <div className="flex items-center gap-6">
          <Link href="/" className="font-heading font-bold text-xl tracking-tight hover:opacity-90 transition-opacity">
            Awesome AI <span className="text-[var(--primary)]">Tools</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-[var(--muted)]">
            <Link href="/categories" className="hover:text-[var(--foreground)] transition-colors">
              {t("categories")}
            </Link>
            <Link href="/skills" className="flex items-center gap-1.5 hover:text-[var(--primary)] transition-colors font-semibold text-[var(--foreground)]">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
              {t("skills")}
            </Link>
            <Link href="/router" className="flex items-center gap-1.5 hover:text-[var(--primary)] transition-colors">
              <Server className="w-3.5 h-3.5 text-[var(--primary)]" />
              {t("router")}
            </Link>
            <Link href="/compare" className="flex items-center gap-1.5 hover:text-[var(--foreground)] transition-colors">
              <Scale className="w-3.5 h-3.5 text-[var(--secondary)]" />
              {t("compare")}
            </Link>
          </nav>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Global Search Shortcut Button */}
          <button
            onClick={handleOpenCommandPalette}
            className="flex items-center gap-2 h-9 px-3 rounded-full border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] text-sm text-[var(--muted)] transition-all cursor-pointer group"
          >
            <Search className="h-3.5 w-3.5 text-[var(--muted)] group-hover:text-[var(--primary)] transition-colors" />
            <span className="hidden sm:inline text-xs">{t("search")}</span>
            <kbd className="hidden sm:inline-flex text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-[var(--background)] border border-[var(--border)] text-[var(--muted)]">
              ⌘K
            </kbd>
          </button>

          {/* Language Switcher Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="h-9 px-2.5 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--surface)] border border-[var(--border)] rounded-full flex items-center gap-1.5"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-[var(--primary)]" />
            <span className="uppercase">{locale}</span>
          </Button>

          {/* Submit Tool Button */}
          <Button
            size="sm"
            className="hidden sm:inline-flex bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--primary)]/90 text-xs font-semibold rounded-full"
            asChild
          >
            <a href="https://github.com" target="_blank" rel="noreferrer">
              {t("submitTool")}
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}

"use client"

import { useState } from "react"
import { Link, usePathname, useRouter } from "@/i18n/routing"
import { useTranslations, useLocale } from "next-intl"
import { Search, Globe, Menu, X } from "lucide-react"
import { Button } from "../ui/Button"
import { ThemeToggle } from "../ui/ThemeToggle"
import { useBookmarks } from "@/components/providers/BookmarkProvider"

export function Navbar() {
  const t = useTranslations("Navbar")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { count } = useBookmarks()

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
          <Link href="/" className="font-heading font-bold text-lg sm:text-xl tracking-tight hover:opacity-90 transition-opacity shrink-0">
            Awesome AI <span className="text-[var(--primary)]">Tools</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium">
            <Link 
              href="/categories" 
              className={`transition-colors ${pathname.startsWith("/categories") ? "text-[var(--foreground)] font-semibold" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
            >
              {t("categories")}
            </Link>
            <Link 
              href="/skills" 
              className={`transition-colors ${pathname.startsWith("/skills") ? "text-[var(--primary)] font-semibold" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
            >
              {t("skills")}
            </Link>
            <Link 
              href="/agents" 
              className={`transition-colors ${pathname.startsWith("/agents") ? "text-[var(--primary)] font-semibold" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
            >
              {t("agents")}
            </Link>
            <Link 
              href="/apis" 
              className={`transition-colors ${pathname.startsWith("/apis") ? "text-[var(--primary)] font-semibold" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
            >
              {t("apis")}
            </Link>
            <Link 
              href="/router" 
              className={`transition-colors ${pathname.startsWith("/router") ? "text-[var(--primary)] font-semibold" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
            >
              {t("router")}
            </Link>
            <Link 
              href="/chat" 
              className={`transition-colors ${pathname.startsWith("/chat") ? "text-[var(--foreground)] font-semibold" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
            >
              {t("aiChat")}
            </Link>
            <Link 
              href="/stack" 
              className={`flex items-center gap-1.5 transition-colors ${pathname.startsWith("/stack") ? "text-[var(--foreground)] font-semibold" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
            >
              <span>{t("stack")}</span>
              {count > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-[var(--primary)]/15 text-[var(--primary)]">
                  {count}
                </span>
              )}
            </Link>
            <Link 
              href="/docs/quickstart" 
              className={`transition-colors ${pathname.startsWith("/docs") ? "text-[var(--foreground)] font-semibold" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
            >
              {t("docs")}
            </Link>
            <Link 
              href="/compare" 
              className={`transition-colors ${pathname.startsWith("/compare") ? "text-[var(--foreground)] font-semibold" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
            >
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

          {/* Theme Switcher Toggle (Desktop/Tablet) */}
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

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

          {/* Mobile Hamburguer Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-full border border-[var(--border)] hover:bg-[var(--surface)] transition-all cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-4 w-4 text-[var(--foreground)]" /> : <Menu className="h-4 w-4 text-[var(--foreground)]" />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md shadow-lg transition-all duration-200">
          <nav className="flex flex-col p-4 gap-1 text-sm font-medium">
            <Link
              href="/categories"
              onClick={() => setIsOpen(false)}
              className="hover:text-[var(--foreground)] transition-colors py-3 border-b border-[var(--border)]/30"
            >
              {t("categories")}
            </Link>
            <Link
              href="/skills"
              onClick={() => setIsOpen(false)}
              className="hover:text-[var(--primary)] transition-colors py-3 border-b border-[var(--border)]/30"
            >
              {t("skills")}
            </Link>
            <Link
              href="/agents"
              onClick={() => setIsOpen(false)}
              className="hover:text-[var(--primary)] transition-colors font-semibold text-[var(--foreground)] py-3 border-b border-[var(--border)]/30"
            >
              {t("agents")}
            </Link>
            <Link
              href="/apis"
              onClick={() => setIsOpen(false)}
              className="hover:text-[var(--primary)] transition-colors py-3 border-b border-[var(--border)]/30"
            >
              {t("apis")}
            </Link>
            <Link
              href="/router"
              onClick={() => setIsOpen(false)}
              className="hover:text-[var(--primary)] transition-colors py-3 border-b border-[var(--border)]/30"
            >
              {t("router")}
            </Link>
            <Link
              href="/chat"
              onClick={() => setIsOpen(false)}
              className="hover:text-[var(--foreground)] transition-colors py-3 border-b border-[var(--border)]/30"
            >
              {t("aiChat")}
            </Link>
            <Link
              href="/stack"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between hover:text-[var(--foreground)] transition-colors py-3 border-b border-[var(--border)]/30"
            >
              <span>{t("stack")}</span>
              {count > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[var(--primary)]/15 text-[var(--primary)]">
                  {count}
                </span>
              )}
            </Link>
            <Link
              href="/docs/quickstart"
              onClick={() => setIsOpen(false)}
              className="hover:text-[var(--foreground)] transition-colors py-3 border-b border-[var(--border)]/30"
            >
              {t("docs")}
            </Link>
            <Link
              href="/compare"
              onClick={() => setIsOpen(false)}
              className="hover:text-[var(--foreground)] transition-colors py-3"
            >
              {t("compare")}
            </Link>

            {/* Theme Selector inside mobile menu for extra small screens */}
            <div className="pt-4 border-t border-[var(--border)]/30 flex items-center justify-between px-3 sm:hidden">
              <span className="text-xs text-[var(--muted)] font-medium">Theme</span>
              <ThemeToggle />
            </div>

            {/* Submit Tool Button in Mobile Menu for small screens */}
            <div className="pt-4 sm:hidden">
              <Button
                size="sm"
                className="w-full bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--primary)]/90 text-xs font-semibold rounded-full"
                asChild
              >
                <a href="https://github.com" target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)}>
                  {t("submitTool")}
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

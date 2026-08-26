import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"

export function Footer() {
  const t = useTranslations("Footer")
  const tNav = useTranslations("Navbar")

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)] mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-heading font-bold text-xl tracking-tight mb-4 inline-block hover:opacity-90 transition-opacity">
              Awesome AI <span className="text-[var(--primary)]">Tools</span>
            </Link>
            <p className="text-[var(--muted)] text-sm max-w-sm leading-relaxed">
              {t("tagline")}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-tight">{t("explore")}</h4>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li><Link href="/categories" className="hover:text-[var(--primary)] transition-colors">{tNav("categories")}</Link></li>
              <li><Link href="/skills" className="hover:text-[var(--primary)] transition-colors">{tNav("skills")}</Link></li>
              <li><Link href="/apis" className="hover:text-[var(--primary)] transition-colors">{tNav("apis")}</Link></li>
              <li><Link href="/router" className="hover:text-[var(--primary)] transition-colors">{tNav("router")}</Link></li>
              <li><Link href="/docs/quickstart" className="hover:text-[var(--primary)] transition-colors">{tNav("docs")}</Link></li>
              <li><Link href="/collections" className="hover:text-[var(--primary)] transition-colors">{tNav("collections")}</Link></li>
              <li><Link href="/compare" className="hover:text-[var(--primary)] transition-colors">{tNav("compare")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-tight">{t("community")}</h4>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[var(--primary)] transition-colors">{t("github")}</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[var(--primary)] transition-colors">{t("submit")}</a></li>
              <li><a href="https://modelcontextprotocol.io" target="_blank" rel="noreferrer" className="hover:text-[var(--primary)] transition-colors">{t("mcpDocs")}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between text-sm text-[var(--muted)]">
          <p>© {new Date().getFullYear()} Awesome AI Tools. {t("copyright")}</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="text-xs text-[var(--muted)]">{t("builtFor")}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

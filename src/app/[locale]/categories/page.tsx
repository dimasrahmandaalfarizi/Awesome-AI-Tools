import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"
import { CATEGORIES, TOOLS } from "@/data/mock"
import { getLocalizedCategory } from "@/lib/localizeData"
import { Link } from "@/i18n/routing"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { ArrowRight } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

export default async function CategoriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "Categories" })

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-[calc(100vh-16rem)] bg-[var(--background)]">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="mb-12 text-center max-w-2xl mx-auto space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t("title")}
            </h1>
            <p className="text-xl text-[var(--muted)]">
              {t("description")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((c) => {
              const category = getLocalizedCategory(c, locale)
              const toolsCount = TOOLS.filter(t => t.categoryId === category.id).length

              return (
                <Link key={category.id} href={`/categories/${category.slug}`}>
                  <Card className="flex flex-col h-full hover:border-[var(--primary)] hover:shadow-lg transition-all group bg-[var(--surface)] border-[var(--border)]">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-xl group-hover:text-[var(--primary)] transition-colors tracking-tight">
                          {category.name}
                        </CardTitle>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--background)] border border-[var(--border)] text-[var(--muted)]">
                          {t("toolsCount", { count: toolsCount })}
                        </span>
                      </div>
                      <CardDescription className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                        {category.description}
                      </CardDescription>
                      <div className="mt-4 pt-4 border-t border-[var(--border)]/50 flex items-center text-xs font-semibold text-[var(--primary)] group-hover:translate-x-1 transition-transform">
                        {t("exploreCategory")} <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

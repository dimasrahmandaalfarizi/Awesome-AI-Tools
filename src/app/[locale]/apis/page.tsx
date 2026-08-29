import { PUBLIC_APIS, PUBLIC_API_CATEGORIES } from "@/data/apis"
import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"
import { PublicApisClient } from "./PublicApisClient"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Metadata } from "next"

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "PublicApis" })

  return {
    title: `${t("title")} | Awesome AI Tools`,
    description: t("description")
  }
}

export default async function PublicApisPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "PublicApis" })

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-[calc(100vh-16rem)] bg-[var(--background)]">
        {/* Header Hero Section */}
        <section className="border-b border-[var(--border)] bg-[var(--surface)]/30 pt-16 pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-4 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {t("badge")}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)]">
                {t("title")}
              </h1>
              <p className="text-lg md:text-xl text-[var(--muted)] text-balance">
                {t("description")}
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="container mx-auto px-4 py-12">
          <PublicApisClient apis={PUBLIC_APIS} categories={PUBLIC_API_CATEGORIES} />
        </section>
      </main>
      <Footer />
    </>
  )
}

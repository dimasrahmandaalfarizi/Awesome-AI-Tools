import { AI_SKILLS } from "@/data/mock"
import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"
import { SkillsClient } from "./SkillsClient"
import { getTranslations, setRequestLocale } from "next-intl/server"

export default async function SkillsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "Skills" })

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-[calc(100vh-16rem)] bg-[var(--background)]">
        <section className="border-b border-[var(--border)] bg-[var(--surface)]/30 pt-16 pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{t("title")}</h1>
              <p className="text-xl text-[var(--muted)] text-balance">
                {t("description")}
              </p>
            </div>
          </div>
        </section>
        <section className="container mx-auto px-4 py-16">
          <SkillsClient skills={AI_SKILLS} />
        </section>
      </main>
      <Footer />
    </>
  )
}

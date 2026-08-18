import { AI_SKILLS } from "@/data/mock"
import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/Badge"
import { Link } from "@/i18n/routing"
import { ArrowLeft } from "lucide-react"
import { ExportSkill } from "@/components/features/ExportSkill"
import { getTranslations, setRequestLocale } from "next-intl/server"

export default async function SkillPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const resolvedParams = await params
  const { locale, slug } = resolvedParams
  setRequestLocale(locale)
  const skill = AI_SKILLS.find(s => s.slug === slug)
  const t = await getTranslations({ locale, namespace: "Skills" })
  
  if (!skill) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-[calc(100vh-16rem)] bg-[var(--background)]">
        <section className="container mx-auto px-4 py-8">
          <Link href="/skills" className="inline-flex items-center text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> {t("backToSkills")}
          </Link>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4 mb-8">
              <h1 className="text-4xl font-bold tracking-tight">{skill.name}</h1>
              <p className="text-xl text-[var(--muted)]">{skill.description}</p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {skill.frameworks.map(fw => (
                  <Badge key={fw} variant="outline" className="border-[var(--primary)] text-[var(--primary)]">
                    {fw}
                  </Badge>
                ))}
                <Badge variant="secondary">{t("byAuthor")} {skill.author || "Community"}</Badge>
              </div>
            </div>

            <ExportSkill slug={skill.slug} content={skill.content} description={skill.description} />
            
            <div className="mt-12 p-6 rounded-2xl bg-[var(--primary)]/5 border border-[var(--primary)]/20">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary)]">{t("howToUse")}</h3>
              <ul className="space-y-3 text-sm text-[var(--muted)]">
                <li>• <strong>{t("cursorModern")}:</strong> {t("cursorModernDesc", { filename: `${skill.slug}.mdc` })}</li>
                <li>• <strong>{t("claudeCode")}:</strong> {t("claudeCodeDesc")}</li>
                <li>• <strong>{t("cline")}:</strong> {t("clineDesc")}</li>
                <li>• <strong>{t("windsurf")}:</strong> {t("windsurfDesc")}</li>
                <li>• <strong>{t("cliQuickAdd")}:</strong> <code className="bg-[#0d1117] text-pink-400 font-mono px-2 py-0.5 rounded border border-[#30363d]">npx awesome-ai-tools add {skill.slug}</code></li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

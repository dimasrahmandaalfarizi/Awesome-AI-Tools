import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"
import { CATEGORIES, TOOLS } from "@/data/mock"
import { getLocalizedCategory, getLocalizedTool } from "@/lib/localizeData"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { ToolLogo } from "@/components/ui/ToolLogo"
import { ExternalLink, Code } from "lucide-react"
import { Link } from "@/i18n/routing"
import { getTranslations, setRequestLocale } from "next-intl/server"

export default async function ToolPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;
  setRequestLocale(locale);
  const rawTool = TOOLS.find(t => t.slug === slug);
  const t = await getTranslations({ locale, namespace: "ToolDetail" });
  
  if (!rawTool) {
    notFound()
  }

  const tool = getLocalizedTool(rawTool, locale)
  const rawCat = CATEGORIES.find(c => c.id === tool.categoryId)
  const category = rawCat ? getLocalizedCategory(rawCat, locale) : undefined

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-[calc(100vh-16rem)] bg-[var(--background)]">
        {/* Tool Header */}
        <section className="border-b border-[var(--border)] bg-[var(--surface)]/30 pt-16 pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-8">

              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <ToolLogo name={tool.name} website={tool.website} logo={tool.logo} size="lg" />
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-4xl font-bold tracking-tight">{tool.name}</h1>
                    {tool.featured && (
                      <Badge variant="accent" className="h-6">{t("featured")}</Badge>
                    )}
                  </div>
                </div>
                
                <p className="text-xl text-[var(--muted)] text-balance">
                  {tool.description}
                </p>

                <div className="flex items-center gap-3 flex-wrap text-sm">
                  <Badge variant={tool.isOpenSource ? "accent" : "secondary"}>
                    {tool.isOpenSource ? t("openSource") : tool.pricing}
                  </Badge>
                  {category && (
                    <Link href={`/categories/${category.slug}`}>
                      <Badge variant="outline" className="hover:bg-[var(--surface)] cursor-pointer">
                        {category.name}
                      </Badge>
                    </Link>
                  )}
                  <span className="text-[var(--muted)]">
                    {t("added")}: {new Date(tool.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-auto">
                <Button size="lg" asChild className="w-full">
                  <a href={tool.website} target="_blank" rel="noreferrer">
                    {t("visitWebsite")} <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                {tool.github && (
                  <Button size="lg" variant="outline" asChild className="w-full">
                    <a href={tool.github} target="_blank" rel="noreferrer">
                      <Code className="mr-2 h-4 w-4" /> {t("viewSource")}
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Tool Details */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-16">
              
              {/* Screenshot Preview */}
              {tool.screenshotUrl && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">{t("preview")}</h2>
                  <div className="w-full aspect-video bg-[var(--surface)]/50 border border-[var(--border)] rounded-2xl overflow-hidden relative group shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={tool.screenshotUrl} 
                      alt={`Screenshot of ${tool.name}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-[var(--primary)]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
              )}

              {/* Problem & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-bold mb-4 text-[var(--muted)]">{t("problem")}</h2>
                  <p className="text-lg leading-relaxed">{tool.problem || t("infoNotAvailable")}</p>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-4 text-[var(--primary)]">{t("solution")}</h2>
                  <p className="text-lg leading-relaxed">{tool.solution || t("infoNotAvailable")}</p>
                </div>
              </div>

              {/* Challenge */}
              <div>
                <h2 className="text-2xl font-bold mb-6">{t("challenge")}</h2>
                <div className="prose prose-invert max-w-none text-[var(--muted)] text-lg leading-relaxed">
                  <p>{tool.challenge || t("infoNotAvailable")}</p>
                </div>
              </div>

              {/* Key Features & Tech Choices */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8">
                  <h2 className="text-xl font-bold mb-6">{t("keyFeatures")}</h2>
                  <ul className="space-y-4">
                    {(tool.keyFeatures || []).map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-2 shrink-0"></div>
                        <span className="text-[var(--muted)]">{feature}</span>
                      </li>
                    ))}
                    {(!tool.keyFeatures || tool.keyFeatures.length === 0) && (
                      <p className="text-[var(--muted)]">{t("featuresNotListed")}</p>
                    )}
                  </ul>
                </div>

                <div className="space-y-8">
                  <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8">
                    <h2 className="text-xl font-bold mb-6">{t("techChoices")}</h2>
                    <div className="flex flex-wrap gap-2">
                      {(tool.techChoices || []).map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-[var(--background)] border border-[var(--border)] rounded-full text-sm font-medium text-[var(--muted)]">
                          {tech}
                        </span>
                      ))}
                      {(!tool.techChoices || tool.techChoices.length === 0) && (
                        <p className="text-[var(--muted)]">{t("techNotSpecified")}</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8">
                    <h2 className="text-xl font-bold mb-4">{t("targetUser")}</h2>
                    <p className="text-[var(--muted)]">{tool.targetUser || t("generalDevelopers")}</p>
                  </div>
                </div>
              </div>

              {/* Impact */}
              <div className="border-t border-[var(--border)] pt-12">
                <h2 className="text-2xl font-bold mb-6">{t("impact")}</h2>
                <p className="text-xl leading-relaxed text-[var(--muted)] italic border-l-4 border-[var(--primary)] pl-6">
                  "{tool.impact || "The impact of this tool is currently being measured by the community."}"
                </p>
              </div>
              {/* Guide / How to Use */}
              {tool.guide && tool.guide.length > 0 && (
                <div className="border-t border-[var(--border)] pt-12">
                  <h2 className="text-2xl font-bold mb-8">{t("howToUse")}</h2>
                  <div className="space-y-6">
                    {tool.guide.map((step) => (
                      <div key={step.step} className="flex gap-6">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center font-bold text-[var(--primary)]">
                          {step.step}
                        </div>
                        <div className="pt-1.5">
                          <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                          <p className="text-[var(--muted)] leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
            </div>

            <div className="space-y-8">
              <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
                <h3 className="font-semibold mb-6 text-lg">{t("quickDetails")}</h3>
                <dl className="space-y-4 text-sm">
                  <div className="flex justify-between border-b border-[var(--border)] pb-3">
                    <dt className="text-[var(--muted)] flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></div> {t("pricing")}</dt>
                    <dd className="font-medium text-right text-[var(--foreground)]">{tool.pricing}</dd>
                  </div>
                  <div className="flex justify-between border-b border-[var(--border)] pb-3">
                    <dt className="text-[var(--muted)] flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></div> {t("platforms")}</dt>
                    <dd className="font-medium text-right text-[var(--foreground)]">{tool.platform.join(", ")}</dd>
                  </div>
                  <div className="flex justify-between pb-2 pt-1">
                    <dt className="text-[var(--muted)] flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)]"></div> {t("updated")}</dt>
                    <dd className="font-medium text-right text-[var(--foreground)]">{new Date(tool.lastUpdated).toLocaleDateString()}</dd>
                  </div>
                </dl>
              </div>

              <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--background)]">
                <h3 className="font-semibold mb-4">{t("alternatives")}</h3>
                <div className="space-y-4">
                  {TOOLS.filter(t => t.categoryId === tool.categoryId && t.id !== tool.id).slice(0, 3).map(alt => (
                    <Link key={alt.id} href={`/tools/${alt.slug}`} className="flex items-center gap-3 group">
                      <ToolLogo name={alt.name} website={alt.website} logo={alt.logo} size="md" />
                      <div>
                        <div className="font-medium group-hover:text-[var(--primary)] transition-colors">{alt.name}</div>
                        <div className="text-xs text-[var(--muted)]">{alt.pricing}</div>
                      </div>
                    </Link>
                  ))}
                  {TOOLS.filter(t => t.categoryId === tool.categoryId && t.id !== tool.id).length === 0 && (
                    <p className="text-sm text-[var(--muted)]">{t("noAlternatives")}</p>
                  )}
                </div>
                <Button variant="outline" className="w-full mt-6" asChild>
                  <Link href="/compare">{t("compareTools")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

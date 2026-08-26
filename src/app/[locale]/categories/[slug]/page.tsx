import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"
import { CATEGORIES, TOOLS } from "@/data/mock"
import { getLocalizedCategory, getLocalizedTool } from "@/lib/localizeData"
import { notFound } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { BookmarkButton } from "@/components/ui/BookmarkButton"
import { ToolLogo } from "@/components/ui/ToolLogo"
import { Link } from "@/i18n/routing"
import { ExternalLink } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

export default async function CategoryPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;
  setRequestLocale(locale);
  const rawCategory = CATEGORIES.find(c => c.slug === slug);
  const tCat = await getTranslations({ locale, namespace: "Categories" });
  const tTool = await getTranslations({ locale, namespace: "ToolDetail" });
  
  if (!rawCategory) {
    notFound()
  }

  const category = getLocalizedCategory(rawCategory, locale)
  const categoryTools = TOOLS.filter(t => t.categoryId === category.id).map(t => getLocalizedTool(t, locale))

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-[calc(100vh-16rem)]">
        <div className="container mx-auto px-4 py-16">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">{category.name}</h1>
            <p className="text-xl text-[var(--muted)]">{category.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryTools.map((tool) => (
              <Card key={tool.id} className="flex flex-col h-full hover:border-[var(--primary)]/50 transition-colors group">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={tool.isOpenSource ? "accent" : "secondary"}>
                      {tool.isOpenSource ? tTool("openSource") : tool.pricing}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <ToolLogo name={tool.name} website={tool.website} logo={tool.logo} size="md" />
                    <Link href={`/tools/${tool.slug}`} className="hover:underline">
                      <CardTitle className="text-xl group-hover:text-[var(--primary)] transition-colors tracking-tight">{tool.name}</CardTitle>
                    </Link>
                  </div>
                  <CardDescription className="line-clamp-2 mt-3">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-6 flex justify-between items-center border-t border-[var(--border)]/50">
                  <div className="flex gap-2">
                    {tool.tags.map(tag => (
                      <span key={tag} className="text-xs text-[var(--muted)]">#{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <BookmarkButton toolId={tool.id} toolName={tool.name} size="sm" />
                    <a href={tool.website} target="_blank" rel="noreferrer" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {categoryTools.length === 0 && (
            <div className="text-center py-20 text-[var(--muted)]">
              {tCat("noTools")}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

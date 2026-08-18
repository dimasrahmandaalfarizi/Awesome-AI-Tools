import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"
import { COLLECTIONS, TOOLS, CATEGORIES } from "@/data/mock"
import { notFound } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { ToolLogo } from "@/components/ui/ToolLogo"
import { Link } from "@/i18n/routing"
import { ExternalLink } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

export default async function CollectionPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;
  setRequestLocale(locale);
  const collection = COLLECTIONS.find(c => c.slug === slug);
  const t = await getTranslations({ locale, namespace: "ToolDetail" });
  
  if (!collection) {
    notFound()
  }

  const collectionTools = TOOLS.filter(t => collection.toolIds.includes(t.id))

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-[calc(100vh-16rem)]">
        <div className="container mx-auto px-4 py-16">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">{collection.title}</h1>
            <p className="text-xl text-[var(--muted)]">{collection.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collectionTools.map((tool) => (
              <Card key={tool.id} className="flex flex-col h-full hover:border-[var(--muted)] hover:shadow-md transition-all group">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={tool.isOpenSource ? "accent" : "secondary"}>
                      {tool.isOpenSource ? t("openSource") : tool.pricing}
                    </Badge>
                    <div className="text-xs text-[var(--muted)] bg-[var(--background)] px-2 py-1 rounded-full border border-[var(--border)]">
                      {CATEGORIES.find(c => c.id === tool.categoryId)?.name}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <ToolLogo name={tool.name} website={tool.website} logo={tool.logo} size="md" />
                    <Link href={`/tools/${tool.slug}`} className="hover:underline">
                      <CardTitle className="text-xl group-hover:text-[var(--primary)] transition-all">{tool.name}</CardTitle>
                    </Link>
                  </div>
                  <CardDescription className="line-clamp-2 mt-2">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-6 flex justify-between items-center border-t border-[var(--border)]/50">
                  <div className="flex gap-2 flex-wrap">
                    {tool.tags.map(tag => (
                      <span key={tag} className="text-xs text-[var(--muted)]">#{tag}</span>
                    ))}
                  </div>
                  <a href={tool.website} target="_blank" rel="noreferrer" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors shrink-0">
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

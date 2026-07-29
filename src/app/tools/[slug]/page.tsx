import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { CATEGORIES, TOOLS } from "@/data/mock"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { ExternalLink, Code, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const tool = TOOLS.find(t => t.slug === resolvedParams.slug)
  
  if (!tool) {
    notFound()
  }

  const category = CATEGORIES.find(c => c.id === tool.categoryId)

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-[calc(100vh-16rem)] bg-[var(--background)]">
        {/* Tool Header */}
        <section className="border-b border-[var(--border)] bg-[var(--surface)]/30 pt-16 pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-8">
              {/* Logo Placeholder */}
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-4xl font-bold text-white shadow-lg shrink-0">
                {tool.name.charAt(0)}
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-4xl font-bold tracking-tight">{tool.name}</h1>
                  {tool.featured && (
                    <Badge variant="accent" className="h-6">Featured</Badge>
                  )}
                </div>
                
                <p className="text-xl text-[var(--muted)] text-balance">
                  {tool.description}
                </p>

                <div className="flex items-center gap-3 flex-wrap text-sm">
                  <Badge variant={tool.isOpenSource ? "accent" : "secondary"}>
                    {tool.isOpenSource ? "Open Source" : tool.pricing}
                  </Badge>
                  {category && (
                    <Link href={`/categories/${category.slug}`}>
                      <Badge variant="outline" className="hover:bg-[var(--surface)] cursor-pointer">
                        {category.name}
                      </Badge>
                    </Link>
                  )}
                  <span className="text-[var(--muted)]">
                    Added: {new Date(tool.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-auto">
                <Button size="lg" asChild className="w-full">
                  <a href={tool.website} target="_blank" rel="noreferrer">
                    Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                {tool.github && (
                  <Button size="lg" variant="outline" asChild className="w-full">
                    <a href={tool.github} target="_blank" rel="noreferrer">
                      <Code className="mr-2 h-4 w-4" /> View Source
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Tool Details */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-bold mb-4">About {tool.name}</h2>
                <div className="prose prose-invert max-w-none text-[var(--muted)] space-y-4">
                  <p>
                    {tool.description} This is a placeholder for a more comprehensive description that would typically come from a database markdown field. It highlights the key features, use cases, and problems this tool solves for developers.
                  </p>
                  <p>
                    The platform supports {tool.platform.join(", ")}, making it accessible for diverse development environments.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Features</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <li key={i} className="flex items-start gap-3 text-[var(--muted)]">
                      <CheckCircle2 className="h-5 w-5 text-[var(--secondary)] shrink-0 mt-0.5" />
                      <span>Feature {i} description goes here to showcase capabilities.</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                <h3 className="font-semibold mb-4">Details</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-[var(--border)] pb-2">
                    <dt className="text-[var(--muted)]">Pricing Model</dt>
                    <dd className="font-medium text-right">{tool.pricing}</dd>
                  </div>
                  <div className="flex justify-between border-b border-[var(--border)] pb-2">
                    <dt className="text-[var(--muted)]">Platforms</dt>
                    <dd className="font-medium text-right">{tool.platform.join(", ")}</dd>
                  </div>
                  <div className="flex justify-between border-b border-[var(--border)] pb-2">
                    <dt className="text-[var(--muted)]">Tags</dt>
                    <dd className="font-medium text-right max-w-[120px] truncate">{tool.tags.join(", ")}</dd>
                  </div>
                  <div className="flex justify-between pb-2">
                    <dt className="text-[var(--muted)]">Last Updated</dt>
                    <dd className="font-medium text-right">{new Date(tool.lastUpdated).toLocaleDateString()}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

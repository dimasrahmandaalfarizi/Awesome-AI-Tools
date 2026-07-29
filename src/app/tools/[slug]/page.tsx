import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { CATEGORIES, TOOLS } from "@/data/mock"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { ExternalLink, Code, CheckCircle2, X } from "lucide-react"
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
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-16">
              
              {/* Screenshots Mockup */}
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <div className="w-2 h-6 bg-[var(--primary)] rounded-full"></div> Gallery
                </h2>
                <div className="w-full aspect-video bg-[var(--surface)]/50 border border-[var(--border)] rounded-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-[var(--primary)]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex items-center justify-center h-full text-[var(--muted)] flex-col gap-2">
                    <div className="w-16 h-16 rounded-xl bg-[var(--background)] flex items-center justify-center border border-[var(--border)] shadow-lg">
                      📸
                    </div>
                    <span>Screenshot Placeholder</span>
                  </div>
                </div>
                <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-32 h-20 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex-shrink-0 opacity-60 hover:opacity-100 cursor-pointer transition-opacity"></div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <div className="w-2 h-6 bg-[var(--primary)] rounded-full"></div> About {tool.name}
                </h2>
                <div className="prose prose-invert max-w-none text-[var(--muted)] space-y-4 leading-relaxed text-lg">
                  <p>
                    {tool.description} This is a placeholder for a more comprehensive description that would typically come from a database markdown field. It highlights the key features, use cases, and problems this tool solves for developers.
                  </p>
                  <p>
                    The platform supports {tool.platform.join(", ")}, making it accessible for diverse development environments.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-6">
                  <h3 className="font-semibold text-green-500 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" /> Pros
                  </h3>
                  <ul className="space-y-3 text-[var(--muted)] text-sm">
                    <li>Excellent developer experience</li>
                    <li>Fast and responsive interface</li>
                    <li>Active community support</li>
                  </ul>
                </div>
                <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
                  <h3 className="font-semibold text-red-500 mb-4 flex items-center gap-2">
                    <X className="h-5 w-5" /> Cons
                  </h3>
                  <ul className="space-y-3 text-[var(--muted)] text-sm">
                    <li>Steep learning curve for beginners</li>
                    <li>Pricing can be expensive for large teams</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
                <h3 className="font-semibold mb-6 text-lg">Quick Details</h3>
                <dl className="space-y-4 text-sm">
                  <div className="flex justify-between border-b border-[var(--border)] pb-3">
                    <dt className="text-[var(--muted)] flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></div> Pricing</dt>
                    <dd className="font-medium text-right text-[var(--foreground)]">{tool.pricing}</dd>
                  </div>
                  <div className="flex justify-between border-b border-[var(--border)] pb-3">
                    <dt className="text-[var(--muted)] flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></div> Platforms</dt>
                    <dd className="font-medium text-right text-[var(--foreground)]">{tool.platform.join(", ")}</dd>
                  </div>
                  <div className="flex justify-between pb-2 pt-1">
                    <dt className="text-[var(--muted)] flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)]"></div> Updated</dt>
                    <dd className="font-medium text-right text-[var(--foreground)]">{new Date(tool.lastUpdated).toLocaleDateString()}</dd>
                  </div>
                </dl>
              </div>

              <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--background)]">
                <h3 className="font-semibold mb-4">Alternatives</h3>
                <div className="space-y-4">
                  {TOOLS.filter(t => t.categoryId === tool.categoryId && t.id !== tool.id).slice(0, 3).map(alt => (
                    <Link key={alt.id} href={`/tools/${alt.slug}`} className="flex items-center gap-3 group">
                      <div className="w-10 h-10 rounded-md bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center font-bold text-xs group-hover:border-[var(--primary)] transition-colors">
                        {alt.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium group-hover:text-[var(--primary)] transition-colors">{alt.name}</div>
                        <div className="text-xs text-[var(--muted)]">{alt.pricing}</div>
                      </div>
                    </Link>
                  ))}
                  {TOOLS.filter(t => t.categoryId === tool.categoryId && t.id !== tool.id).length === 0 && (
                    <p className="text-sm text-[var(--muted)]">No direct alternatives found.</p>
                  )}
                </div>
                <Button variant="outline" className="w-full mt-6" asChild>
                  <Link href="/compare">Compare Tools</Link>
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

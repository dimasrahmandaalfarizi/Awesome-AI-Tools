import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"
import { COLLECTIONS, TOOLS } from "@/data/mock"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"

export default function CollectionsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-[calc(100vh-16rem)]">
        <div className="container mx-auto px-4 py-16">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Collections</h1>
            <p className="text-xl text-[var(--muted)]">Curated lists of the best AI tools for specific use cases.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COLLECTIONS.map((collection) => {
              const toolsInCollection = TOOLS.filter(t => collection.toolIds.includes(t.id))
              
              return (
                <Link key={collection.id} href={`/collections/${collection.slug}`}>
                  <Card className="flex flex-col h-full hover:border-[var(--muted)] hover:shadow-md transition-all group">
                    <CardHeader>
                      <CardTitle className="text-xl group-hover:text-[var(--primary)] transition-all">
                        {collection.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {collection.description}
                      </CardDescription>
                      <div className="mt-4 pt-4 border-t border-[var(--border)]/50 text-sm text-[var(--muted)]">
                        {toolsInCollection.length} tools
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

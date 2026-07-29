"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, ArrowRight, Star, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { CATEGORIES, TOOLS, COLLECTIONS } from "@/data/mock"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")

  const featuredTools = TOOLS.filter(t => t.featured).slice(0, 6)
  
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32">
          {/* Clean Background */}
          <div className="absolute inset-0 -z-10 bg-[var(--background)]" />
          
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto space-y-8"
            >
              <Badge variant="secondary" className="px-3 py-1 mb-6 text-sm border-[var(--border)] border bg-[var(--surface)] text-[var(--foreground)]">
                <Star className="w-3.5 h-3.5 mr-2 text-[var(--warning)] fill-[var(--warning)]" />
                Over 1,000+ AI Tools Curated
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-balance">
                Discover the best <br />
                <span className="text-[var(--primary)]">
                  AI Developer Tools
                </span>
              </h1>
              <p className="text-lg md:text-xl text-[var(--muted)] text-balance max-w-2xl mx-auto">
                The largest curated collection of AI tools, frameworks, MCP servers, agents, and resources to supercharge your development workflow.
              </p>

              {/* Search Bar */}
              <form action="/search" className="relative max-w-2xl mx-auto mt-12 group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-[var(--muted)] group-focus-within:text-[var(--primary)] transition-colors" />
                </div>
                <Input
                  type="text"
                  name="q"
                  placeholder="Search for tools, categories, or keywords (e.g. 'coding assistant', 'cursor')..."
                  className="h-16 pl-14 pr-32 rounded-full text-lg shadow-md border-[var(--border)] bg-[var(--surface)] focus-visible:ring-[var(--primary)] transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-2 right-2 flex items-center">
                  <Button type="submit" className="rounded-full px-6 h-full font-semibold">
                    Search
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Explore Categories</h2>
            <Button variant="ghost" className="text-[var(--primary)]">
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.slice(0, 4).map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <Card className="hover:border-[var(--primary)]/50 transition-colors cursor-pointer h-full group">
                  <CardHeader>
                    <CardTitle className="group-hover:text-[var(--primary)] transition-colors">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending Tools */}
        <section className="container mx-auto px-4 py-16 border-t border-[var(--border)]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Trending Tools</h2>
              <p className="text-[var(--muted)] mt-1">The most popular AI tools this week.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <Card key={tool.id} className="flex flex-col h-full hover:shadow-md transition-shadow group">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={tool.isOpenSource ? "accent" : "secondary"}>
                      {tool.isOpenSource ? "Open Source" : tool.pricing}
                    </Badge>
                    <div className="text-xs text-[var(--muted)] bg-[var(--background)] px-2 py-1 rounded-full border border-[var(--border)]">
                      {CATEGORIES.find(c => c.id === tool.categoryId)?.name}
                    </div>
                  </div>
                  <Link href={`/tools/${tool.slug}`} className="hover:underline">
                    <CardTitle className="text-xl group-hover:text-[var(--primary)] transition-colors">{tool.name}</CardTitle>
                  </Link>
                  <CardDescription className="line-clamp-2 mt-2">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-6 flex justify-between items-center border-t border-[var(--border)]/50">
                  <div className="flex gap-2">
                    {tool.tags.map(tag => (
                      <span key={tag} className="text-xs text-[var(--muted)]">#{tag}</span>
                    ))}
                  </div>
                  <a href={tool.website} target="_blank" rel="noreferrer" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

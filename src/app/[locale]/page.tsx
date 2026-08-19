"use client"

import { motion } from "framer-motion"
import { ArrowRight, Star, ExternalLink } from "lucide-react"
import { Link } from "@/i18n/routing"
import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { BookmarkButton } from "@/components/ui/BookmarkButton"
import { ToolLogo } from "@/components/ui/ToolLogo"
import { CATEGORIES, TOOLS, COLLECTIONS } from "@/data/mock"
import { getLocalizedCategory, getLocalizedTool } from "@/lib/localizeData"
import { useTranslations, useLocale } from "next-intl"

export default function Home() {
  const t = useTranslations("Home")
  const locale = useLocale()
  const featuredTools = TOOLS.filter(t => t.featured).slice(0, 6).map(t => getLocalizedTool(t, locale))
  
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
                {t("heroBadge")}
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-balance">
                {t("heroTitle")} <br />
                <span className="text-[var(--primary)]">
                  {t("heroTitleHighlight")}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-[var(--muted)] text-balance max-w-2xl mx-auto">
                {t("heroDescription")}
              </p>

              {/* Library Usage Code Snippet */}
              <div className="max-w-2xl mx-auto mt-12 text-left bg-[#0d1117] rounded-xl overflow-hidden border border-[#30363d] shadow-2xl">
                <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="text-xs font-mono text-gray-400">awesome-ai-tools</div>
                  <div className="w-12"></div>
                </div>
                <div className="p-5 md:p-6 overflow-x-auto text-sm md:text-base font-mono text-gray-300 leading-relaxed">
                  <div className="text-gray-500 mb-1">{"// 1. Install via NPM"}</div>
                  <div className="mb-6 text-gray-100 font-semibold">
                    <span className="text-pink-400">npm</span> install awesome-ai-tools
                  </div>
                  
                  <div className="text-gray-500 mb-1">{"// 2. Import and use the data"}</div>
                  <div>
                    <span className="text-purple-400">import</span> {"{ getAllSkills, getAllTools }"} <span className="text-purple-400">from</span> <span className="text-green-300">'awesome-ai-tools'</span>;
                  </div>
                  <br />
                  <div>
                    <span className="text-purple-400">const</span> skills = <span className="text-blue-300">getAllSkills</span>();
                  </div>
                  <div>
                    <span className="text-purple-400">const</span> tools = <span className="text-blue-300">getAllTools</span>();
                  </div>
                  <br />
                  <div>
                    <span className="text-blue-300">console</span>.<span className="text-blue-300">log</span>(<span className="text-green-300">`Loaded </span><span className="text-purple-400">${"{"}</span>skills.length<span className="text-purple-400">{"}"}</span><span className="text-green-300"> AI workflows!`</span>);
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">{t("exploreCategories")}</h2>
            <Link href="/categories">
              <Button variant="ghost" className="text-[var(--primary)]">
                {t("viewAll")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.slice(0, 4).map((c) => {
              const category = getLocalizedCategory(c, locale)
              return (
                <Link key={category.id} href={`/categories/${category.slug}`}>
                  <Card className="hover:border-[var(--primary)]/50 transition-colors cursor-pointer h-full group">
                    <CardHeader>
                      <CardTitle className="group-hover:text-[var(--primary)] transition-colors">{category.name}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Trending Tools */}
        <section className="container mx-auto px-4 py-16 border-t border-[var(--border)]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{t("trendingTools")}</h2>
              <p className="text-[var(--muted)] mt-1">{t("trendingDesc")}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <Card key={tool.id} className="flex flex-col h-full hover:shadow-md transition-shadow group">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={tool.isOpenSource ? "accent" : "secondary"}>
                      {tool.isOpenSource ? t("openSource") : tool.pricing}
                    </Badge>
                    <div className="text-xs text-[var(--muted)] bg-[var(--background)] px-2 py-1 rounded-full border border-[var(--border)]">
                      {(() => {
                        const cat = CATEGORIES.find(c => c.id === tool.categoryId)
                        return cat ? getLocalizedCategory(cat, locale).name : ""
                      })()}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <ToolLogo name={tool.name} website={tool.website} logo={tool.logo} size="md" />
                    <Link href={`/tools/${tool.slug}`} className="hover:underline">
                      <CardTitle className="text-xl group-hover:text-[var(--primary)] transition-colors">{tool.name}</CardTitle>
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
        </section>
      </main>
      <Footer />
    </>
  )
}

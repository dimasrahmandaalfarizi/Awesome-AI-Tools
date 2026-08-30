import { AI_AGENTS } from "@/data/mock"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"
import { AgentDetailClient } from "./AgentDetailClient"
import { Metadata } from "next"

interface AgentDetailPageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateStaticParams() {
  const locales = ["en", "id"]
  const params: { locale: string; slug: string }[] = []

  for (const locale of locales) {
    for (const agent of AI_AGENTS) {
      params.push({ locale, slug: agent.slug })
    }
  }

  return params
}

export async function generateMetadata({ params }: AgentDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const agent = AI_AGENTS.find((a) => a.slug === slug)

  if (!agent) {
    return { title: "Agent Not Found — Awesome AI Tools" }
  }

  return {
    title: `${agent.name} — AI Subagent Persona`,
    description: agent.description,
  }
}

export default async function AgentDetailPage({ params }: AgentDetailPageProps) {
  const { slug, locale } = await params
  const agent = AI_AGENTS.find((a) => a.slug === slug)

  if (!agent) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-[calc(100vh-16rem)] bg-[var(--background)]">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <AgentDetailClient agent={agent} locale={locale} />
        </div>
      </main>
      <Footer />
    </>
  )
}

import { AI_AGENTS } from "@/data/mock"
import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"
import { AgentsClient } from "./AgentsClient"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Subagents Directory — Awesome AI Tools",
  description: "Explore 68+ specialized AI coding subagents and specialist personas with verified system prompts, tool boundaries, and multi-model routing.",
}

export default async function AgentsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-[calc(100vh-16rem)] bg-[var(--background)]">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <AgentsClient agents={AI_AGENTS} locale={locale} />
        </div>
      </main>
      <Footer />
    </>
  )
}

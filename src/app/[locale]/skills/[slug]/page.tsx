import { AI_SKILLS } from "@/data/mock"
import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/Badge"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ExportSkill } from "@/components/features/ExportSkill"

export default async function SkillPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const skill = AI_SKILLS.find(s => s.slug === resolvedParams.slug)
  
  if (!skill) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-[calc(100vh-16rem)] bg-[var(--background)]">
        <section className="container mx-auto px-4 py-8">
          <Link href="/skills" className="inline-flex items-center text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Skills
          </Link>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4 mb-8">
              <h1 className="text-4xl font-bold tracking-tight">{skill.name}</h1>
              <p className="text-xl text-[var(--muted)]">{skill.description}</p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {skill.frameworks.map(fw => (
                  <Badge key={fw} variant="outline" className="border-[var(--primary)] text-[var(--primary)]">
                    {fw}
                  </Badge>
                ))}
                <Badge variant="secondary">By {skill.author || "Community"}</Badge>
              </div>
            </div>

            <ExportSkill slug={skill.slug} content={skill.content} />
            
            <div className="mt-12 p-6 rounded-2xl bg-[var(--primary)]/5 border border-[var(--primary)]/20">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary)]">How to use this skill</h3>
              <ul className="space-y-2 text-[var(--muted)]">
                <li>• <strong>Cursor / Cline:</strong> Create a <code className="bg-[var(--surface)] px-1 py-0.5 rounded text-xs">.cursorrules</code> or <code className="bg-[var(--surface)] px-1 py-0.5 rounded text-xs">.clinerules</code> file in your project root and paste the prompt above.</li>
                <li>• <strong>GitHub Copilot:</strong> Add the instructions to your Custom Instructions in VS Code settings.</li>
                <li>• <strong>Claude Code:</strong> Save it as a custom skill or include it in your system prompt configuration.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

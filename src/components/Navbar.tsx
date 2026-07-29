import Link from "next/link"
import { Search, Code } from "lucide-react"
import { Button } from "./ui/Button"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-heading font-bold text-xl tracking-tight">
            Awesome AI <span className="text-[var(--primary)]">Tools</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm font-medium text-[var(--muted)]">
            <Link href="/categories/llm" className="hover:text-[var(--foreground)] transition-colors">LLMs</Link>
            <Link href="/categories/coding-assistant" className="hover:text-[var(--foreground)] transition-colors">Coding</Link>
            <Link href="/categories/agent-framework" className="hover:text-[var(--foreground)] transition-colors">Agents</Link>
            <Link href="/categories/image-generation" className="hover:text-[var(--foreground)] transition-colors">Images</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <form className="hidden md:flex relative group" action="/search">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted)]" />
            <input
              type="text"
              name="q"
              placeholder="Search tools..."
              className="h-9 w-64 rounded-full border border-[var(--border)] bg-[var(--surface)] pl-9 pr-4 text-sm outline-none focus:border-[var(--primary)] transition-colors"
            />
          </form>
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
            <Code className="h-5 w-5" />
          </Button>
          <Button>Submit Tool</Button>
        </div>
      </div>
    </header>
  )
}

import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)] mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-heading font-bold text-xl tracking-tight mb-4 inline-block">
              Awesome AI <span className="text-[var(--primary)]">Tools</span>
            </Link>
            <p className="text-[var(--muted)] text-sm max-w-sm">
              The largest curated collection of AI tools, frameworks, MCP servers, agents, prompts, and resources for developers.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li><Link href="/categories/llm" className="hover:text-[var(--primary)]">LLMs</Link></li>
              <li><Link href="/categories/coding-assistant" className="hover:text-[var(--primary)]">Coding Assistants</Link></li>
              <li><Link href="/categories/agent-framework" className="hover:text-[var(--primary)]">Agent Frameworks</Link></li>
              <li><Link href="/categories/mcp-server" className="hover:text-[var(--primary)]">MCP Servers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li><a href="#" className="hover:text-[var(--primary)]">GitHub Repository</a></li>
              <li><a href="#" className="hover:text-[var(--primary)]">Submit a Tool</a></li>
              <li><a href="#" className="hover:text-[var(--primary)]">Report an Issue</a></li>
              <li><a href="#" className="hover:text-[var(--primary)]">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between text-sm text-[var(--muted)]">
          <p>© {new Date().getFullYear()} Awesome AI Dev Tools. Open source under MIT License.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-[var(--foreground)]">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--foreground)]">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

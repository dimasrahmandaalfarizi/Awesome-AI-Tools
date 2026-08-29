"use client"

import * as React from "react"
import { useLocale } from "next-intl"
import { Copy, Check, Download, Terminal, Shield, Bot, Cpu, Sparkles, Layers, ArrowRight, ArrowLeft, ExternalLink, Zap, AlertTriangle, Info } from "lucide-react"
import { DocPage, DOC_SECTIONS } from "@/data/docs"
import { Link } from "@/i18n/routing"
import { InteractiveTerminalSandbox } from "@/components/features/InteractiveTerminalSandbox"

export interface DocsContentProps {
  doc: DocPage
}

export function DocsContent({ doc }: DocsContentProps) {
  const locale = useLocale()
  const isId = locale === "id"
  const [copiedPage, setCopiedPage] = React.useState(false)
  const [copiedCodeId, setCopiedCodeId] = React.useState<string | null>(null)

  const allDocs = React.useMemo(() => {
    return DOC_SECTIONS.flatMap(s => s.items)
  }, [])
  const currentIndex = allDocs.findIndex(d => d.slug === doc.slug)
  const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null
  const nextDoc = currentIndex !== -1 && currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null

  const handleCopyPage = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopiedPage(true)
    setTimeout(() => setCopiedPage(false), 2000)
  }

  const handleCopyCode = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCodeId(id)
    setTimeout(() => setCopiedCodeId(null), 2000)
  }

  const renderCodeBlock = (id: string, code: string, lang = "bash") => (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#0d1117] text-zinc-100 overflow-hidden shadow-xs my-4 group">
      {/* Window Chrome */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800/80 bg-[#161b22]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/90 border border-[#e0443e]/50" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/90 border border-[#dea123]/50" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/90 border border-[#1aab29]/50" />
          <span className="ml-2 text-[10px] font-mono font-medium uppercase tracking-wider text-zinc-400">
            {lang}
          </span>
        </div>
        <button
          type="button"
          onClick={() => handleCopyCode(id, code)}
          className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors cursor-pointer"
          title="Copy code"
        >
          {copiedCodeId === id ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">{isId ? "Tersalin" : "Copied"}</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>{isId ? "Salin" : "Copy"}</span>
            </>
          )}
        </button>
      </div>

      {/* Code Text */}
      <pre className="p-4 font-mono text-xs overflow-x-auto leading-relaxed text-zinc-200">
        <code>{code}</code>
      </pre>
    </div>
  )

  const renderCallout = (type: "tip" | "warning" | "note", title: string, content: string) => {
    const config = {
      tip: {
        border: "border-emerald-500/30 dark:border-emerald-500/20 bg-emerald-500/5",
        text: "text-emerald-700 dark:text-emerald-400",
        icon: Sparkles
      },
      warning: {
        border: "border-amber-500/30 dark:border-amber-500/20 bg-amber-500/5",
        text: "text-amber-700 dark:text-amber-400",
        icon: AlertTriangle
      },
      note: {
        border: "border-blue-500/30 dark:border-blue-500/20 bg-blue-500/5",
        text: "text-blue-700 dark:text-blue-400",
        icon: Info
      }
    }
    const current = config[type]
    const Icon = current.icon

    return (
      <div className={`p-4 rounded-xl border ${current.border} text-xs leading-relaxed space-y-1.5 my-5 shadow-2xs`}>
        <div className={`font-semibold flex items-center gap-2 ${current.text}`}>
          <Icon className="w-4 h-4 shrink-0" />
          <span>{title}</span>
        </div>
        <p className="text-[var(--muted)] leading-normal pl-6">{content}</p>
      </div>
    )
  }

  return (
    <article className="min-w-0 max-w-3xl flex-1 py-8 px-4 sm:px-8 text-zinc-900 dark:text-zinc-100">
      {/* Breadcrumb Header */}
      <div className="mb-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
        {isId ? doc.section.id : doc.section.en}
      </div>

      {/* Title & Copy Page Button */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800/80 mb-6 flex-wrap gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading">
          {isId ? doc.title.id : doc.title.en}
        </h1>
        <button
          type="button"
          onClick={handleCopyPage}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors shadow-xs cursor-pointer"
        >
          {copiedPage ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-500" />
              <span>{isId ? "Tersalin!" : "Copied!"}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>{isId ? "Salin tautan" : "Copy page"}</span>
            </>
          )}
        </button>
      </div>

      {/* Lead Description */}
      <p className="text-base text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
        {isId ? doc.lead.id : doc.lead.en}
      </p>

      {/* 1. QUICKSTART DOC */}
      {doc.slug === "quickstart" && (
        <div className="space-y-10 text-sm leading-relaxed">
          <section id="1-install-cli" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {isId ? "1. Pasang CLI & Suite Skills" : "1. Install CLI & Skills Suite"}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {isId
                ? "Jalankan perintah berikut di root repository proyek Anda untuk menginstal 413 AI Skills dan 68 Subagents ke dalam format IDE pilihan Anda (Cursor, Antigravity, Claude Code, Continue, Copilot):"
                : "Run the interactive scaffolder in your project root to generate configuration files tailored for your favorite AI IDE or CLI harness:"}
            </p>
            {renderCodeBlock("q1", "npx awesome-ai-tools init")}
            {renderCallout("tip", isId ? "Tip Cepat" : "Quick Tip", isId ? "Anda bisa memilih 'Universal Suite' untuk menghasilkan konfigurasi kompatibel semua editor sekaligus." : "Choose 'Universal Suite' to generate compatible rules for all editors at once.")}
          </section>

          <section id="2-run-local-llm" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {isId ? "2. Jalankan LLM Lokal dengan Ollama" : "2. Run Local LLM with Ollama"}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {isId
                ? "Untuk pair programming lokal tanpa biaya API, unduh Ollama dan jalankan model koding cepat:"
                : "For unlimited zero-cost private coding, install Ollama and run a fast coding model:"}
            </p>
            {renderCodeBlock("q2", "ollama run qwen2.5-coder:7b")}
          </section>

          <section id="3-connect-router" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {isId ? "3. Hubungkan ke AI Proxy Router" : "3. Connect to AI Proxy Router"}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {isId
                ? "Buka menu AI Router (/router), pilih provider Ollama, dan set OpenAI Base URL di IDE Anda ke:"
                : "Visit the AI Router (/router), select Ollama Local Provider, and point your IDE's OpenAI Base URL to:"}
            </p>
            {renderCodeBlock("q3", "http://localhost:3000/api/v1")}
          </section>

          <section id="4-trigger-skills" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {isId ? "4. Jalankan Skills di IDE Anda" : "4. Trigger Skills in your IDE"}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {isId
                ? "Buka chat editor Anda dan ketikkan pemicu langsung:"
                : "Open your AI assistant chat and type triggers directly:"}
            </p>
            <ul className="space-y-2 list-disc pl-5 text-zinc-600 dark:text-zinc-400">
              <li><strong>Claude Code / Continue:</strong> <code className="text-pink-500 font-mono">/tdd-workflow</code> {isId ? "atau" : "or"} <code className="text-pink-500 font-mono">/plan-first</code></li>
              <li><strong>Cursor IDE:</strong> <code className="text-amber-500 font-mono">@tdd-workflow</code></li>
              <li><strong>Google Antigravity:</strong> {isId ? "Otomatis mengenali folder" : "Auto-loads from"} <code className="font-mono">.agents/skills/</code></li>
            </ul>
          </section>

          <section id="next-steps" className="pt-6 border-t border-zinc-200 dark:border-zinc-800/80 space-y-3">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white tracking-tight">
              {isId ? "Langkah Selanjutnya" : "Next steps"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Link href="/docs/skills-guide" className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-[var(--primary)] bg-zinc-50 dark:bg-zinc-950/40 transition-colors">
                <div className="font-semibold text-xs text-zinc-900 dark:text-white flex items-center justify-between">
                  <span>{isId ? "Panduan 413 AI Skills" : "Explore 413 AI Skills"}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--primary)]" />
                </div>
                <p className="text-xs text-zinc-500 mt-1">{isId ? "Daftar slash commands & use case" : "Slash commands and workflows"}</p>
              </Link>
              <Link href="/docs/agentshield-security" className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-[var(--primary)] bg-zinc-50 dark:bg-zinc-950/40 transition-colors">
                <div className="font-semibold text-xs text-zinc-900 dark:text-white flex items-center justify-between">
                  <span>{isId ? "AgentShield Security Scan" : "AgentShield Security"}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--primary)]" />
                </div>
                <p className="text-xs text-zinc-500 mt-1">{isId ? "Audit celah prompt injection & secret" : "Audit secrets and prompt risks"}</p>
              </Link>
            </div>
          </section>
        </div>
      )}

      {/* 2. CLI TOOLS DOC */}
      {doc.slug === "cli-tools" && (
        <div className="space-y-10 text-sm leading-relaxed">
          <section id="interactive-sandbox" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {isId ? "Interactive Web Terminal Sandbox" : "Interactive Web Terminal Sandbox"}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {isId
                ? "Coba dan eksekusi perintah CLI Awesome AI Tools secara langsung di browser tanpa perlu membuka terminal lokal:"
                : "Execute and test Awesome AI Tools CLI commands directly inside your browser without opening a local shell:"}
            </p>
            <InteractiveTerminalSandbox />
          </section>

          <section id="installation" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {isId ? "Menjalankan tanpa instalasi" : "Running without installation"}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {isId
                ? "CLI Awesome AI Tools dapat dijalankan instan menggunakan npx tanpa perlu instalasi global:"
                : "You can execute the Awesome AI Tools CLI directly using npx with zero global setup:"}
            </p>
            {renderCodeBlock("c-help", "npx awesome-ai-tools --help")}
          </section>

          <section id="cmd-init" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              npx awesome-ai-tools init
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {isId
                ? "Menginstal dan membuat scaffolding seluruh 413 skills dan 68 subagents langsung ke folder konfigurasi target proyek Anda:"
                : "Scaffolds all 413 skills and 68 subagents into your project repository:"}
            </p>
            {renderCodeBlock("c-init", "# Interactive selection\nnpx awesome-ai-tools init\n\n# Direct flag target\nnpx awesome-ai-tools init --target cursor\nnpx awesome-ai-tools init --target claude\nnpx awesome-ai-tools init --target antigravity")}
          </section>

          <section id="cmd-scan" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              npx awesome-ai-tools scan (AgentShield)
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {isId
                ? "Memindai seluruh codebase dari potensi kebocoran API keys, prompt injection di berkas markdown, dan perintah destruktif di hook script:"
                : "Runs a 4-layer security scan across your workspace for secrets, prompt injection risks, and dangerous hooks:"}
            </p>
            {renderCodeBlock("c-scan", "npx awesome-ai-tools scan")}
          </section>

          <section id="cmd-add" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              npx awesome-ai-tools add &lt;slug&gt;
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {isId
                ? "Menambahkan satu skill spesifik ke dalam project dalam format yang diinginkan:"
                : "Adds an individual skill file into your project in any target editor format:"}
            </p>
            {renderCodeBlock("c-add", "npx awesome-ai-tools add tdd-workflow --editor cursor")}
          </section>

          <section id="cmd-list" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              npx awesome-ai-tools list
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {isId
                ? "Menampilkan seluruh daftar skills, triggers, dan subagents persona yang tersedia."
                : "Lists all registered skills, IDE triggers, and subagent personas."}
            </p>
            {renderCodeBlock("c-list", "npx awesome-ai-tools list")}
          </section>
        </div>
      )}

      {/* 3. AGENTSHIELD SECURITY DOC */}
      {doc.slug === "agentshield-security" && (
        <div className="space-y-10 text-sm leading-relaxed">
          <section id="4-layer-security" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {isId ? "Engine Keamanan 4 Lapisan" : "4-Layer Security Engine"}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {isId
                ? "AgentShield diadaptasi dari framework keamanan ECC untuk memastikan loop otonom coding agents tidak membahayakan sistem operasi dan data kredensial Anda."
                : "AgentShield is designed to protect autonomous AI coding loops from compromising your operating system, private keys, or codebase integrity."}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
              <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 space-y-1">
                <div className="font-semibold text-xs text-red-500">1. Secret Leak Scanner</div>
                <p className="text-xs text-zinc-500">{isId ? "Mendeteksi raw OpenAI, Anthropic, AWS, GitHub PAT, DB connection string." : "Scans for raw OpenAI, Anthropic, AWS, GitHub PAT, and DB URIs."}</p>
              </div>
              <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 space-y-1">
                <div className="font-semibold text-xs text-amber-500">2. Prompt Injection Defense</div>
                <p className="text-xs text-zinc-500">{isId ? "Audit file instruksi dari upaya jailbreak dan system override." : "Audits markdown instructions from jailbreak and override attacks."}</p>
              </div>
              <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 space-y-1">
                <div className="font-semibold text-xs text-blue-500">3. Malicious Hook Audit</div>
                <p className="text-xs text-zinc-500">{isId ? "Mencegah eksekusi script destruktif seperti rm -rf atau format disk." : "Flags destructive script execution like rm -rf without confirmation."}</p>
              </div>
              <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 space-y-1">
                <div className="font-semibold text-xs text-green-500">4. MCP Permission Health</div>
                <p className="text-xs text-zinc-500">{isId ? "Memeriksa izin berlebih server MCP (--allow-all)." : "Audits over-privileged MCP server arguments."}</p>
              </div>
            </div>
            {renderCodeBlock("s-scan", "npx awesome-ai-tools scan")}
          </section>
        </div>
      )}

      {/* 4. SKILLS GUIDE DOC */}
      {doc.slug === "skills-guide" && (
        <div className="space-y-10 text-sm leading-relaxed">
          <section id="how-skills-work" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {isId ? "Cara Kerja Skills" : "How Skills Work"}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {isId
                ? "Skills adalah instruksi modular berbasis aturan rekayasa perangkat lunak yang memaksa AI Agent mengikuti standar industri (seperti TDD, Clean Code, verifikasi sebelum merge, dan zero hallucination)."
                : "Skills are modular software engineering rule sets that guide AI coding agents to follow strict industry standards (such as TDD, clean architecture, pre-merge verification, and anti-hallucination guardrails)."}
            </p>
            {renderCallout("tip", isId ? "Trigger Serbaguna" : "Universal Triggers", isId ? "Semua 413 skills dapat dipicu di Cursor (@rule), Claude Code (/command), Continue.dev (/command), Copilot (/prompt), dan Antigravity (SKILL.md)." : "All 413 skills are triggerable across Cursor (@rule), Claude Code (/command), Continue (/command), Copilot (/prompt), and Antigravity (SKILL.md).")}
          </section>

          <section id="slash-commands" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {isId ? "Slash Commands di Claude & Continue" : "Slash Commands in Claude & Continue"}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {isId
                ? "Setelah menjalankan npx awesome-ai-tools init, cukup ketik nama skill diawali garis miring di prompt chat:"
                : "After running init, simply prefix the command name with a slash in your chat prompt:"}
            </p>
            {renderCodeBlock("sk-cmd", "/tdd-workflow\n/systematic-debugging\n/security-auditor\n/nextjs-best-practices")}
          </section>
        </div>
      )}

      {/* 5. SUBAGENTS GUIDE DOC */}
      {doc.slug === "subagents-guide" && (
        <div className="space-y-10 text-sm leading-relaxed">
          <section id="subagents-overview" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {isId ? "Mengapa Subagents Spesialis?" : "Why Specialized Subagents?"}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {isId
                ? "Alih-alih mengandalkan satu model AI untuk semua tugas, arsitektur subagen mendelegasikan tugas ke persona terisolasi dengan batasan alat (tools) dan system prompt khusus untuk menghasilkan kode dengan tingkat keberhasilan jauh lebih tinggi."
                : "Rather than relying on a single generalist prompt, specialized subagents isolate context, enforce strict tool boundaries, and apply role-specific verification criteria."}
            </p>
            <div className="pt-2">
              <Link href="/agents" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--primary)]/90 transition-colors">
                <Bot className="w-4 h-4" />
                <span>{isId ? "Jelajahi 68+ AI Subagents Directory" : "Browse 68+ AI Subagents Directory"}</span>
              </Link>
            </div>
          </section>
        </div>
      )}

      {/* 6. CURSOR IDE DOC */}
      {doc.slug === "cursor" && (
        <div className="space-y-10 text-sm leading-relaxed">
          <section id="mdc-rules-setup" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {isId ? "1. Pasang MDC Rules" : "1. MDC Rules Scaffolding"}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {isId
                ? "Di root project Anda, buat berkas aturan Cursor MDC:"
                : "Scaffold modern MDC rules in your project root:"}
            </p>
            {renderCodeBlock("cur-init", "npx awesome-ai-tools init --target cursor")}
          </section>

          <section id="cursor-proxy" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {isId ? "2. Arahkan Cursor ke Proxy Lokal" : "2. Pointing Cursor to Local Proxy"}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {isId
                ? "Buka Cursor Settings &rarr; Models &rarr; OpenAI API Base URL, lalu masukkan:"
                : "Navigate to Cursor Settings &rarr; Models &rarr; OpenAI API Base URL and enter:"}
            </p>
            {renderCodeBlock("cur-url", "http://localhost:3000/api/v1")}
          </section>
        </div>
      )}

      {/* 7. CHAT COMPLETIONS API REFERENCE */}
      {doc.slug === "chat-completions" && (
        <div className="space-y-10 text-sm leading-relaxed">
          <section id="endpoint-url" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              POST /api/v1/chat/completions
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {isId
                ? "Endpoint proxy chat completions yang sepenuhnya kompatibel dengan spesifikasi OpenAI v1 dengan dukungan streaming Server-Sent Events (SSE):"
                : "OpenAI v1-compatible chat completion proxy supporting real-time Server-Sent Events (SSE) streaming and dynamic model remapping:"}
            </p>
            {renderCodeBlock("api-curl", `curl -X POST http://localhost:3000/api/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "qwen2.5-coder:7b",
    "messages": [
      { "role": "system", "content": "You are a senior TypeScript architect." },
      { "role": "user", "content": "Write a type-safe debounce hook in React 19." }
    ],
    "stream": true
  }'`)}
          </section>
        </div>
      )}

      {/* Fallback for other documentation topics */}
      {![
        "quickstart",
        "cli-tools",
        "agentshield-security",
        "skills-guide",
        "subagents-guide",
        "cursor",
        "chat-completions"
      ].includes(doc.slug) && (
        <div className="space-y-8 text-sm leading-relaxed">
          {doc.toc.map((tItem) => (
            <section key={tItem.id} id={tItem.id} className="space-y-3">
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                {isId ? tItem.title.id : tItem.title.en}
              </h2>
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 p-5 space-y-3">
                <p className="text-zinc-600 dark:text-zinc-400">
                  {isId
                    ? `Panduan teknis dan implementasi mendalam untuk ${tItem.title.id}. Didesain untuk memaksimalkan produktivitas coding dengan agentic AI.`
                    : `Technical guide and recipes for ${tItem.title.en}. Built to optimize your agentic AI coding workflow with zero friction.`}
                </p>
                {renderCodeBlock(`code-${tItem.id}`, `# npx awesome-ai-tools recipe for ${doc.slug}\\nnpx awesome-ai-tools init --target all`)}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Interactive Helpful Feedback Rating */}
      <div className="mt-14 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted)]">
        <div className="flex items-center gap-2">
          <span>{isId ? "Apakah halaman ini membantu?" : "Was this page helpful?"}</span>
          <button 
            type="button"
            className="px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--foreground)] transition-colors cursor-pointer shadow-2xs"
          >
            {isId ? "Ya" : "Yes"}
          </button>
          <button 
            type="button"
            className="px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--foreground)] transition-colors cursor-pointer shadow-2xs"
          >
            {isId ? "Tidak" : "No"}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/chat" className="flex items-center gap-1.5 hover:text-[var(--foreground)] transition-colors">
            <Bot className="w-3.5 h-3.5 text-[var(--primary)]" />
            <span>{isId ? "Tanya AI Copilot" : "Ask AI Copilot"}</span>
          </Link>
        </div>
      </div>

      {/* Pagination Footer: Previous & Next Page */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevDoc ? (
          <Link
            href={`/docs/${prevDoc.slug}`}
            className="flex flex-col p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--muted)] hover:shadow-xs transition-all text-left group"
          >
            <span className="text-[11px] font-medium text-[var(--muted)] flex items-center gap-1 group-hover:text-[var(--foreground)]">
              <ArrowLeft className="w-3 h-3" />
              <span>{isId ? "Sebelumnya" : "Previous"}</span>
            </span>
            <span className="text-sm font-semibold text-[var(--foreground)] mt-1 line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
              {isId ? prevDoc.title.id : prevDoc.title.en}
            </span>
          </Link>
        ) : <div />}

        {nextDoc && (
          <Link
            href={`/docs/${nextDoc.slug}`}
            className="flex flex-col p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--muted)] hover:shadow-xs transition-all text-right group"
          >
            <span className="text-[11px] font-medium text-[var(--muted)] flex items-center justify-end gap-1 group-hover:text-[var(--foreground)]">
              <span>{isId ? "Selanjutnya" : "Next"}</span>
              <ArrowRight className="w-3 h-3" />
            </span>
            <span className="text-sm font-semibold text-[var(--foreground)] mt-1 line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
              {isId ? nextDoc.title.id : nextDoc.title.en}
            </span>
          </Link>
        )}
      </div>
    </article>
  )
}

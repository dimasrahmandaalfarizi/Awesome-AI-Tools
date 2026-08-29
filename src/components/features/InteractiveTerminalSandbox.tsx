"use client"

import * as React from "react"
import { Terminal, Copy, Check, Play, RotateCcw, Sparkles } from "lucide-react"

interface HistoryItem {
  id: string
  command: string
  output: string[]
  isError?: boolean
}

const WELCOME_BANNER = [
  "Awesome AI Tools Terminal Sandbox v0.1.0",
  "Connected to local hybrid engine. Type 'help' or click suggestions below.",
  "Type 'awesome-ai-tools trigger review' or 'awesome-ai-tools scan' to test.",
]

export function InteractiveTerminalSandbox() {
  const [history, setHistory] = React.useState<HistoryItem[]>([
    {
      id: "init",
      command: "awesome-ai-tools status",
      output: [
        "System: Awesome AI Tools Industrial Suite",
        "Skills Index: 2,558 AI Skills loaded",
        "Subagents: 136 specialist agent personas active",
        "Public APIs: 1,700+ endpoints indexed",
        "Workflows: /review, /tdd, /compact, /council ready",
        "Routing: Zero-Cost Hybrid Router (Ollama + Cloud BYOK)",
        "Status: Operational (Ready)",
      ],
    },
  ])

  const [input, setInput] = React.useState("")
  const [commandHistory, setCommandHistory] = React.useState<string[]>([
    "awesome-ai-tools status",
  ])
  const [historyIndex, setHistoryIndex] = React.useState<number>(-1)
  const [copied, setCopied] = React.useState(false)

  const terminalEndRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [history])

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim()
    if (!trimmed) return

    setCommandHistory((prev) => [...prev, trimmed])
    setHistoryIndex(-1)

    const cmdLower = trimmed.toLowerCase()

    if (cmdLower === "clear" || cmdLower === "cls") {
      setHistory([])
      setInput("")
      return
    }

    let output: string[] = []
    let isError = false

    if (cmdLower === "help" || cmdLower === "awesome-ai-tools help" || cmdLower === "awesome-ai-tools --help") {
      output = [
        "Awesome AI Tools CLI Commands:",
        "  awesome-ai-tools status            Check local agents and skills readiness",
        "  awesome-ai-tools scan              Run AST security audit & skill matcher",
        "  awesome-ai-tools trigger <wf>      Execute workflow (/review, /tdd, /compact, /council)",
        "  awesome-ai-tools pull <category>   Selectively download domain skills (security, frontend, backend)",
        "  awesome-ai-tools learn \"<rule>\"     Persist architectural rule to instincts.md",
        "  awesome-ai-tools skills <query>    Search from 2,558 curated skills",
        "  clear                              Clear terminal screen",
      ]
    } else if (cmdLower === "awesome-ai-tools status" || cmdLower === "status") {
      output = [
        "System: Awesome AI Tools Industrial Suite",
        "Indexed Skills: 2,558 skills across 14 domains",
        "Active Personas: 136 specialized subagents",
        "Local Engine: Ollama / WebGPU / Universal API Bridge",
        "Environment: Strict Zinc Monochrome Standards (Zero AI Slop)",
        "Result: 100% Operational",
      ]
    } else if (cmdLower === "awesome-ai-tools scan" || cmdLower === "scan") {
      output = [
        "[1/4] Scanning repository structure...",
        "  -> Discovered: Next.js 16 (App Router), TypeScript, Tailwind CSS v4",
        "[2/4] AST & Security Policy Invariant Audit...",
        "  -> Verified: SSRF guard active on /api/chat/universal",
        "  -> Verified: Zero emoji compliance in TSX components",
        "[3/4] Matching high-value skills from 2,558 catalog...",
        "  -> Recommended: /nextjs-best-practices (Server Components & Streaming)",
        "  -> Recommended: /security-audit (SSRF & IDOR protection)",
        "  -> Recommended: /clean-code (Maintainability standards)",
        "[4/4] Scan complete: 0 critical vulnerabilities found. 3 optimal skills recommended.",
      ]
    } else if (cmdLower.includes("trigger review") || cmdLower === "/review") {
      output = [
        ">> Launching Composite Multi-Agent Review...",
        "[Stage 1: AgentShield Security Audit]",
        "  * Auditing AST for OWASP Top 10 vulnerabilities...",
        "  * Checking SSRF URL parameter validations: Passed.",
        "  * Validating rate limit token-bucket implementations: Passed.",
        "[Context Hand-off to Stage 2: Code Reviewer]",
        "  * Verifying concurrency race conditions: Invariants verified.",
        "  * Enforcing single responsibility & Zinc monochrome aesthetics: Verified.",
        ">> Final Verdict: APPROVED (No regressions or security flaws detected).",
      ]
    } else if (cmdLower.includes("trigger tdd") || cmdLower === "/tdd") {
      output = [
        ">> Launching Autonomous TDD Cycle...",
        "[Phase 1: RED] Generating failing test suite...",
        "  FAIL: test_input_sanitization.test.ts (Assertion: invalid payload rejected)",
        "[Phase 2: GREEN] Implementing minimal passing code...",
        "  PASS: test_input_sanitization.test.ts (All 4 unit tests passing)",
        "[Phase 3: REFACTOR] Enhancing abstraction without breaking tests...",
        "  PASS: Coverage verified at 100% with zero regressions.",
      ]
    } else if (cmdLower.includes("trigger council") || cmdLower === "/council") {
      output = [
        ">> Convening Multi-Model Council Deliberation...",
        "[Panel 1: Software Architect] Proposes decoupled event bus with Redis stream.",
        "[Panel 2: Security Lead] Recommends strict payload signing & mTLS auth.",
        "[Panel 3: Performance SRE] Flags connection pool saturation risks at 10k RPS.",
        "[Consensus Synthesis] Architecting connection-pooled streaming pipeline with mTLS tokens.",
      ]
    } else if (cmdLower.includes("trigger compact") || cmdLower === "/compact") {
      output = [
        ">> Running Context Compaction & Memory GC...",
        "  * Input turns: 24 active messages (18,400 tokens)",
        "  * Pruning redundant conversational chatter & repetitive code blocks...",
        "  * Compacted turns: 6 core context milestones (3,120 tokens)",
        "  * Memory Garbage Collection: 83.04% token reduction achieved.",
        "  * Extracted 2 codebase instincts into instincts.md.",
      ]
    } else if (cmdLower.startsWith("awesome-ai-tools learn") || cmdLower.startsWith("learn")) {
      const match = trimmed.match(/learn\s+["']?([^"']+)["']?/)
      const rule = match ? match[1] : "Always write typed unit tests before refactoring"
      output = [
        `>> Recording rule to instincts.md...`,
        `  [Learned Rule]: "${rule}"`,
        `  -> Injected into persistent agent memory across Antigravity, Claude, and Cursor.`,
      ]
    } else if (cmdLower.startsWith("awesome-ai-tools pull") || cmdLower.startsWith("pull")) {
      const parts = trimmed.split(" ")
      const category = parts[2] || "security"
      output = [
        `>> Pulling selective skills bundle: [${category}]...`,
        `  * Downloading package metadata...`,
        `  * Unpacking 42 specialized ${category} skills into .agents/skills/`,
        `  * Registered in AGENTS.md. Ready for immediate use.`,
      ]
    } else if (cmdLower.startsWith("awesome-ai-tools skills") || cmdLower.startsWith("skills")) {
      output = [
        "Matched Skills (Sample from 2,558 entries):",
        "  1. /review                   Multi-Agent Code & Security Review",
        "  2. /tdd                      Autonomous TDD Cycle (Red-Green-Refactor)",
        "  3. /security-audit           AgentShield Vulnerability Scanner",
        "  4. /nextjs-best-practices    Next.js App Router & Server Components",
        "  5. /clean-code               Monochrome Clean Architecture Standards",
        "  6. /database-architect       PostgreSQL Scalable Schema & Migrations",
      ]
    } else {
      isError = true
      output = [
        `Command not found: '${trimmed}'`,
        `Type 'help' to see available commands or click quick suggestions below.`,
      ]
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        command: trimmed,
        output,
        isError,
      },
    ])
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      executeCommand(input)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(nextIdx)
        setInput(commandHistory[nextIdx] || "")
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1
        if (nextIdx >= commandHistory.length) {
          setHistoryIndex(-1)
          setInput("")
        } else {
          setHistoryIndex(nextIdx)
          setInput(commandHistory[nextIdx] || "")
        }
      }
    }
  }

  const copyTranscript = () => {
    const text = history
      .map((h) => `$ ${h.command}\n${h.output.join("\n")}`)
      .join("\n\n")
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-xl overflow-hidden font-mono text-xs text-[var(--foreground)]">
      {/* Terminal Window Chrome */}
      <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--background)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600/40" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/40" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/40" />
          <span className="ml-2 text-[11px] text-[var(--muted)] font-medium">
            awesome-ai-tools-sandbox — zsh
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyTranscript}
            className="p-1.5 rounded-md text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
            title="Copy Terminal Transcript"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => {
              setHistory([])
              executeCommand("awesome-ai-tools status")
            }}
            className="p-1.5 rounded-md text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
            title="Reset Terminal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Suggested Quick Commands */}
      <div className="px-4 py-2 border-b border-[var(--border)] bg-[var(--surface)] flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
        <span className="text-[var(--muted)] font-sans mr-1 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          Quick Test:
        </span>
        {[
          "awesome-ai-tools status",
          "awesome-ai-tools scan",
          "awesome-ai-tools trigger review",
          "awesome-ai-tools trigger tdd",
          "awesome-ai-tools pull security",
        ].map((cmd) => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            className="px-2 py-0.5 rounded-md bg-[var(--background)] border border-[var(--border)] hover:border-[var(--foreground)]/40 text-[var(--muted)] hover:text-[var(--foreground)] whitespace-nowrap transition-colors cursor-pointer shrink-0"
          >
            {cmd.replace("awesome-ai-tools ", "")}
          </button>
        ))}
      </div>

      {/* Terminal Screen Body */}
      <div 
        onClick={() => inputRef.current?.focus()}
        className="p-4 md:p-6 bg-zinc-950 text-zinc-100 min-h-[280px] max-h-[420px] overflow-y-auto space-y-4 font-mono select-text"
      >
        <div className="text-zinc-500 text-[11px] space-y-0.5">
          {WELCOME_BANNER.map((b, i) => (
            <div key={i}>{b}</div>
          ))}
        </div>

        {history.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <span>$</span>
              <span className="text-zinc-100">{item.command}</span>
            </div>
            <div className={`space-y-0.5 pl-4 ${item.isError ? "text-rose-400" : "text-zinc-300"}`}>
              {item.output.map((line, idx) => (
                <div key={idx} className="leading-relaxed">
                  {line}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Active Input Line */}
        <div className="flex items-center gap-2 text-emerald-400 pt-1">
          <span className="font-semibold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type command here (e.g. 'awesome-ai-tools scan')..."
            className="flex-1 bg-transparent border-0 text-zinc-100 placeholder:text-zinc-600 focus:outline-none text-xs font-mono"
            autoFocus
          />
        </div>

        <div ref={terminalEndRef} />
      </div>
    </div>
  )
}

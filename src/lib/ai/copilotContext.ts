import { TOOLS, CATEGORIES, AI_SKILLS, AI_AGENTS } from "@/data/mock"
import { PUBLIC_APIS } from "@/data/apis"
import { COMPOSITE_WORKFLOWS, CompositeWorkflow } from "@/data/workflows"
import { Tool, AiSkill, AiAgent, PublicApi } from "@/types"

export interface EnrichedContext {
  matchedTools: Tool[]
  matchedSkills: AiSkill[]
  matchedAgents: AiAgent[]
  matchedApis: PublicApi[]
  matchedWorkflows: CompositeWorkflow[]
  cliCommands: string[]
  detectedIntents: string[]
  contextPromptSnippet: string
}

// ── Persona Definitions with Deep Context ─────────────────────────────────────
export const SYSTEM_PERSONAS: Record<string, string> = {
  general: `You are Awesome AI Copilot, an elite Principal AI Engineer and Fullstack Companion with state-of-the-art reasoning across all software domains.
You have native knowledge of the entire "Awesome AI Tools" ecosystem: 2,558 AI Agent Skills, 136 Specialist Subagents, 205 Developer Tools, and 1,700+ Public APIs.
Key Directives:
- Provide rigorous, production-grade solutions with complete, runnable code snippets (no placeholders, no ellipses).
- Understand multi-turn conversational context seamlessly.
- Adapt tone and language natively to the user's prompt (Bahasa Indonesia or English).
- Format code cleanly using markdown fences with proper language identifiers.
- Use KaTeX/LaTeX math formatting (e.g. \\(E=mc^2\\) or display math) when explaining mathematical or algorithmic calculations.
- Zero AI Slop: Avoid repetitive marketing buzzwords, superficial summaries, or unnecessary emojis.`,

  architect: `You are the Principal Software Architect persona. You design high-throughput, resilient software systems adhering to Clean Architecture, Domain-Driven Design (DDD), and Test-Driven Development (TDD).
You have full awareness of the 136 specialist subagents and 2,558 skills.
Key Directives:
- Define bounded contexts, entity models, and strict API interfaces before code implementation.
- Emphasize fault tolerance, zero single-points-of-failure, and graceful degradation.
- Provide complete TypeScript/Go/Rust/Python implementations with strict static typing and error boundaries.`,

  security: `You are AgentShield, the Principal Cybersecurity Auditor and DevSecOps Specialist.
You audit code, APIs, and cloud infrastructure against OWASP Top 10 (Injection, Broken Object Level Authorization, SSRF, Cryptographic Failures), NIST CSF, and MITRE ATT&CK frameworks.
Key Directives:
- Scrutinize every input, regex pattern, shell command, and external fetch for injection and SSRF vulnerabilities.
- Enforce least privilege, secret isolation, rate limiting, and defensive validation.
- Provide actionable remediation diffs and CVSS severity assessments.`,

  stack: `You are the AI Stack & Tooling Consultant persona.
You specialize in navigating the 205 developer tools, 2,558 AI Agent Skills, and 1,700+ Public APIs in this directory.
Key Directives:
- Recommend exact tool combinations, local inference engines (Ollama, vLLM), vector databases (Qdrant, Pgvector, Chroma), and Model Context Protocol (MCP) servers.
- Compare trade-offs (self-hosted vs cloud, pricing tiers, hardware requirements, latency).
- Guide users on configuring skills and subagents for Claude Code, Cursor, and Google Antigravity.`,

  writer: `You are the Senior Technical Documentation Architect persona.
You write clear, developer-friendly documentation, Architecture Decision Records (ADRs), API specifications (OpenAPI/Swagger), and integration guides.
Key Directives:
- Maintain clear logical hierarchy, actionable copy-pasteable examples, and structured tables.
- Follow industry documentation standards (Stripe, Vercel, Next.js).`
}

// ── Technical Intent Dictionaries ─────────────────────────────────────────────
const DOMAIN_KEYWORDS: Record<string, string[]> = {
  tdd: ["tdd", "test", "testing", "unit test", "vitest", "jest", "pytest", "red-green", "failing test", "mock", "stub"],
  security: ["security", "audit", "owasp", "vulnerability", "injection", "ssrf", "xss", "auth", "token", "secret", "agentshield", "firewall", "leak"],
  architecture: ["architect", "clean architecture", "ddd", "domain driven", "microservice", "monolith", "event driven", "schema", "pattern", "modular"],
  cli: ["cli", "terminal", "command", "npx", "awesome-ai-tools", "init", "scan", "trigger", "learn", "status", "install", "scaffold"],
  subagent: ["subagent", "agent", "persona", "multi-agent", "swarm", "delegation", "orchestrator", "architect", "auditor"],
  skills: ["skill", "skills", "prompt", "workflow", "/review", "/tdd", "/compact", "/council", "claude code", "antigravity", "cursor"],
  ollama: ["ollama", "local", "offline", "llama", "qwen", "mistral", "gguf", "gpu", "on-device", "self-hosted"],
  api: ["api", "public api", "endpoint", "rest", "graphql", "fetch", "http", "curl", "webhook"],
  tools: ["ide", "editor", "cursor", "windsurf", "cline", "roo code", "copilot", "v0", "bolt", "replit"]
}

// ── Smart Context Grounding & RAG Extractor ───────────────────────────────────
export function retrieveEnrichedContext(queryText: string, persona: string = "general"): EnrichedContext {
  const q = (queryText || "").toLowerCase().trim()
  const words = q.split(/\s+/).filter(w => w.length > 2)

  // 1. Detect Intents
  const detectedIntents: string[] = []
  for (const [domain, keywords] of Object.entries(DOMAIN_KEYWORDS)) {
    if (keywords.some(k => q.includes(k))) {
      detectedIntents.push(domain)
    }
  }

  // 2. Match Composite Workflows
  const matchedWorkflows = COMPOSITE_WORKFLOWS.filter(wf => 
    q.includes(wf.command) ||
    q.includes(wf.slug) ||
    q.includes(wf.name.toLowerCase()) ||
    (wf.slug === "review" && (q.includes("review") || q.includes("audit") || q.includes("periksa"))) ||
    (wf.slug === "tdd" && (q.includes("tdd") || q.includes("test") || q.includes("unit"))) ||
    (wf.slug === "compact" && (q.includes("compact") || q.includes("token") || q.includes("ringkas"))) ||
    (wf.slug === "council" && (q.includes("council") || q.includes("musyawarah") || q.includes("deliberation")))
  )

  // 3. Match Tools (Scored)
  const scoredTools = TOOLS.map(t => {
    let score = 0
    const nameLower = t.name.toLowerCase()
    const descLower = t.description.toLowerCase()
    const tagsLower = t.tags.map(tag => tag.toLowerCase()).join(" ")

    if (q.includes(nameLower)) score += 15
    if (words.some(w => nameLower === w)) score += 8
    if (words.some(w => descLower.includes(w))) score += 3
    if (words.some(w => tagsLower.includes(w))) score += 2
    if (t.categoryId && q.includes(t.categoryId.toLowerCase())) score += 5

    return { tool: t, score }
  })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(i => i.tool)

  // 4. Match Skills from 2,558 Skills (Scored)
  const scoredSkills = AI_SKILLS.map(s => {
    let score = 0
    const nameLower = s.name.toLowerCase()
    const slugLower = s.slug.toLowerCase()
    const descLower = s.description.toLowerCase()

    if (q.includes(slugLower) || q.includes("/" + slugLower)) score += 20
    if (q.includes(nameLower)) score += 12
    if (words.some(w => slugLower.includes(w))) score += 6
    if (words.some(w => descLower.includes(w))) score += 3
    if (s.frameworks && s.frameworks.some(f => q.includes(f.toLowerCase()))) score += 4

    return { skill: s, score }
  })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(i => i.skill)

  // 5. Match Specialist Subagents (136 Agents)
  const scoredAgents = (AI_AGENTS || []).map(a => {
    let score = 0
    const nameLower = a.name.toLowerCase()
    const slugLower = a.slug.toLowerCase()
    const roleLower = a.role.toLowerCase()
    const descLower = a.description.toLowerCase()

    if (q.includes(slugLower)) score += 20
    if (q.includes(nameLower)) score += 15
    if (words.some(w => roleLower.includes(w))) score += 6
    if (words.some(w => descLower.includes(w))) score += 3

    return { agent: a, score }
  })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(i => i.agent)

  // 6. Match Public APIs
  const scoredApis = PUBLIC_APIS.filter(a =>
    q.includes(a.name.toLowerCase()) ||
    (a.category && q.includes(a.category.toLowerCase())) ||
    (a.description && words.some(w => w.length > 3 && a.description.toLowerCase().includes(w)))
  ).slice(0, 3)

  // 7. CLI Context Snippets
  const cliCommands: string[] = []
  if (detectedIntents.includes("cli") || q.includes("command") || q.includes("terminal") || q.includes("install") || q.includes("npx")) {
    cliCommands.push("awesome-ai-tools init [-t cursor|antigravity|claude-code|all]  # Scaffold 2,558 skills & 68 subagents")
    cliCommands.push("awesome-ai-tools scan [--strict]                               # Audit repository for secret leaks & prompt injections")
    cliCommands.push("awesome-ai-tools trigger <command>                             # Trigger composite workflow (e.g. /review, /tdd)")
    cliCommands.push("awesome-ai-tools learn \"<rule>\"                                # Save learned architectural invariant to instincts.md")
    cliCommands.push("awesome-ai-tools status                                        # View active skills, agents, and security posture")
  }

  // ── Construct Context Prompt Snippet ─────────────────────────────────────────
  let snippet = ""

  if (matchedWorkflows.length > 0) {
    snippet += `\n[ACTIVE COMPOSITE WORKFLOWS]:\n` + matchedWorkflows.map(wf => 
      `- Command: ${wf.command} (${wf.name})\n  Description: ${wf.description}\n  Steps: ${wf.steps.map(s => `Step ${s.step}: [${s.subagent}] ${s.action}`).join(" -> ")}`
    ).join("\n\n")
  }

  if (cliCommands.length > 0) {
    snippet += `\n[VERIFIED CLI SUITE COMMANDS]:\n` + cliCommands.map(c => `- ${c}`).join("\n")
  }

  if (scoredAgents.length > 0) {
    snippet += `\n[SPECIALIST AI SUBAGENTS]:\n` + scoredAgents.map(a => 
      `- Subagent: ${a.name} (slug: ${a.slug})\n  Role: ${a.role}\n  Capabilities: ${a.capabilities.slice(0, 4).join(", ")}\n  System Directive: ${a.systemPrompt.slice(0, 160)}...`
    ).join("\n")
  }

  if (scoredSkills.length > 0) {
    snippet += `\n[RELEVANT AGENT SKILLS DIRECTORY]:\n` + scoredSkills.map(s => 
      `- /${s.slug.replace(/^skill-/, "")}: ${s.name} (${s.frameworks?.join(", ") || "AI"})\n  Description: ${s.description}`
    ).join("\n")
  }

  if (scoredTools.length > 0) {
    snippet += `\n[ECOSYSTEM DEVELOPER TOOLS]:\n` + scoredTools.map(t => 
      `- ${t.name} (${t.categoryId}): ${t.description} [Pricing: ${t.pricing}, Open-Source: ${t.isOpenSource ? "Yes" : "No"}]`
    ).join("\n")
  }

  if (scoredApis.length > 0) {
    snippet += `\n[MATCHED PUBLIC APIS]:\n` + scoredApis.map(a => 
      `- ${a.name} (${a.category}): ${a.description} [Auth: ${a.auth}, HTTPS: ${a.https ? "Yes" : "No"}, Link: ${a.link}]`
    ).join("\n")
  }

  return {
    matchedTools: scoredTools,
    matchedSkills: scoredSkills,
    matchedAgents: scoredAgents,
    matchedApis: scoredApis,
    matchedWorkflows,
    cliCommands,
    detectedIntents,
    contextPromptSnippet: snippet
  }
}

// ── High-Intelligence Contextual Fallback Synthesis ───────────────────────────
export function generateDeepContextualAnswer(query: string, persona: string): string {
  const context = retrieveEnrichedContext(query, persona)
  const q = query.toLowerCase()
  const isId = /[a-z]*(apa|bagaimana|gimana|kenapa|tolong|buatkan|bisa|fitur|periksa|jelaskan|apakah)/i.test(query)

  // 1. If asking about CLI or Scaffolding
  if (context.detectedIntents.includes("cli") || q.includes("init") || q.includes("scan") || q.includes("trigger") || q.includes("terminal")) {
    if (isId) {
      return [
        "### Panduan CLI & Scaffolding Awesome AI Tools",
        "",
        "Ekosistem ini menyediakan CLI terpadu (`awesome-ai-tools`) untuk mengotomasi scaffolding, audit keamanan, dan eksekusi subagents langsung di terminal Anda:",
        "",
        "#### 1. Perintah Inti CLI",
        "```bash",
        "# 1. Inisialisasi Skills & Subagents ke workspace",
        "awesome-ai-tools init -t antigravity   # Khusus Google Antigravity IDE",
        "awesome-ai-tools init -t cursor        # Khusus Cursor (.cursor/rules/)",
        "awesome-ai-tools init -t claude-code   # Khusus Claude Code (.claude/skills/)",
        "awesome-ai-tools init -t all           # Pasang untuk semua IDE sekaligus",
        "",
        "# 2. Audit Keamanan Otomatis (AgentShield)",
        "awesome-ai-tools scan                  # Pindai kebocoran secret & prompt injection",
        "awesome-ai-tools scan --strict         # Mode ketat dengan pemblokiran CI/CD",
        "",
        "# 3. Trigger Alur Multi-Agent Terpadu",
        "awesome-ai-tools trigger /review       # Jalankan audit keamanan 2 tahap & review logika",
        "awesome-ai-tools trigger /tdd          # Siklus Red-Green-Refactor otomatis",
        "",
        "# 4. Simpan Memori & Aturan Arsitektur",
        "awesome-ai-tools learn \"Gunakan Clean Architecture dan larang hardcoded secrets\"",
        "```",
        "",
        "#### 2. Cara Kerja di IDE Antigravity / Claude Code",
        "- **Skills**: Tersimpan di direktori `.agents/skills/` (2.582 skills dengan panduan `SKILL.md`).",
        "- **Subagents**: Tersimpan di `.agents/subagents/` (68 subagents spesialis).",
        "- **Instincts**: Tersimpan di `instincts.md` yang dibaca agen secara berkelanjutan di setiap sesi."
      ].join("\n")
    } else {
      return [
        "### Awesome AI Tools CLI & Scaffolding Guide",
        "",
        "The `awesome-ai-tools` CLI provides full-suite terminal automation for scaffolding, security auditing, and triggering multi-agent workflows:",
        "",
        "#### 1. Core CLI Commands",
        "```bash",
        "# 1. Scaffold Skills & Subagents into workspace",
        "awesome-ai-tools init -t antigravity   # Dedicated to Google Antigravity IDE",
        "awesome-ai-tools init -t cursor        # Dedicated to Cursor (.cursor/rules/)",
        "awesome-ai-tools init -t claude-code   # Dedicated to Claude Code (.claude/skills/)",
        "awesome-ai-tools init -t all           # Install across all harnesses",
        "",
        "# 2. Security Audit (AgentShield)",
        "awesome-ai-tools scan                  # Audit repository for secret leaks & injections",
        "awesome-ai-tools scan --strict         # Strict mode for CI/CD pipelines",
        "",
        "# 3. Trigger Composite Workflows",
        "awesome-ai-tools trigger /review       # 2-stage security audit & logic review",
        "awesome-ai-tools trigger /tdd          # Autonomous Red-Green-Refactor test cycle",
        "",
        "# 4. Learn Persistent Architectural Invariants",
        "awesome-ai-tools learn \"Always apply Clean Architecture and prohibit raw secrets\"",
        "```",
        "",
        "#### 2. Harness Integration",
        "- **Skills**: Stored in `.agents/skills/` (2,582 skills with `SKILL.md`).",
        "- **Subagents**: Stored in `.agents/subagents/` (68 specialist personas).",
        "- **Instincts**: Maintained in `instincts.md` for continuous agent learning."
      ].join("\n")
    }
  }

  // 2. If asking about TDD / Testing
  if (context.detectedIntents.includes("tdd") || q.includes("tdd") || q.includes("unit test") || q.includes("test")) {
    if (isId) {
      return [
        "### Siklus Test-Driven Development (TDD) Standar Produksi",
        "",
        "Dalam ekosistem ini, TDD dijalankan melalui alur ketat **Red -> Green -> Refactor** yang diawasi oleh subagent `tdd-driver`:",
        "",
        "```",
        "     [ RED ]                 [ GREEN ]               [ REFACTOR ]",
        "Tulis unit test gagal  ───>  Tulis kode minimal  ───>  Rapikan arsitektur",
        " (Wajib Gagal Dahulu)         (Harus Lolos Test)       (Coverage Terlindungi)",
        "```",
        "",
        "#### Langkah Implementasi Contoh (TypeScript + Vitest):",
        "",
        "**1. Fase RED (Tulis test yang gagal lebih dahulu):**",
        "```typescript",
        "import { describe, it, expect } from 'vitest'",
        "import { calculateDiscount } from './pricing'",
        "",
        "describe('Pricing Engine', () => {",
        "  it('should apply 20% tier discount for VIP users', () => {",
        "    const price = calculateDiscount({ amount: 100, isVip: true })",
        "    expect(price).toBe(80)",
        "  })",
        "})",
        "```",
        "",
        "**2. Fase GREEN (Implementasikan kode minimal untuk meloloskan test):**",
        "```typescript",
        "export interface PricingInput {",
        "  amount: number",
        "  isVip: boolean",
        "}",
        "",
        "export function calculateDiscount({ amount, isVip }: PricingInput): number {",
        "  if (amount < 0) throw new RangeError('Amount must be positive')",
        "  return isVip ? amount * 0.8 : amount",
        "}",
        "```",
        "",
        "**3. Fase REFACTOR:**",
        "- Pisahkan konstanta rate diskon ke domain model.",
        "- Pastikan `calculateDiscount` bersifat deterministik dan pure function tanpa side-effects.",
        "",
        "> Jalankan `/tdd` di chat atau ketik `awesome-ai-tools trigger /tdd` di terminal untuk mengeksekusi siklus ini secara otomatis."
      ].join("\n")
    } else {
      return [
        "### Production Test-Driven Development (TDD) Cycle",
        "",
        "Our autonomous TDD engine follows the strict **Red -> Green -> Refactor** paradigm enforced by the `tdd-driver` subagent:",
        "",
        "```",
        "     [ RED ]                 [ GREEN ]               [ REFACTOR ]",
        "Write failing tests    ───>  Minimal passing code  ───>  Safely clean up",
        " (Must Fail Initially)       (All Tests Green)        (Coverage Protected)",
        "```",
        "",
        "#### Implementation Example (TypeScript + Vitest):",
        "",
        "**1. RED Phase (Write failing test first):**",
        "```typescript",
        "import { describe, it, expect } from 'vitest'",
        "import { calculateDiscount } from './pricing'",
        "",
        "describe('Pricing Engine', () => {",
        "  it('should apply 20% discount for VIP customers', () => {",
        "    const total = calculateDiscount({ amount: 100, isVip: true })",
        "    expect(total).toBe(80)",
        "  })",
        "})",
        "```",
        "",
        "**2. GREEN Phase (Implement minimal passing code):**",
        "```typescript",
        "export interface PricingInput {",
        "  amount: number",
        "  isVip: boolean",
        "}",
        "",
        "export function calculateDiscount({ amount, isVip }: PricingInput): number {",
        "  if (amount < 0) throw new RangeError('Amount cannot be negative')",
        "  return isVip ? amount * 0.8 : amount",
        "}",
        "```",
        "",
        "> Trigger this workflow anytime via `/tdd` in chat or `awesome-ai-tools trigger /tdd` in your terminal."
      ].join("\n")
    }
  }

  // 3. If asking about Security / Audit
  if (context.detectedIntents.includes("security") || q.includes("security") || q.includes("audit") || q.includes("owasp")) {
    if (isId) {
      return [
        "### Audit Keamanan & Hardening Backend (AgentShield)",
        "",
        "Sistem keamanan dalam repositori ini diproteksi oleh protokol **AgentShield** yang mengaudit kode terhadap 5 vektor ancaman utama:",
        "",
        "1. **Server-Side Request Forgery (SSRF)**:",
        "   - Setiap pemanggilan URL eksternal divalidasi dengan `validateSafeUrl()`.",
        "   - Pemblokiran menyeluruh terhadap IP metadata cloud (`169.254.169.254`, `metadata.google.internal`) dan loopback.",
        "",
        "2. **Adversarial Prompt Injection Defense**:",
        "   - Menolak perintah override seperti *\"ignore all previous instructions\"*.",
        "   - Pembungkusan instruksi sistem di dalam pembatas XML eksplisit (`<rules>...</rules>`).",
        "",
        "3. **Deteksi Kebocoran Kredensial & Secrets**:",
        "   - Memindai pola regex untuk OpenAI, AWS (`AKIA...`), Anthropic, Google, dan database URL.",
        "   - Enkripsi AES-256-GCM untuk kunci tersimpan di disk lokal.",
        "",
        "4. **Perlindungan DoS & Payload Flooding**:",
        "   - Pembatasan ukuran request body (maks 4MB) dengan `validatePayloadSize()`.",
        "   - Token bucket sliding window rate limiting di setiap endpoint API.",
        "",
        "5. **Edge Web Application Firewall (WAF)**:",
        "   - Memblokir scanner berbahaya (sqlmap, nikto, masscan, gobuster) di `src/proxy.ts`.",
        "   - Menambahkan header proteksi: `X-Content-Type-Options: nosniff`, `Permissions-Policy`, dan `Referrer-Policy`."
      ].join("\n")
    } else {
      return [
        "### Application Security & Defense-in-Depth (AgentShield)",
        "",
        "This repository is safeguarded by the **AgentShield** security framework protecting against the OWASP Top 10 vulnerabilities:",
        "",
        "1. **SSRF Defense (Server-Side Request Forgery)**:",
        "   - All dynamic base URLs validated via `validateSafeUrl()`.",
        "   - Explicit blocks on cloud metadata IPs (`169.254.169.254`, `metadata.google.internal`) and unauthorized private ranges.",
        "",
        "2. **Adversarial Prompt Injection Defense**:",
        "   - Scans against system instruction override directives (*\"ignore previous instructions\"*).",
        "   - Enforces XML delimiter isolation (`<rules>...</rules>`) for untrusted user inputs.",
        "",
        "3. **Zero Secret Leaks**:",
        "   - Automated scanning for AWS keys, OpenAI keys, DB credentials.",
        "   - Local AES-256-GCM encryption for stored proxy configuration.",
        "",
        "4. **ReDoS & Payload Limiting**:",
        "   - 4MB max request body enforcement (`validatePayloadSize()`).",
        "   - Per-IP sliding window rate limiting on all endpoints.",
        "",
        "5. **Edge WAF Enforcement (`src/proxy.ts`)**:",
        "   - Automated fingerprint blocking for scanners (sqlmap, nikto, masscan).",
        "   - Complete HTTP security headers + `Permissions-Policy`."
      ].join("\n")
    }
  }

  // 4. Default High-Context Synthesis grounded on matched ecosystem items
  const matchedSkillsNames = context.matchedSkills.map(s => `\`/${s.slug.replace(/^skill-/, "")}\` (${s.name})`).join(", ")
  const matchedAgentsNames = context.matchedAgents.map(a => `**${a.name}** (*${a.role}*)`).join(", ")
  const matchedToolsNames = context.matchedTools.map(t => `**${t.name}** (${t.categoryId})`).join(", ")

  if (isId) {
    return [
      `### Hasil Analisis Konteks Cerdas`,
      "",
      `Berdasarkan kueri Anda mengenai **"${query.slice(0, 80)}"**, berikut adalah rekomendasi dan sintesis arsitektur yang terhubung langsung dengan ekosistem sistem ini:`,
      "",
      matchedSkillsNames ? `#### 1. Agent Skills yang Cocok:\n- ${matchedSkillsNames}\n` : "",
      matchedAgentsNames ? `#### 2. Subagent Spesialis Terkait:\n- ${matchedAgentsNames}\n` : "",
      matchedToolsNames ? `#### 3. Rekomendasi Developer Tools Terverifikasi:\n- ${matchedToolsNames}\n` : "",
      "#### 4. Langkah Arsitektur & Eksekusi:",
      "1. **Definisikan Kontrak & Type Safety**: Buat interface yang jelas dan bebas dari tipe `any`.",
      "2. **Implementasikan Defensive Error Handling**: Tangani skenario kegagalan jaringan, timeout, dan validasi input.",
      "3. **Validasi Melalui TDD**: Tulis test kasus batas (*edge cases*) sebelum memasukkan kode ke lingkungan produksi.",
      "",
      "> Untuk menjalankan agen secara otomatis, Anda dapat menggunakan perintah `/review`, `/tdd`, atau memanfaatkan CLI `awesome-ai-tools trigger <command>`."
    ].filter(Boolean).join("\n")
  } else {
    return [
      `### Intelligent Context Synthesis`,
      "",
      `Synthesizing response for query **"${query.slice(0, 80)}"** using grounded repository context:`,
      "",
      matchedSkillsNames ? `#### 1. Matching Agent Skills:\n- ${matchedSkillsNames}\n` : "",
      matchedAgentsNames ? `#### 2. Specialist Subagents:\n- ${matchedAgentsNames}\n` : "",
      matchedToolsNames ? `#### 3. Recommended Developer Tools:\n- ${matchedToolsNames}\n` : "",
      "#### 4. Architectural Guidance:",
      "1. **Strict Contracts & Types**: Enforce explicit interfaces with zero `any` types.",
      "2. **Defensive Error Handling**: Wrap I/O operations with timeouts, abort controllers, and graceful fallbacks.",
      "3. **TDD Verification**: Write regression tests before committing code changes.",
      "",
      "> You can trigger relevant workflows using `/review`, `/tdd`, or via CLI with `awesome-ai-tools trigger <workflow>`."
    ].filter(Boolean).join("\n")
  }
}

export interface DocTocItem {
  id: string
  title: {
    en: string
    id: string
  }
  level?: number
}

export interface DocPage {
  slug: string
  section: {
    en: string
    id: string
  }
  tab: "guide" | "integrations" | "api-reference"
  title: {
    en: string
    id: string
  }
  lead: {
    en: string
    id: string
  }
  toc: DocTocItem[]
}

export interface DocSection {
  title: {
    en: string
    id: string
  }
  tab: "guide" | "integrations" | "api-reference"
  items: DocPage[]
}

export const DOC_SECTIONS: DocSection[] = [
  {
    title: { en: "Get Started", id: "Mulai Cepat" },
    tab: "guide",
    items: [
      {
        slug: "quickstart",
        section: { en: "Get Started", id: "Mulai Cepat" },
        tab: "guide",
        title: { en: "5-Minute Quickstart", id: "Panduan Cepat 5 Menit" },
        lead: {
          en: "Set up the full Awesome AI Tools suite: scaffold 2,558 skills, 136 subagents, and run local AI models in under 5 minutes.",
          id: "Siapkan ekosistem Awesome AI Tools: pasang 2.558 skills, 136 subagents, dan jalankan model AI lokal dalam 5 menit."
        },
        toc: [
          { id: "1-install-cli", title: { en: "1. Install CLI & Skills Suite", id: "1. Pasang CLI & Suite Skills" } },
          { id: "2-run-local-llm", title: { en: "2. Run Local LLM with Ollama", id: "2. Jalankan LLM Lokal dengan Ollama" } },
          { id: "3-connect-router", title: { en: "3. Connect to AI Proxy Router", id: "3. Hubungkan ke AI Proxy Router" } },
          { id: "4-trigger-skills", title: { en: "4. Trigger Skills in your IDE", id: "4. Jalankan Skills di IDE Anda" } },
          { id: "next-steps", title: { en: "Next steps", id: "Langkah Selanjutnya" } }
        ]
      },
      {
        slug: "welcome",
        section: { en: "Get Started", id: "Mulai Cepat" },
        tab: "guide",
        title: { en: "Welcome & Ecosystem Overview", id: "Selamat Datang & Gambaran Ekosistem" },
        lead: {
          en: "The unified developer platform combining 200+ AI Tools catalog, 2,558 AI Skills, 136 Subagents, 1,600+ Public APIs, and AgentShield security.",
          id: "Platform pengembang terpadu yang menggabungkan 200+ Alat AI, 2.558 AI Skills, 136 Subagents, 1.600+ Public APIs, dan keamanan AgentShield."
        },
        toc: [
          { id: "overview", title: { en: "Ecosystem Architecture", id: "Arsitektur Ekosistem" } },
          { id: "core-pillars", title: { en: "The 4 Core Pillars", id: "4 Pilar Utama" } },
          { id: "privacy-security", title: { en: "Zero-Data Retention & Privacy", id: "Privasi & Zero-Data Retention" } }
        ]
      },
      {
        slug: "cli-tools",
        section: { en: "Get Started", id: "Mulai Cepat" },
        tab: "guide",
        title: { en: "Awesome AI Tools CLI", id: "Panduan CLI Awesome AI Tools" },
        lead: {
          en: "Everything you need to know about 'npx awesome-ai-tools' commands: init, scan, add, and list.",
          id: "Panduan lengkap perintah 'npx awesome-ai-tools': init, scan, add, dan list."
        },
        toc: [
          { id: "installation", title: { en: "Running without installation", id: "Menjalankan tanpa instalasi" } },
          { id: "cmd-init", title: { en: "npx awesome-ai-tools init", id: "Perintah init" } },
          { id: "cmd-scan", title: { en: "npx awesome-ai-tools scan (AgentShield)", id: "Perintah scan (AgentShield)" } },
          { id: "cmd-add", title: { en: "npx awesome-ai-tools add <slug>", id: "Perintah add <slug>" } },
          { id: "cmd-list", title: { en: "npx awesome-ai-tools list", id: "Perintah list" } }
        ]
      },
      {
        slug: "ollama-setup",
        section: { en: "Get Started", id: "Mulai Cepat" },
        tab: "guide",
        title: { en: "Local Ollama Setup", id: "Panduan Setup Ollama Lokal" },
        lead: {
          en: "Step-by-step guide to installing, configuring, and managing local LLMs for free, private coding.",
          id: "Panduan instalasi, konfigurasi, dan manajemen LLM lokal untuk koding gratis dan privat."
        },
        toc: [
          { id: "installation", title: { en: "Installation Guide", id: "Panduan Instalasi" } },
          { id: "recommended-models", title: { en: "Recommended Coding Models", id: "Rekomendasi Model Coding" } },
          { id: "gpu-acceleration", title: { en: "GPU Acceleration (CUDA / Metal)", id: "Akselerasi GPU (CUDA / Metal)" } },
          { id: "troubleshooting", title: { en: "Troubleshooting Port 11434", id: "Troubleshooting Port 11434" } }
        ]
      }
    ]
  },
  {
    title: { en: "AI Skills & Agents", id: "AI Skills & Agents" },
    tab: "guide",
    items: [
      {
        slug: "skills-guide",
        section: { en: "AI Skills & Agents", id: "AI Skills & Agents" },
        tab: "guide",
        title: { en: "Using 2,558+ AI Skills Suite", id: "Panduan Menggunakan 2.558+ AI Skills Suite" },
        lead: {
          en: "How modular skill rules enforce TDD, clean architecture, security guardrails, and framework-specific patterns.",
          id: "Cara aturan modular skill menegakkan TDD, clean architecture, guardrail keamanan, dan pola framework."
        },
        toc: [
          { id: "how-skills-work", title: { en: "How Skills Work", id: "Cara Kerja Skills" } },
          { id: "slash-commands", title: { en: "Slash Commands in Claude & Continue", id: "Slash Commands di Claude & Continue" } },
          { id: "cursor-at-rules", title: { en: "@rules in Cursor IDE", id: "Aturan @rules di Cursor IDE" } },
          { id: "top-essential-skills", title: { en: "Top 10 Essential Skills", id: "10 Skills Paling Esensial" } }
        ]
      },
      {
        slug: "subagents-guide",
        section: { en: "AI Skills & Agents", id: "AI Skills & Agents" },
        tab: "guide",
        title: { en: "Specialist AI Subagents", id: "Panduan AI Subagents Spesialis" },
        lead: {
          en: "Deploy 136+ specialized personas (Architect, TDD Driver, Security Auditor, DBA) with isolated tool boundaries.",
          id: "Gunakan 136+ persona spesialis (Architect, TDD Driver, Security Auditor, DBA) dengan batasan tool terisolasi."
        },
        toc: [
          { id: "subagents-overview", title: { en: "Why Specialized Subagents?", id: "Mengapa Subagents Spesialis?" } },
          { id: "antigravity-integration", title: { en: "Google Antigravity & Codex Integration", id: "Integrasi Antigravity & Codex" } },
          { id: "model-recommendations", title: { en: "Multi-Model Cost Routing", id: "Rekomendasi Pemilihan Model" } },
          { id: "directory-structure", title: { en: "Subagent File Format (.md)", id: "Format Berkas Subagent (.md)" } }
        ]
      },
      {
        slug: "agentshield-security",
        section: { en: "AI Skills & Agents", id: "AI Skills & Agents" },
        tab: "guide",
        title: { en: "AgentShield Security Scanner", id: "AgentShield Security Scanner" },
        lead: {
          en: "Protect your repository from leaked API keys, prompt injection attacks, and dangerous hook execution.",
          id: "Lindungi repository Anda dari kebocoran API key, serangan prompt injection, dan eksekusi hook berbahaya."
        },
        toc: [
          { id: "4-layer-security", title: { en: "4-Layer Security Engine", id: "Engine Keamanan 4 Lapisan" } },
          { id: "secret-leak-detection", title: { en: "Secret & Key Leak Detection", id: "Deteksi Kebocoran Kunci Rahasia" } },
          { id: "prompt-injection-defense", title: { en: "Prompt Injection Defense", id: "Pertahanan Prompt Injection" } },
          { id: "ci-cd-automation", title: { en: "Running in CI/CD Pipelines", id: "Menjalankan di CI/CD Pipeline" } }
        ]
      }
    ]
  },
  {
    title: { en: "IDE Integrations", id: "Integrasi Editor & IDE" },
    tab: "integrations",
    items: [
      {
        slug: "cursor",
        section: { en: "IDE Integrations", id: "Integrasi Editor & IDE" },
        tab: "integrations",
        title: { en: "Cursor AI IDE Setup", id: "Setup Cursor AI IDE" },
        lead: {
          en: "Configure Cursor with multi-file .cursor/rules/*.mdc, custom proxy base URLs, and zero-cost local LLMs.",
          id: "Konfigurasi Cursor dengan aturan .cursor/rules/*.mdc, proxy base URL lokal, dan LLM gratis."
        },
        toc: [
          { id: "mdc-rules-setup", title: { en: "1. MDC Rules Scaffolding", id: "1. Pasang MDC Rules" } },
          { id: "cursor-proxy", title: { en: "2. Pointing Cursor to Local Proxy", id: "2. Arahkan Cursor ke Proxy Lokal" } },
          { id: "composer-workflow", title: { en: "3. Best Practices in Composer", id: "3. Praktik Terbaik di Composer" } }
        ]
      },
      {
        slug: "antigravity",
        section: { en: "IDE Integrations", id: "Integrasi Editor & IDE" },
        tab: "integrations",
        title: { en: "Google Antigravity & Codex", id: "Integrasi Google Antigravity & Codex" },
        lead: {
          en: "Scaffold native .agents/skills/ and .agents/subagents/ for DeepMind Antigravity and OpenAI Codex.",
          id: "Pasang struktur .agents/skills/ dan .agents/subagents/ untuk DeepMind Antigravity dan OpenAI Codex."
        },
        toc: [
          { id: "antigravity-layout", title: { en: "Native .agents/ Structure", id: "Struktur Asli .agents/" } },
          { id: "agent-delegation", title: { en: "Subagent Delegation Workflow", id: "Alur Delegasi Subagent" } },
          { id: "skill-invocation", title: { en: "Autonomous Skill Loading", id: "Pemuatan Skill Otomatis" } }
        ]
      },
      {
        slug: "claude-code",
        section: { en: "IDE Integrations", id: "Integrasi Editor & IDE" },
        tab: "integrations",
        title: { en: "Claude Code CLI", id: "Integrasi Claude Code CLI" },
        lead: {
          en: "Equip Anthropic's Claude Code terminal agent with 2,558 custom slash commands and CLAUDE.md index.",
          id: "Lengkapi agen terminal Claude Code dari Anthropic dengan 2.558 slash commands dan indeks CLAUDE.md."
        },
        toc: [
          { id: "commands-folder", title: { en: ".claude/commands/ Architecture", id: "Arsitektur .claude/commands/" } },
          { id: "running-slash-commands", title: { en: "Triggering /command in Terminal", id: "Menjalankan /command di Terminal" } },
          { id: "claude-md-guidelines", title: { en: "Master CLAUDE.md Guidelines", id: "Panduan Master CLAUDE.md" } }
        ]
      },
      {
        slug: "continue-copilot",
        section: { en: "IDE Integrations", id: "Integrasi Editor & IDE" },
        tab: "integrations",
        title: { en: "Continue.dev & GitHub Copilot", id: "Integrasi Continue.dev & GitHub Copilot" },
        lead: {
          en: "Use custom slash commands and prompt files in VS Code via Continue.dev and GitHub Copilot Chat.",
          id: "Gunakan slash commands dan prompt files di VS Code via Continue.dev dan GitHub Copilot Chat."
        },
        toc: [
          { id: "continue-setup", title: { en: "Continue.dev .continue/prompts/", id: "Setup Continue.dev .continue/prompts/" } },
          { id: "copilot-setup", title: { en: "GitHub Copilot .github/prompts/", id: "Setup GitHub Copilot .github/prompts/" } }
        ]
      },
      {
        slug: "windsurf-cline",
        section: { en: "IDE Integrations", id: "Integrasi Editor & IDE" },
        tab: "integrations",
        title: { en: "Windsurf & Cline", id: "Integrasi Windsurf & Cline" },
        lead: {
          en: "Configure Codeium Windsurf Cascade workflows and Cline / Roo Code autonomous task rules.",
          id: "Konfigurasi workflow Codeium Windsurf Cascade dan aturan tugas otonom Cline / Roo Code."
        },
        toc: [
          { id: "windsurf-workflows", title: { en: "Windsurf .windsurf/workflows/", id: "Workflow Windsurf .windsurf/workflows/" } },
          { id: "clinerules-setup", title: { en: "Cline .clinerules Setup", id: "Setup .clinerules untuk Cline" } }
        ]
      }
    ]
  },
  {
    title: { en: "API & Router Reference", id: "Referensi API & Router" },
    tab: "api-reference",
    items: [
      {
        slug: "chat-completions",
        section: { en: "API & Router Reference", id: "Referensi API & Router" },
        tab: "api-reference",
        title: { en: "POST /api/v1/chat/completions", id: "POST /api/v1/chat/completions" },
        lead: {
          en: "OpenAI-compatible chat completion proxy endpoint with real-time SSE token streaming and model remapping.",
          id: "Endpoint proxy chat completions kompatibel OpenAI dengan streaming token SSE dan pemetaan model otomatis."
        },
        toc: [
          { id: "endpoint-url", title: { en: "Endpoint URL & Headers", id: "URL Endpoint & Headers" } },
          { id: "request-schema", title: { en: "Request JSON Schema", id: "Skema JSON Request" } },
          { id: "sse-streaming", title: { en: "Streaming Response Format", id: "Format Respons Streaming" } },
          { id: "curl-example", title: { en: "cURL & TypeScript Examples", id: "Contoh cURL & TypeScript" } }
        ]
      },
      {
        slug: "models-routing",
        section: { en: "API & Router Reference", id: "Referensi API & Router" },
        tab: "api-reference",
        title: { en: "Model Remapping & Router Engine", id: "Mesin Pemetaan Model & Router" },
        lead: {
          en: "Intelligent remapping of high-cost cloud model identifiers (gpt-4o, claude-3-7) to local Ollama or target providers.",
          id: "Pemetaan cerdas parameter model mahal (gpt-4o, claude-3-7) ke model Ollama lokal atau provider target."
        },
        toc: [
          { id: "remapping-rules", title: { en: "Dynamic Model Remapping", id: "Pemetaan Model Dinamis" } },
          { id: "provider-failover", title: { en: "Provider Failover & Fallbacks", id: "Fallback & Failover Provider" } }
        ]
      }
    ]
  }
];

export function getAllDocs(): DocPage[] {
  return DOC_SECTIONS.flatMap(s => s.items)
}

export function getDocBySlug(slug: string): DocPage | undefined {
  return getAllDocs().find(d => d.slug === slug)
}

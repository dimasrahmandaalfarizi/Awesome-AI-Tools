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
    title: { en: "Get started", id: "Mulai Cepat" },
    tab: "guide",
    items: [
      {
        slug: "quickstart",
        section: { en: "Get started", id: "Mulai Cepat" },
        tab: "guide",
        title: { en: "Quickstart", id: "Panduan Cepat (Quickstart)" },
        lead: {
          en: "Install Ollama, run local AI models, and connect them to your development workflow.",
          id: "Pasang Ollama, jalankan model AI lokal di komputer, dan hubungkan ke alur kerja coding Anda."
        },
        toc: [
          { id: "1-download-ollama", title: { en: "1. Download Ollama", id: "1. Unduh & Pasang Ollama" } },
          { id: "2-open-the-menu", title: { en: "2. Open the terminal", id: "2. Buka Terminal" } },
          { id: "3-start-a-chat", title: { en: "3. Run your first AI model", id: "3. Jalankan Model AI Pertama" } },
          { id: "4-connect-to-project", title: { en: "4. Connect to Awesome AI Proxy Router", id: "4. Hubungkan ke AI Proxy Router" } },
          { id: "next-steps", title: { en: "Next steps", id: "Langkah Selanjutnya" } }
        ]
      },
      {
        slug: "welcome",
        section: { en: "Get started", id: "Mulai Cepat" },
        tab: "guide",
        title: { en: "Welcome to Awesome AI Tools", id: "Selamat Datang di Awesome AI Tools" },
        lead: {
          en: "The all-in-one ecosystem for AI-first developers: prompt skills, local proxy routers, and curated tools.",
          id: "Ekosistem terpadu untuk developer era AI: prompt skills, proxy router lokal, dan kurasi alat terbaik."
        },
        toc: [
          { id: "overview", title: { en: "Ecosystem Overview", id: "Gambaran Ekosistem" } },
          { id: "key-modules", title: { en: "Key Modules", id: "Modul Utama" } },
          { id: "architecture", title: { en: "Architecture & Privacy", id: "Arsitektur & Privasi" } }
        ]
      },
      {
        slug: "ollama-setup",
        section: { en: "Get started", id: "Mulai Cepat" },
        tab: "guide",
        title: { en: "Ollama Local Setup", id: "Panduan Lengkap Ollama Lokal" },
        lead: {
          en: "Step-by-step guide to installing, configuring, and managing local LLMs on Windows, macOS, and Linux.",
          id: "Panduan lengkap instalasi, konfigurasi, dan manajemen LLM lokal di Windows, macOS, dan Linux."
        },
        toc: [
          { id: "installation", title: { en: "Installation Guide", id: "Panduan Instalasi" } },
          { id: "recommended-models", title: { en: "Recommended Coding Models", id: "Rekomendasi Model Coding" } },
          { id: "hardware-requirements", title: { en: "Hardware & GPU Requirements", id: "Kebutuhan Hardware & GPU" } },
          { id: "troubleshooting", title: { en: "Troubleshooting & Port 11434", id: "Troubleshooting & Port 11434" } }
        ]
      }
    ]
  },
  {
    title: { en: "Capabilities", id: "Kemampuan & Fitur" },
    tab: "guide",
    items: [
      {
        slug: "streaming",
        section: { en: "Capabilities", id: "Kemampuan & Fitur" },
        tab: "guide",
        title: { en: "Streaming Responses", id: "Streaming Respons Real-time" },
        lead: {
          en: "Real-time token streaming with Server-Sent Events (SSE) for low latency interactions.",
          id: "Aliran token respons secara instan dengan Server-Sent Events (SSE) untuk latensi minimal."
        },
        toc: [
          { id: "sse-overview", title: { en: "Server-Sent Events Overview", id: "Mengenal Server-Sent Events" } },
          { id: "curl-example", title: { en: "cURL & Terminal Streaming", id: "Contoh cURL & Terminal" } },
          { id: "editor-support", title: { en: "Editor Support", id: "Dukungan Editor" } }
        ]
      },
      {
        slug: "thinking",
        section: { en: "Capabilities", id: "Kemampuan & Fitur" },
        tab: "guide",
        title: { en: "Thinking & Reasoning Models", id: "Model Penalaran (DeepSeek R1 / o1)" },
        lead: {
          en: "Leverage Chain-of-Thought (CoT) reasoning models to solve complex coding architecture challenges.",
          id: "Manfaatkan model penalaran berbasis Chain-of-Thought untuk memecahkan masalah arsitektur kode rumit."
        },
        toc: [
          { id: "what-is-reasoning", title: { en: "What are Reasoning Models?", id: "Apa itu Model Penalaran?" } },
          { id: "deepseek-r1", title: { en: "Using DeepSeek-R1 locally", id: "Menggunakan DeepSeek-R1 Lokal" } },
          { id: "prompting-tips", title: { en: "Prompting Best Practices", id: "Praktik Prompting Terbaik" } }
        ]
      },
      {
        slug: "structured-outputs",
        section: { en: "Capabilities", id: "Kemampuan & Fitur" },
        tab: "guide",
        title: { en: "Structured Outputs (JSON Mode)", id: "Output Terstruktur (Mode JSON)" },
        lead: {
          en: "Enforce strict JSON schema responses from your local or routed LLMs.",
          id: "Hasilkan data JSON valid dengan skema ketat dari model lokal maupun cloud."
        },
        toc: [
          { id: "json-mode", title: { en: "Enabling JSON Mode", id: "Mengaktifkan Mode JSON" } },
          { id: "schema-validation", title: { en: "Schema Validation with Zod", id: "Validasi Skema dengan Zod" } }
        ]
      }
    ]
  },
  {
    title: { en: "Integrations", id: "Integrasi Editor" },
    tab: "integrations",
    items: [
      {
        slug: "cursor",
        section: { en: "Integrations", id: "Integrasi Editor" },
        tab: "integrations",
        title: { en: "Cursor AI Editor", id: "Integrasi Cursor AI" },
        lead: {
          en: "Connect Cursor to your local AI Proxy Router for unlimited, zero-cost coding with local models.",
          id: "Hubungkan Cursor ke AI Proxy Router lokal untuk pair programming tanpa batas biaya."
        },
        toc: [
          { id: "cursor-setup", title: { en: "Configure Base URL in Cursor", id: "Pengaturan Base URL di Cursor" } },
          { id: "cursor-rules", title: { en: "Using .cursor/rules MDC Files", id: "Menggunakan Aturan .cursor/rules" } },
          { id: "composer-integration", title: { en: "Cursor Composer Pairing", id: "Pairing Cursor Composer" } }
        ]
      },
      {
        slug: "cline-roo-code",
        section: { en: "Integrations", id: "Integrasi Editor" },
        tab: "integrations",
        title: { en: "Cline & Roo Code", id: "Integrasi Cline & Roo Code" },
        lead: {
          en: "Autonomous coding agent extensions in VS Code with direct local proxy routing.",
          id: "Ekstensi autonomous coding agent di VS Code dengan integrasi proxy router lokal."
        },
        toc: [
          { id: "cline-setup", title: { en: "OpenAI-Compatible Setup", id: "Setup Kompatibel OpenAI" } },
          { id: "clinerules", title: { en: "Exporting .clinerules", id: "Ekspor File .clinerules" } }
        ]
      },
      {
        slug: "claude-code",
        section: { en: "Integrations", id: "Integrasi Editor" },
        tab: "integrations",
        title: { en: "Claude Code CLI", id: "Integrasi Claude Code CLI" },
        lead: {
          en: "Anthropic's terminal agent with custom instructions via CLAUDE.md files.",
          id: "Agen terminal dari Anthropic dengan instruksi terstruktur via CLAUDE.md."
        },
        toc: [
          { id: "claude-md", title: { en: "CLAUDE.md Rules Injection", id: "Injeksi Aturan CLAUDE.md" } },
          { id: "cli-commands", title: { en: "Running Agent Workflows", id: "Menjalankan Alur Kerja Agen" } }
        ]
      }
    ]
  },
  {
    title: { en: "API Reference", id: "Referensi API" },
    tab: "api-reference",
    items: [
      {
        slug: "chat-completions",
        section: { en: "API Reference", id: "Referensi API" },
        tab: "api-reference",
        title: { en: "POST /api/v1/chat/completions", id: "POST /api/v1/chat/completions" },
        lead: {
          en: "OpenAI-compatible chat completion proxy endpoint with dynamic model remapping.",
          id: "Endpoint proxy chat completions kompatibel OpenAI dengan pemetaan model otomatis."
        },
        toc: [
          { id: "endpoint", title: { en: "Endpoint URL", id: "URL Endpoint" } },
          { id: "request-headers", title: { en: "Request Headers", id: "Request Headers" } },
          { id: "request-body", title: { en: "Request Body", id: "Request Body" } },
          { id: "streaming-response", title: { en: "Response Format", id: "Format Respons" } },
          { id: "example-curl", title: { en: "cURL Example", id: "Contoh cURL" } }
        ]
      },
      {
        slug: "models-routing",
        section: { en: "API Reference", id: "Referensi API" },
        tab: "api-reference",
        title: { en: "Model Remapping Engine", id: "Mesin Pemetaan Model AI" },
        lead: {
          en: "How incoming model parameters (gpt-4o, claude-3-7) are intelligently remapped to Ollama or target providers.",
          id: "Cara parameter model (gpt-4o, claude-3-7) dipetakan otomatis ke Ollama atau provider aktif."
        },
        toc: [
          { id: "how-remapping-works", title: { en: "How Remapping Works", id: "Cara Kerja Pemetaan" } },
          { id: "default-overrides", title: { en: "Default Target Override", id: "Override Target Default" } }
        ]
      }
    ]
  }
]

export function getAllDocs(): DocPage[] {
  return DOC_SECTIONS.flatMap(s => s.items)
}

export function getDocBySlug(slug: string): DocPage | undefined {
  return getAllDocs().find(d => d.slug === slug)
}

import { Category, Tool, Collection } from "@/types"

export const CATEGORY_TRANSLATIONS_ID: Record<string, { name?: string; description: string }> = {
  "ai-ide": {
    name: "AI IDE",
    description: "Lingkungan Pengembangan Terintegrasi (IDE) dengan kapabilitas AI bawaan."
  },
  "coding-assistant": {
    name: "Asisten Koding",
    description: "Alat bantu asisten untuk menulis, meninjau (review), dan mendebug kode program."
  },
  "llm": {
    name: "Model LLM",
    description: "Model Bahasa Besar (Large Language Models) dan infrastruktur pendukung."
  },
  "agent-framework": {
    name: "Framework Agent",
    description: "Framework dan pustaka untuk membangun agen AI otonom."
  },
  "mcp-server": {
    name: "Server MCP",
    description: "Server dan implementasi resmi Model Context Protocol."
  },
  "image-generation": {
    name: "Generasi Gambar",
    description: "Alat untuk menghasilkan dan mengedit gambar visual menggunakan AI."
  },
  "video-generation": {
    name: "Generasi Video",
    description: "Alat untuk memproduksi dan mengedit konten video berbasis AI."
  },
  "audio-ai": {
    name: "Audio & Suara AI",
    description: "Text-to-speech, speech-to-text, dan generator audio cerdas."
  },
  "prompt-engineering": {
    name: "Rekayasa Prompt",
    description: "Alat untuk mengelola, menguji, dan mengoptimasi prompt rules."
  },
  "deployment": {
    name: "Deployment AI",
    description: "Infrastruktur dan platform untuk mendeploy model AI ke produksi."
  },
  "database": {
    name: "Basis Data AI",
    description: "Database yang dioptimalkan untuk AI dan data engineering."
  },
  "vector-database": {
    name: "Vector Database",
    description: "Database khusus untuk menyimpan dan melakukan pencarian kemiripan vector embeddings."
  },
  "automation": {
    name: "Otomatisasi Alur Kerja",
    description: "Alat untuk mengotomatisasi alur kerja dan workflow dengan AI."
  },
  "browser-ai": {
    name: "AI Browser & Web",
    description: "Ekstensi browser dan otomatisasi navigasi web menggunakan AI."
  },
  "productivity": {
    name: "Produktivitas",
    description: "Alat produktivitas umum yang ditingkatkan dengan kecerdasan buatan."
  },
  "documentation": {
    name: "Dokumentasi Teknis",
    description: "Alat untuk membuat dan mengelola dokumentasi teknis secara otomatis."
  },
  "testing": {
    name: "Pengujian & QA",
    description: "Alat pengujian kode dan QA otomatis berbasis AI."
  },
  "security": {
    name: "Keamanan AI",
    description: "Alat untuk keamanan AI, audit kode, dan pemindaian kerentanan."
  },
  "research": {
    name: "Riset & Analisis",
    description: "Alat untuk riset AI akademis dan industri."
  },
  "open-source": {
    name: "Sumber Terbuka",
    description: "Koleksi pilihan proyek AI murni open source dan transparan."
  },
  "ai-api-router": {
    name: "AI API Router",
    description: "Proxy lokal dan perutean untuk mengelola serta memetakan berbagai API LLM."
  }
}

export const TOOL_TRANSLATIONS_ID: Record<string, {
  description?: string
  problem?: string
  solution?: string
  challenge?: string
  impact?: string
  targetUser?: string
  keyFeatures?: string[]
}> = {
  "cursor": {
    description: "Code Editor berbasis AI pertama. Dirancang untuk pair-programming AI dengan fitur Composer, inline chat, dan pemahaman codebase penuh.",
    problem: "Developer menghabiskan terlalu banyak waktu menulis kode boilerplate, mencari konteks di codebase besar, dan berganti-ganti aplikasi browser.",
    solution: "Cursor mengintegrasikan model AI canggih langsung ke fork VS Code, menghadirkan pembuatan kode instan, Q&A berbasis codebase, dan multi-file editing via Composer.",
    challenge: "Mengintegrasikan AI secara mendalam agar terasa alami tanpa mengganggu kenyamanan alur kerja koding atau menambah latensi.",
    impact: "Mempercepat waktu rilis software secara signifikan, memungkinkan developer fokus pada arsitektur dan logika bisnis.",
    targetUser: "Software Engineer, Full Stack Developer, dan Tech Lead.",
    keyFeatures: ["Composer untuk pembuatan multi-file", "Chat berbasis seluruh codebase", "Antarmuka VS Code yang familiar", "Mode privasi enterprise"]
  },
  "github-copilot": {
    description: "Pair programmer AI Anda. Bekerja langsung di editor untuk menyarankan kode dan fungsi lengkap secara real-time.",
    problem: "Menulis kode repetitif dan mencari sintaks API yang kompleks memperlambat kecepatan pengembangan software.",
    solution: "GitHub Copilot memanfaatkan model OpenAI untuk menganalisis konteks file aktif dan memberikan saran autocompletion baris demi baris.",
    impact: "Meningkatkan produktivitas developer hingga 55% dalam menyelesaikan task koding harian.",
    targetUser: "Semua developer software dari pemula hingga profesional enterprise.",
    keyFeatures: ["Saran kode real-time", "Chat interaktif di editor", "Integrasi pull request", "Dukungan multi-bahasa pemrograman"]
  },
  "langchain": {
    description: "Framework untuk mengembangkan aplikasi bertenaga model bahasa besar melalui komposabilitas rantai dan agen.",
    problem: "Menghubungkan LLM dengan sumber data eksternal, memori percakapan, dan eksekusi fungsi membutuhkan banyak kode boilerplate yang rumit.",
    solution: "LangChain menyediakan abstraksi modular untuk chains, agen, memori percakapan, dan konektor data terpadu.",
    impact: "Standar industri paling populer untuk membangun aplikasi RAG dan AI agent di enterprise.",
    targetUser: "AI Engineer, Python/TypeScript Developer, dan Data Scientist.",
    keyFeatures: ["Komponen modular (Chains & Agents)", "Integrasi 100+ model dan vector store", "Manajemen memori percakapan", "Dukungan LangGraph"]
  },
  "ollama": {
    description: "Jalankan model bahasa besar seperti Llama 3, DeepSeek-R1, dan Mistral secara lokal di komputer Anda sendiri.",
    problem: "Mengirim kode rahasia atau data sensitif ke API cloud berisiko privasi dan memerlukan biaya langganan berkelanjutan.",
    solution: "Ollama mengemas inferensi LLM dalam satu binary ringan yang memanfaatkan akselerasi GPU lokal tanpa perlu internet.",
    impact: "Memungkinkan eksekusi AI 100% privat, gratis, dan offline di PC developer.",
    targetUser: "Developer yang peduli privasi, engineer AI lokal, dan organisasi dengan regulasi data ketat.",
    keyFeatures: ["Instalasi 1-perintah", "Akselerasi GPU (CUDA/Metal/ROCm)", "API kompatibel OpenAI", "Manajemen model terpadu"]
  },
  "midjourney": {
    description: "Generator gambar AI generatif terdepan yang menghasilkan visual fotorealistik dan karya seni artistik melalui Discord dan Web.",
    problem: "Membuat aset visual dan ilustrasi berkualitas tinggi membutuhkan keterampilan desain profesional dan waktu lama.",
    solution: "Midjourney menghasilkan visual memukau dengan komposisi fotorealistik hanya dari deskripsi teks sederhana.",
    impact: "Merevolusi industri kreatif, game design, arsitektur, dan pembuatan aset konten visual.",
    targetUser: "Desainer Grafis, Konseptor Game, Content Creator, dan Tim Pemasaran.",
    keyFeatures: ["Kualitas gambar fotorealistik", "Inpainting & outpainting", "Kustomisasi style visual", "Antarmuka web interaktif"]
  },
  "vercel-ai-sdk": {
    description: "Pustaka TypeScript standar industri untuk membangun antarmuka pengguna AI bertenaga streaming dengan React, Next.js, dan Svelte.",
    problem: "Mengelola streaming response token, state UI chat, dan rendering artefak AI di frontend sangat memakan waktu.",
    solution: "Vercel AI SDK menyediakan hook siap pakai (useChat, useCompletion) dengan dukungan streaming native dan generative UI.",
    impact: "Mempercepat pembuatan web AI interaktif modern dengan performa tinggi dan latensi rendah.",
    targetUser: "Frontend Developer, Fullstack Engineer, dan Next.js Developer.",
    keyFeatures: ["Streaming respons tanpa latensi", "Hook useChat & useCompletion", "Generative UI komponen", "Multi-provider abstraction"]
  },
  "deepseek-r1": {
    description: "Model penalaran open-weights revolusioner dengan kapabilitas pemecahan masalah matematika dan koding setara OpenAI o1.",
    problem: "Model LLM standar sering mengalami halusinasi pada logika matematika rumit dan refactoring algoritma kompleks.",
    solution: "DeepSeek R1 dilatih dengan reinforcement learning skala besar untuk menghasilkan penalaran Chain-of-Thought (CoT) transparan.",
    impact: "Mengurangi biaya inferensi reasoning hingga 95% dibandingkan model berbayar proprietary.",
    targetUser: "AI Researcher, Backend Engineer, dan Algorithmic Programmer.",
    keyFeatures: ["Penalaran Chain-of-Thought transparan", "Open-weights untuk deployment lokal", "Akurasi matematika & koding sangat tinggi", "Biaya API super hemat"]
  },
  "claude-3-7-sonnet": {
    description: "Model AI hybrid pertama dari Anthropic yang menggabungkan respons kilat standar dengan penalaran mendalam (extended thinking) dalam satu arsitektur.",
    problem: "Developer harus memilih antara model cepat yang kurang teliti atau model reasoning yang sangat lambat.",
    solution: "Claude 3.7 Sonnet memungkinkan developer mengatur alokasi token berpikir (thinking budget) secara dinamis sesuai kebutuhan task.",
    impact: "Menjadi tolok ukur tertinggi baru dalam pembuatan kode software end-to-end dan penanganan arsitektur sistem rumit.",
    targetUser: "Software Architect, Senior Developer, dan Enterprise Engineering Teams.",
    keyFeatures: ["Penalaran hybrid terukur (Extended Thinking)", "Jendela konteks 200k token", "Peringkat #1 SWE-bench koding", "Output kode presisi tinggi"]
  },
  "qwen-2-5-coder": {
    description: "Model bahasa khusus koding dari Alibaba yang dioptimalkan untuk inferensi lokal kilat dan efisiensi RAM/VRAM minimal.",
    problem: "Model coding besar (70B+) membutuhkan GPU server mahal dan tidak praktis untuk laptop developer harian.",
    solution: "Qwen 2.5 Coder menghadirkan kecerdasan kode setara GPT-4o dalam ukuran ringkas (7B & 14B) yang berjalan mulus di laptop biasa.",
    impact: "Memungkinkan pair-programming AI lokal offline dengan kecepatan di atas 50 token/detik pada hardware konsumen.",
    targetUser: "Developer yang bekerja offline, pengguna Ollama, dan embedded engineer.",
    keyFeatures: ["Ukuran sangat ringan (0.5B - 32B)", "Dukungan 92+ bahasa pemrograman", "Window konteks 128k", "Optimasi untuk Ollama/vLLM"]
  },
  "claude-code": {
    description: "Agen koding terminal interaktif dari Anthropic yang beroperasi langsung di CLI Anda untuk mengedit file, menjalankan perintah bash, dan membuat git commits.",
    problem: "Beralih bolak-balik antara GUI editor, terminal, dan browser memperlambat alur kerja developer.",
    solution: "Claude Code hadir sebagai agen CLI yang membaca file proyek, menjalankan pengujian, dan melakukan refactoring mandiri di terminal.",
    impact: "Mengubah terminal menjadi asisten koding otonom yang mampu menyelesaikan task kompleks dari satu perintah teks.",
    targetUser: "Terminal enthusiasts, DevOps engineer, dan Backend developer.",
    keyFeatures: ["Operasi CLI langsung", "Pemahaman file proyek lokal", "Eksekusi command aman", "Integrasi CLAUDE.md rules"]
  },
  "roo-code": {
    description: "Ekstensi AI coding agent otonom untuk VS Code dengan arsitektur mode khusus (Code, Architect, Ask, Debugger) dan dukungan MCP.",
    problem: "Satu asisten AI generik sering gagal saat harus berpindah antara merancang arsitektur, koding, dan pengujian mendalam.",
    solution: "Roo Code membagi agen ke dalam persona mode spesifik dengan izin alat (tool permissions) yang dapat dikustomisasi penuh.",
    impact: "Memberikan kontrol penuh kepada developer atas izin file, eksekusi terminal, dan integrasi server MCP lokal.",
    targetUser: "VS Code & Cursor power users yang menginginkan autonomous coding tanpa batas vendor.",
    keyFeatures: ["Mode khusus (Architect/Code/Ask)", "Dukungan penuh MCP Client", "Pelacakan token & biaya transparan", "Dukungan kustom API provider"]
  },
  "trae": {
    description: "AI IDE generatif modern dari ByteDance dengan integrasi agen koding Builder dan Chat berbasis model Claude 3.7 & GPT-4o.",
    problem: "Developer membutuhkan lingkungan IDE lengkap yang menyatukan chat dan agen pembuat proyek secara intuitif.",
    solution: "Trae menyediakan mode Builder yang otomatis membuat alur kerja dari spesifikasi ide hingga implementasi kode utuh.",
    impact: "Alternatif gratis yang sangat bertenaga untuk pengembangan aplikasi web dan mobile modern.",
    targetUser: "Fullstack developer dan kreator aplikasi mandiri.",
    keyFeatures: ["Mode Builder otonom", "Dukungan model Claude & GPT terintegrasi", "Antarmuka modern berbasis VS Code", "Fitur kolaborasi real-time"]
  },
  "goose": {
    description: "Agen AI open-source yang dapat diperluas untuk mengotomatisasi pekerjaan software engineering langsung dari baris perintah mesin Anda.",
    problem: "Sebagian besar agen AI bersifat proprietary dan terkunci pada ekosistem berbayar tertentu.",
    solution: "Goose dibuat 100% open-source oleh Block, mendukung plugin toolkit modular, dan dapat dihubungkan ke LLM lokal mana pun.",
    impact: "Membuka ekosistem otomatisasi developer berbasis agen yang bebas lisensi komersial dan transparan.",
    targetUser: "Open-source contributor, DevOps, dan automator workflow.",
    keyFeatures: ["100% open source", "Dukungan extensibility plugins", "Kompatibel dengan model lokal", "Eksekusi alur kerja otonom"]
  },
  "openhands": {
    description: "Platform agen software development open-source (sebelumnya OpenDevin) yang mampu menulis kode, menjalankan terminal, dan browsing web secara mandiri.",
    problem: "Membangun software end-to-end dari issue tracker hingga PR memerlukan agen yang memiliki lingkungan eksekusi aman.",
    solution: "OpenHands menyediakan lingkungan sandbox Docker terisolasi di mana agen AI dapat melakukan pengujian, perbaikan bug, dan submit PR.",
    impact: "Memungkinkan tim software mengotomatisasi perbaikan bug dan triage issue secara otonom.",
    targetUser: "Tech Lead, OSS Maintainer, dan Enterprise Dev Team.",
    keyFeatures: ["Sandbox Docker aman", "Navigasi browser web otomatis", "Penyelesaian issue GitHub otomatis", "Arsitektur multi-agent"]
  }
}

export const PRICING_TRANSLATIONS_ID: Record<string, string> = {
  "Free": "Gratis",
  "Paid": "Berbayar",
  "Freemium": "Freemium",
  "Open Source": "Sumber Terbuka",
  "Enterprise": "Enterprise",
  "Contact for Pricing": "Hubungi Sales"
}

export function getLocalizedCategory(category: Category, locale: string): Category {
  if (locale !== "id") return category
  const trans = CATEGORY_TRANSLATIONS_ID[category.slug]
  if (!trans) return category
  return {
    ...category,
    name: trans.name || category.name,
    description: trans.description || category.description
  }
}

export function getLocalizedTool(tool: Tool, locale: string): Tool {
  if (locale !== "id") return tool
  const trans = TOOL_TRANSLATIONS_ID[tool.slug]
  const localizedPricing = (PRICING_TRANSLATIONS_ID[tool.pricing] || tool.pricing) as any
  if (!trans) {
    return {
      ...tool,
      pricing: localizedPricing
    }
  }
  return {
    ...tool,
    description: trans.description || tool.description,
    problem: trans.problem || tool.problem,
    solution: trans.solution || tool.solution,
    challenge: trans.challenge || tool.challenge,
    impact: trans.impact || tool.impact,
    targetUser: trans.targetUser || tool.targetUser,
    keyFeatures: trans.keyFeatures || tool.keyFeatures,
    pricing: localizedPricing
  }
}

export function getLocalizedPricing(pricing: string, locale: string): string {
  if (locale !== "id") return pricing
  return PRICING_TRANSLATIONS_ID[pricing] || pricing
}

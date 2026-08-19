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
,
  "bolt-new": {
    description: "Sandbox pengembangan web full-stack AI di browser dengan WebContainers. Bangun, jalankan, edit, dan deploy aplikasi Node.js dan React langsung dari prompt.",
    problem: "Menyiapkan environment lokal dan konfigurasi boilerplate memakan waktu lama saat prototyping.",
    solution: "Menjalankan runtime Node.js langsung di browser dengan WebContainers dan pembuatan aplikasi fullstack instan.",
    keyFeatures: ["Runtime Node di browser", "Prompt-to-fullstack React app", "Deploy 1-klik ke Netlify", "Live code editor & terminal"]
  },
  "lovable": {
    description: "Pembuat aplikasi web full-stack GPT-engineer yang mengubah bahasa alami menjadi aplikasi React, Tailwind, dan Supabase siap produksi.",
    problem: "Menerjemahkan wireframe ke kode frontend dengan autentikasi dan database butuh berminggu-minggu.",
    solution: "Menghasilkan aplikasi React produksi dengan integrasi Supabase native dan komponen Tailwind rapi.",
    keyFeatures: ["Integrasi otomatis Supabase", "Sinkronisasi GitHub & PR", "Kanvas visual interaktif", "Ekspor kode Tailwind CSS"]
  },
  "replit-agent": {
    description: "Insinyur perangkat lunak AI otonom dari Replit yang merencanakan, menulis, menguji, dan mendeploy aplikasi full-stack dari awal di cloud.",
    problem: "Membangun aplikasi web butuh perencanaan arsitektur, konfigurasi server, dan debugging yang rumit.",
    solution: "Agen AI menjalankan perintah terminal, instalasi paket, dan debugging error runtime secara mandiri.",
    keyFeatures: ["Inisialisasi proyek otonom", "Debugging otomatis di sandbox", "Database & Auth bawaan", "Hosting cloud instan"]
  },
  "lm-studio": {
    description: "Jelajahi, unduh, dan jalankan model LLM lokal (Llama 3, DeepSeek, Mistral, Qwen) di Mac atau PC Windows dengan akselerasi GPU dan server lokal kompatibel OpenAI.",
    problem: "Mengonfigurasi CUDA driver dan kuantisasi untuk model lokal seringkali rumit bagi developer.",
    solution: "Aplikasi desktop 1-klik untuk unduh model GGUF dari HuggingFace dan menyalakan HTTP server lokal.",
    keyFeatures: ["Pencarian model HuggingFace", "Akselerasi GPU Apple Silicon & NVIDIA", "Server HTTP lokal port 1234", "Output JSON terstruktur"]
  },
  "open-webui": {
    description: "Antarmuka web mandiri (self-hosted) kaya fitur untuk Ollama dan OpenAI dengan dukungan RAG dokumen, eksekusi kode, dan arena multi-model.",
    problem: "Model lokal di CLI tidak memiliki antarmuka modern seperti ChatGPT untuk membaca dokumen dan multi-user.",
    solution: "Web UI fleksibel yang terhubung langsung ke Ollama dengan fitur vector search dokumen dan pencarian web.",
    keyFeatures: ["Dukungan endpoint Ollama & OpenAI", "RAG embedding dokumen", "Integrasi web search", "Manajemen hak akses multi-user"]
  },
  "jan-ai": {
    description: "Alternatif ChatGPT open-source 100% offline untuk desktop yang menjalankan model lokal dengan privasi data penuh.",
    problem: "Mengirimkan kode rahasia perusahaan ke cloud AI menimbulkan risiko kebocoran data.",
    solution: "Menjalankan model lokal pada perangkat dengan database terenkripsi tanpa pelacakan telemetri.",
    keyFeatures: ["Operasi 100% offline", "Server API lokal", "Model manager dengan indikator VRAM", "Ekstensi kustom"]
  },
  "gpt4all": {
    description: "Chatbot lokal open-source hemat privasi oleh Nomic AI untuk menjalankan LLM pada CPU dan GPU biasa tanpa internet.",
    problem: "Banyak developer tidak memiliki GPU mahal untuk menjalankan model AI secara lokal.",
    solution: "Engine C++ teroptimasi yang mampu melakukan inferensi cepat pada prosesor CPU laptop standar.",
    keyFeatures: ["Pencarian dokumen LocalDocs", "Akselerasi CPU & GPU", "SDK Python & TypeScript", "Pustaka model terkuantisasi"]
  },
  "langfuse": {
    description: "Platform engineering LLM open-source untuk tracing eksekusi, evaluasi kualitas, manajemen prompt, dan metrik biaya produksi.",
    problem: "Sulit mendebug rantai agent multi-step, degradasi prompt, dan bottleneck latensi pada produksi.",
    solution: "Tracing alur eksekusi lengkap, rincian latensi, atribusi biaya per pengguna, dan evaluasi otomatis.",
    keyFeatures: ["Tracing rantai bertingkat", "Manajemen versi prompt", "Evaluasi otomatis", "Pelacakan token & biaya"]
  },
  "langsmith": {
    description: "Platform developer terpadu dari LangChain untuk debugging, testing, evaluasi, dan monitoring aplikasi LLM dan agen otonom.",
    problem: "Agen LLM bersifat non-deterministik, membuat pengujian regresi dan cakupan tes sangat menantang.",
    solution: "Visualisasi eksekusi agen, dataset playground, dan pipeline evaluasi regresi otomatis di CI/CD.",
    keyFeatures: ["Visualisasi trace eksekusi", "Suite uji regresi", "Anotasi & label dataset", "Metrik latensi produksi"]
  },
  "helicone": {
    description: "Proxy observabilitas dan caching LLM open-source dengan integrasi 1 baris kode untuk menghemat biaya dan memonitor rate-limit.",
    problem: "Biaya API OpenAI membengkak akibat prompt berulang dan ketiadaan pembatasan rate per pengguna.",
    solution: "Proxy pintar yang menyimpan cache respons, mencatat biaya token, dan melakukan retry otomatis.",
    keyFeatures: ["Caching semantik respons", "Dashboard monitor biaya", "Rate limiting pengguna", "Fallback multi-provider"]
  },
  "litellm": {
    description: "SDK Python dan Server Proxy terpadu untuk memanggil 100+ API LLM menggunakan format standar OpenAI dengan load balancing.",
    problem: "Format API yang berbeda-beda di setiap penyedia LLM menyebabkan keterikatan vendor (lock-in).",
    solution: "Menyeragamkan 100+ API LLM ke dalam skema OpenAI dengan pembagian beban (load balancing).",
    keyFeatures: ["Format terpadu 100+ LLM", "Load balancing & failover", "Manajemen virtual API key", "Batas anggaran token"]
  },
  "deepeval": {
    description: "Framework evaluasi LLM open-source untuk unit testing aplikasi AI seperti software tradisional menggunakan Pytest.",
    problem: "Memastikan perubahan prompt tidak menimbulkan halusinasi atau regresi pada sistem RAG.",
    solution: "Terintegrasi dengan Pytest untuk menguji skor G-Eval, faithfulness, halusinasi, dan bias di CI/CD.",
    keyFeatures: ["Integrasi Pytest native", "Metrik RAG Triad", "Deteksi halusinasi", "Gating otomatis CI/CD"]
  },
  "promptfoo": {
    description: "CLI dan library untuk evaluasi kualitas prompt LLM, keamanan, dan pengujian red-teaming otomatis terhadap 50+ model.",
    problem: "Evaluasi prompt manual subjektif dan rentan meninggalkan celah keamanan prompt injection.",
    solution: "Pengujian matriks prompt otomatis dengan asersi keamanan dan pemindaian celah jailbreak.",
    keyFeatures: ["Pemindaian red teaming otomatis", "Evaluasi matriks prompt", "Integrasi CI/CD", "Web viewer dashboard"]
  },
  "qdrant": {
    description: "Mesin pencari kemiripan vektor dan database vektor open-source berbasis Rust dengan filtering payload dan hybrid search.",
    problem: "Pencarian vektor lambat dan boros memori RAM saat memfilter jutaan embeddings.",
    solution: "Database vektor native Rust dengan kuantisasi skalar dan filtering payload langsung saat indexing.",
    keyFeatures: ["Kuantisasi skalar & produk", "Hybrid dense & sparse search", "Antarmuka REST & gRPC", "Clustering terdistribusi"]
  },
  "weaviate": {
    description: "Database vektor cloud-native yang menyimpan objek dan vektor sekaligus untuk pencarian kemiripan dengan filter terstruktur.",
    problem: "Mengelola pipeline embedding terpisah dari database vektor menambah beban infrastruktur.",
    solution: "Modul vectorizer bawaan yang otomatis mengubah teks dan gambar menjadi vektor saat data disimpan.",
    keyFeatures: ["Vectorizer bawaan", "API kueri GraphQL & REST", "Pencarian hybrid kata kunci + vektor", "Dukungan multi-tenant"]
  },
  "chromadb": {
    description: "Database embedding open-source AI-native yang dirancang untuk kemudahan, kecepatan, dan produktivitas developer.",
    problem: "Menyiapkan database vektor enterprise terlalu rumit untuk prototyping RAG dan agen lokal.",
    solution: "Penyimpanan vektor lokal zero-config yang bisa diinstal dalam 1 baris perintah pip.",
    keyFeatures: ["Persistensi memori & disk", "Sentence-transformers bawaan", "SDK Python & JavaScript", "Siap untuk LangChain"]
  },
  "milvus": {
    description: "Database vektor cloud-native skala masif (miliaran vektor) dengan akselerasi hardware dan clustering terdistribusi.",
    problem: "Database vektor standar gagal diskalakan ketika data melebihi 100 juta vektor.",
    solution: "Arsitektur penyimpanan dan komputasi terpisah untuk mengindeks miliaran koleksi vektor.",
    keyFeatures: ["Indexing miliaran vektor", "Dukungan akselerasi GPU", "Managed cloud Zilliz", "10+ algoritma index"]
  },
  "groq": {
    description: "Engine inferensi LPU berkecepatan rekor dunia (500+ token/detik) untuk model Llama 3, DeepSeek, dan Mixtral.",
    problem: "Kecepatan inferensi standar (20-40 token/detik) membuat respons AI terasa lambat pada aplikasi suara.",
    solution: "Arsitektur tensor LPU kustom yang menghasilkan 500-1000 token/detik dengan format OpenAI API.",
    keyFeatures: ["Kecepatan 500+ token/detik", "Endpoint REST kompatibel OpenAI", "Integrasi Whisper STT", "Mendukung DeepSeek & Llama"]
  },
  "dify": {
    description: "Platform pengembangan aplikasi LLM open-source dengan orkestrasi alur kerja visual, pipeline RAG, dan agen otonom.",
    problem: "Membangun alur kerja AI butuh menyatukan API kustom, vector store, dan antarmuka chat secara manual.",
    solution: "Studio visual lengkap dengan node workflow, manajemen dataset RAG, dan widget chat yang dapat disematkan.",
    keyFeatures: ["Pembuat alur kerja visual", "Manajemen dataset RAG", "Widget chat web siap pasang", "Integrasi multi-model"]
  },
  "copilotkit": {
    description: "Framework open-source untuk membangun AI Copilot, sidebar AI, dan Generative UI interaktif ke dalam aplikasi React.",
    problem: "Membangun copilot yang dapat membaca dan memodifikasi state aplikasi React membutuhkan konfigurasi rumit.",
    solution: "Hooks React bawaan yang menghubungkan model AI langsung dengan state dan aksi antarmuka pengguna.",
    keyFeatures: ["Komponen Generative UI", "Binding dua arah state React", "Primitif sidebar copilot", "Integrasi LangGraph"]
  },
  "qodo": {
    description: "Platform pembuatan unit test otomatis, review kode AI, dan integritas pengujian software untuk developer dan tim.",
    problem: "Menulis unit test komprehensif untuk kode yang rumit memakan banyak waktu developer.",
    solution: "Menganalisis logika kode untuk membuat unit test yang valid dan mendeteksi skenario edge case.",
    keyFeatures: ["Generasi unit test otomatis", "Deteksi skenario edge-case", "Agen review PR di GitHub Actions", "Penjelasan perilaku kode"]
  },
  "coderabbit": {
    description: "Asisten review pull request AI untuk GitHub dan GitLab dengan feedback baris demi baris dan deteksi bug otomatis.",
    problem: "Review manual PR manusia memakan waktu berhari-hari dan sering melewatkan celah keamanan.",
    solution: "Reviewer otomatis yang membaca diff commit dan memberikan saran perbaikan langsung pada PR.",
    keyFeatures: ["Feedback PR baris per baris", "Saran perbaikan 1-klik", "Chat interaktif di komentar PR", "Kustomisasi aturan review"]
  },
  "neon": {
    description: "PostgreSQL serverless dengan fitur instant database branching, penyimpanan elastis, dan autoscaling untuk aplikasi modern.",
    problem: "Menyiapkan database uji coba untuk pull request dan CI/CD memakan waktu dan biaya server.",
    solution: "Branch database instan dibuat dalam 1 detik dengan dukungan pgvector terintegrasi.",
    keyFeatures: ["Branching database 1 detik", "Komputasi scale-to-zero", "pgvector bawaan", "Connection pooling serverless"]
  },
  "turso": {
    description: "Database terdistribusi kompatibel SQLite berbasis libSQL untuk menjalankan jutaan database di edge dengan latensi mikroskopis.",
    problem: "Arsitektur multi-tenant butuh isolasi database per pelanggan tanpa beban biaya server yang tinggi.",
    solution: "Database SQLite ultra-ringan yang mendukung ratusan ribu database terisolasi dalam satu cluster.",
    keyFeatures: ["Database terisolasi per tenant", "Replikasi embedded latensi 0ms", "Ekstensi vector search libSQL", "Model harga serverless"]
  },
  "guardrails-ai": {
    description: "Framework open-source untuk menambahkan pagar pembatas (guardrails) struktural, tipe data, dan keamanan pada output LLM.",
    problem: "Output LLM yang tidak valid JSON atau mengandung halusinasi merusak sistem produksi.",
    solution: "Menerapkan spesifikasi validasi RAIL yang otomatis memperbaiki format output saat terjadi anomali.",
    keyFeatures: ["Validasi skema JSON", "Redaksi data sensitif PII", "Filter halusinasi", "Hub validator Guardrails"]
  },
  "comfyui": {
    description: "Antarmuka node graph modular paling andal untuk alur kerja Stable Diffusion, Flux.1, dan generasi video AI.",
    problem: "UI generasi gambar biasa tidak fleksibel untuk menghubungkan ControlNet, LoRA, dan upscaler kustom.",
    solution: "Editor grafis visual di mana setiap langkah pipeline difusi dapat diatur dan diotomatisasi secara modular.",
    keyFeatures: ["Pipeline node grafis modular", "Dukungan Flux.1 & SDXL", "Ekspor workflow ke JSON/API", "Optimasi hemat VRAM"]
  },
  "continue-dev": {
    description: "Asisten koding AI open-source terpopuler untuk menghubungkan model lokal atau cloud (Ollama, Claude, DeepSeek) ke VS Code.",
    problem: "Asisten koding proprietary mengunci developer ke model cloud tertentu dan mengirim kode privat ke pihak ketiga.",
    solution: "Ekstensi modular open-source yang memungkinkan developer menghubungkan Ollama lokal atau API kustom.",
    keyFeatures: ["Penyedia model bebas", "Autocomplete Tab", "Indeks codebase & @-mentions", "Transparansi open-source"]
  },
  "phind": {
    description: "Mesin pencari AI dan pair programmer yang dirancang khusus untuk insinyur perangkat lunak dengan kutipan dokumen teknis.",
    problem: "Mencari solusi error di StackOverflow dan dokumentasi manual memakan waktu berharga developer.",
    solution: "Mesin pencari generatif dengan grounding internet real-time dan pemahaman konteks codebase.",
    keyFeatures: ["Jawaban teknis dengan kutipan", "Ekstensi VS Code", "Model Phind-70B", "Saran diff kode"]
  },
  "portkey": {
    description: "Panel kontrol dan gateway AI enterprise untuk mengelola 200+ model LLM dengan load balancing, caching, dan audit logs.",
    problem: "Mengelola API key, anggaran, fallback, dan log kepatuhan antar penyedia LLM di lingkungan produksi.",
    solution: "Gateway AI 9.9KB yang super cepat dengan retry otomatis, caching semantik, dan pembatasan kuota.",
    keyFeatures: ["Latensi gateway < 1ms", "Routing fallback multi-provider", "Audit log & batas anggaran", "Caching semantik"]
  },
  "pgvector": {
    description: "Ekstensi pencarian kemiripan vektor open-source untuk PostgreSQL dengan indeks HNSW dan IVFFlat langsung di SQL.",
    problem: "Mengoperasikan database vektor terpisah menimbulkan ketidaksinkronan data dengan database relasional utama.",
    solution: "Menyimpan embeddings vektor langsung sebagai kolom PostgreSQL dengan transaksi ACID penuh.",
    keyFeatures: ["Indeks HNSW & IVFFlat", "Perhitungan jarak L2 & cosine", "Join kueri SQL standar", "Didukung Supabase & Neon"]
  },
  "whisper-openai": {
    description: "Model pengenalan suara canggih dari OpenAI yang dilatih pada 680.000 jam audio multibahasa untuk transkripsi akurat.",
    problem: "API transkripsi suara komersial mahal dan sering salah mengenali istilah teknis koding.",
    solution: "Model speech-to-text open-source yang dapat dijalankan secara lokal di GPU dan CPU biasa.",
    keyFeatures: ["Transkripsi 99+ bahasa", "Identifikasi bahasa otomatis", "Generasi timestamp subtitle", "Dapat dijalankan via whisper.cpp"]
  },
  "duckdb": {
    description: "Sistem manajemen database SQL OLAP in-process untuk kueri analitik secepat kilat pada file Parquet, CSV, dan vektor.",
    problem: "Menjalankan kueri SQL analitik pada gigabyte file Parquet membutuhkan cluster Spark yang berat.",
    solution: "Engine SQL kolumnar yang berjalan langsung di dalam proses tanpa dependensi server eksternal.",
    keyFeatures: ["Kueri langsung ke S3 & Parquet", "Dukungan WASM di browser", "Ekstensi pencarian vektor", "Binding native Python & JS"]
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

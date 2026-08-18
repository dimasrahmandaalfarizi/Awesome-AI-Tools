"use client"

import * as React from "react"
import { useLocale } from "next-intl"
import { Copy, Check, Download } from "lucide-react"
import { DocPage } from "@/data/docs"
import { Link } from "@/i18n/routing"

export interface DocsContentProps {
  doc: DocPage
}

export function DocsContent({ doc }: DocsContentProps) {
  const locale = useLocale()
  const isId = locale === "id"
  const [copiedPage, setCopiedPage] = React.useState(false)
  const [copiedCodeId, setCopiedCodeId] = React.useState<string | null>(null)

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

  return (
    <article className="min-w-0 max-w-3xl flex-1 py-8 px-4 sm:px-8 text-zinc-900 dark:text-zinc-100">
      {/* Breadcrumb / Section Header */}
      <div className="mb-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
        {isId ? doc.section.id : doc.section.en}
      </div>

      {/* Title & Copy Page Button */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800/80 mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading">
          {isId ? doc.title.id : doc.title.en}
        </h1>
        <button
          type="button"
          onClick={handleCopyPage}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors shadow-xs"
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

      {/* Lead description */}
      <p className="text-base text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
        {isId ? doc.lead.id : doc.lead.en}
      </p>

      {/* Render Dynamic Content based on doc slug */}
      {doc.slug === "quickstart" && (
        <div className="space-y-10 text-sm leading-relaxed">
          {/* Step 1 */}
          <section id="1-download-ollama" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {isId ? "1. Unduh & Pasang Ollama" : "1. Download Ollama"}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {isId
                ? "Ollama dapat dijalankan secara mandiri pada sistem operasi Windows, macOS, dan Linux tanpa memerlukan setup cloud yang rumit."
                : "Ollama runs natively on macOS, Windows, and Linux without any cloud dependencies."}
            </p>
            <div className="pt-1">
              <a
                href="https://ollama.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download Ollama</span>
              </a>
            </div>
          </section>

          {/* Step 2 */}
          <section id="2-open-the-menu" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {isId ? "2. Buka Terminal" : "2. Open the terminal"}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {isId
                ? "Jalankan perintah berikut di PowerShell atau terminal untuk memeriksa status instalasi Ollama:"
                : "Run the command in your terminal to verify that the Ollama engine is active:"}
            </p>
            <div className="relative group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 p-4 font-mono text-xs">
              <span className="text-zinc-900 dark:text-zinc-200">ollama --version</span>
              <button
                type="button"
                onClick={() => handleCopyCode("c1", "ollama --version")}
                className="absolute right-3 top-3 p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                title="Copy code"
              >
                {copiedCodeId === "c1" ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </section>

          {/* Step 3 */}
          <section id="3-start-a-chat" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {isId ? "3. Jalankan Model AI Pertama" : "3. Run your first AI model"}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {isId
                ? "Unduh dan jalankan model coding ringan yang sangat responsif seperti Qwen 2.5 Coder atau DeepSeek-R1:"
                : "Pull and run a lightning-fast coding assistant like Qwen 2.5 Coder or DeepSeek-R1:"}
            </p>
            <div className="relative group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 p-4 font-mono text-xs space-y-1">
              <div className="text-zinc-500 dark:text-zinc-400"># Model coding cepat & ringan (7B)</div>
              <div className="text-zinc-900 dark:text-zinc-200 font-semibold">ollama run qwen2.5-coder:7b</div>
              <button
                type="button"
                onClick={() => handleCopyCode("c2", "ollama run qwen2.5-coder:7b")}
                className="absolute right-3 top-3 p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                title="Copy code"
              >
                {copiedCodeId === "c2" ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </section>

          {/* Step 4 */}
          <section id="4-connect-to-project" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {isId ? "4. Hubungkan ke AI Proxy Router" : "4. Connect to Awesome AI Proxy Router"}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {isId
                ? "Di dashboard AI Proxy Router project ini (/router), pilih provider Ollama (Local) dan simpan. Arahkan OpenAI Base URL di editor Cursor atau VS Code Anda ke:"
                : "In the AI Proxy Router dashboard (/router), select Ollama (Local). Then set the OpenAI Base URL in Cursor or VS Code to:"}
            </p>
            <div className="relative group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 p-4 font-mono text-xs">
              <span className="text-zinc-900 dark:text-zinc-200 font-bold">http://localhost:3000/api/v1</span>
              <button
                type="button"
                onClick={() => handleCopyCode("c3", "http://localhost:3000/api/v1")}
                className="absolute right-3 top-3 p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                title="Copy code"
              >
                {copiedCodeId === "c3" ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </section>

          {/* Next Steps */}
          <section id="next-steps" className="pt-6 border-t border-zinc-200 dark:border-zinc-800/80 space-y-3">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
              {isId ? "Langkah Selanjutnya" : "Next steps"}
            </h3>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 list-disc pl-5">
              <li>
                <Link href="/docs/cursor" className="text-zinc-900 dark:text-white font-medium hover:underline">
                  {isId ? "Pelajari integrasi lengkap dengan Cursor AI" : "Learn how to configure Cursor with local models"}
                </Link>
              </li>
              <li>
                <Link href="/docs/thinking" className="text-zinc-900 dark:text-white font-medium hover:underline">
                  {isId ? "Jelajahi model penalaran Chain-of-Thought (DeepSeek-R1)" : "Explore Chain-of-Thought reasoning with DeepSeek-R1"}
                </Link>
              </li>
              <li>
                <Link href="/docs/chat-completions" className="text-zinc-900 dark:text-white font-medium hover:underline">
                  {isId ? "Lihat spesifikasi teknis API chat completions" : "View Chat Completions API reference"}
                </Link>
              </li>
            </ul>
          </section>
        </div>
      )}

      {/* Fallback for other slugs */}
      {doc.slug !== "quickstart" && (
        <div className="space-y-8 text-sm leading-relaxed">
          {doc.toc.map((tItem) => (
            <section key={tItem.id} id={tItem.id} className="space-y-3">
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                {isId ? tItem.title.id : tItem.title.en}
              </h2>
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 p-5 space-y-3">
                <p className="text-zinc-600 dark:text-zinc-400">
                  {isId
                    ? `Dokumentasi untuk bagian ${tItem.title.id}. Panduan teknis dan konfigurasi parameter siap pakai untuk lingkungan pengembangan Anda.`
                    : `Technical documentation and implementation guidelines for ${tItem.title.en}. Production-ready recipes for your developer workspace.`}
                </p>
                <div className="relative rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 p-3 font-mono text-xs">
                  <span className="text-zinc-700 dark:text-zinc-300">
                    {`# Config example for ${doc.slug}\ncurl -X POST http://localhost:3000/api/v1/chat/completions \\\n  -H "Content-Type: application/json" \\\n  -d '{"model": "qwen2.5-coder:7b", "messages": [{"role": "user", "content": "Write a debounce hook"}]}'`}
                  </span>
                </div>
              </div>
            </section>
          ))}
        </div>
      )}
    </article>
  )
}

import * as React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import rehypeHighlight from "rehype-highlight"
import { Copy, Check } from "lucide-react"
import "highlight.js/styles/github-dark.css"

interface ChatMessageRendererProps {
  content: string
  isStreaming?: boolean
}

// Normalize common LLM LaTeX delimiters \[ ... \] and \( ... \) to $$ and $
function normalizeMath(text: string): string {
  if (!text) return ""
  return text
    .replace(/\\\[([\s\S]*?)\\\]/g, (_, math) => `\n$$\n${math.trim()}\n$$\n`)
    .replace(/\\\(([\s\S]*?)\\\)/g, (_, math) => `$${math.trim()}$`)
}

export function ChatMessageRenderer({ content, isStreaming }: ChatMessageRendererProps) {
  const [copiedBlock, setCopiedBlock] = React.useState<string | null>(null)
  const normalizedContent = React.useMemo(() => normalizeMath(content), [content])

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedBlock(id)
      setTimeout(() => setCopiedBlock(null), 2000)
    })
  }

  return (
    <div className="prose prose-invert prose-sm max-w-none leading-relaxed text-zinc-200">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeHighlight]}
        components={{
          // ── Code blocks with copy button ──────────────────────────────────
          pre({ children, ...props }) {
            const codeEl = React.Children.toArray(children).find(
              (c): c is React.ReactElement<{ children?: React.ReactNode; className?: string }> =>
                React.isValidElement(c) && c.type === "code"
            )
            const rawCode =
              typeof codeEl?.props?.children === "string"
                ? codeEl.props.children
                : String(codeEl?.props?.children ?? "")
            const lang =
              codeEl?.props?.className
                ?.replace("language-", "")
                .split(" ")[0] ?? ""
            const blockId = rawCode.slice(0, 24)

            return (
              <div className="relative group my-3 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
                {/* Language badge + copy button */}
                <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    {lang || "code"}
                  </span>
                  <button
                    onClick={() => copyCode(rawCode, blockId)}
                    className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 hover:text-zinc-200 transition-colors"
                  >
                    {copiedBlock === blockId ? (
                      <><Check className="w-3 h-3 text-emerald-400" /><span className="text-emerald-400">Copied</span></>
                    ) : (
                      <><Copy className="w-3 h-3" /><span>Copy</span></>
                    )}
                  </button>
                </div>
                <pre {...props} className="!m-0 !rounded-none !bg-transparent overflow-x-auto px-4 py-3 text-[12.5px] leading-[1.7]">
                  {children}
                </pre>
              </div>
            )
          },

          // ── Inline code ───────────────────────────────────────────────────
          code({ inline, children, ...props }: any) {
            if (inline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded-md bg-zinc-800 text-zinc-200 font-mono text-[12px] border border-zinc-700"
                  {...props}
                >
                  {children}
                </code>
              )
            }
            return <code {...props}>{children}</code>
          },

          // ── Headings ──────────────────────────────────────────────────────
          h1: ({ children }) => (
            <h1 className="text-base font-semibold tracking-tight text-zinc-100 mt-4 mb-2 border-b border-zinc-800 pb-1.5">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-sm font-semibold tracking-tight text-zinc-100 mt-3 mb-1.5">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-[13px] font-semibold tracking-tight text-zinc-200 mt-2.5 mb-1">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xs font-semibold text-zinc-300 mt-2 mb-1">{children}</h4>
          ),

          // ── Paragraphs ────────────────────────────────────────────────────
          p: ({ children }) => (
            <p className="text-[13px] leading-[1.8] text-zinc-200 mb-2 last:mb-0">{children}</p>
          ),

          // ── Lists ─────────────────────────────────────────────────────────
          ul: ({ children }) => (
            <ul className="list-disc list-outside pl-5 space-y-1 my-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside pl-5 space-y-1 my-2">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-[13px] text-zinc-200 leading-relaxed">{children}</li>
          ),

          // ── Blockquote ────────────────────────────────────────────────────
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-zinc-600 pl-3 my-2 text-zinc-400 italic">
              {children}
            </blockquote>
          ),

          // ── Horizontal rule ───────────────────────────────────────────────
          hr: () => <hr className="border-zinc-800 my-4" />,

          // ── Links ─────────────────────────────────────────────────────────
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline underline-offset-2 hover:text-blue-300 transition-colors"
            >
              {children}
            </a>
          ),

          // ── Strong / Em ───────────────────────────────────────────────────
          strong: ({ children }) => (
            <strong className="font-semibold text-zinc-100">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-zinc-300">{children}</em>
          ),

          // ── Tables ────────────────────────────────────────────────────────
          table: ({ children }) => (
            <div className="overflow-x-auto my-3 rounded-xl border border-zinc-800">
              <table className="w-full text-xs border-collapse">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 text-left font-mono font-medium text-zinc-400 bg-zinc-900 border-b border-zinc-800">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 text-zinc-300 border-b border-zinc-800/60">{children}</td>
          ),
        }}
      >
        {normalizedContent}
      </ReactMarkdown>
      {isStreaming && (
        <span className="inline-block w-0.5 h-3.5 bg-zinc-400 ml-0.5 animate-pulse rounded-full align-middle" />
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { Copy, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

export function CopyButton({ text, label = "Copied to clipboard!" }: { text: string, label?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success(label)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("Failed to copy text")
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="p-2 hover:bg-[var(--primary)]/10 rounded-md transition-colors text-[var(--muted)] hover:text-[var(--primary)] flex items-center justify-center gap-2 text-sm font-medium"
      title="Copy to clipboard"
    >
      {copied ? (
        <>
          <CheckCircle2 size={16} />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy size={16} />
          <span>Copy</span>
        </>
      )}
    </button>
  )
}

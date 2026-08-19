"use client"

import * as React from "react"
import { Bookmark } from "lucide-react"
import { useBookmarks } from "@/components/providers/BookmarkProvider"

interface BookmarkButtonProps {
  toolId: string
  toolName?: string
  className?: string
  size?: "sm" | "md"
}

export function BookmarkButton({ toolId, toolName, className = "", size = "md" }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const active = isBookmarked(toolId)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleBookmark(toolId)
  }

  const isSmall = size === "sm"

  return (
    <button
      type="button"
      onClick={handleClick}
      title={active ? `Hapus ${toolName || "tool"} dari Stack` : `Simpan ${toolName || "tool"} ke Stack`}
      aria-label={active ? "Remove from Stack" : "Save to Stack"}
      className={`rounded-lg transition-all flex items-center justify-center cursor-pointer ${
        isSmall ? "p-1" : "p-1.5"
      } ${
        active
          ? "text-[var(--primary)] bg-[var(--primary)]/10 border border-[var(--primary)]/30"
          : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] border border-transparent"
      } ${className}`}
    >
      <Bookmark
        className={`${isSmall ? "w-3.5 h-3.5" : "w-4 h-4"} ${
          active ? "fill-[var(--primary)] stroke-[var(--primary)]" : "stroke-current"
        }`}
      />
    </button>
  )
}

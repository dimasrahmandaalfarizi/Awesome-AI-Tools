"use client"

import { useState } from "react"

interface ToolLogoProps {
  name: string
  website?: string
  logo?: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function ToolLogo({ name, website, logo, size = "md", className = "" }: ToolLogoProps) {
  const [error, setError] = useState(false)

  const sizeClasses = {
    sm: "w-5 h-5 rounded-md text-xs",
    md: "w-8 h-8 rounded-lg text-sm",
    lg: "w-12 h-12 rounded-xl text-base",
    xl: "w-16 h-16 rounded-2xl text-xl",
  }

  const getDomain = (url?: string) => {
    if (!url) return null
    try {
      const parsed = new URL(url.startsWith("http") ? url : `https://${url}`)
      return parsed.hostname.replace(/^www\./, "")
    } catch {
      return null
    }
  }

  const domain = getDomain(website)
  
  // Real app logo URL resolution:
  // 1. Direct explicit logo if specified
  // 2. High-resolution Google Favicon CDN (sz=128 for crisp retina rendering)
  const logoSrc = logo || (domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : null)

  if (!logoSrc || error) {
    return (
      <div
        className={`flex items-center justify-center bg-[var(--surface)] border border-[var(--border)] text-[var(--primary)] font-bold shrink-0 select-none shadow-sm ${sizeClasses[size]} ${className}`}
        title={name}
      >
        <span className="leading-none">{name.charAt(0).toUpperCase()}</span>
      </div>
    )
  }

  return (
    <div
      className={`relative flex items-center justify-center bg-[var(--surface)] border border-[var(--border)] overflow-hidden shrink-0 shadow-sm ${sizeClasses[size]} ${className}`}
      title={name}
    >
      <img
        src={logoSrc}
        alt={`${name} logo`}
        className="w-full h-full object-contain transition-opacity duration-200"
        loading="lazy"
        onError={() => setError(true)}
      />
    </div>
  )
}

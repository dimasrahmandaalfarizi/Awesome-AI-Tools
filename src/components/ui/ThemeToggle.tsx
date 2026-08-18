"use client"

import * as React from "react"
import { Monitor, Sun, Moon } from "lucide-react"
import { useTheme } from "@/components/providers/ThemeProvider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center gap-0.5 p-0.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 text-zinc-400">
        <div className="p-1 rounded-full w-6 h-6 flex items-center justify-center">
          <Monitor className="w-3.5 h-3.5 opacity-60" />
        </div>
        <div className="p-1 rounded-full w-6 h-6 flex items-center justify-center">
          <Sun className="w-3.5 h-3.5 opacity-60" />
        </div>
        <div className="p-1 rounded-full w-6 h-6 flex items-center justify-center">
          <Moon className="w-3.5 h-3.5 opacity-60" />
        </div>
      </div>
    )
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme selector"
      className="flex items-center gap-0.5 p-0.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 text-zinc-500 dark:text-zinc-400 transition-colors"
    >
      <button
        type="button"
        role="radio"
        aria-checked={theme === "system"}
        title="System theme"
        onClick={() => setTheme("system")}
        className={`p-1 rounded-full transition-all flex items-center justify-center cursor-pointer ${
          theme === "system"
            ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
            : "hover:text-zinc-900 dark:hover:text-zinc-200"
        }`}
      >
        <Monitor className="w-3.5 h-3.5" />
        <span className="sr-only">System</span>
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={theme === "light"}
        title="Light theme"
        onClick={() => setTheme("light")}
        className={`p-1 rounded-full transition-all flex items-center justify-center cursor-pointer ${
          theme === "light"
            ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
            : "hover:text-zinc-900 dark:hover:text-zinc-200"
        }`}
      >
        <Sun className="w-3.5 h-3.5" />
        <span className="sr-only">Light</span>
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={theme === "dark"}
        title="Dark theme"
        onClick={() => setTheme("dark")}
        className={`p-1 rounded-full transition-all flex items-center justify-center cursor-pointer ${
          theme === "dark"
            ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
            : "hover:text-zinc-900 dark:hover:text-zinc-200"
        }`}
      >
        <Moon className="w-3.5 h-3.5" />
        <span className="sr-only">Dark</span>
      </button>
    </div>
  )
}

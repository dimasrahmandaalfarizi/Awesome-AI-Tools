"use client"

import * as React from "react"

type Theme = "dark" | "light" | "system"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: "dark" | "light"
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  attribute?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = React.useState<"dark" | "light">("dark")

  // Initialize theme from localStorage or system on mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("theme") as Theme | null
      if (stored && (stored === "dark" || stored === "light" || stored === "system")) {
        setThemeState(stored)
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [])

  // Apply theme to document element
  React.useEffect(() => {
    const root = document.documentElement
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const applyTheme = () => {
      let activeTheme: "dark" | "light" = "dark"
      if (theme === "system") {
        activeTheme = mediaQuery.matches ? "dark" : "light"
      } else {
        activeTheme = theme === "light" ? "light" : "dark"
      }

      setResolvedTheme(activeTheme)
      root.classList.remove("light", "dark")
      root.classList.add(activeTheme)
      root.setAttribute("data-theme", activeTheme)
    }

    applyTheme()

    const listener = () => {
      if (theme === "system") {
        applyTheme()
      }
    }

    mediaQuery.addEventListener("change", listener)
    return () => mediaQuery.removeEventListener("change", listener)
  }, [theme])

  const setTheme = React.useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    try {
      localStorage.setItem("theme", newTheme)
    } catch {
      // Ignore localStorage errors
    }
  }, [])

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
      resolvedTheme,
    }),
    [theme, setTheme, resolvedTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    return {
      theme: "dark" as Theme,
      setTheme: () => {},
      resolvedTheme: "dark" as "dark" | "light",
    }
  }
  return context
}


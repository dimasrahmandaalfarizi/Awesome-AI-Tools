"use client"

import * as React from "react"
import { Command } from "cmdk"
import { Search, Monitor, Moon, Sun, ArrowRight, Laptop, Sparkles, Box, Wrench, Server, BookOpen, Layers, Globe } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTheme } from "@/components/providers/ThemeProvider"
import { useTranslations, useLocale } from "next-intl"
import { TOOLS, CATEGORIES, AI_SKILLS } from "@/data/mock"
import { getLocalizedCategory, getLocalizedTool } from "@/lib/localizeData"
import { ToolLogo } from "@/components/ui/ToolLogo"

export function CommandPalette() {
  const t = useTranslations("CommandPalette")
  const tNav = useTranslations("Navbar")
  const locale = useLocale()
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const { setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    const handleCustomOpen = () => setOpen(true)

    document.addEventListener("keydown", down)
    window.addEventListener("open-command-palette", handleCustomOpen)
    return () => {
      document.removeEventListener("keydown", down)
      window.removeEventListener("open-command-palette", handleCustomOpen)
    }
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh] p-4 transition-all">
      <div 
        className="fixed inset-0 z-40" 
        onClick={() => setOpen(false)}
      />
      <div className="relative z-50 w-full max-w-xl bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-100">
        <Command className="w-full" label="Global Command Menu" loop>
          <div className="flex items-center border-b border-[var(--border)] px-4 bg-[var(--surface)]">
            <Search className="w-5 h-5 text-[var(--muted)] mr-3 shrink-0" />
            <Command.Input 
              autoFocus
              className="w-full py-4 bg-transparent outline-none text-base placeholder:text-[var(--muted)] text-[var(--foreground)]"
              placeholder={t("placeholder")} 
            />
            <kbd className="hidden sm:inline-flex text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[var(--background)] border border-[var(--border)] text-[var(--muted)]">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[380px] overflow-y-auto p-2 space-y-1">
            <Command.Empty className="py-8 text-center text-sm text-[var(--muted)]">
              {t("noResults")}
            </Command.Empty>

            {/* Quick Navigation */}
            <Command.Group heading={t("navigation")} className="px-2 py-1.5 text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">
              <Command.Item 
                onSelect={() => runCommand(() => router.push("/router"))}
                className="flex items-center justify-between px-3 py-2.5 text-sm rounded-lg cursor-pointer hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] aria-selected:bg-[var(--primary)]/10 aria-selected:text-[var(--primary)] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Server className="w-4 h-4 text-[var(--primary)]" />
                  <span className="font-medium">{tNav("router")}</span>
                </div>
                <span className="text-[11px] text-[var(--muted)]">{t("proxyDesc")}</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push("/skills"))}
                className="flex items-center justify-between px-3 py-2.5 text-sm rounded-lg cursor-pointer hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] aria-selected:bg-[var(--primary)]/10 aria-selected:text-[var(--primary)] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                  <span className="font-medium">{tNav("skills")}</span>
                </div>
                <span className="text-[11px] text-[var(--muted)]">{t("skillsDesc")}</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push("/apis"))}
                className="flex items-center justify-between px-3 py-2.5 text-sm rounded-lg cursor-pointer hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] aria-selected:bg-[var(--primary)]/10 aria-selected:text-[var(--primary)] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium">{tNav("apis")}</span>
                </div>
                <span className="text-[11px] text-[var(--muted)]">1,600+ Open APIs Directory</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push("/compare"))}
                className="flex items-center justify-between px-3 py-2.5 text-sm rounded-lg cursor-pointer hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] aria-selected:bg-[var(--primary)]/10 aria-selected:text-[var(--primary)] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Wrench className="w-4 h-4 text-[var(--secondary)]" />
                  <span className="font-medium">{tNav("compare")}</span>
                </div>
                <span className="text-[11px] text-[var(--muted)]">{t("compareDesc")}</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push("/chat"))}
                className="flex items-center justify-between px-3 py-2.5 text-sm rounded-lg cursor-pointer hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] aria-selected:bg-[var(--primary)]/10 aria-selected:text-[var(--primary)] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="font-medium">{tNav("aiChat")}</span>
                </div>
                <span className="text-[11px] text-[var(--muted)]">Local Ollama AI Chat</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push("/stack"))}
                className="flex items-center justify-between px-3 py-2.5 text-sm rounded-lg cursor-pointer hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] aria-selected:bg-[var(--primary)]/10 aria-selected:text-[var(--primary)] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span className="font-medium">{tNav("stack")}</span>
                </div>
                <span className="text-[11px] text-[var(--muted)]">Custom Stack & Configs</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push("/docs/quickstart"))}
                className="flex items-center justify-between px-3 py-2.5 text-sm rounded-lg cursor-pointer hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] aria-selected:bg-[var(--primary)]/10 aria-selected:text-[var(--primary)] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-[var(--primary)]" />
                  <span className="font-medium">{tNav("docs")}</span>
                </div>
                <span className="text-[11px] text-[var(--muted)]">{t("docsDesc")}</span>
              </Command.Item>
            </Command.Group>

            <Command.Separator className="h-px bg-[var(--border)] my-1" />

            {/* AI Tools */}
            <Command.Group heading={t("aiTools")} className="px-2 py-1.5 text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">
              {TOOLS.map((tItem) => {
                const tool = getLocalizedTool(tItem, locale)
                return (
                  <Command.Item
                    key={tool.id}
                    value={`${tool.name} ${tool.description} ${tool.tags.join(" ")}`}
                    onSelect={() => runCommand(() => router.push(`/tools/${tool.slug}`))}
                    className="flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer hover:bg-[var(--primary)]/10 hover:text-[var(--foreground)] aria-selected:bg-[var(--primary)]/10 aria-selected:text-[var(--foreground)] transition-colors"
                  >
                    <div className="flex items-center gap-2.5 truncate mr-2">
                      <ToolLogo name={tool.name} website={tool.website} logo={tool.logo} size="sm" />
                      <div className="truncate">
                        <span className="font-medium">{tool.name}</span>
                        <span className="text-xs text-[var(--muted)] ml-2 truncate hidden sm:inline">
                          {tool.description.slice(0, 45)}...
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--background)] text-[var(--muted)] border border-[var(--border)] shrink-0">
                      {tool.pricing}
                    </span>
                  </Command.Item>
                )
              })}
            </Command.Group>

            <Command.Separator className="h-px bg-[var(--border)] my-1" />

            {/* AI Agent Skills */}
            <Command.Group heading={t("agentSkills")} className="px-2 py-1.5 text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">
              {AI_SKILLS.slice(0, 15).map((skill) => (
                <Command.Item
                  key={skill.id}
                  value={`${skill.name} ${skill.description}`}
                  onSelect={() => runCommand(() => router.push(`/skills/${skill.slug}`))}
                  className="flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer hover:bg-[var(--accent)]/10 hover:text-[var(--foreground)] aria-selected:bg-[var(--accent)]/10 aria-selected:text-[var(--foreground)] transition-colors"
                >
                  <div className="flex items-center gap-2.5 truncate mr-2">
                    <Sparkles className="w-4 h-4 text-[var(--accent)] shrink-0" />
                    <span className="font-medium truncate">{skill.name}</span>
                  </div>
                  <span className="text-[10px] text-[var(--muted)] shrink-0 font-mono">
                    {skill.frameworks[0]}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Separator className="h-px bg-[var(--border)] my-1" />

            {/* Categories */}
            <Command.Group heading={t("categories")} className="px-2 py-1.5 text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">
              {CATEGORIES.map((category) => (
                <Command.Item
                  key={category.id}
                  value={`category ${category.name}`}
                  onSelect={() => runCommand(() => router.push(`/categories/${category.slug}`))}
                  className="flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg cursor-pointer hover:bg-[var(--foreground)]/5 aria-selected:bg-[var(--foreground)]/5 transition-colors"
                >
                  <Box className="w-4 h-4 text-[var(--muted)]" />
                  <span>{category.name}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Separator className="h-px bg-[var(--border)] my-1" />

            {/* Theme */}
            <Command.Group heading={t("theme")} className="px-2 py-1.5 text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">
              <Command.Item 
                onSelect={() => runCommand(() => setTheme('light'))}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg cursor-pointer hover:bg-[var(--foreground)]/5 aria-selected:bg-[var(--foreground)]/5"
              >
                <Sun className="w-4 h-4 text-[var(--warning)]" />
                {t("light")}
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => setTheme('dark'))}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg cursor-pointer hover:bg-[var(--foreground)]/5 aria-selected:bg-[var(--foreground)]/5"
              >
                <Moon className="w-4 h-4 text-[var(--primary)]" />
                {t("dark")}
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => setTheme('system'))}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg cursor-pointer hover:bg-[var(--foreground)]/5 aria-selected:bg-[var(--foreground)]/5"
              >
                <Monitor className="w-4 h-4 text-[var(--muted)]" />
                {t("system")}
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  )
}

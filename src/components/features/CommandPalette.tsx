"use client"

import * as React from "react"
import { Command } from "cmdk"
import { Search, Monitor, Moon, Sun, ArrowRight, Laptop } from "lucide-react"
import { useRouter } from "next/navigation"

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  // Toggle the menu when ⌘K is pressed
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[15vh]">
      <div 
        className="fixed inset-0 z-40" 
        onClick={() => setOpen(false)}
      />
      <div className="relative z-50 w-full max-w-xl mx-4">
        <Command
          className="flex flex-col bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden"
          label="Global Command Menu"
          loop
        >
          <div className="flex items-center border-b border-[var(--border)] px-4 h-14">
            <Search className="w-5 h-5 text-[var(--muted)] mr-3" />
            <Command.Input 
              autoFocus
              className="flex-1 bg-transparent border-0 outline-none text-[var(--foreground)] placeholder:text-[var(--muted)]"
              placeholder="Type a command or search..." 
            />
          </div>

          <Command.List className="max-h-[300px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-[var(--muted)]">
              No results found.
            </Command.Empty>

            <Command.Group heading="Categories" className="px-2 py-2 text-xs font-medium text-[var(--muted)]">
              <Command.Item 
                onSelect={() => runCommand(() => router.push("/categories/coding-assistant"))}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-[var(--accent)] hover:text-white aria-selected:bg-[var(--accent)] aria-selected:text-white"
              >
                <Laptop className="w-4 h-4" />
                Coding Assistants
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push("/categories/agent-framework"))}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-[var(--accent)] hover:text-white aria-selected:bg-[var(--accent)] aria-selected:text-white"
              >
                <ArrowRight className="w-4 h-4" />
                Agent Frameworks
              </Command.Item>
            </Command.Group>

            <Command.Separator className="h-px bg-[var(--border)] my-1" />

            <Command.Group heading="Theme" className="px-2 py-2 text-xs font-medium text-[var(--muted)]">
              <Command.Item 
                onSelect={() => runCommand(() => console.log('Light theme'))}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-[var(--accent)] hover:text-white aria-selected:bg-[var(--accent)] aria-selected:text-white"
              >
                <Sun className="w-4 h-4" />
                Light
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => console.log('Dark theme'))}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-[var(--accent)] hover:text-white aria-selected:bg-[var(--accent)] aria-selected:text-white"
              >
                <Moon className="w-4 h-4" />
                Dark
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => console.log('System theme'))}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-[var(--accent)] hover:text-white aria-selected:bg-[var(--accent)] aria-selected:text-white"
              >
                <Monitor className="w-4 h-4" />
                System
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  )
}

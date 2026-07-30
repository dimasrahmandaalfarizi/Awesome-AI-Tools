"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import type { AiSkill } from "@/types"

interface SkillsClientProps {
  skills: AiSkill[]
}

export function SkillsClient({ skills }: SkillsClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFramework, setSelectedFramework] = useState<string>("All")

  const allFrameworks = useMemo(() => {
    const frameworks = new Set<string>()
    skills.forEach(s => s.frameworks.forEach(fw => frameworks.add(fw)))
    return ["All", ...Array.from(frameworks).sort()]
  }, [skills])

  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const matchesSearch = 
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        skill.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesFramework = 
        selectedFramework === "All" || 
        skill.frameworks.includes(selectedFramework)

      return matchesSearch && matchesFramework
    })
  }, [skills, searchQuery, selectedFramework])

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-[var(--surface)] p-4 rounded-xl border border-[var(--border)]">
        <div className="w-full md:max-w-sm">
          <Input 
            type="search" 
            placeholder="Search AI skills..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          <span className="text-sm text-[var(--muted)] whitespace-nowrap hidden lg:inline-block mr-2">
            Filter by Tool:
          </span>
          <div className="flex gap-2">
            {allFrameworks.map(fw => (
              <button
                key={fw}
                onClick={() => setSelectedFramework(fw)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedFramework === fw 
                    ? "bg-[var(--primary)] text-[var(--background)]" 
                    : "bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                }`}
              >
                {fw}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredSkills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map(skill => (
            <Link 
              key={skill.id} 
              href={`/skills/${skill.slug}`}
              className="group relative flex flex-col p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg group-hover:text-[var(--primary)] transition-colors">{skill.name}</h3>
              </div>
              <p className="text-[var(--muted)] text-sm mb-6 flex-1">
                {skill.description}
              </p>
              <div className="mt-auto pt-4 border-t border-[var(--border)]">
                <div className="flex flex-wrap gap-2 mb-3">
                  {skill.frameworks.map(fw => (
                    <Badge key={fw} variant="secondary" className="text-xs">{fw}</Badge>
                  ))}
                </div>
                <div className="text-xs text-[var(--muted)]">
                  By {skill.author || "Community"}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-[var(--border)] rounded-2xl bg-[var(--surface)]/30">
          <p className="text-[var(--muted)] text-lg">No AI skills found matching your criteria.</p>
          <button 
            onClick={() => {
              setSearchQuery("")
              setSelectedFramework("All")
            }}
            className="mt-4 text-[var(--primary)] hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}

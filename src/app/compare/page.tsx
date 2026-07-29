"use client"

import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { TOOLS } from "@/data/mock"
import { Button } from "@/components/ui/Button"
import { ExternalLink, Plus, X, Check, Minus } from "lucide-react"

export default function ComparePage() {
  const [selectedToolIds, setSelectedToolIds] = useState<string[]>(["tool-1", "tool-2"])
  const [isSelectingFor, setIsSelectingFor] = useState<number | null>(null)

  const selectedTools = selectedToolIds.map(id => TOOLS.find(t => t.id === id)!)
  const availableTools = TOOLS.filter(t => !selectedToolIds.includes(t.id))

  const handleSelectTool = (toolId: string) => {
    if (isSelectingFor !== null) {
      const newSelected = [...selectedToolIds]
      newSelected[isSelectingFor] = toolId
      setSelectedToolIds(newSelected)
      setIsSelectingFor(null)
    } else {
      if (selectedToolIds.length < 3) {
        setSelectedToolIds([...selectedToolIds, toolId])
      }
    }
  }

  const handleRemoveTool = (index: number) => {
    const newSelected = [...selectedToolIds]
    newSelected.splice(index, 1)
    setSelectedToolIds(newSelected)
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-[calc(100vh-16rem)] relative">
        <div className="container mx-auto px-4 py-16">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Compare Tools</h1>
            <p className="text-xl text-[var(--muted)]">Side-by-side comparison of AI features and pricing.</p>
          </div>

          <div className="overflow-x-auto pb-8">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr>
                  <th className="w-48 p-4 text-left font-normal text-[var(--muted)] border-b border-[var(--border)] align-bottom">
                    Feature
                  </th>
                  {selectedTools.map((tool, index) => (
                    <th key={`${tool.id}-${index}`} className="p-4 border-b border-[var(--border)] relative align-top w-64">
                      <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)] flex flex-col items-center justify-center min-h-[200px] relative">
                        {selectedTools.length > 1 && (
                          <button 
                            onClick={() => handleRemoveTool(index)}
                            className="absolute top-2 right-2 p-1 rounded-full hover:bg-[var(--background)] transition-colors text-[var(--muted)] hover:text-white"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                        <div className="w-16 h-16 rounded-2xl bg-[var(--primary)] flex items-center justify-center text-2xl font-bold text-white shadow-sm mb-4">
                          {tool.name.charAt(0)}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                        <Button variant="outline" size="sm" onClick={() => setIsSelectingFor(index)}>
                          Change Tool
                        </Button>
                      </div>
                    </th>
                  ))}
                  {selectedTools.length < 3 && (
                    <th className="p-4 border-b border-[var(--border)] align-top w-64">
                      <div 
                        onClick={() => setIsSelectingFor(selectedTools.length)}
                        className="bg-[var(--surface)]/30 border border-dashed border-[var(--muted)] rounded-xl p-6 flex flex-col items-center justify-center min-h-[200px] cursor-pointer hover:bg-[var(--surface)] hover:border-[var(--primary)] transition-all group"
                      >
                        <div className="w-12 h-12 rounded-full bg-[var(--background)] flex items-center justify-center text-[var(--muted)] group-hover:text-[var(--primary)] mb-4">
                          <Plus className="h-6 w-6" />
                        </div>
                        <span className="font-semibold text-[var(--muted)] group-hover:text-white">Add Tool to Compare</span>
                      </div>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {/* Basic Info */}
                <tr className="hover:bg-[var(--surface)]/20">
                  <td className="p-4 border-b border-[var(--border)] font-semibold text-[var(--muted)]">Pricing</td>
                  {selectedTools.map((tool, index) => (
                    <td key={`pricing-${index}`} className="p-4 border-b border-[var(--border)] text-center">{tool.pricing}</td>
                  ))}
                  {selectedTools.length < 3 && <td className="p-4 border-b border-[var(--border)]"></td>}
                </tr>
                <tr className="hover:bg-[var(--surface)]/20">
                  <td className="p-4 border-b border-[var(--border)] font-semibold text-[var(--muted)]">Open Source</td>
                  {selectedTools.map((tool, index) => (
                    <td key={`os-${index}`} className="p-4 border-b border-[var(--border)] text-center">
                      {tool.isOpenSource ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <Minus className="h-5 w-5 text-[var(--muted)] mx-auto" />}
                    </td>
                  ))}
                  {selectedTools.length < 3 && <td className="p-4 border-b border-[var(--border)]"></td>}
                </tr>
                <tr className="hover:bg-[var(--surface)]/20">
                  <td className="p-4 border-b border-[var(--border)] font-semibold text-[var(--muted)]">Platforms</td>
                  {selectedTools.map((tool, index) => (
                    <td key={`platform-${index}`} className="p-4 border-b border-[var(--border)] text-center text-sm">
                      {tool.platform.join(", ")}
                    </td>
                  ))}
                  {selectedTools.length < 3 && <td className="p-4 border-b border-[var(--border)]"></td>}
                </tr>
                <tr className="hover:bg-[var(--surface)]/20">
                  <td className="p-4 border-b border-[var(--border)] font-semibold text-[var(--muted)]">Tags</td>
                  {selectedTools.map((tool, index) => (
                    <td key={`tags-${index}`} className="p-4 border-b border-[var(--border)] text-center text-sm">
                      {tool.tags.join(", ")}
                    </td>
                  ))}
                  {selectedTools.length < 3 && <td className="p-4 border-b border-[var(--border)]"></td>}
                </tr>
                <tr>
                  <td className="p-4"></td>
                  {selectedTools.map((tool, index) => (
                    <td key={`link-${index}`} className="p-4 text-center">
                      <Button asChild>
                        <a href={tool.website} target="_blank" rel="noreferrer">
                          Visit Site <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </td>
                  ))}
                  {selectedTools.length < 3 && <td className="p-4"></td>}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Selection Modal (Simplified Overlay) */}
        {isSelectingFor !== null && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Select Tool</h2>
                <button onClick={() => setIsSelectingFor(null)} className="p-2 hover:bg-[var(--background)] rounded-full">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {availableTools.map(tool => (
                  <div 
                    key={tool.id} 
                    onClick={() => handleSelectTool(tool.id)}
                    className="p-4 border border-[var(--border)] rounded-lg hover:border-[var(--primary)] cursor-pointer hover:bg-[var(--primary)]/10 transition-colors flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-md bg-[var(--primary)] flex items-center justify-center font-bold text-white">
                      {tool.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold">{tool.name}</div>
                      <div className="text-xs text-[var(--muted)]">{tool.pricing}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}

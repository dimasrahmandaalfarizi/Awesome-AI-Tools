"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"
import { TOOLS } from "@/data/mock"
import { getLocalizedTool } from "@/lib/localizeData"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { ToolLogo } from "@/components/ui/ToolLogo"
import { ExternalLink, Plus, X, Check, Minus, Zap, Calculator, BarChart3, ArrowRight, DollarSign } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"

// 2026 Developer AI Models Benchmark Dataset
const AI_MODELS_BENCHMARK = [
  {
    name: "DeepSeek V3",
    provider: "DeepSeek",
    type: "Open-Weights / API",
    sweBench: "49.2%",
    humanEval: "90.2%",
    contextWindow: "64k",
    inputCostPer1M: 0.14,
    outputCostPer1M: 0.28,
    speedTps: "~60 t/s",
    highlight: "Best Price/Perf"
  },
  {
    name: "DeepSeek R1",
    provider: "DeepSeek",
    type: "Reasoning Model",
    sweBench: "52.8%",
    humanEval: "93.4%",
    contextWindow: "64k",
    inputCostPer1M: 0.55,
    outputCostPer1M: 2.19,
    speedTps: "~35 t/s",
    highlight: "Top Open Reasoning"
  },
  {
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    type: "Proprietary Cloud",
    sweBench: "49.0%",
    humanEval: "92.0%",
    contextWindow: "200k",
    inputCostPer1M: 3.00,
    outputCostPer1M: 15.00,
    speedTps: "~75 t/s",
    highlight: "Top Coding Standard"
  },
  {
    name: "GPT-4o",
    provider: "OpenAI",
    type: "Proprietary Cloud",
    sweBench: "38.8%",
    humanEval: "90.2%",
    contextWindow: "128k",
    inputCostPer1M: 2.50,
    outputCostPer1M: 10.00,
    speedTps: "~85 t/s",
    highlight: "Multimodal King"
  },
  {
    name: "Qwen 2.5 Coder 32B",
    provider: "Alibaba / Open",
    type: "Local & Cloud",
    sweBench: "42.5%",
    humanEval: "92.7%",
    contextWindow: "128k",
    inputCostPer1M: 0.20,
    outputCostPer1M: 0.40,
    speedTps: "~120 t/s (Groq)",
    highlight: "Best Local Model"
  },
  {
    name: "Llama 3.3 70B",
    provider: "Meta / Open",
    type: "Open-Weights",
    sweBench: "41.2%",
    humanEval: "88.6%",
    contextWindow: "128k",
    inputCostPer1M: 0.35,
    outputCostPer1M: 0.80,
    speedTps: "~250 t/s (Groq)",
    highlight: "High General Knowledge"
  }
]

export default function ComparePage() {
  const t = useTranslations("Compare")
  const locale = useLocale()
  const isId = locale === "id"

  // Tool comparison state
  const [selectedToolIds, setSelectedToolIds] = useState<string[]>(["tool-1", "tool-2"])
  const [isSelectingFor, setIsSelectingFor] = useState<number | null>(null)

  // Cost Calculator State
  const [inputTokensMillions, setInputTokensMillions] = useState<number>(5)
  const [outputTokensMillions, setOutputTokensMillions] = useState<number>(2)

  // Calculated costs
  const claudeCost = useMemo(() => {
    return (inputTokensMillions * 3.00) + (outputTokensMillions * 15.00)
  }, [inputTokensMillions, outputTokensMillions])

  const deepseekCost = useMemo(() => {
    return (inputTokensMillions * 0.14) + (outputTokensMillions * 0.28)
  }, [inputTokensMillions, outputTokensMillions])

  const monthlySavings = useMemo(() => {
    return Math.max(0, claudeCost - deepseekCost)
  }, [claudeCost, deepseekCost])

  const savingsPercent = useMemo(() => {
    if (claudeCost === 0) return 0
    return Math.round((monthlySavings / claudeCost) * 100)
  }, [monthlySavings, claudeCost])

  const selectedTools = selectedToolIds.map(id => {
    const raw = TOOLS.find(t => t.id === id) || TOOLS[0]
    return getLocalizedTool(raw, locale)
  })
  const availableTools = TOOLS.filter(t => !selectedToolIds.includes(t.id)).map(t => getLocalizedTool(t, locale))

  const handleRemoveTool = (index: number) => {
    if (selectedTools.length > 1) {
      setSelectedToolIds(prev => prev.filter((_, i) => i !== index))
    }
  }

  const handleSelectTool = (toolId: string) => {
    if (isSelectingFor !== null) {
      if (isSelectingFor < selectedToolIds.length) {
        setSelectedToolIds(prev => prev.map((id, i) => i === isSelectingFor ? toolId : id))
      } else {
        setSelectedToolIds(prev => [...prev, toolId])
      }
      setIsSelectingFor(null)
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-[calc(100vh-16rem)] bg-[var(--background)]">
        <div className="container mx-auto px-4 py-12 max-w-6xl space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{isId ? "AI Model Benchmark & Token Calculator" : "AI Model Benchmark & Token Calculator"}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-heading text-[var(--foreground)]">
              {isId ? "Bandingkan Alat & Model AI Developer" : "Compare AI Tools & Coding Models"}
            </h1>
            <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed">
              {isId 
                ? "Evaluasi skor SWE-bench, harga per 1 juta token, dan simulasikan penghematan biaya koding AI Anda."
                : "Evaluate SWE-bench coding scores, token pricing per 1M tokens, and calculate your team's monthly AI savings."}
            </p>
          </div>

          {/* Section 1: AI Model Benchmark Matrix */}
          <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2 tracking-tight">
                  <Zap className="w-4 h-4 text-[var(--primary)]" />
                  <span>{isId ? "Matrix Benchmark Model Coding 2026" : "2026 Developer AI Models Benchmark"}</span>
                </h2>
                <p className="text-xs text-[var(--muted)]">
                  {isId ? "Berdasarkan skor SWE-bench Verified, HumanEval, dan harga API resmi." : "Based on verified SWE-bench, HumanEval benchmarks, and official provider pricing."}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border)] text-[var(--muted)]">
                    <th className="p-3 font-semibold">Model</th>
                    <th className="p-3 font-semibold">Provider / Type</th>
                    <th className="p-3 font-semibold text-center">SWE-bench</th>
                    <th className="p-3 font-semibold text-center">HumanEval</th>
                    <th className="p-3 font-semibold text-center">Context</th>
                    <th className="p-3 font-semibold text-right">Input / 1M</th>
                    <th className="p-3 font-semibold text-right">Output / 1M</th>
                    <th className="p-3 font-semibold text-center">Highlight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]/40">
                  {AI_MODELS_BENCHMARK.map((m, idx) => (
                    <tr key={idx} className="hover:bg-[var(--background)] transition-colors">
                      <td className="p-3 font-bold text-[var(--foreground)] flex items-center gap-1.5">
                        <span>{m.name}</span>
                      </td>
                      <td className="p-3 text-[var(--muted)]">{m.provider} ({m.type})</td>
                      <td className="p-3 text-center font-bold text-emerald-500">{m.sweBench}</td>
                      <td className="p-3 text-center text-[var(--foreground)]">{m.humanEval}</td>
                      <td className="p-3 text-center text-[var(--muted)]">{m.contextWindow}</td>
                      <td className="p-3 text-right text-[var(--foreground)]">${m.inputCostPer1M.toFixed(2)}</td>
                      <td className="p-3 text-right text-[var(--foreground)]">${m.outputCostPer1M.toFixed(2)}</td>
                      <td className="p-3 text-center">
                        <Badge variant="secondary" className="text-[10px]">
                          {m.highlight}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Interactive Token Cost Savings Calculator */}
          <div className="p-6 md:p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[var(--foreground)] tracking-tight">
                  {isId ? "Kalkulator Penghematan Biaya Token AI" : "AI Token Cost Savings Calculator"}
                </h2>
                <p className="text-xs text-[var(--muted)]">
                  {isId 
                    ? "Hitung berapa biaya yang Anda hemat dengan beralih ke AI Proxy Router (DeepSeek V3 / Ollama) dibanding Claude 3.5 Sonnet murni."
                    : "Calculate how much you save using the AI Proxy Router (DeepSeek V3 / Ollama) versus direct Claude 3.5 Sonnet API."}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              {/* Sliders */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[var(--foreground)]">{isId ? "Estimasi Input Tokens per Bulan" : "Monthly Input Tokens"}</span>
                    <span className="font-mono text-[var(--primary)]">{inputTokensMillions} Juta (M) Tokens</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={inputTokensMillions}
                    onChange={(e) => setInputTokensMillions(Number(e.target.value))}
                    className="w-full accent-[var(--primary)] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[var(--muted)] font-mono">
                    <span>1M Tokens</span>
                    <span>50M Tokens</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[var(--foreground)]">{isId ? "Estimasi Output Tokens per Bulan" : "Monthly Output Tokens"}</span>
                    <span className="font-mono text-[var(--primary)]">{outputTokensMillions} Juta (M) Tokens</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={outputTokensMillions}
                    onChange={(e) => setOutputTokensMillions(Number(e.target.value))}
                    className="w-full accent-[var(--primary)] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[var(--muted)] font-mono">
                    <span>1M Tokens</span>
                    <span>20M Tokens</span>
                  </div>
                </div>
              </div>

              {/* Result Summary Box */}
              <div className="p-6 rounded-xl bg-[var(--background)] border border-[var(--border)] flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-[var(--border)]/40">
                    <span className="text-[var(--muted)]">Direct Claude 3.5 API Cost:</span>
                    <span className="font-mono font-bold text-red-500">${claudeCost.toFixed(2)} / bln</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-[var(--border)]/40">
                    <span className="text-[var(--muted)]">Proxy Router (DeepSeek V3):</span>
                    <span className="font-mono font-bold text-emerald-500">${deepseekCost.toFixed(2)} / bln</span>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-1">
                    <span className="font-semibold text-[var(--foreground)]">{isId ? "Total Hemat Biaya:" : "Total Monthly Savings:"}</span>
                    <span className="font-mono font-extrabold text-emerald-500 text-lg">
                      ${monthlySavings.toFixed(2)} ({savingsPercent}%)
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-600 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 shrink-0" />
                  <span>{isId ? "Anda menghemat hingga 90%+ biaya API bulanan tanpa mengorbankan kualitas coding!" : "You save up to 90%+ monthly AI cost while maintaining elite coding performance!"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Developer Tools Side-by-Side Comparison */}
          <div className="space-y-6 pt-4 border-t border-[var(--border)]">
            <div>
              <h2 className="text-xl font-bold text-[var(--foreground)] tracking-tight">{t("title")}</h2>
              <p className="text-xs text-[var(--muted)]">{t("description")}</p>
            </div>

            <div className="overflow-x-auto pb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="w-48 p-4 text-left font-normal text-[var(--muted)] border-b border-[var(--border)] align-bottom">
                      {t("feature")}
                    </th>
                    {selectedTools.map((tool, index) => (
                      <th key={`${tool.id}-${index}`} className="p-4 border-b border-[var(--border)] relative align-top w-64">
                        <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)] flex flex-col items-center justify-center min-h-[180px] relative shadow-sm">
                          {selectedTools.length > 1 && (
                            <button 
                              onClick={() => handleRemoveTool(index)}
                              className="absolute top-2 right-2 p-1 rounded-full hover:bg-[var(--background)] transition-colors text-[var(--muted)] hover:text-white"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                          <div className="mb-3">
                            <ToolLogo name={tool.name} website={tool.website} logo={tool.logo} size="lg" />
                          </div>
                          <h3 className="text-base font-bold mb-2 text-center tracking-tight">{tool.name}</h3>
                          <Button variant="outline" size="sm" onClick={() => setIsSelectingFor(index)} className="text-xs h-8">
                            {t("changeTool")}
                          </Button>
                        </div>
                      </th>
                    ))}
                    {selectedTools.length < 3 && (
                      <th className="p-4 border-b border-[var(--border)] align-top w-64">
                        <div 
                          onClick={() => setIsSelectingFor(selectedTools.length)}
                          className="bg-[var(--surface)]/30 border border-dashed border-[var(--muted)] rounded-xl p-6 flex flex-col items-center justify-center min-h-[180px] cursor-pointer hover:bg-[var(--surface)] hover:border-[var(--primary)] transition-all group"
                        >
                          <div className="w-10 h-10 rounded-full bg-[var(--background)] flex items-center justify-center text-[var(--muted)] group-hover:text-[var(--primary)] mb-2">
                            <Plus className="h-5 w-5" />
                          </div>
                          <span className="font-semibold text-xs text-[var(--muted)] group-hover:text-white">{t("addTool")}</span>
                        </div>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-[var(--surface)]/20">
                    <td className="p-4 border-b border-[var(--border)] font-semibold text-xs text-[var(--muted)]">{t("pricing")}</td>
                    {selectedTools.map((tool, index) => (
                      <td key={`pricing-${index}`} className="p-4 border-b border-[var(--border)] text-center text-xs font-mono">{tool.pricing}</td>
                    ))}
                    {selectedTools.length < 3 && <td className="p-4 border-b border-[var(--border)]"></td>}
                  </tr>
                  <tr className="hover:bg-[var(--surface)]/20">
                    <td className="p-4 border-b border-[var(--border)] font-semibold text-xs text-[var(--muted)]">{t("openSource")}</td>
                    {selectedTools.map((tool, index) => (
                      <td key={`os-${index}`} className="p-4 border-b border-[var(--border)] text-center">
                        {tool.isOpenSource ? <Check className="h-4 w-4 text-emerald-500 mx-auto" /> : <Minus className="h-4 w-4 text-[var(--muted)] mx-auto" />}
                      </td>
                    ))}
                    {selectedTools.length < 3 && <td className="p-4 border-b border-[var(--border)]"></td>}
                  </tr>
                  <tr className="hover:bg-[var(--surface)]/20">
                    <td className="p-4 border-b border-[var(--border)] font-semibold text-xs text-[var(--muted)]">Tags</td>
                    {selectedTools.map((tool, index) => (
                      <td key={`tags-${index}`} className="p-4 border-b border-[var(--border)] text-center text-xs">
                        {tool.tags.slice(0, 4).join(", ")}
                      </td>
                    ))}
                    {selectedTools.length < 3 && <td className="p-4 border-b border-[var(--border)]"></td>}
                  </tr>
                  <tr>
                    <td className="p-4"></td>
                    {selectedTools.map((tool, index) => (
                      <td key={`link-${index}`} className="p-4 text-center">
                        <Button asChild size="sm" className="text-xs h-8">
                          <a href={tool.website} target="_blank" rel="noreferrer">
                            {t("visitSite")} <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
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

        </div>

        {/* Selection Modal */}
        {isSelectingFor !== null && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold tracking-tight">{t("selectTool")}</h2>
                <button onClick={() => setIsSelectingFor(null)} className="p-1.5 hover:bg-[var(--background)] rounded-full text-[var(--muted)] hover:text-[var(--foreground)]">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableTools.slice(0, 20).map(tool => (
                  <div 
                    key={tool.id} 
                    onClick={() => handleSelectTool(tool.id)}
                    className="p-3 border border-[var(--border)] rounded-xl hover:border-[var(--primary)] cursor-pointer hover:bg-[var(--background)] transition-all flex items-center gap-3"
                  >
                    <ToolLogo name={tool.name} website={tool.website} logo={tool.logo} size="sm" />
                    <div>
                      <div className="font-semibold text-xs text-[var(--foreground)]">{tool.name}</div>
                      <div className="text-[10px] text-[var(--muted)]">{tool.pricing}</div>
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

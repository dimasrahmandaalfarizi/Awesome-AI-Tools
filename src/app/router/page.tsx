"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card } from "@/components/ui/Card"
import { Copy, Server, Key, Save, CheckCircle } from "lucide-react"

export default function RouterDashboard() {
  const [activeProvider, setActiveProvider] = useState<"openai" | "groq">("groq")
  const [openaiKey, setOpenaiKey] = useState("")
  const [groqKey, setGroqKey] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")

  useEffect(() => {
    fetch("/api/router/config")
      .then(res => res.json())
      .then(data => {
        setActiveProvider(data.activeProvider)
        setOpenaiKey(data.keys.openai || "")
        setGroqKey(data.keys.groq || "")
      })
      .catch(err => console.error("Failed to load config", err))
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    setSaveStatus("idle")
    try {
      const res = await fetch("/api/router/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activeProvider,
          keys: {
            openai: openaiKey,
            groq: groqKey,
          }
        })
      })
      if (res.ok) {
        setSaveStatus("success")
        setTimeout(() => setSaveStatus("idle"), 3000)
      } else {
        setSaveStatus("error")
      }
    } catch (e) {
      setSaveStatus("error")
    }
    setIsSaving(false)
  }

  const proxyUrl = "http://localhost:3000/api/v1"

  const handleCopy = () => {
    navigator.clipboard.writeText(proxyUrl)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-[calc(100vh-16rem)] bg-[var(--background)]">
        <section className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4 flex items-center justify-center gap-3">
              <Server className="w-10 h-10 text-[var(--primary)]" />
              AI Proxy Router
            </h1>
            <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
              Centralized API routing for your local AI coding assistants. Route requests from Cursor, Cline, or Copilot to your preferred provider.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="md:col-span-2 space-y-6">
              <Card className="p-6 border-[var(--border)] bg-[var(--surface)] shadow-sm">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b border-[var(--border)] pb-4">
                  <Key className="w-5 h-5 text-[var(--primary)]" />
                  Provider Configuration
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Active Provider</label>
                    <div className="flex gap-4">
                      <label className={`flex-1 flex items-center justify-center p-4 border rounded-xl cursor-pointer transition-all ${activeProvider === 'openai' ? 'border-[var(--primary)] bg-[var(--primary)]/10 ring-2 ring-[var(--primary)]/20' : 'border-[var(--border)] hover:bg-[var(--foreground)]/5'}`}>
                        <input type="radio" name="provider" value="openai" checked={activeProvider === 'openai'} onChange={() => setActiveProvider('openai')} className="sr-only" />
                        <span className="font-semibold">OpenAI</span>
                      </label>
                      <label className={`flex-1 flex items-center justify-center p-4 border rounded-xl cursor-pointer transition-all ${activeProvider === 'groq' ? 'border-[var(--primary)] bg-[var(--primary)]/10 ring-2 ring-[var(--primary)]/20' : 'border-[var(--border)] hover:bg-[var(--foreground)]/5'}`}>
                        <input type="radio" name="provider" value="groq" checked={activeProvider === 'groq'} onChange={() => setActiveProvider('groq')} className="sr-only" />
                        <span className="font-semibold">Groq (Fast & Free)</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">OpenAI API Key</label>
                      <Input 
                        type="password" 
                        placeholder="sk-..." 
                        value={openaiKey} 
                        onChange={(e) => setOpenaiKey(e.target.value)} 
                        className="font-mono bg-[var(--background)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Groq API Key</label>
                      <Input 
                        type="password" 
                        placeholder="gsk_..." 
                        value={groqKey} 
                        onChange={(e) => setGroqKey(e.target.value)} 
                        className="font-mono bg-[var(--background)]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--border)] flex justify-end items-center gap-4">
                    {saveStatus === "success" && <span className="text-sm text-green-500 flex items-center gap-1"><CheckCircle className="w-4 h-4"/> Saved successfully</span>}
                    {saveStatus === "error" && <span className="text-sm text-red-500">Failed to save</span>}
                    <Button onClick={handleSave} disabled={isSaving} className="bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--primary)]/90">
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? "Saving..." : "Save Configuration"}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            <div className="md:col-span-1">
              <Card className="p-6 border-[var(--border)] bg-[var(--surface)] shadow-sm sticky top-6">
                <h2 className="font-semibold mb-4 text-lg border-b border-[var(--border)] pb-2">How to Use</h2>
                <div className="space-y-4 text-sm text-[var(--muted)]">
                  <p>1. Enter your API keys and click Save.</p>
                  <p>2. Open your AI coding assistant (Cursor, Cline, etc.).</p>
                  <p>3. Set the <strong>OpenAI Base URL</strong> to:</p>
                  
                  <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-3 relative group">
                    <code className="text-xs break-all text-[var(--foreground)] font-mono select-all">
                      {proxyUrl}
                    </code>
                    <button 
                      onClick={handleCopy}
                      className="absolute right-2 top-2 p-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--foreground)]/5"
                    >
                      {isCopied ? <CheckCircle className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <p>4. Leave the API Key field in your editor blank (or type anything, the proxy will inject your real key).</p>
                </div>
              </Card>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

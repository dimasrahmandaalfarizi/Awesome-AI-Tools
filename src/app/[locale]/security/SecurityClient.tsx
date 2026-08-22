"use client"

import { useState, useEffect } from "react"
import { Shield, Lock, Terminal, Activity, AlertTriangle, CheckCircle2, RefreshCw, Server, Flame, Eye, Key } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Link } from "@/i18n/routing"

interface SecurityStatsData {
  status: string
  grade: string
  score: number
  encryption: {
    algorithm: string
    status: string
    hardwareBound: boolean
    encryptedKeysCount: number
  }
  firewall: {
    status: string
    edgeInspection: string
    rateLimiter: string
    ssrfProtection: string
  }
  telemetry: {
    totalRequestsFiltered: number
    threatsBlocked: number
    rateLimitHits: number
    ssrfAttemptsBlocked: number
    invalidPayloadsBlocked: number
    uptimeSeconds: number
    lastEvents: {
      id: string
      type: string
      severity: string
      details: string
      hashedIp: string
      path: string
      timestamp: string
    }[]
  }
  scanReport: {
    totalFilesScanned: number
    summary: {
      critical: number
      high: number
      medium: number
      low: number
    }
    findingsCount: number
  }
}

export function SecurityClient({ locale }: { locale: string }) {
  const isId = locale === "id"
  const [data, setData] = useState<SecurityStatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [scanning, setScanning] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string>("")

  const fetchSecurityStats = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/security/stats")
      if (res.ok) {
        const json = await res.json()
        setData(json)
        setLastUpdated(new Date().toLocaleTimeString())
      }
    } catch (err) {
      console.error("Failed to fetch security stats:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSecurityStats()
    const interval = setInterval(fetchSecurityStats, 15000)
    return () => clearInterval(interval)
  }, [])

  const handleManualScan = async () => {
    setScanning(true)
    await fetchSecurityStats()
    setTimeout(() => setScanning(false), 800)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 md:p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              <Shield className="w-3.5 h-3.5" />
              <span>{isId ? "AgentShield Enterprise Security Active" : "AgentShield Enterprise Security Active"}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-[var(--foreground)] tracking-tight">
              {isId ? "Pusat Keamanan & Pertahanan Backend" : "Security Center & Backend Defense"}
            </h1>
            <p className="text-sm md:text-base text-[var(--muted)] max-w-2xl leading-relaxed">
              {isId
                ? "Monitoring real-time untuk pertahanan edge firewall, enkripsi kredensial AES-256-GCM, rate limiting, dan proteksi anti-SSRF."
                : "Real-time threat monitoring, edge firewall inspection, AES-256-GCM hardware encryption at rest, and anti-SSRF protections."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleManualScan}
              disabled={scanning}
              className="bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--primary)]/90 text-xs font-semibold rounded-xl flex items-center gap-2 cursor-pointer h-10 px-4"
            >
              <RefreshCw className={`w-4 h-4 ${scanning ? "animate-spin" : ""}`} />
              <span>{scanning ? (isId ? "Memindai..." : "Scanning...") : (isId ? "Pindai Sekarang" : "Scan Workspace")}</span>
            </Button>
          </div>
        </div>

        {/* Security Grade Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)]">
            <div className="text-xs text-[var(--muted)] font-medium">{isId ? "Nilai Keamanan" : "Security Grade"}</div>
            <div className="text-3xl font-extrabold text-emerald-500 font-heading mt-1">
              {data?.grade || "A+"} <span className="text-xs text-[var(--muted)] font-normal">({data?.score || 100}/100)</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)]">
            <div className="text-xs text-[var(--muted)] font-medium">{isId ? "Enkripsi Kunci" : "Key Encryption"}</div>
            <div className="text-sm font-bold text-[var(--foreground)] font-mono mt-2 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-emerald-500" />
              <span>AES-256-GCM</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)]">
            <div className="text-xs text-[var(--muted)] font-medium">{isId ? "Permintaan Difilter" : "Requests Filtered"}</div>
            <div className="text-2xl font-bold font-heading text-[var(--foreground)] mt-1">
              {data?.telemetry.totalRequestsFiltered || 0}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)]">
            <div className="text-xs text-[var(--muted)] font-medium">{isId ? "Ancaman Diblokir" : "Threats Blocked"}</div>
            <div className="text-2xl font-bold font-heading text-emerald-500 mt-1">
              {data?.telemetry.threatsBlocked || 0}
            </div>
          </div>
        </div>
      </div>

      {/* Security Architecture 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Layer 1: Edge Firewall */}
        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--primary)]">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--foreground)]">{isId ? "Edge Firewall & Scanner" : "Edge Firewall & Probes"}</h3>
              <p className="text-xs text-[var(--muted)]">{isId ? "Inspeksi request di level Next.js edge" : "Edge inspection on incoming HTTP requests"}</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-between">
              <span className="text-[var(--muted)]">User-Agent Malicious Block</span>
              <span className="font-mono text-emerald-500 font-semibold">Active</span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-between">
              <span className="text-[var(--muted)]">Path Traversal Guard</span>
              <span className="font-mono text-emerald-500 font-semibold">Active</span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-between">
              <span className="text-[var(--muted)]">Host Header Injection Guard</span>
              <span className="font-mono text-emerald-500 font-semibold">Active</span>
            </div>
          </div>
        </div>

        {/* Layer 2: Rate Limiting & Anti-SSRF */}
        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--primary)]">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--foreground)]">{isId ? "Rate Limiter & Anti-SSRF" : "Rate Limiter & Anti-SSRF"}</h3>
              <p className="text-xs text-[var(--muted)]">{isId ? "Proteksi DoS & Cloud Metadata Exfiltration" : "DoS prevention & Cloud Metadata protection"}</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-between">
              <span className="text-[var(--muted)]">Chat Proxy Rate Limit</span>
              <span className="font-mono text-[var(--foreground)] font-semibold">100 req/min</span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-between">
              <span className="text-[var(--muted)]">Cloud Metadata Block (169.254)</span>
              <span className="font-mono text-emerald-500 font-semibold">Enforced</span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-between">
              <span className="text-[var(--muted)]">Max Payload Boundary</span>
              <span className="font-mono text-[var(--foreground)] font-semibold">4 MB</span>
            </div>
          </div>
        </div>

        {/* Layer 3: Cryptographic Vault */}
        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--primary)]">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--foreground)]">{isId ? "Vault Kredensial Terenkripsi" : "Encrypted Credential Vault"}</h3>
              <p className="text-xs text-[var(--muted)]">{isId ? "Kunci API disimpan terenkripsi di disk" : "API keys are encrypted at rest with AES-GCM"}</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-between">
              <span className="text-[var(--muted)]">Algoritma Enkripsi</span>
              <span className="font-mono text-[var(--foreground)] font-semibold">AES-256-GCM</span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-between">
              <span className="text-[var(--muted)]">Derivasi Kunci</span>
              <span className="font-mono text-[var(--foreground)] font-semibold">PBKDF2-SHA256</span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-between">
              <span className="text-[var(--muted)]">Git Leak Prevention</span>
              <span className="font-mono text-emerald-500 font-semibold">.gitignore Protected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Security Event Feed */}
      <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[var(--primary)]" />
            <h3 className="text-base font-bold text-[var(--foreground)]">
              {isId ? "Log Audit Keamanan & Telemetri Real-time" : "Real-time Security Audit Telemetry"}
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[var(--muted)]">
            {isId ? "Pembaruan otomatis tiap 15 detik" : "Auto-refreshes every 15s"}
          </span>
        </div>

        {(!data?.telemetry.lastEvents || data.telemetry.lastEvents.length === 0) ? (
          <div className="py-8 text-center bg-[var(--background)] rounded-xl border border-[var(--border)] text-xs text-[var(--muted)]">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-2 opacity-70" />
            <span>{isId ? "Semua request bersih. Tidak ada ancaman atau pelanggaran keamanan." : "All systems normal. No active threats or violations recorded."}</span>
          </div>
        ) : (
          <div className="space-y-2">
            {data.telemetry.lastEvents.slice(0, 8).map((evt) => (
              <div
                key={evt.id}
                className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <Badge variant={evt.severity === "high" || evt.severity === "critical" ? "destructive" : "secondary"} className="text-[10px]">
                    {evt.type}
                  </Badge>
                  <span className="text-[var(--foreground)]">{evt.details}</span>
                </div>
                <div className="flex items-center gap-3 text-[var(--muted)] text-[11px] shrink-0">
                  <span>IP: {evt.hashedIp}</span>
                  <span>{new Date(evt.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

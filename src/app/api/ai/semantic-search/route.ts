import { NextRequest, NextResponse } from "next/server"
import { TOOLS, CATEGORIES } from "@/data/mock"
import { Tool } from "@/types"
import { checkRateLimit, sanitizeSearchQuery } from "@/lib/security"

interface ScoredResult {
  tool: Tool
  score: number
  matchReason: string
}

// Synonyms and semantic intent mappings for developer queries
const INTENT_MAPPINGS: Record<string, string[]> = {
  "website": ["landing page", "frontend", "web", "react", "next.js", "ui", "design", "v0", "builder"],
  "landing page": ["website", "frontend", "builder", "v0", "ui", "tailwind"],
  "transkripsi": ["transcribe", "speech", "audio", "voice", "whisper", "speech-to-text", "audio ai"],
  "audio": ["voice", "speech", "tts", "stt", "whisper", "sound", "podcast"],
  "suara": ["voice", "speech", "audio", "tts", "whisper"],
  "coding": ["assistant", "ide", "code", "programming", "developer", "copilot", "cursor", "roo code", "qwen"],
  "koding": ["assistant", "ide", "code", "programming", "developer", "copilot", "cursor", "cline"],
  "review": ["code review", "refactoring", "quality", "audit", "security", "pr review"],
  "gambar": ["image", "generator", "midjourney", "flux", "stable diffusion", "design", "art"],
  "image": ["picture", "generator", "midjourney", "flux", "visual", "photos"],
  "video": ["video generation", "animation", "runway", "pika", "sora"],
  "gratis": ["free", "open-source", "open source", "freemium", "community"],
  "open source": ["github", "self-hosted", "local", "offline", "free"],
  "database": ["vector", "sql", "nosql", "postgres", "neon", "embeddings", "storage"],
  "mcp": ["model context protocol", "server", "claude", "cursor", "tools", "protocol"],
  "agent": ["autonomous", "workflow", "langchain", "crewai", "multi-agent", "framework"],
  "lokal": ["offline", "ollama", "local", "self-hosted", "privacy", "private"],
  "offline": ["ollama", "local", "private", "on-device"],
  "search": ["semantic", "rag", "vector", "retrieval", "embeddings"],
  "testing": ["qa", "e2e", "unit test", "automation", "playwright"],
}

export async function POST(req: NextRequest) {
  // Rate Limiting Protection (80 req/min)
  const rateLimitResponse = checkRateLimit(req, "semantic-search", { limit: 80, windowMs: 60000 })
  if (rateLimitResponse) return rateLimitResponse

  try {
    const { query: rawQuery, locale = "id" } = await req.json()
    const isId = locale === "id"

    const query = sanitizeSearchQuery(rawQuery, 200)
    if (!query) {
      return NextResponse.json({ results: [] })
    }

    const queryLower = query.toLowerCase().trim()
    const queryTokens = queryLower.split(/\s+/).filter(t => t.length > 1)

    // Expand query with semantic synonyms
    const expandedTokens = new Set<string>(queryTokens)
    for (const token of queryTokens) {
      for (const [key, synonyms] of Object.entries(INTENT_MAPPINGS)) {
        if (token.includes(key) || key.includes(token)) {
          synonyms.forEach(syn => expandedTokens.add(syn))
        }
      }
    }

    const scoredTools: ScoredResult[] = TOOLS.map(tool => {
      let score = 0
      const reasons: string[] = []

      const nameLower = tool.name.toLowerCase()
      const descLower = tool.description.toLowerCase()
      const tagsLower = tool.tags.map(t => t.toLowerCase())
      const cat = CATEGORIES.find(c => c.id === tool.categoryId)
      const catNameLower = cat ? cat.name.toLowerCase() : ""
      const probLower = tool.problem ? tool.problem.toLowerCase() : ""
      const solLower = tool.solution ? tool.solution.toLowerCase() : ""
      const featsLower = tool.keyFeatures ? tool.keyFeatures.join(" ").toLowerCase() : ""

      // 1. Direct name match (highest weight)
      if (queryLower.includes(nameLower) || nameLower.includes(queryLower)) {
        score += 40
        reasons.push(isId ? `Nama alat "${tool.name}" sesuai langsung dengan kueri` : `Tool name "${tool.name}" directly matches query`)
      }

      // 2. Category match
      if (queryTokens.some(tok => catNameLower.includes(tok))) {
        score += 25
        reasons.push(isId ? `Termasuk dalam kategori ${cat?.name}` : `Belongs to ${cat?.name} category`)
      }

      // 3. Problem & Solution semantic match
      for (const token of expandedTokens) {
        if (probLower.includes(token) || solLower.includes(token)) {
          score += 15
          if (reasons.length < 2) {
            reasons.push(isId ? `Menyelesaikan problem yang relevan dengan kebutuhan Anda` : `Directly solves problems matching your requirements`)
          }
          break
        }
      }

      // 4. Tags match
      const matchingTags = tagsLower.filter(t => Array.from(expandedTokens).some(tok => t.includes(tok) || tok.includes(t)))
      if (matchingTags.length > 0) {
        score += matchingTags.length * 8
        if (reasons.length < 2) {
          reasons.push(isId ? `Memiliki tag relevan: #${matchingTags.slice(0, 2).join(", #")}` : `Relevant tags: #${matchingTags.slice(0, 2).join(", #")}`)
        }
      }

      // 5. Description & Features match
      for (const token of expandedTokens) {
        if (descLower.includes(token) || featsLower.includes(token)) {
          score += 6
        }
      }

      // 6. Pricing intent bonus
      if ((queryLower.includes("gratis") || queryLower.includes("free") || queryLower.includes("open source")) && tool.isOpenSource) {
        score += 15
        reasons.push(isId ? "100% Open-Source / Gratis" : "100% Open-Source / Free")
      }

      // Calculate confidence percentage (capped at 99%)
      const matchScorePercent = Math.min(99, Math.max(0, Math.round((score / 65) * 100)))

      const defaultReason = isId
        ? `Memiliki kapabilitas AI yang sesuai dengan kueri pencarian Anda.`
        : `Matches AI capabilities relevant to your query.`

      return {
        tool,
        score: matchScorePercent,
        matchReason: reasons[0] || defaultReason
      }
    })
    .filter(item => item.score >= 25)
    .sort((a, b) => b.score - a.score)
    .slice(0, 24)

    return NextResponse.json({ results: scoredTools, total: scoredTools.length })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to process semantic search" }, { status: 500 })
  }
}

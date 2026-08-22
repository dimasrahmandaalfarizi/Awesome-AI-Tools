import { checkRateLimit, sanitizeSearchQuery } from "@/lib/security"
import { NextRequest, NextResponse } from "next/server"

export interface SearchResult {
  title: string
  url: string
  snippet: string
  date?: string
}

/** Strip HTML tags and decode entities */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, c) => String.fromCharCode(Number(c)))
    .trim()
}

/**
 * Parse Bing RSS feed search results.
 * Bing returns RSS at: https://www.bing.com/search?q=QUERY&format=rss
 * No API key required. Works for any search query.
 */
async function searchBingRSS(query: string): Promise<SearchResult[]> {
  // For multi-word queries that look like a person/entity name, wrap in quotes
  // to get exact-match results instead of keyword-split results
  const words = query.trim().split(/\s+/)
  const isQuoted = query.startsWith('"') && query.endsWith('"')
  const enhancedQuery =
    !isQuoted && words.length > 1 && words.length <= 6
      ? `"${query}"`  // exact phrase match
      : query

  const url = `https://www.bing.com/search?q=${encodeURIComponent(enhancedQuery)}&format=rss&count=8`

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      Accept: "application/rss+xml, text/xml, */*",
    },
    signal: AbortSignal.timeout(8000),
  })

  if (!res.ok) throw new Error(`Bing RSS returned ${res.status}`)

  const xml = await res.text()
  const results: SearchResult[] = []

  // Parse <item> blocks from RSS XML
  const itemRe = /<item>([\s\S]*?)<\/item>/g
  let match: RegExpExecArray | null

  while ((match = itemRe.exec(xml)) !== null && results.length < 6) {
    const item = match[1]

    const titleMatch = item.match(/<title>([\s\S]*?)<\/title>/)
    const linkMatch = item.match(/<link>([\s\S]*?)<\/link>/)
    const descMatch = item.match(/<description>([\s\S]*?)<\/description>/)
    const dateMatch = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)

    const title = titleMatch ? stripHtml(titleMatch[1]) : ""
    const link = linkMatch ? stripHtml(linkMatch[1]) : ""
    const snippet = descMatch ? stripHtml(descMatch[1]) : ""
    const date = dateMatch ? stripHtml(dateMatch[1]) : undefined

    if (title && link) {
      results.push({ title, url: link, snippet, date })
    }
  }

  return results
}

/**
 * Fallback: DuckDuckGo Instant Answer API
 * Good for calculations, unit conversions, and well-known entities.
 */
async function searchDDGInstant(query: string): Promise<SearchResult[]> {
  const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`
  const res = await fetch(url, {
    headers: { "User-Agent": "AwesomeAITools/1.0" },
    signal: AbortSignal.timeout(5000),
  })
  if (!res.ok) return []

  const data = await res.json()
  const results: SearchResult[] = []

  if (data.AbstractText) {
    results.push({
      title: data.Heading || query,
      url: data.AbstractURL || "",
      snippet: data.AbstractText,
    })
  }
  if (data.Answer) {
    results.push({ title: "Direct Answer", url: "", snippet: data.Answer })
  }
  for (const topic of data.RelatedTopics || []) {
    if (results.length >= 5) break
    if (topic.Text && topic.FirstURL) {
      results.push({
        title: topic.Text.split(" - ")[0],
        url: topic.FirstURL,
        snippet: topic.Text,
      })
    }
  }
  return results
}

export async function GET(req: NextRequest) {
  const rateLimitRes = checkRateLimit(req, "search", { limit: 60, windowMs: 60000 })
  if (rateLimitRes) return rateLimitRes

  const rawQ = req.nextUrl.searchParams.get("q") || ""
  const q = sanitizeSearchQuery(rawQ, 200)
  if (!q) {
    return NextResponse.json({ error: "Missing query parameter q" }, { status: 400 })
  }

  try {
    // Primary: Bing RSS with exact-match phrase search
    let results = await searchBingRSS(q)

    // If exact-match returned nothing, retry with raw unquoted query
    if (results.length === 0 && q.split(/\s+/).length > 1) {
      results = await searchBingRSS(`${q} -site:bing.com`)
    }

    // Last resort: DDG Instant Answer (good for facts/calculations)
    if (results.length === 0) {
      const ddgResults = await searchDDGInstant(q)
      return NextResponse.json({ results: ddgResults, query: q, source: "ddg" })
    }

    return NextResponse.json({ results, query: q, source: "bing" })
  } catch (err: any) {
    // Fallback to DDG Instant Answer
    try {
      const fallback = await searchDDGInstant(q)
      return NextResponse.json({ results: fallback, query: q, source: "ddg-fallback" })
    } catch {
      return NextResponse.json(
        { error: `Search failed: ${err.message}`, results: [] },
        { status: 500 }
      )
    }
  }
}

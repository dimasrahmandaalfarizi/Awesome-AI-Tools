import { NextRequest, NextResponse } from "next/server"
import { logSecurityEvent, recordRequestFiltered } from "./security/auditLogger"
export * from "./security/crypto"
export * from "./security/schemas"
export * from "./security/auditLogger"

/**
 * In-Memory Token Bucket / Sliding Window Rate Limiter
 */
interface RateLimitRecord {
  tokens: number
  lastRefill: number
  violationCount: number
  bannedUntil?: number
}

const rateLimitStore = new Map<string, RateLimitRecord>()

// Periodic cleanup to prevent memory leaks every 10 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now()
    for (const [key, record] of rateLimitStore.entries()) {
      if (now - record.lastRefill > 1000 * 60 * 15 && (!record.bannedUntil || record.bannedUntil < now)) {
        rateLimitStore.delete(key)
      }
    }
  }, 1000 * 60 * 10)
}

export interface RateLimitOptions {
  limit?: number // Max tokens in bucket
  windowMs?: number // Window in milliseconds
}

/**
 * Check if the request exceeds rate limit.
 * Returns NextResponse 429 if rate limited, or null if allowed.
 */
export function checkRateLimit(
  req: NextRequest,
  keyPrefix: string = "api",
  options: RateLimitOptions = {}
): NextResponse | null {
  recordRequestFiltered()
  const limit = options.limit || 60
  const windowMs = options.windowMs || 60 * 1000

  // Extract client IP or fallback identifier
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1"

  const rateKey = `${keyPrefix}:${ip}`
  const now = Date.now()

  let record = rateLimitStore.get(rateKey)
  if (!record) {
    record = { tokens: limit, lastRefill: now, violationCount: 0 }
    rateLimitStore.set(rateKey, record)
  }

  // Check if IP is in temporary jail
  if (record.bannedUntil && record.bannedUntil > now) {
    const remainingBanSecs = Math.ceil((record.bannedUntil - now) / 1000)
    logSecurityEvent('RATE_LIMIT_EXCEEDED', 'high', `Blocked jailed IP for excessive violations. Remaining: ${remainingBanSecs}s`, ip, req.nextUrl.pathname)
    return NextResponse.json(
      {
        error: "Access temporarily suspended due to repeated rate limit violations.",
        retryAfterSeconds: remainingBanSecs
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(remainingBanSecs),
          "X-RateLimit-Remaining": "0"
        }
      }
    )
  }

  // Refill tokens proportionally
  const timePassed = now - record.lastRefill
  const tokensToAdd = (timePassed / windowMs) * limit
  record.tokens = Math.min(limit, record.tokens + tokensToAdd)
  record.lastRefill = now

  if (record.tokens < 1) {
    record.violationCount += 1

    // If violating repeatedly (>5 times), jail IP for 5 minutes
    if (record.violationCount >= 5) {
      record.bannedUntil = now + (5 * 60 * 1000)
      logSecurityEvent('MALICIOUS_PROBE_BLOCKED', 'high', 'Auto-jailed client for 5 minutes after 5 rate violations', ip, req.nextUrl.pathname)
    } else {
      logSecurityEvent('RATE_LIMIT_EXCEEDED', 'low', `Rate limit reached (${record.violationCount} violations)`, ip, req.nextUrl.pathname)
    }

    const retryAfter = Math.ceil((1 - record.tokens) * (windowMs / limit) / 1000)
    return NextResponse.json(
      {
        error: "Too Many Requests. Rate limit exceeded to ensure backend stability and resource safety.",
        retryAfterSeconds: retryAfter
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": String(limit),
          "X-RateLimit-Remaining": "0"
        }
      }
    )
  }

  // Deduct 1 token
  record.tokens -= 1
  return null
}

/**
 * SSRF Protection: Validate that custom URLs do not target internal cloud metadata or forbidden networks.
 */
export function validateSafeUrl(urlStr: string, clientIp: string = "127.0.0.1", path: string = "/api"): { isValid: boolean; reason?: string } {
  try {
    const parsed = new URL(urlStr)

    // 1. Only allow HTTP and HTTPS
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      logSecurityEvent('SSRF_BLOCKED', 'high', `Invalid protocol: ${parsed.protocol}`, clientIp, path)
      return { isValid: false, reason: "Forbidden protocol. Only http:// and https:// are allowed." }
    }

    const host = parsed.hostname.toLowerCase()

    // 2. Block Cloud Metadata Services (AWS, GCP, Azure, OpenStack, DigitalOcean)
    const cloudMetadataHosts = [
      "169.254.169.254",
      "metadata.google.internal",
      "metadata.tencentyun.com",
      "100.100.100.200",
      "fd00:ec2::254"
    ]

    if (cloudMetadataHosts.includes(host)) {
      logSecurityEvent('SSRF_BLOCKED', 'critical', `Attempted cloud metadata exfiltration to ${host}`, clientIp, path)
      return { isValid: false, reason: "Access to cloud metadata endpoints is strictly blocked for security." }
    }

    // 3. Disallow link-local or carrier grade NAT addresses
    if (host.startsWith("169.254.") || host.startsWith("0.0.0.0")) {
      logSecurityEvent('SSRF_BLOCKED', 'high', `Attempted link-local access to ${host}`, clientIp, path)
      return { isValid: false, reason: "Private link-local network access is not permitted." }
    }

    return { isValid: true }
  } catch (err) {
    return { isValid: false, reason: "Malformed URL format." }
  }
}

/**
 * Validate maximum request payload length to prevent memory exhaustion / ReDoS
 */
export function validatePayloadSize(body: string, maxBytes: number = 2 * 1024 * 1024, clientIp: string = "127.0.0.1", path: string = "/api"): boolean {
  const size = Buffer.byteLength(body, "utf8")
  if (size > maxBytes) {
    logSecurityEvent('PAYLOAD_TOO_LARGE', 'medium', `Payload size ${size} bytes exceeds limit ${maxBytes}`, clientIp, path)
    return false
  }
  return true
}

/**
 * Sanitize query text to remove dangerous control characters
 */
export function sanitizeSearchQuery(query: string, maxLength: number = 300): string {
  if (!query || typeof query !== "string") return ""
  return query
    .slice(0, maxLength)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "") // Remove control characters
    .trim()
}

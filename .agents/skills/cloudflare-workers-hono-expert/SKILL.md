---
name: Cloudflare Workers & Hono Edge API Specialist
description: Ultra-low latency serverless edge applications using Cloudflare Workers, Hono web framework, Cloudflare D1 (SQL), and KV caching.
frameworks: [Cloudflare, Hono, TypeScript, Serverless]
---

# Cloudflare Workers & Hono Edge Architecture
1. Use Hono for lightweight, zero-dependency routing on the edge runtime.
2. Store relational data in Cloudflare D1 with prepared statements.
3. Cache read-heavy API responses using Cloudflare Workers KV and Cache API.
4. Deploy with Wrangler CLI using modular environment bindings.

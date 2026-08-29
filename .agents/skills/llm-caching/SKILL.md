---
name: LLM Caching
description: Semantic caching with Redis vector similarity and exact prompt caching (Anthropic Prompt Caching) to cut latency.
frameworks: [Claude Code, Codex, Cursor, Antigravity]
---

# LLM Caching

Semantic caching with Redis vector similarity and exact prompt caching (Anthropic Prompt Caching) to cut latency.

## Use Case
Accelerating repetitive LLM agent queries and lowering API billing.

## Supported Platforms
- Claude Code
- Codex
- Cursor
- Antigravity
- Copilot

## Core Engineering Rules
1. Apply the **LLM Caching** pattern systematically before making code changes.
2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).
3. Prevent context pollution and maintain strict verification standards.

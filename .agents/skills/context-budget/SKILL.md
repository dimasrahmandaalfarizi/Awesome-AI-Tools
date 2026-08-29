---
name: Context Budget
description: Monitor and manage LLM context window usage to avoid degradation. Track token consumption, trigger compaction at 70%, and save session state before limits are hit.
frameworks: [Claude Code, Codex, Cursor, Antigravity]
---

# Context Budget

Monitor and manage LLM context window usage to avoid degradation. Track token consumption, trigger compaction at 70%, and save session state before limits are hit.

## Use Case
Long coding sessions, large codebases, or complex multi-step tasks where context window pressure builds up.

## Supported Platforms
- Claude Code
- Codex
- Cursor
- Antigravity

## Core Engineering Rules
1. Apply the **Context Budget** pattern systematically before making code changes.
2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).
3. Prevent context pollution and maintain strict verification standards.

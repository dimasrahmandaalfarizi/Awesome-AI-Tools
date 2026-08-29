---
name: Config GC
description: Garbage collection for stale configuration: removes dead environment variables, abandoned feature flags, and orphaned secrets.
frameworks: [Claude Code, Codex, Cursor, Antigravity]
---

# Config GC

Garbage collection for stale configuration: removes dead environment variables, abandoned feature flags, and orphaned secrets.

## Use Case
Cleaning accumulated technical debt in long-running projects.

## Supported Platforms
- Claude Code
- Codex
- Cursor
- Antigravity
- Zed
- Copilot

## Core Engineering Rules
1. Apply the **Config GC** pattern systematically before making code changes.
2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).
3. Prevent context pollution and maintain strict verification standards.

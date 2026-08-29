---
name: Resume Session
description: Load and reconstruct context from a saved session state without re-reading the entire codebase.
frameworks: [Claude Code, Codex, Antigravity, Memory]
---

# Resume Session

Load and reconstruct context from a saved session state without re-reading the entire codebase.

## Use Case
Starting a new agent turn on an existing project to immediately continue pending work.

## Supported Platforms
- Claude Code
- Codex
- Antigravity

## Core Engineering Rules
1. Apply the **Resume Session** pattern systematically before making code changes.
2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).
3. Prevent context pollution and maintain strict verification standards.

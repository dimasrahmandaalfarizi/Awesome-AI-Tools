---
name: Save Session
description: Snapshot current work state before ending a session: completed items, pending tasks, design choices, and context summary.
frameworks: [Claude Code, Codex, Antigravity, Memory]
---

# Save Session

Snapshot current work state before ending a session: completed items, pending tasks, design choices, and context summary.

## Use Case
Ending an agent session to ensure seamless resumption in the next session.

## Supported Platforms
- Claude Code
- Codex
- Antigravity

## Core Engineering Rules
1. Apply the **Save Session** pattern systematically before making code changes.
2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).
3. Prevent context pollution and maintain strict verification standards.

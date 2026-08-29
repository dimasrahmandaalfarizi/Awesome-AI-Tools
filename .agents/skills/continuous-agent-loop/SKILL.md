---
name: Continuous Agent Loop
description: Background task queue processor where agents poll, execute, verify, and report without user interaction.
frameworks: [Claude Code, Codex, Antigravity, Loop]
---

# Continuous Agent Loop

Background task queue processor where agents poll, execute, verify, and report without user interaction.

## Use Case
Automating background GitHub issue resolution and pull request triage.

## Supported Platforms
- Claude Code
- Codex
- Antigravity

## Core Engineering Rules
1. Apply the **Continuous Agent Loop** pattern systematically before making code changes.
2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).
3. Prevent context pollution and maintain strict verification standards.

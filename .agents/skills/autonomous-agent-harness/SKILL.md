---
name: Autonomous Agent Harness
description: End-to-end harness for non-interactive autonomous task execution with safety circuit breakers and rollbacks.
frameworks: [Claude Code, Codex, Antigravity, Autonomous]
---

# Autonomous Agent Harness

End-to-end harness for non-interactive autonomous task execution with safety circuit breakers and rollbacks.

## Use Case
Overnight batch issue fixing and automated dependency upgrades.

## Supported Platforms
- Claude Code
- Codex
- Antigravity

## Core Engineering Rules
1. Apply the **Autonomous Agent Harness** pattern systematically before making code changes.
2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).
3. Prevent context pollution and maintain strict verification standards.

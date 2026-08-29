---
name: Hooks Runtime
description: Agent execution hooks: pre-tool and post-tool lifecycle triggers for rule enforcement, telemetry, and input validation.
frameworks: [Claude Code, Codex, Hooks, Runtime]
---

# Hooks Runtime

Agent execution hooks: pre-tool and post-tool lifecycle triggers for rule enforcement, telemetry, and input validation.

## Use Case
Customizing and monitoring agent execution flows deterministically.

## Supported Platforms
- Claude Code
- Codex

## Core Engineering Rules
1. Apply the **Hooks Runtime** pattern systematically before making code changes.
2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).
3. Prevent context pollution and maintain strict verification standards.

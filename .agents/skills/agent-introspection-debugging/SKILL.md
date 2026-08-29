---
name: Agent Introspection Debugging
description: Debug agent failure modes by evaluating its own reasoning chain, tool inputs, and decision deviations.
frameworks: [Claude Code, Codex, Antigravity, Debugging]
---

# Agent Introspection Debugging

Debug agent failure modes by evaluating its own reasoning chain, tool inputs, and decision deviations.

## Use Case
When an agent gets stuck in infinite loops or generates suboptimal solutions.

## Supported Platforms
- Claude Code
- Codex
- Antigravity

## Core Engineering Rules
1. Apply the **Agent Introspection Debugging** pattern systematically before making code changes.
2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).
3. Prevent context pollution and maintain strict verification standards.

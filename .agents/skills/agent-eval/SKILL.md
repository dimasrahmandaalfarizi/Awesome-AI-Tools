---
name: Agent Eval
description: Automated benchmark evaluation measuring agent task completion, tool call accuracy, and context efficiency.
frameworks: [Claude Code, Codex, Antigravity, Agent]
---

# Agent Eval

Automated benchmark evaluation measuring agent task completion, tool call accuracy, and context efficiency.

## Use Case
Tracking agent quality regressions during system updates.

## Supported Platforms
- Claude Code
- Codex
- Antigravity

## Core Engineering Rules
1. Apply the **Agent Eval** pattern systematically before making code changes.
2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).
3. Prevent context pollution and maintain strict verification standards.

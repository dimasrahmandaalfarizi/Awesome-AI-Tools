---
name: Agent Self Evaluation
description: Pre-delivery self-audit: checks output against acceptance criteria, verifies types, and tests for regressions.
frameworks: [Claude Code, Codex, Antigravity, Self-Review]
---

# Agent Self Evaluation

Pre-delivery self-audit: checks output against acceptance criteria, verifies types, and tests for regressions.

## Use Case
High-stakes autonomous task execution where human review is minimal.

## Supported Platforms
- Claude Code
- Codex
- Antigravity

## Core Engineering Rules
1. Apply the **Agent Self Evaluation** pattern systematically before making code changes.
2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).
3. Prevent context pollution and maintain strict verification standards.

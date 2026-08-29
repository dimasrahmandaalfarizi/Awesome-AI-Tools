---
name: AI Regression Testing
description: Regression test suites detecting behavioral shifts and output degradations across foundation model upgrades.
frameworks: [Claude Code, Codex, Antigravity, Testing]
---

# AI Regression Testing

Regression test suites detecting behavioral shifts and output degradations across foundation model upgrades.

## Use Case
Protecting production LLM pipelines when updating models from 4o to 5 or Sonnet 3.5 to 3.7.

## Supported Platforms
- Claude Code
- Codex
- Antigravity

## Core Engineering Rules
1. Apply the **AI Regression Testing** pattern systematically before making code changes.
2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).
3. Prevent context pollution and maintain strict verification standards.

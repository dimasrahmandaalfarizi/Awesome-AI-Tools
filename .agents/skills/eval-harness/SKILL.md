---
name: Eval Harness
description: Automated benchmark evaluation harness: run prompt test suites, compute assertion accuracy, and score model consistency.
frameworks: [Claude Code, Codex, Antigravity, Evaluation]
---

# Eval Harness

Automated benchmark evaluation harness: run prompt test suites, compute assertion accuracy, and score model consistency.

## Use Case
Building and testing enterprise LLM features with quantitative quality metrics.

## Supported Platforms
- Claude Code
- Codex
- Antigravity

## Core Engineering Rules
1. Apply the **Eval Harness** pattern systematically before making code changes.
2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).
3. Prevent context pollution and maintain strict verification standards.

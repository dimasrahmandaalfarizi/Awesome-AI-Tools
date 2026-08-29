---
name: LLM Evaluation
description: Systematic evaluation of LLM applications using automated assertions, LLM-as-a-judge, and ground-truth test datasets.
frameworks: [Claude Code, Codex, Antigravity, LLM]
---

# LLM Evaluation

Systematic evaluation of LLM applications using automated assertions, LLM-as-a-judge, and ground-truth test datasets.

## Use Case
Ensuring production LLM output accuracy, safety, and formatting compliance.

## Supported Platforms
- Claude Code
- Codex
- Antigravity

## Core Engineering Rules
1. Apply the **LLM Evaluation** pattern systematically before making code changes.
2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).
3. Prevent context pollution and maintain strict verification standards.

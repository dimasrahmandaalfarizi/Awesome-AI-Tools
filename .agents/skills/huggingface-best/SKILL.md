---
name: Huggingface Best
description: Use when the user asks about finding the best, top, or recommended model for a task, wants to know what AI model to use, or wants to compare models by benchmark scores. Triggers on: "best model for X", "what model should I use for", "top models for [task]", "which model runs on my...
frameworks: [Ai-ml, huggingface, best, AAS Core, Agentic]
---

# Huggingface Best

Use when the user asks about finding the best, top, or recommended model for a task, wants to know what AI model to use, or wants to compare models by benchmark scores. Triggers on: "best model for X", "what model should I use for", "top models for [task]", "which model runs on my...

## Category & Classification
- **Domain**: Ai-ml
- **Risk Profile**: `critical`
- **Source**: https://github.com/huggingface/skills/tree/main/skills/huggingface-best
- **Triggers**: `huggingface`, `best`, `user`, `asks`, `about`, `finding`, `top`, `recommended`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with huggingface best tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/huggingface-best`
- **Antigravity / OpenAI Codex**: `.agents/skills/huggingface-best/SKILL.md`
- **Cursor**: `.cursor/rules/huggingface-best.mdc`


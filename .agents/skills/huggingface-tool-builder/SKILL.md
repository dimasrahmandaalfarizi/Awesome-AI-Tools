---
name: Huggingface Tool Builder
description: Use this skill when the user wants to build tool/scripts or achieve a task where using data from the Hugging Face API would help. This is especially useful when chaining or combining API calls or the task will be repeated/automated. This Skill creates a reusable script to fetch, enrich...
frameworks: [Uncategorized, huggingface, builder, AAS Core, Agentic]
---

# Huggingface Tool Builder

Use this skill when the user wants to build tool/scripts or achieve a task where using data from the Hugging Face API would help. This is especially useful when chaining or combining API calls or the task will be repeated/automated. This Skill creates a reusable script to fetch, enrich...

## Category & Classification
- **Domain**: Uncategorized
- **Risk Profile**: `critical`
- **Source**: https://github.com/huggingface/skills/tree/main/skills/huggingface-tool-builder
- **Triggers**: `huggingface`, `builder`, `skill`, `user`, `wants`, `scripts`, `achieve`, `task`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with huggingface tool builder tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/huggingface-tool-builder`
- **Antigravity / OpenAI Codex**: `.agents/skills/huggingface-tool-builder/SKILL.md`
- **Cursor**: `.cursor/rules/huggingface-tool-builder.mdc`


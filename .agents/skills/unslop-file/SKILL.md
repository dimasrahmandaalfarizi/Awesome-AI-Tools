---
name: Unslop File
description: Humanize natural-language memory files (CLAUDE.md, todos, preferences, docs) by removing AI-isms and adding burstiness while preserving every code block, URL, path, command, and heading exactly. Two modes: --deterministic (fast, regex-based, no API) and LLM (default, calls Claude for...
frameworks: [Ai-ml, unslop, file, AAS Core, Agentic]
---

# Unslop File

Humanize natural-language memory files (CLAUDE.md, todos, preferences, docs) by removing AI-isms and adding burstiness while preserving every code block, URL, path, command, and heading exactly. Two modes: --deterministic (fast, regex-based, no API) and LLM (default, calls Claude for...

## Category & Classification
- **Domain**: Ai-ml
- **Risk Profile**: `critical`
- **Source**: https://github.com/MohamedAbdallah-14/unslop/tree/main/plugins/unslop/skills/unslop-file
- **Triggers**: `unslop`, `file`, `humanize`, `natural`, `language`, `memory`, `files`, `claude`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with unslop file tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/unslop-file`
- **Antigravity / OpenAI Codex**: `.agents/skills/unslop-file/SKILL.md`
- **Cursor**: `.cursor/rules/unslop-file.mdc`


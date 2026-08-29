---
name: Notebooklm
description: Interact with Google NotebookLM to query documentation with Gemini's source-grounded answers. Each question opens a fresh browser session, retrieves the answer exclusively from your uploaded documents, and closes.
frameworks: [Data-ai, notebooklm, AAS Core, Agentic]
---

# Notebooklm

Interact with Google NotebookLM to query documentation with Gemini's source-grounded answers. Each question opens a fresh browser session, retrieves the answer exclusively from your uploaded documents, and closes.

## Category & Classification
- **Domain**: Data-ai
- **Risk Profile**: `critical`
- **Source**: community
- **Triggers**: `notebooklm`, `interact`, `google`, `query`, `documentation`, `gemini`, `source`, `grounded`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with notebooklm tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/notebooklm`
- **Antigravity / OpenAI Codex**: `.agents/skills/notebooklm/SKILL.md`
- **Cursor**: `.cursor/rules/notebooklm.mdc`


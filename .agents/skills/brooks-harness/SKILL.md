---
name: Brooks Harness
description: Maintenance orchestrator for the brooks-lint plugin itself. Runs a sequential subagent pipeline — author → eval → QA → trigger-audit → release — to add or edit a skill, refresh the eval suite, keep the four manifests + README + CHANGELOG + AGENTS/GEMINI in sync, audit trigger...
frameworks: [Ai-ml, brooks, harness, AAS Core, Agentic]
---

# Brooks Harness

Maintenance orchestrator for the brooks-lint plugin itself. Runs a sequential subagent pipeline — author → eval → QA → trigger-audit → release — to add or edit a skill, refresh the eval suite, keep the four manifests + README + CHANGELOG + AGENTS/GEMINI in sync, audit trigger...

## Category & Classification
- **Domain**: Ai-ml
- **Risk Profile**: `critical`
- **Source**: https://github.com/hyhmrright/brooks-lint/tree/main/.claude/skills/brooks-harness
- **Triggers**: `brooks`, `harness`, `maintenance`, `orchestrator`, `lint`, `plugin`, `itself`, `runs`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with brooks harness tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/brooks-harness`
- **Antigravity / OpenAI Codex**: `.agents/skills/brooks-harness/SKILL.md`
- **Cursor**: `.cursor/rules/brooks-harness.mdc`


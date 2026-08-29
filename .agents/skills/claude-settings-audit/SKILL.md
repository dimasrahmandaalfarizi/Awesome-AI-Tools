---
name: Claude Settings Audit
description: Analyze a repository to generate recommended Claude Code settings.json permissions. Use when setting up a new project, auditing existing settings, or determining which read-only bash commands to allow. Detects tech stack, build tools, and monorepo structure.
frameworks: [Ai-ml, claude, settings, audit, AAS Core, Agentic]
---

# Claude Settings Audit

Analyze a repository to generate recommended Claude Code settings.json permissions. Use when setting up a new project, auditing existing settings, or determining which read-only bash commands to allow. Detects tech stack, build tools, and monorepo structure.

## Category & Classification
- **Domain**: Ai-ml
- **Risk Profile**: `critical`
- **Source**: community
- **Triggers**: `claude`, `settings`, `audit`, `analyze`, `repository`, `generate`, `recommended`, `code`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with claude settings audit tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/claude-settings-audit`
- **Antigravity / OpenAI Codex**: `.agents/skills/claude-settings-audit/SKILL.md`
- **Cursor**: `.cursor/rules/claude-settings-audit.mdc`


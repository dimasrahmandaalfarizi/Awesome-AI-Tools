---
name: Skill Improver
description: Iteratively improve a Claude Code skill using the skill-reviewer agent until it meets quality standards. Use when improving a skill with multiple quality issues, iterating on a new skill until it meets standards, or automated fix-review cycles instead of manual editing.
frameworks: [Meta, skill, improver, AAS Core, Agentic]
---

# Skill Improver

Iteratively improve a Claude Code skill using the skill-reviewer agent until it meets quality standards. Use when improving a skill with multiple quality issues, iterating on a new skill until it meets standards, or automated fix-review cycles instead of manual editing.

## Category & Classification
- **Domain**: Meta
- **Risk Profile**: `critical`
- **Source**: community
- **Triggers**: `skill`, `improver`, `iteratively`, `improve`, `claude`, `code`, `reviewer`, `agent`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with skill improver tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/skill-improver`
- **Antigravity / OpenAI Codex**: `.agents/skills/skill-improver/SKILL.md`
- **Cursor**: `.cursor/rules/skill-improver.mdc`


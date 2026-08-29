---
name: Skill Issue
description: Find out why a coding-agent skill won't fire — grade each SKILL.md A–F on activation, simulate which skill a prompt triggers, and flag collisions where one silently shadows another.
frameworks: [Meta, skills, linter, activation, meta, AAS Core, Agentic]
---

# Skill Issue

Find out why a coding-agent skill won't fire — grade each SKILL.md A–F on activation, simulate which skill a prompt triggers, and flag collisions where one silently shadows another.

## Category & Classification
- **Domain**: Meta
- **Risk Profile**: `safe`
- **Source**: community
- **Triggers**: `skills`, `linter`, `activation`, `meta`, `ci`, `skill`, `issue`, `find`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with skill issue tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/skill-issue`
- **Antigravity / OpenAI Codex**: `.agents/skills/skill-issue/SKILL.md`
- **Cursor**: `.cursor/rules/skill-issue.mdc`


---
name: Skill Router
description: Use when the user is unsure which skill to use or where to start. Interviews the user with targeted questions and recommends the best skill(s) from the installed library for their goal.
frameworks: [Meta, skill, router, AAS Core, Agentic]
---

# Skill Router

Use when the user is unsure which skill to use or where to start. Interviews the user with targeted questions and recommends the best skill(s) from the installed library for their goal.

## Category & Classification
- **Domain**: Meta
- **Risk Profile**: `safe`
- **Source**: self
- **Triggers**: `skill`, `router`, `user`, `unsure`, `which`, `where`, `start`, `interviews`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with skill router tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/skill-router`
- **Antigravity / OpenAI Codex**: `.agents/skills/skill-router/SKILL.md`
- **Cursor**: `.cursor/rules/skill-router.mdc`


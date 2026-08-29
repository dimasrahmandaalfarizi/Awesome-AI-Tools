---
name: Skill Check
description: Validate Claude Code skills against the agentskills specification. Catches structural, semantic, and naming issues before users do.
frameworks: [Development, validation, linter, agentskills, skill-authoring, AAS Core, Agentic]
---

# Skill Check

Validate Claude Code skills against the agentskills specification. Catches structural, semantic, and naming issues before users do.

## Category & Classification
- **Domain**: Development
- **Risk Profile**: `safe`
- **Source**: https://github.com/olgasafonova/SkillCheck-Free
- **Triggers**: `validation`, `linter`, `agentskills`, `skill-authoring`, `code-quality`, `skill`, `check`, `validate`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with skill check tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/skill-check`
- **Antigravity / OpenAI Codex**: `.agents/skills/skill-check/SKILL.md`
- **Cursor**: `.cursor/rules/skill-check.mdc`


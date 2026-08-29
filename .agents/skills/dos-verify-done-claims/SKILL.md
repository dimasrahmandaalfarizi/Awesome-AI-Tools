---
name: Dos Verify Done Claims
description: Before accepting an agent's 'done / shipped / fixed' claim, verify it against ground truth (git ancestry + the commit's own diff) using the DOS kernel's `dos verify` and `dos commit-audit` — never the agent's own narration.
frameworks: [Quality, verification, git, ai-agents, trust, AAS Core, Agentic]
---

# Dos Verify Done Claims

Before accepting an agent's 'done / shipped / fixed' claim, verify it against ground truth (git ancestry + the commit's own diff) using the DOS kernel's `dos verify` and `dos commit-audit` — never the agent's own narration.

## Category & Classification
- **Domain**: Quality
- **Risk Profile**: `critical`
- **Source**: community
- **Triggers**: `verification`, `git`, `ai-agents`, `trust`, `quality-gate`, `dos`, `verify`, `done`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with dos verify done claims tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/dos-verify-done-claims`
- **Antigravity / OpenAI Codex**: `.agents/skills/dos-verify-done-claims/SKILL.md`
- **Cursor**: `.cursor/rules/dos-verify-done-claims.mdc`


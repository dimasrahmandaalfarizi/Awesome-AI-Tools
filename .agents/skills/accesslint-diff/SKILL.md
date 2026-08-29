---
name: Accesslint Diff
description: Diff a live page's accessibility violations against a baseline — by default compares uncommitted changes (stash-based), or pass --branch [<name>] to diff against a branch. Reports only new violations introduced, violations fixed, and pre-existing count. Use `scan` for a full audit with no diffing.
frameworks: [Uncategorized, accesslint, diff, AAS Core, Agentic]
---

# Accesslint Diff

Diff a live page's accessibility violations against a baseline — by default compares uncommitted changes (stash-based), or pass --branch [<name>] to diff against a branch. Reports only new violations introduced, violations fixed, and pre-existing count. Use `scan` for a full audit with no diffing.

## Category & Classification
- **Domain**: Uncategorized
- **Risk Profile**: `safe`
- **Source**: https://github.com/AccessLint/skills
- **Triggers**: `accesslint`, `diff`, `live`, `page`, `accessibility`, `violations`, `against`, `baseline`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with accesslint diff tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/accesslint-diff`
- **Antigravity / OpenAI Codex**: `.agents/skills/accesslint-diff/SKILL.md`
- **Cursor**: `.cursor/rules/accesslint-diff.mdc`


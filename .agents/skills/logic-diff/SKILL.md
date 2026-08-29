---
name: Logic Diff
description: Compare two code versions for semantic equivalence via semi-formal tracing of both versions side-by-side. Trigger when the user shares a refactor, rewrite, migration, or A/B implementation and wants to confirm behavior is unchanged — "did I break anything", "is this equivalent", "are...
frameworks: [Uncategorized, logic, diff, AAS Core, Agentic]
---

# Logic Diff

Compare two code versions for semantic equivalence via semi-formal tracing of both versions side-by-side. Trigger when the user shares a refactor, rewrite, migration, or A/B implementation and wants to confirm behavior is unchanged — "did I break anything", "is this equivalent", "are...

## Category & Classification
- **Domain**: Uncategorized
- **Risk Profile**: `safe`
- **Source**: https://github.com/hyhmrright/logic-lens/tree/main/skills/logic-diff
- **Triggers**: `logic`, `diff`, `compare`, `two`, `code`, `versions`, `semantic`, `equivalence`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with logic diff tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/logic-diff`
- **Antigravity / OpenAI Codex**: `.agents/skills/logic-diff/SKILL.md`
- **Cursor**: `.cursor/rules/logic-diff.mdc`


---
name: Logic Explain
description: Explain what a specific piece of code actually does for a given input by producing a step-by-step execution trace (interprocedural, with name resolution and type transitions). Trigger when the user is confused about behavior or asks why code produces X instead of Y — "walk me through...
frameworks: [Uncategorized, logic, explain, AAS Core, Agentic]
---

# Logic Explain

Explain what a specific piece of code actually does for a given input by producing a step-by-step execution trace (interprocedural, with name resolution and type transitions). Trigger when the user is confused about behavior or asks why code produces X instead of Y — "walk me through...

## Category & Classification
- **Domain**: Uncategorized
- **Risk Profile**: `safe`
- **Source**: https://github.com/hyhmrright/logic-lens/tree/main/skills/logic-explain
- **Triggers**: `logic`, `explain`, `what`, `specific`, `piece`, `code`, `actually`, `does`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with logic explain tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/logic-explain`
- **Antigravity / OpenAI Codex**: `.agents/skills/logic-explain/SKILL.md`
- **Cursor**: `.cursor/rules/logic-explain.mdc`


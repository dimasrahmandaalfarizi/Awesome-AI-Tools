---
name: Logic Review
description: Find logic bugs in a single file or function via semi-formal execution tracing (Premises → Trace → Divergence → Trigger → Remedy). Trigger when a user shares code and suspects something is wrong without naming a concrete failure — phrases like "review this", "does this look right",...
frameworks: [Uncategorized, logic, AAS Core, Agentic]
---

# Logic Review

Find logic bugs in a single file or function via semi-formal execution tracing (Premises → Trace → Divergence → Trigger → Remedy). Trigger when a user shares code and suspects something is wrong without naming a concrete failure — phrases like "review this", "does this look right",...

## Category & Classification
- **Domain**: Uncategorized
- **Risk Profile**: `critical`
- **Source**: https://github.com/hyhmrright/logic-lens/tree/main/skills/logic-review
- **Triggers**: `logic`, `review`, `find`, `bugs`, `single`, `file`, `function`, `via`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with logic review tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/logic-review`
- **Antigravity / OpenAI Codex**: `.agents/skills/logic-review/SKILL.md`
- **Cursor**: `.cursor/rules/logic-review.mdc`


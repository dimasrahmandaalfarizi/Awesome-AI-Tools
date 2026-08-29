---
name: Ai Loop
description: Runs a bounded spec-build-review development loop with explicit scope, stop conditions, and human approval gates for risky or ambiguous work.
frameworks: [Workflow, agent-workflow, specification, implementation, review, AAS Core, Agentic]
---

# Ai Loop

Runs a bounded spec-build-review development loop with explicit scope, stop conditions, and human approval gates for risky or ambiguous work.

## Category & Classification
- **Domain**: Workflow
- **Risk Profile**: `safe`
- **Source**: community
- **Triggers**: `agent-workflow`, `specification`, `implementation`, `review`, `verification`, `feedback-loop`, `ai`, `loop`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with ai loop tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/ai-loop`
- **Antigravity / OpenAI Codex**: `.agents/skills/ai-loop/SKILL.md`
- **Cursor**: `.cursor/rules/ai-loop.mdc`


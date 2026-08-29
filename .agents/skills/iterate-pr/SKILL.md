---
name: Iterate Pr
description: Iterate on a PR until CI passes. Use when you need to fix CI failures, address review feedback, or continuously push fixes until all checks are green. Automates the feedback-fix-push-wait cycle.
frameworks: [Workflow, iterate, pr, AAS Core, Agentic]
---

# Iterate Pr

Iterate on a PR until CI passes. Use when you need to fix CI failures, address review feedback, or continuously push fixes until all checks are green. Automates the feedback-fix-push-wait cycle.

## Category & Classification
- **Domain**: Workflow
- **Risk Profile**: `critical`
- **Source**: community
- **Triggers**: `iterate`, `pr`, `until`, `ci`, `passes`, `fix`, `failures`, `address`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with iterate pr tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/iterate-pr`
- **Antigravity / OpenAI Codex**: `.agents/skills/iterate-pr/SKILL.md`
- **Cursor**: `.cursor/rules/iterate-pr.mdc`


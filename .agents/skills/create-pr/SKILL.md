---
name: Create Pr
description: Alias for pr-writer. Use when users explicitly ask for "create-pr" or reference the legacy skill name. Redirects to the canonical PR writing workflow.
frameworks: [Workflow, create, pr, AAS Core, Agentic]
---

# Create Pr

Alias for pr-writer. Use when users explicitly ask for "create-pr" or reference the legacy skill name. Redirects to the canonical PR writing workflow.

## Category & Classification
- **Domain**: Workflow
- **Risk Profile**: `critical`
- **Source**: community
- **Triggers**: `create`, `pr`, `alias`, `writer`, `users`, `explicitly`, `ask`, `reference`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with create pr tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/create-pr`
- **Antigravity / OpenAI Codex**: `.agents/skills/create-pr/SKILL.md`
- **Cursor**: `.cursor/rules/create-pr.mdc`


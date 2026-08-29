---
name: Differential Review
description: Security-focused code review for PRs, commits, and diffs.
frameworks: [Security, differential, AAS Core, Agentic]
---

# Differential Review

Security-focused code review for PRs, commits, and diffs.

## Category & Classification
- **Domain**: Security
- **Risk Profile**: `critical`
- **Source**: community
- **Triggers**: `differential`, `review`, `security`, `code`, `prs`, `commits`, `diffs`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with differential review tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/differential-review`
- **Antigravity / OpenAI Codex**: `.agents/skills/differential-review/SKILL.md`
- **Cursor**: `.cursor/rules/differential-review.mdc`


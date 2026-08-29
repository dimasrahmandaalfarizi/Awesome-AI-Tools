---
name: Pre Release Review
description: Run a read-only pre-release review for deploy readiness, migrations, config, secrets, rollout order, rollback risk, and launch blockers.
frameworks: [Operations, release, deploy-readiness, ci-cd, rollback, AAS Core, Agentic]
---

# Pre Release Review

Run a read-only pre-release review for deploy readiness, migrations, config, secrets, rollout order, rollback risk, and launch blockers.

## Category & Classification
- **Domain**: Operations
- **Risk Profile**: `safe`
- **Source**: community
- **Triggers**: `release`, `deploy-readiness`, `ci-cd`, `rollback`, `production`, `pre`, `review`, `run`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with pre release review tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/pre-release-review`
- **Antigravity / OpenAI Codex**: `.agents/skills/pre-release-review/SKILL.md`
- **Cursor**: `.cursor/rules/pre-release-review.mdc`


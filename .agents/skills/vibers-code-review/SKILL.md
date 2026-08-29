---
name: Vibers Code Review
description: Human review workflow for AI-generated GitHub projects with spec-based feedback, security review, and follow-up PRs from the Vibers service.
frameworks: [Code-quality, vibers, code, AAS Core, Agentic]
---

# Vibers Code Review

Human review workflow for AI-generated GitHub projects with spec-based feedback, security review, and follow-up PRs from the Vibers service.

## Category & Classification
- **Domain**: Code-quality
- **Risk Profile**: `critical`
- **Source**: https://github.com/marsiandeployer/vibers-action
- **Triggers**: `vibers`, `code`, `review`, `human`, `ai`, `generated`, `github`, `spec`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with vibers code review tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/vibers-code-review`
- **Antigravity / OpenAI Codex**: `.agents/skills/vibers-code-review/SKILL.md`
- **Cursor**: `.cursor/rules/vibers-code-review.mdc`


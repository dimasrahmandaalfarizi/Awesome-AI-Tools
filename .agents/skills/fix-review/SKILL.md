---
name: Fix Review
description: Verify fix commits address audit findings without new bugs
frameworks: [Code-quality, fix, AAS Core, Agentic]
---

# Fix Review

Verify fix commits address audit findings without new bugs

## Category & Classification
- **Domain**: Code-quality
- **Risk Profile**: `safe`
- **Source**: https://github.com/trailofbits/skills/tree/main/plugins/fix-review
- **Triggers**: `fix`, `review`, `verify`, `commits`, `address`, `audit`, `findings`, `without`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with fix review tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/fix-review`
- **Antigravity / OpenAI Codex**: `.agents/skills/fix-review/SKILL.md`
- **Cursor**: `.cursor/rules/fix-review.mdc`


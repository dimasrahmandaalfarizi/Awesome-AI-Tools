---
name: Gha Security Review
description: Find exploitable vulnerabilities in GitHub Actions workflows. Every finding MUST include a concrete exploitation scenario — if you can't build the attack, don't report it.
frameworks: [Security, gha, security, AAS Core, Agentic]
---

# Gha Security Review

Find exploitable vulnerabilities in GitHub Actions workflows. Every finding MUST include a concrete exploitation scenario — if you can't build the attack, don't report it.

## Category & Classification
- **Domain**: Security
- **Risk Profile**: `safe`
- **Source**: community
- **Triggers**: `gha`, `security`, `review`, `find`, `exploitable`, `vulnerabilities`, `github`, `actions`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with gha security review tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/gha-security-review`
- **Antigravity / OpenAI Codex**: `.agents/skills/gha-security-review/SKILL.md`
- **Cursor**: `.cursor/rules/gha-security-review.mdc`


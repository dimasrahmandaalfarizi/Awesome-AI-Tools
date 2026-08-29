---
name: Accesslint Audit
description: Find and fix WCAG 2.2 accessibility issues. Two modes — report (sweep a codebase or page, produce a prioritized written report, no edits) and fix (audit→edit→verify loop on a target). Prefers direct-CDP live-DOM auditing; falls back to a browser-MCP composition or HTML-string audits.
frameworks: [Web-development, accesslint, audit, AAS Core, Agentic]
---

# Accesslint Audit

Find and fix WCAG 2.2 accessibility issues. Two modes — report (sweep a codebase or page, produce a prioritized written report, no edits) and fix (audit→edit→verify loop on a target). Prefers direct-CDP live-DOM auditing; falls back to a browser-MCP composition or HTML-string audits.

## Category & Classification
- **Domain**: Web-development
- **Risk Profile**: `safe`
- **Source**: https://github.com/AccessLint/skills
- **Triggers**: `accesslint`, `audit`, `find`, `fix`, `wcag`, `accessibility`, `issues`, `two`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with accesslint audit tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/accesslint-audit`
- **Antigravity / OpenAI Codex**: `.agents/skills/accesslint-audit/SKILL.md`
- **Cursor**: `.cursor/rules/accesslint-audit.mdc`


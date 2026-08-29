---
name: Cron Doctor
description: Diagnose and validate cron expressions before they ship. Catches the five silent death-traps: impossible dates that never fire, OR-semantics that fire too often, midnight spikes, uneven step drift, and leap-year February 29.
frameworks: [Devops, cron, crontab, scheduling, devops, AAS Core, Agentic]
---

# Cron Doctor

Diagnose and validate cron expressions before they ship. Catches the five silent death-traps: impossible dates that never fire, OR-semantics that fire too often, midnight spikes, uneven step drift, and leap-year February 29.

## Category & Classification
- **Domain**: Devops
- **Risk Profile**: `safe`
- **Source**: community
- **Triggers**: `cron`, `crontab`, `scheduling`, `devops`, `debugging`, `kubernetes`, `validation`, `doctor`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with cron doctor tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/cron-doctor`
- **Antigravity / OpenAI Codex**: `.agents/skills/cron-doctor/SKILL.md`
- **Cursor**: `.cursor/rules/cron-doctor.mdc`


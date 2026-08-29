---
name: Tune Monitor
description: Analyze a Monte Carlo monitor and recommend config changes to reduce alert noise. Supports metric, custom SQL, validation, and table monitors. Fetches the report, identifies patterns, and suggests tuning.
frameworks: [Uncategorized, tune, monitor, AAS Core, Agentic]
---

# Tune Monitor

Analyze a Monte Carlo monitor and recommend config changes to reduce alert noise. Supports metric, custom SQL, validation, and table monitors. Fetches the report, identifies patterns, and suggests tuning.

## Category & Classification
- **Domain**: Uncategorized
- **Risk Profile**: `critical`
- **Source**: https://github.com/monte-carlo-data/mc-agent-toolkit/tree/main/skills/tune-monitor
- **Triggers**: `tune`, `monitor`, `analyze`, `monte`, `carlo`, `recommend`, `config`, `changes`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with tune monitor tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/tune-monitor`
- **Antigravity / OpenAI Codex**: `.agents/skills/tune-monitor/SKILL.md`
- **Cursor**: `.cursor/rules/tune-monitor.mdc`


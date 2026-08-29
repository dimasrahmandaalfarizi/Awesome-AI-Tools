---
name: Debug Buttercup
description: All pods run in namespace crs. Use when pods in the crs namespace are in CrashLoopBackOff, OOMKilled, or restarting, multiple services restart simultaneously (cascade failure), or redis is unresponsive or showing AOF warnings.
frameworks: [Uncategorized, debug, buttercup, AAS Core, Agentic]
---

# Debug Buttercup

All pods run in namespace crs. Use when pods in the crs namespace are in CrashLoopBackOff, OOMKilled, or restarting, multiple services restart simultaneously (cascade failure), or redis is unresponsive or showing AOF warnings.

## Category & Classification
- **Domain**: Uncategorized
- **Risk Profile**: `critical`
- **Source**: community
- **Triggers**: `debug`, `buttercup`, `all`, `pods`, `run`, `namespace`, `crs`, `crashloopbackoff`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with debug buttercup tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/debug-buttercup`
- **Antigravity / OpenAI Codex**: `.agents/skills/debug-buttercup/SKILL.md`
- **Cursor**: `.cursor/rules/debug-buttercup.mdc`


---
name: Runaway Guard
description: Cost-safety discipline for paid AI / inference APIs: treat $-cost as a third complexity dimension alongside time and space. Forces a written per-run $-cap, per-day $-cap, max-iterations bound, concurrency limit, and a matching provider-dashboard hard cap BEFORE any call site is written.
frameworks: [Ai-ml, cost-safety, finops, ai-apis, agents, AAS Core, Agentic]
---

# Runaway Guard

Cost-safety discipline for paid AI / inference APIs: treat $-cost as a third complexity dimension alongside time and space. Forces a written per-run $-cap, per-day $-cap, max-iterations bound, concurrency limit, and a matching provider-dashboard hard cap BEFORE any call site is written.

## Category & Classification
- **Domain**: Ai-ml
- **Risk Profile**: `safe`
- **Source**: community
- **Triggers**: `cost-safety`, `finops`, `ai-apis`, `agents`, `retries`, `concurrency`, `wallet-invariant`, `gateway`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with runaway guard tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/runaway-guard`
- **Antigravity / OpenAI Codex**: `.agents/skills/runaway-guard/SKILL.md`
- **Cursor**: `.cursor/rules/runaway-guard.mdc`


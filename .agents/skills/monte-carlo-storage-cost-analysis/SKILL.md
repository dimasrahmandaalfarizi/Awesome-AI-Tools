---
name: Monte Carlo Storage Cost Analysis
description: Analyze a warehouse for stale, unused, or redundant tables via the analyze_storage_costs MCP tool. Classifies waste patterns and table categories, computes safety tiers, and handles category drill-downs and lineage follow-ups.
frameworks: [Uncategorized, monte, carlo, storage, cost, AAS Core, Agentic]
---

# Monte Carlo Storage Cost Analysis

Analyze a warehouse for stale, unused, or redundant tables via the analyze_storage_costs MCP tool. Classifies waste patterns and table categories, computes safety tiers, and handles category drill-downs and lineage follow-ups.

## Category & Classification
- **Domain**: Uncategorized
- **Risk Profile**: `critical`
- **Source**: https://github.com/monte-carlo-data/mc-agent-toolkit/tree/main/skills/storage-cost-analysis
- **Triggers**: `monte`, `carlo`, `storage`, `cost`, `analysis`, `analyze`, `warehouse`, `stale`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with monte carlo storage cost analysis tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/monte-carlo-storage-cost-analysis`
- **Antigravity / OpenAI Codex**: `.agents/skills/monte-carlo-storage-cost-analysis/SKILL.md`
- **Cursor**: `.cursor/rules/monte-carlo-storage-cost-analysis.mdc`


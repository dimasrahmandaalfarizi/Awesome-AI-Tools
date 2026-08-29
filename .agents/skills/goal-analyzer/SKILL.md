---
name: Goal Analyzer
description: 分析健康目标数据、识别目标模式、评估目标进度,并提供个性化目标管理建议。支持与营养、运动、睡眠等健康数据的关联分析。
frameworks: [Health, goal, analyzer, AAS Core, Agentic]
---

# Goal Analyzer

分析健康目标数据、识别目标模式、评估目标进度,并提供个性化目标管理建议。支持与营养、运动、睡眠等健康数据的关联分析。

## Category & Classification
- **Domain**: Health
- **Risk Profile**: `critical`
- **Source**: community
- **Triggers**: `goal`, `analyzer`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with goal analyzer tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/goal-analyzer`
- **Antigravity / OpenAI Codex**: `.agents/skills/goal-analyzer/SKILL.md`
- **Cursor**: `.cursor/rules/goal-analyzer.mdc`


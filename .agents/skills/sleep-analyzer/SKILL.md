---
name: Sleep Analyzer
description: 分析睡眠数据、识别睡眠模式、评估睡眠质量，并提供个性化睡眠改善建议。支持与其他健康数据的关联分析。
frameworks: [Health, sleep, analyzer, AAS Core, Agentic]
---

# Sleep Analyzer

分析睡眠数据、识别睡眠模式、评估睡眠质量，并提供个性化睡眠改善建议。支持与其他健康数据的关联分析。

## Category & Classification
- **Domain**: Health
- **Risk Profile**: `critical`
- **Source**: community
- **Triggers**: `sleep`, `analyzer`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with sleep analyzer tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/sleep-analyzer`
- **Antigravity / OpenAI Codex**: `.agents/skills/sleep-analyzer/SKILL.md`
- **Cursor**: `.cursor/rules/sleep-analyzer.mdc`


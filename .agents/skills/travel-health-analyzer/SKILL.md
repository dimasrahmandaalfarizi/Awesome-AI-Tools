---
name: Travel Health Analyzer
description: 分析旅行健康数据、评估目的地健康风险、提供疫苗接种建议、生成多语言紧急医疗信息卡片。支持WHO/CDC数据集成的专业级旅行健康风险评估。
frameworks: [Health, travel, health, analyzer, AAS Core, Agentic]
---

# Travel Health Analyzer

分析旅行健康数据、评估目的地健康风险、提供疫苗接种建议、生成多语言紧急医疗信息卡片。支持WHO/CDC数据集成的专业级旅行健康风险评估。

## Category & Classification
- **Domain**: Health
- **Risk Profile**: `critical`
- **Source**: community
- **Triggers**: `travel`, `health`, `analyzer`, `who`, `cdc`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with travel health analyzer tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/travel-health-analyzer`
- **Antigravity / OpenAI Codex**: `.agents/skills/travel-health-analyzer/SKILL.md`
- **Cursor**: `.cursor/rules/travel-health-analyzer.mdc`


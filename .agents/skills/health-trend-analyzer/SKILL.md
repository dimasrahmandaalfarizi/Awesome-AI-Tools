---
name: Health Trend Analyzer
description: 分析一段时间内健康数据的趋势和模式。关联药物、症状、生命体征、化验结果和其他健康指标的变化。识别令人担忧的趋势、改善情况，并提供数据驱动的洞察。当用户询问健康趋势、模式、随时间的变化或"我的健康状况有什么变化？"时使用。支持多维度分析（体重/BMI、症状、药物依从性、化验结果、情绪睡眠），相关性分析，变化检测，以及交互式HTML可视化报告（ECharts图表）。
frameworks: [Health, health, trend, analyzer, AAS Core, Agentic]
---

# Health Trend Analyzer

分析一段时间内健康数据的趋势和模式。关联药物、症状、生命体征、化验结果和其他健康指标的变化。识别令人担忧的趋势、改善情况，并提供数据驱动的洞察。当用户询问健康趋势、模式、随时间的变化或"我的健康状况有什么变化？"时使用。支持多维度分析（体重/BMI、症状、药物依从性、化验结果、情绪睡眠），相关性分析，变化检测，以及交互式HTML可视化报告（ECharts图表）。

## Category & Classification
- **Domain**: Health
- **Risk Profile**: `critical`
- **Source**: community
- **Triggers**: `health`, `trend`, `analyzer`, `bmi`, `html`, `echarts`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with health trend analyzer tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/health-trend-analyzer`
- **Antigravity / OpenAI Codex**: `.agents/skills/health-trend-analyzer/SKILL.md`
- **Cursor**: `.cursor/rules/health-trend-analyzer.mdc`


---
name: Nutrition Analyzer
description: 分析营养数据、识别营养模式、评估营养状况，并提供个性化营养建议。支持与运动、睡眠、慢性病数据的关联分析。
frameworks: [Health, nutrition, analyzer, AAS Core, Agentic]
---

# Nutrition Analyzer

分析营养数据、识别营养模式、评估营养状况，并提供个性化营养建议。支持与运动、睡眠、慢性病数据的关联分析。

## Category & Classification
- **Domain**: Health
- **Risk Profile**: `critical`
- **Source**: community
- **Triggers**: `nutrition`, `analyzer`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with nutrition analyzer tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/nutrition-analyzer`
- **Antigravity / OpenAI Codex**: `.agents/skills/nutrition-analyzer/SKILL.md`
- **Cursor**: `.cursor/rules/nutrition-analyzer.mdc`


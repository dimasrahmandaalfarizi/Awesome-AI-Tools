---
name: Emergency Card
description: 生成紧急情况下快速访问的医疗信息摘要卡片。当用户需要旅行、就诊准备、紧急情况或询问"紧急信息"、"医疗卡片"、"急救信息"时使用此技能。提取关键信息（过敏、用药、急症、植入物），支持多格式输出（JSON、文本、二维码），用于急救或快速就医。
frameworks: [Health, emergency, card, AAS Core, Agentic]
---

# Emergency Card

生成紧急情况下快速访问的医疗信息摘要卡片。当用户需要旅行、就诊准备、紧急情况或询问"紧急信息"、"医疗卡片"、"急救信息"时使用此技能。提取关键信息（过敏、用药、急症、植入物），支持多格式输出（JSON、文本、二维码），用于急救或快速就医。

## Category & Classification
- **Domain**: Health
- **Risk Profile**: `critical`
- **Source**: community
- **Triggers**: `emergency`, `card`, `json`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with emergency card tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/emergency-card`
- **Antigravity / OpenAI Codex**: `.agents/skills/emergency-card/SKILL.md`
- **Cursor**: `.cursor/rules/emergency-card.mdc`


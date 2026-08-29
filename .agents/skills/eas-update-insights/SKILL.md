---
name: Eas Update Insights
description: Check the health of published EAS Updates: crash rates, install/launch counts, unique users, payload size, and the split between embedded and OTA users per channel. Use when the user asks how an update is performing, whether a rollout is healthy, how many users are on the embedded...
frameworks: [Uncategorized, eas, update, insights, AAS Core, Agentic]
---

# Eas Update Insights

Check the health of published EAS Updates: crash rates, install/launch counts, unique users, payload size, and the split between embedded and OTA users per channel. Use when the user asks how an update is performing, whether a rollout is healthy, how many users are on the embedded...

## Category & Classification
- **Domain**: Uncategorized
- **Risk Profile**: `critical`
- **Source**: https://github.com/expo/skills/tree/main/plugins/expo/skills/eas-update-insights
- **Triggers**: `eas`, `update`, `insights`, `check`, `health`, `published`, `updates`, `crash`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with eas update insights tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/eas-update-insights`
- **Antigravity / OpenAI Codex**: `.agents/skills/eas-update-insights/SKILL.md`
- **Cursor**: `.cursor/rules/eas-update-insights.mdc`


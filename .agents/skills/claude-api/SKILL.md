---
name: Claude Api
description: Build apps with the Claude API or Anthropic SDK. TRIGGER when: code imports `anthropic`/`@anthropic-ai/sdk`/`claude_agent_sdk`, or user asks to use Claude API, Anthropic SDKs, or Agent SDK. DO NOT TRIGGER when: code imports `openai`/other AI SDK, general programming, or ML/data-science tasks.
frameworks: [Ai-ml, claude, api, AAS Core, Agentic]
---

# Claude Api

Build apps with the Claude API or Anthropic SDK. TRIGGER when: code imports `anthropic`/`@anthropic-ai/sdk`/`claude_agent_sdk`, or user asks to use Claude API, Anthropic SDKs, or Agent SDK. DO NOT TRIGGER when: code imports `openai`/other AI SDK, general programming, or ML/data-science tasks.

## Category & Classification
- **Domain**: Ai-ml
- **Risk Profile**: `critical`
- **Source**: https://github.com/anthropics/skills
- **Triggers**: `claude`, `api`, `apps`, `anthropic`, `sdk`, `trigger`, `code`, `imports`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with claude api tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/claude-api`
- **Antigravity / OpenAI Codex**: `.agents/skills/claude-api/SKILL.md`
- **Cursor**: `.cursor/rules/claude-api.mdc`


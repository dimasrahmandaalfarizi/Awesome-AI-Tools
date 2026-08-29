---
name: Api Analyzer
description: Validates whether an API request is correct based on provided inputs (method, URL, headers, body, auth, query params). Use this skill whenever a user wants to check, validate, debug, or verify an API call — including when they paste a curl command, show endpoint details, ask "is this...
frameworks: [Backend, api, analyzer, AAS Core, Agentic]
---

# Api Analyzer

Validates whether an API request is correct based on provided inputs (method, URL, headers, body, auth, query params). Use this skill whenever a user wants to check, validate, debug, or verify an API call — including when they paste a curl command, show endpoint details, ask "is this...

## Category & Classification
- **Domain**: Backend
- **Risk Profile**: `none`
- **Source**: https://github.com/LambdaTest/agent-skills/tree/main/api-skill/api-analyzer
- **Triggers**: `api`, `analyzer`, `validates`, `whether`, `request`, `correct`, `provided`, `inputs`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with api analyzer tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/api-analyzer`
- **Antigravity / OpenAI Codex**: `.agents/skills/api-analyzer/SKILL.md`
- **Cursor**: `.cursor/rules/api-analyzer.mdc`


---
name: Mock Hunter
description: Audit a live web page in five phases (catalog, click, trace, classify, report) to identify mock data, hardcoded values, LLM-generated metrics, and broken endpoints. Outputs a markdown report with REAL/MOCK/LLM/HARDCODED/BROKEN/UNKNOWN verdicts per visible value.
frameworks: [Testing, testing, qa, playwright, mock-detection, AAS Core, Agentic]
---

# Mock Hunter

Audit a live web page in five phases (catalog, click, trace, classify, report) to identify mock data, hardcoded values, LLM-generated metrics, and broken endpoints. Outputs a markdown report with REAL/MOCK/LLM/HARDCODED/BROKEN/UNKNOWN verdicts per visible value.

## Category & Classification
- **Domain**: Testing
- **Risk Profile**: `critical`
- **Source**: community
- **Triggers**: `testing`, `qa`, `playwright`, `mock-detection`, `web-audit`, `ai-testing`, `vibe-coding`, `claude-code`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with mock hunter tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/mock-hunter`
- **Antigravity / OpenAI Codex**: `.agents/skills/mock-hunter/SKILL.md`
- **Cursor**: `.cursor/rules/mock-hunter.mdc`


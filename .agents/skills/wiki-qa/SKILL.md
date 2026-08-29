---
name: Wiki Qa
description: Answer repository questions grounded entirely in source code evidence. Use when user asks a question about the codebase, user wants to understand a specific file, function, or component, or user asks "how does X work" or "where is Y defined".
frameworks: [Content, wiki, qa, AAS Core, Agentic]
---

# Wiki Qa

Answer repository questions grounded entirely in source code evidence. Use when user asks a question about the codebase, user wants to understand a specific file, function, or component, or user asks "how does X work" or "where is Y defined".

## Category & Classification
- **Domain**: Content
- **Risk Profile**: `safe`
- **Source**: community
- **Triggers**: `wiki`, `qa`, `answer`, `repository`, `questions`, `grounded`, `entirely`, `source`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with wiki qa tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/wiki-qa`
- **Antigravity / OpenAI Codex**: `.agents/skills/wiki-qa/SKILL.md`
- **Cursor**: `.cursor/rules/wiki-qa.mdc`


---
name: Ask Copilot
description: Use GitHub Copilot CLI in non-interactive mode to ask questions, review code, or generate snippets without manual interaction.
frameworks: [Development, copilot, github, cli, review, AAS Core, Agentic]
---

# Ask Copilot

Use GitHub Copilot CLI in non-interactive mode to ask questions, review code, or generate snippets without manual interaction.

## Category & Classification
- **Domain**: Development
- **Risk Profile**: `critical`
- **Source**: self
- **Triggers**: `copilot`, `github`, `cli`, `review`, `prompt`, `ask`, `non`, `interactive`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with ask copilot tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/ask-copilot`
- **Antigravity / OpenAI Codex**: `.agents/skills/ask-copilot/SKILL.md`
- **Cursor**: `.cursor/rules/ask-copilot.mdc`


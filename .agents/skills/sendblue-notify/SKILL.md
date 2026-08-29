---
name: Sendblue Notify
description: Text the user's phone when a long-running task, agent turn, or scheduled job finishes — via @sendblue/cli for outbound, optionally wired to a Claude Code Stop hook for automatic fire.
frameworks: [Automation, sendblue, imessage, sms, notifications, AAS Core, Agentic]
---

# Sendblue Notify

Text the user's phone when a long-running task, agent turn, or scheduled job finishes — via @sendblue/cli for outbound, optionally wired to a Claude Code Stop hook for automatic fire.

## Category & Classification
- **Domain**: Automation
- **Risk Profile**: `critical`
- **Source**: community
- **Triggers**: `sendblue`, `imessage`, `sms`, `notifications`, `hooks`, `claude-code`, `automation`, `notify`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with sendblue notify tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/sendblue-notify`
- **Antigravity / OpenAI Codex**: `.agents/skills/sendblue-notify/SKILL.md`
- **Cursor**: `.cursor/rules/sendblue-notify.mdc`


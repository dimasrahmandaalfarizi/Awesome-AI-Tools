---
name: Gh Review Requests
description: Fetch unread GitHub notifications for open PRs where review is requested from a specified team or opened by a team member. Use when asked to "find PRs I need to review", "show my review requests", "what needs my review", "fetch GitHub review requests", or "check team review queue".
frameworks: [Workflow, gh, requests, AAS Core, Agentic]
---

# Gh Review Requests

Fetch unread GitHub notifications for open PRs where review is requested from a specified team or opened by a team member. Use when asked to "find PRs I need to review", "show my review requests", "what needs my review", "fetch GitHub review requests", or "check team review queue".

## Category & Classification
- **Domain**: Workflow
- **Risk Profile**: `safe`
- **Source**: community
- **Triggers**: `gh`, `requests`, `review`, `fetch`, `unread`, `github`, `notifications`, `open`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with gh review requests tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/gh-review-requests`
- **Antigravity / OpenAI Codex**: `.agents/skills/gh-review-requests/SKILL.md`
- **Cursor**: `.cursor/rules/gh-review-requests.mdc`


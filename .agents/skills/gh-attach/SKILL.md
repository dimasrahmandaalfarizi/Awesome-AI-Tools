---
name: Gh Attach
description: Upload and download GitHub user-attachments (screenshots, PDFs, zips, videos) from the terminal; use when asked to attach or embed a file in a PR, issue, or comment, or download an attachment URL.
frameworks: [Developer-tools, github, attachments, screenshots, gh-extension, AAS Core, Agentic]
---

# Gh Attach

Upload and download GitHub user-attachments (screenshots, PDFs, zips, videos) from the terminal; use when asked to attach or embed a file in a PR, issue, or comment, or download an attachment URL.

## Category & Classification
- **Domain**: Developer-tools
- **Risk Profile**: `critical`
- **Source**: community
- **Triggers**: `github`, `attachments`, `screenshots`, `gh-extension`, `cli`, `gh`, `attach`, `upload`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with gh attach tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/gh-attach`
- **Antigravity / OpenAI Codex**: `.agents/skills/gh-attach/SKILL.md`
- **Cursor**: `.cursor/rules/gh-attach.mdc`


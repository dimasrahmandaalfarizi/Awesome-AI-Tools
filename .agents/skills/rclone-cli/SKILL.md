---
name: Rclone Cli
description: Rclone command-line cloud storage manager reference and usage guide. Use this skill whenever the user mentions rclone, or any task involving terminal-based cloud file operations such as upload, download, sync, copy, move, mount, or remote management. Triggers on S3-compatible storage,...
frameworks: [Cloud, rclone, cli, AAS Core, Agentic]
---

# Rclone Cli

Rclone command-line cloud storage manager reference and usage guide. Use this skill whenever the user mentions rclone, or any task involving terminal-based cloud file operations such as upload, download, sync, copy, move, mount, or remote management. Triggers on S3-compatible storage,...

## Category & Classification
- **Domain**: Cloud
- **Risk Profile**: `critical`
- **Source**: https://github.com/chaunsin/agent-skills/tree/master/skills/rclone-cli
- **Triggers**: `rclone`, `cli`, `command`, `line`, `cloud`, `storage`, `manager`, `reference`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with rclone cli tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/rclone-cli`
- **Antigravity / OpenAI Codex**: `.agents/skills/rclone-cli/SKILL.md`
- **Cursor**: `.cursor/rules/rclone-cli.mdc`


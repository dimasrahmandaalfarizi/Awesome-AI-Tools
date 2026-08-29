---
name: Devcontainer Setup
description: Creates devcontainers with Claude Code, language-specific tooling (Python/Node/Rust/Go), and persistent volumes. Use when adding devcontainer support to a project, setting up isolated development environments, or configuring sandboxed Claude Code workspaces.
frameworks: [Development, devcontainer, setup, AAS Core, Agentic]
---

# Devcontainer Setup

Creates devcontainers with Claude Code, language-specific tooling (Python/Node/Rust/Go), and persistent volumes. Use when adding devcontainer support to a project, setting up isolated development environments, or configuring sandboxed Claude Code workspaces.

## Category & Classification
- **Domain**: Development
- **Risk Profile**: `safe`
- **Source**: vibeship-spawner-skills (Apache 2.0)
- **Triggers**: `devcontainer`, `setup`, `creates`, `devcontainers`, `claude`, `code`, `language`, `specific`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with devcontainer setup tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/devcontainer-setup`
- **Antigravity / OpenAI Codex**: `.agents/skills/devcontainer-setup/SKILL.md`
- **Cursor**: `.cursor/rules/devcontainer-setup.mdc`


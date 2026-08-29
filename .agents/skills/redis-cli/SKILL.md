---
name: Redis Cli
description: Redis command-line interface (redis-cli) reference and usage guide. Use this skill whenever the user mentions redis-cli, Redis CLI, or any task involving querying, inspecting, debugging, or managing Redis from the command line. Triggers on key/value reads and writes, SCAN or keyspace...
frameworks: [Uncategorized, redis, cli, AAS Core, Agentic]
---

# Redis Cli

Redis command-line interface (redis-cli) reference and usage guide. Use this skill whenever the user mentions redis-cli, Redis CLI, or any task involving querying, inspecting, debugging, or managing Redis from the command line. Triggers on key/value reads and writes, SCAN or keyspace...

## Category & Classification
- **Domain**: Uncategorized
- **Risk Profile**: `critical`
- **Source**: https://github.com/chaunsin/agent-skills/tree/master/skills/redis-cli
- **Triggers**: `redis`, `cli`, `command`, `line`, `interface`, `reference`, `usage`, `skill`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with redis cli tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/redis-cli`
- **Antigravity / OpenAI Codex**: `.agents/skills/redis-cli/SKILL.md`
- **Cursor**: `.cursor/rules/redis-cli.mdc`


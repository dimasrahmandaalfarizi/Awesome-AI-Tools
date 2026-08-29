---
name: MCP Server Patterns
description: Production MCP (Model Context Protocol) server engineering: tool definition, Zod schema validation, stdio/SSE transports, and error recovery.
frameworks: [Claude Code, Antigravity, Codex, MCP]
---

# MCP Server Patterns

Production MCP (Model Context Protocol) server engineering: tool definition, Zod schema validation, stdio/SSE transports, and error recovery.

## Use Case
Building custom MCP tools for Claude Code, Antigravity, and OpenAI Codex.

## Supported Platforms
- Claude Code
- Antigravity
- Codex

## Core Engineering Rules
1. Apply the **MCP Server Patterns** pattern systematically before making code changes.
2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).
3. Prevent context pollution and maintain strict verification standards.

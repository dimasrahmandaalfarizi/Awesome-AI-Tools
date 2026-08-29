---
name: Security Scan
description: AgentShield security audit: scan for prompt injections, secret leaks, vulnerable dependencies, and insecure MCP configs.
frameworks: [Claude Code, Codex, Antigravity, Cursor]
---

# Security Scan

AgentShield security audit: scan for prompt injections, secret leaks, vulnerable dependencies, and insecure MCP configs.

## Use Case
Pre-deployment checks and PR reviews to prevent malicious injections or leaked keys.

## Supported Platforms
- Claude Code
- Codex
- Antigravity
- Cursor

## Core Engineering Rules
1. Apply the **Security Scan** pattern systematically before making code changes.
2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).
3. Prevent context pollution and maintain strict verification standards.

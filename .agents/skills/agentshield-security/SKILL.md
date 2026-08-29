---
name: AgentShield Security
description: AgentShield security scanner: protects agent configurations against prompt injection, hook tampering, and leaked credentials.
frameworks: [Claude Code, Codex, Antigravity, Security]
---

# AgentShield Security

AgentShield security scanner: protects agent configurations against prompt injection, hook tampering, and leaked credentials.

## Use Case
Pre-flight security audits for AI agent configurations.

## Supported Platforms
- Claude Code
- Codex
- Antigravity

## Core Engineering Rules
1. Apply the **AgentShield Security** pattern systematically before making code changes.
2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).
3. Prevent context pollution and maintain strict verification standards.

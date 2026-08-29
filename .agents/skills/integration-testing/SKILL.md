---
name: Integration Testing
description: Integration testing using Testcontainers for real PostgreSQL, Redis, and Kafka instances during automated test runs.
frameworks: [Claude Code, Codex, Cursor, Antigravity]
---

# Integration Testing

Integration testing using Testcontainers for real PostgreSQL, Redis, and Kafka instances during automated test runs.

## Use Case
Testing real service interactions without fragile in-memory mocks.

## Supported Platforms
- Claude Code
- Codex
- Cursor
- Antigravity
- Zed
- Copilot

## Core Engineering Rules
1. Apply the **Integration Testing** pattern systematically before making code changes.
2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).
3. Prevent context pollution and maintain strict verification standards.

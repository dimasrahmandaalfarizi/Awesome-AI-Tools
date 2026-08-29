---
name: Canary Watch
description: Automated canary deployment verification: monitors error rate spikes, latency changes, and initiates rollbacks.
frameworks: [Claude Code, Codex, Antigravity, Canary]
---

# Canary Watch

Automated canary deployment verification: monitors error rate spikes, latency changes, and initiates rollbacks.

## Use Case
Zero-downtime production releases with automated blast-radius containment.

## Supported Platforms
- Claude Code
- Codex
- Antigravity

## Core Engineering Rules
1. Apply the **Canary Watch** pattern systematically before making code changes.
2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).
3. Prevent context pollution and maintain strict verification standards.

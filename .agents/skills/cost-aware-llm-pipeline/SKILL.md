---
name: Cost-Aware LLM Pipeline
description: Multi-tier LLM routing: dispatches simple queries to light models (Flash/Haiku) and complex reasoning to Pro/Opus.
frameworks: [Claude Code, Codex, Cursor, Antigravity]
---

# Cost-Aware LLM Pipeline

Multi-tier LLM routing: dispatches simple queries to light models (Flash/Haiku) and complex reasoning to Pro/Opus.

## Use Case
Cutting production AI costs by 70% while maintaining high output quality.

## Supported Platforms
- Claude Code
- Codex
- Cursor
- Antigravity
- Copilot

## Core Engineering Rules
1. Apply the **Cost-Aware LLM Pipeline** pattern systematically before making code changes.
2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).
3. Prevent context pollution and maintain strict verification standards.

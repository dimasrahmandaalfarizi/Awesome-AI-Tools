# Universal AI Agent Guidelines, Skills & Personas Suite

This repository is equipped with **2582 AI Skills**, **68 AI Subagents**, and **4 Composite Workflows**.

## Multi-Agent Workflows:
- `/review`: **Multi-Agent Code & Security Review** — Orchestrates a 2-stage fresh-context review: first audits security vulnerabilities with AgentShield, then verifies code logic, race conditions, and standards.
- `/tdd`: **Autonomous TDD Cycle** — Strict Red-Green-Refactor cycle: writes failing unit tests first, implements the minimal passing code, and safely refactors with test coverage protection.
- `/compact`: **Context Compaction & Token Garbage Collection** — Summarizes active conversation history, clears redundant tokens, and extracts key codebase instincts to prevent context degradation.
- `/council`: **Multi-Model Council Deliberation** — Evaluates difficult architectural decisions across multiple reasoning perspectives before writing implementation code.

## Triggering Skills:
- **Claude Code CLI / Continue**: Type `/<command>` (e.g. `/tdd`, `/review`, `/tdd-workflow`)
- **Cursor IDE**: Mention `@<command>` in Chat
- **Antigravity / Codex**: Auto-loaded from `.agents/skills/` and `.agents/subagents/`

## Continuous Learning:
Memory & rules are stored in `instincts.md`. Add new rules via `npx awesome-ai-tools learn "<rule>"`.

---
name: Pre Ship Gate
description: A ship gate that runs before any production deploy: checks the silent failure modes that make a deploy 'succeed' while prod stays broken, then verifies the live revision instead of trusting deploy output.
frameworks: [Quality, deployment, quality-gate, verification, ci-cd, AAS Core, Agentic]
---

# Pre Ship Gate

A ship gate that runs before any production deploy: checks the silent failure modes that make a deploy 'succeed' while prod stays broken, then verifies the live revision instead of trusting deploy output.

## Category & Classification
- **Domain**: Quality
- **Risk Profile**: `safe`
- **Source**: community
- **Triggers**: `deployment`, `quality-gate`, `verification`, `ci-cd`, `production`, `pre`, `ship`, `gate`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with pre ship gate tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/pre-ship-gate`
- **Antigravity / OpenAI Codex**: `.agents/skills/pre-ship-gate/SKILL.md`
- **Cursor**: `.cursor/rules/pre-ship-gate.mdc`


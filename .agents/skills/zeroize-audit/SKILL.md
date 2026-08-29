---
name: Zeroize Audit
description: Detects missing zeroization of sensitive data in source code and identifies zeroization removed by compiler optimizations, with assembly-level analysis, and control-flow verification. Use for auditing C/C++/Rust code handling secrets, keys, passwords, or other sensitive data.
frameworks: [Security, zeroize, audit, AAS Core, Agentic]
---

# Zeroize Audit

Detects missing zeroization of sensitive data in source code and identifies zeroization removed by compiler optimizations, with assembly-level analysis, and control-flow verification. Use for auditing C/C++/Rust code handling secrets, keys, passwords, or other sensitive data.

## Category & Classification
- **Domain**: Security
- **Risk Profile**: `offensive`
- **Source**: community
- **Triggers**: `zeroize`, `audit`, `detects`, `missing`, `zeroization`, `sensitive`, `data`, `source`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with zeroize audit tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/zeroize-audit`
- **Antigravity / OpenAI Codex**: `.agents/skills/zeroize-audit/SKILL.md`
- **Cursor**: `.cursor/rules/zeroize-audit.mdc`


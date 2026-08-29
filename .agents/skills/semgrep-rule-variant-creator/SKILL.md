---
name: Semgrep Rule Variant Creator
description: Creates language variants of existing Semgrep rules. Use when porting a Semgrep rule to specified target languages. Takes an existing rule and target languages as input, produces independent rule+test directories for each language.
frameworks: [Security, semgrep, rule, variant, creator, AAS Core, Agentic]
---

# Semgrep Rule Variant Creator

Creates language variants of existing Semgrep rules. Use when porting a Semgrep rule to specified target languages. Takes an existing rule and target languages as input, produces independent rule+test directories for each language.

## Category & Classification
- **Domain**: Security
- **Risk Profile**: `critical`
- **Source**: community
- **Triggers**: `semgrep`, `rule`, `variant`, `creator`, `creates`, `language`, `variants`, `existing`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with semgrep rule variant creator tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/semgrep-rule-variant-creator`
- **Antigravity / OpenAI Codex**: `.agents/skills/semgrep-rule-variant-creator/SKILL.md`
- **Cursor**: `.cursor/rules/semgrep-rule-variant-creator.mdc`


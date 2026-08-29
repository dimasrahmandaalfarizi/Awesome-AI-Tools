---
name: Test Fixing
description: Systematically identify and fix all failing tests using smart grouping strategies. Use when explicitly asks to fix tests ("fix these tests", "make tests pass"), reports test failures ("tests are failing", "test suite is broken"), or completes implementation and wants tests passing.
frameworks: [Development-and-testing, fixing, AAS Core, Agentic]
---

# Test Fixing

Systematically identify and fix all failing tests using smart grouping strategies. Use when explicitly asks to fix tests ("fix these tests", "make tests pass"), reports test failures ("tests are failing", "test suite is broken"), or completes implementation and wants tests passing.

## Category & Classification
- **Domain**: Development-and-testing
- **Risk Profile**: `safe`
- **Source**: community
- **Triggers**: `fixing`, `test`, `systematically`, `identify`, `fix`, `all`, `failing`, `tests`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with test fixing tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/test-fixing`
- **Antigravity / OpenAI Codex**: `.agents/skills/test-fixing/SKILL.md`
- **Cursor**: `.cursor/rules/test-fixing.mdc`


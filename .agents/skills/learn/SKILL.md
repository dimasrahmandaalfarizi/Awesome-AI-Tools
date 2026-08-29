---
name: Learn
description: Help a user learn a topic through adaptive tutoring, lesson planning, practice, retrieval checks, explanations, study guides, or exercises. Use when the user asks to learn, understand, practice, drill, review, study, or be tutored on something.
frameworks: [Education, dair-academy, ai, workflow, AAS Core, Agentic]
---

# Learn

Help a user learn a topic through adaptive tutoring, lesson planning, practice, retrieval checks, explanations, study guides, or exercises. Use when the user asks to learn, understand, practice, drill, review, study, or be tutored on something.

## Category & Classification
- **Domain**: Education
- **Risk Profile**: `safe`
- **Source**: official
- **Triggers**: `dair-academy`, `ai`, `workflow`, `learn`, `user`, `topic`, `through`, `adaptive`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with learn tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/learn`
- **Antigravity / OpenAI Codex**: `.agents/skills/learn/SKILL.md`
- **Cursor**: `.cursor/rules/learn.mdc`


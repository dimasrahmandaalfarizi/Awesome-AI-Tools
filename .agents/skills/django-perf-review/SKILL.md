---
name: Django Perf Review
description: Django performance code review. Use when asked to "review Django performance", "find N+1 queries", "optimize Django", "check queryset performance", "database performance", "Django ORM issues", or audit Django code for performance problems.
frameworks: [Backend, django, perf, AAS Core, Agentic]
---

# Django Perf Review

Django performance code review. Use when asked to "review Django performance", "find N+1 queries", "optimize Django", "check queryset performance", "database performance", "Django ORM issues", or audit Django code for performance problems.

## Category & Classification
- **Domain**: Backend
- **Risk Profile**: `critical`
- **Source**: community
- **Triggers**: `django`, `perf`, `review`, `performance`, `code`, `asked`, `find`, `queries`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with django perf review tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/django-perf-review`
- **Antigravity / OpenAI Codex**: `.agents/skills/django-perf-review/SKILL.md`
- **Cursor**: `.cursor/rules/django-perf-review.mdc`


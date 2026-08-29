---
name: TDD Expert
description: Forces the agent to strictly follow Test-Driven Development (TDD) by writing tests before implementation.
frameworks: [Cursor, Copilot, Claude Code]
---

When writing new features, ALWAYS follow Test-Driven Development (TDD):
1. Ask me to clarify requirements if ambiguous.
2. Write the failing tests FIRST.
3. Wait for me to run the tests and confirm they fail.
4. Write the minimum code necessary to make the tests pass.
5. Refactor the code while keeping tests green.

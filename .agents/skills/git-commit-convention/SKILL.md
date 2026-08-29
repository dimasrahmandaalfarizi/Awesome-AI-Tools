---
name: Git Commit Convention
description: Forces the agent to write Conventional Commits.
frameworks: [Cursor, Copilot, Cline]
---

Always generate commit messages using the Conventional Commits specification:
- Format: <type>(<scope>): <subject>
- Types: feat, fix, docs, style, refactor, perf, test, chore.
- Scope is optional but recommended.
- Subject must be imperative, present tense (e.g., 'add feature' not 'added feature').
- Do not capitalize the first letter of the subject.
- Do not end the subject with a period.

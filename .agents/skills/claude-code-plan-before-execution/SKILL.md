---
name: Claude Code: Plan Before Execution
description: Forces Claude Code to generate and agree on a plan.md before making any code changes.
frameworks: [Claude Code]
---

When given a complex task:
1. Do NOT write any implementation code immediately.
2. Analyze the requirements and generate a `plan.md` file outlining the architecture, file changes, and edge cases.
3. Ask the user for explicit approval on the plan.
4. Only begin execution after the user approves.

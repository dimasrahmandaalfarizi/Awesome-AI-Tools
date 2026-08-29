---
name: Subagent Task Delegation
description: Breaks complex work into independent subagent tasks with strict compliance reviews.
frameworks: [Antigravity, Claude Code, Cursor]
---

When tackling a complex feature:
1. Break the work down into bite-sized tasks (2-5 minutes each).
2. Dispatch a separate context or subagent for each task.
3. Perform a two-stage review on each task's output: first check for spec compliance, then check for code quality.
4. Do not proceed to the next task until the current one passes review.

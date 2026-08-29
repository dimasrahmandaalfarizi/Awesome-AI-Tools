---
name: Autonomous Agent: Error Recovery
description: Guides autonomous agents (Devin/AutoGPT) on how to handle terminal errors or build failures.
frameworks: [Devin, AutoGPT, Antigravity]
---

If a command or build fails:
1. Do not panic or ask the user immediately.
2. Analyze the error output completely.
3. Check the documentation or source code for the failing component.
4. Propose a hypothesis for the failure.
5. Attempt a fix and re-run the command up to 3 times before escalating to the user.

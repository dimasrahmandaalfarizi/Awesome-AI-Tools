---
name: Claude Code: Context Compaction
description: A workflow for managing Claude Code's context window during long sessions.
frameworks: [Claude Code]
---

When a session becomes long or complex:
1. Pause and run `/compact` to summarize the current state and discard irrelevant history.
2. Use `/clear` if moving to a completely unrelated feature.
3. Always start new major features by running `/init` to refresh codebase understanding and prevent hallucinated dependencies.

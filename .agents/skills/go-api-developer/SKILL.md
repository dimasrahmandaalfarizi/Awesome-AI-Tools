---
name: Go API Developer (Gin/Fiber)
description: Guides the agent to write idiomatic, high-performance Go web servers.
frameworks: [Cursor, Claude Code]
---

When writing Go backend code:
- Adhere to effective Go guidelines (e.g., return early, handle errors explicitly without nesting).
- Use channels and goroutines responsibly to avoid memory leaks.
- Prefer the standard library `net/http` or lightweight frameworks like Fiber/Gin.
- Never ignore errors with `_` unless explicitly documented why it's safe.
- Use table-driven tests for comprehensive unit testing.

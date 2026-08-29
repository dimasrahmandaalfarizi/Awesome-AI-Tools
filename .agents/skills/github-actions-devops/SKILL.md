---
name: GitHub Actions DevOps
description: Instructs the agent to write secure and efficient GitHub Actions YAML workflows.
frameworks: [Copilot, Claude Code]
---

When generating GitHub Actions workflows:
- Pin all actions to specific commit SHAs instead of mutable tags (e.g., v2).
- Always use least-privilege for `permissions` (e.g., `contents: read`).
- Never log secrets or credentials.
- Use caching strategies (`actions/cache`) to speed up build and dependency installation times.
- Run tests on multiple OS matrices only when explicitly required.

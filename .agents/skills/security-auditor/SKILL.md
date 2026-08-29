---
name: Security Auditor
description: Instructs the agent to scan code for common vulnerabilities (OWASP Top 10) before committing.
frameworks: [Copilot, Claude Code, GitHub Actions]
---

Before proposing any code changes, perform a security audit:
1. Check for SQL Injection risks in database queries.
2. Ensure all user inputs are sanitized and escaped (XSS prevention).
3. Verify that no hardcoded secrets or API keys are included.
4. Check for proper authorization checks on protected routes.
5. If any vulnerabilities are found, explain the risk and provide a secure alternative.

---
name: AI Agent Prompt Injection & Security Hardening
description: Defensive security patterns to protect AI agents, RAG systems, and tool-calling models against indirect prompt injection and jailbreaks.
frameworks: [Security, LLM, Python, TypeScript]
---

# AI Agent Security Protocol
1. Treat all user input and retrieved context as untrusted.
2. Isolate agent tool execution in microVM sandboxes.
3. Validate and sanitize tool-call arguments.
4. Enforce strict output schemas.

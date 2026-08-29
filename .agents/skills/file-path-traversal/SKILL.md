---
name: File Path Traversal
description: Identify and exploit file path traversal (directory traversal) vulnerabilities that allow attackers to read arbitrary files on the server, potentially including sensitive configuration files, credentials, and source code.
frameworks: [Security, file, path, traversal, AAS Core, Agentic]
---

# File Path Traversal

Identify and exploit file path traversal (directory traversal) vulnerabilities that allow attackers to read arbitrary files on the server, potentially including sensitive configuration files, credentials, and source code.

## Category & Classification
- **Domain**: Security
- **Risk Profile**: `offensive`
- **Source**: community
- **Triggers**: `file`, `path`, `traversal`, `identify`, `exploit`, `directory`, `vulnerabilities`, `allow`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with file path traversal tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/file-path-traversal`
- **Antigravity / OpenAI Codex**: `.agents/skills/file-path-traversal/SKILL.md`
- **Cursor**: `.cursor/rules/file-path-traversal.mdc`


---
name: Fsi Compliance Checker
description: Maps code, architecture, and infrastructure changes to specific control IDs in PCI-DSS v4.0 and MAS TRM (Singapore financial regulator), producing an audit-traceable findings report with per-control remediation.
frameworks: [Security, compliance, pci-dss, mas-trm, fintech, AAS Core, Agentic]
---

# Fsi Compliance Checker

Maps code, architecture, and infrastructure changes to specific control IDs in PCI-DSS v4.0 and MAS TRM (Singapore financial regulator), producing an audit-traceable findings report with per-control remediation.

## Category & Classification
- **Domain**: Security
- **Risk Profile**: `safe`
- **Source**: community
- **Triggers**: `compliance`, `pci-dss`, `mas-trm`, `fintech`, `banking`, `security-review`, `audit`, `financial-services`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with fsi compliance checker tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/fsi-compliance-checker`
- **Antigravity / OpenAI Codex**: `.agents/skills/fsi-compliance-checker/SKILL.md`
- **Cursor**: `.cursor/rules/fsi-compliance-checker.mdc`


---
name: Uniprot Database
description: Direct REST API access to UniProt. Protein searches, FASTA retrieval, ID mapping, Swiss-Prot/TrEMBL. For Python workflows with multiple databases, prefer bioservices (unified interface to 40+ services). Use this for direct HTTP/REST work or UniProt-specific control.
frameworks: [Backend, uniprot, database, AAS Core, Agentic]
---

# Uniprot Database

Direct REST API access to UniProt. Protein searches, FASTA retrieval, ID mapping, Swiss-Prot/TrEMBL. For Python workflows with multiple databases, prefer bioservices (unified interface to 40+ services). Use this for direct HTTP/REST work or UniProt-specific control.

## Category & Classification
- **Domain**: Backend
- **Risk Profile**: `safe`
- **Source**: community
- **Triggers**: `uniprot`, `database`, `direct`, `rest`, `api`, `access`, `protein`, `searches`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with uniprot database tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/uniprot-database`
- **Antigravity / OpenAI Codex**: `.agents/skills/uniprot-database/SKILL.md`
- **Cursor**: `.cursor/rules/uniprot-database.mdc`


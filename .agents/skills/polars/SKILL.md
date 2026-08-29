---
name: Polars
description: Fast in-memory DataFrame library for datasets that fit in RAM. Use when pandas is too slow but data still fits in memory. Lazy evaluation, parallel execution, Apache Arrow backend. Best for 1-100GB datasets, ETL pipelines, faster pandas replacement. For larger-than-RAM data use dask or vaex.
frameworks: [Data-science, polars, AAS Core, Agentic]
---

# Polars

Fast in-memory DataFrame library for datasets that fit in RAM. Use when pandas is too slow but data still fits in memory. Lazy evaluation, parallel execution, Apache Arrow backend. Best for 1-100GB datasets, ETL pipelines, faster pandas replacement. For larger-than-RAM data use dask or vaex.

## Category & Classification
- **Domain**: Data-science
- **Risk Profile**: `critical`
- **Source**: community
- **Triggers**: `polars`, `fast`, `memory`, `dataframe`, `library`, `datasets`, `fit`, `ram`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with polars tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/polars`
- **Antigravity / OpenAI Codex**: `.agents/skills/polars/SKILL.md`
- **Cursor**: `.cursor/rules/polars.mdc`


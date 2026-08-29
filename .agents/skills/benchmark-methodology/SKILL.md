---
name: Benchmark Methodology
description: Statistically rigorous benchmarking: warmup cycles, memory heap inspection, latency percentiles (p50/p95/p99).
frameworks: [Claude Code, Codex, Cursor, Antigravity]
---

# Benchmark Methodology

Statistically rigorous benchmarking: warmup cycles, memory heap inspection, latency percentiles (p50/p95/p99).

## Use Case
Performance optimization comparisons and latency bottleneck diagnosis.

## Supported Platforms
- Claude Code
- Codex
- Cursor
- Antigravity

## Core Engineering Rules
1. Apply the **Benchmark Methodology** pattern systematically before making code changes.
2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).
3. Prevent context pollution and maintain strict verification standards.

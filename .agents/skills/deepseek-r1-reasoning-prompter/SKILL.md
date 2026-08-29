---
name: DeepSeek R1 Reasoning Prompter
description: Optimizes agent queries for deep reasoning models by encouraging zero-shot thinking, step verification, and mathematical rigor.
frameworks: [Cursor, Claude Code, Cline]
---

When querying DeepSeek R1 or reasoning LLMs:
1. Allow natural chain-of-thought exploration without artificial temperature manipulation (keep temp around 0.6).
2. Format complex algorithmic questions with clear constraints, expected time/space complexity, and edge cases.
3. Instruct the model to double-check boundary conditions (null, overflow, empty lists) before outputting final code blocks.
4. Avoid overly verbose meta-prompts; direct problem statements yield the best reasoning traces.

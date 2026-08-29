---
name: Chain of Thought (CoT) Master
description: Forces any LLM to explicitly write out its reasoning steps before providing an answer.
frameworks: [GPT-4, Claude 3.5 Sonnet, Gemini 1.5 Pro]
---

Before providing your final answer or code:
1. Write a `<thinking>` block.
2. Break down the problem into logical steps.
3. Identify constraints, potential pitfalls, and edge cases.
4. Evaluate alternative approaches and select the optimal one.
5. Only after closing the `</thinking>` block, provide your final implementation.

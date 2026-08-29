---
name: Python Performance Profiler
description: Instructs the agent to optimize Python code for speed and memory efficiency.
frameworks: [Cursor, Jupyter]
---

When optimizing Python code:
1. Identify bottlenecks using `cProfile` or line profilers.
2. Replace nested loops with vectorized NumPy or Pandas operations where applicable.
3. Use generators (`yield`) instead of lists for large datasets to save memory.
4. Utilize list comprehensions instead of `for.append()`.
5. Consider `multiprocessing` or `asyncio` for I/O bound tasks.

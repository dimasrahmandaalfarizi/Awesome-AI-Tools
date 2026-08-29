---
name: AI Agent Orchestrator
description: Instructions for managing multiple sub-agents in a complex workflow (routing, delegation, aggregation).
frameworks: [AutoGen, LangGraph]
---

When orchestrating multiple agents:
1. Define clear boundaries and responsibilities for each agent (e.g., Researcher, Coder, Reviewer).
2. Ensure the output of one agent is correctly formatted as the input for the next.
3. Implement a 'Supervisor' node that verifies the final aggregated output meets the original user request before presenting it.
4. Handle timeouts or infinite loops gracefully by setting a maximum step limit.

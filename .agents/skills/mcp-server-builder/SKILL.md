---
name: MCP Server Builder
description: Guidance and scaffolding rules for building high-performance Model Context Protocol (MCP) servers using TypeScript or Python.
frameworks: [Cursor, Claude Code, Roo Code]
---

When authoring an MCP (Model Context Protocol) server:
1. Use `@modelcontextprotocol/sdk` (TypeScript) or `mcp` (Python).
2. Define structured JSON Schema for every tool with explicit parameter descriptions.
3. Include resource templates (URIs) for data exposure and tools for actionable execution.
4. Ensure error handling returns informative MCP ToolError messages rather than unhandled process crashes.
5. Provide a stdio transport configuration snippet for Claude Desktop and Cline in the README.

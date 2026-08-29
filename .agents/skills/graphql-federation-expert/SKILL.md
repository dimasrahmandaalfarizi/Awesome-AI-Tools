---
name: GraphQL & Apollo Federation Architect
description: Design and build high-performance GraphQL APIs, schema stitching, Apollo Federation v2 subgraphs, and DataLoader batching.
frameworks: [GraphQL, Node.js, TypeScript, Apollo]
---

# GraphQL & Apollo Federation Architecture
1. Always use DataLoader to prevent N+1 query database bottlenecks.
2. Keep subgraphs modular by business domain.
3. Enforce strict input validation on mutations.
4. Implement depth limiting and query complexity analysis.

---
name: Solidity Smart Contract Auditor
description: Instructs the agent to prioritize gas optimization and common exploit prevention in EVM contracts.
frameworks: [Cursor, GitHub Actions]
---

When writing or reviewing Solidity code:
- Always check for reentrancy vulnerabilities and use the Checks-Effects-Interactions pattern or `ReentrancyGuard`.
- Ensure exact pragmas are used (e.g., `pragma solidity 0.8.24;`).
- Optimize gas usage by packing structs tightly and caching storage variables in memory.
- Explicitly mark variable visibility and restrict function access with `onlyOwner` or similar modifiers.
- Avoid using `tx.origin` for authorization.

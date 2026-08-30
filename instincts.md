# Project Instincts & Persistent Memory (Continuous Learning)

This file stores permanent codebase instincts, architectural invariants, and developer preferences.
AI Coding Agents (Claude Code, Cursor, Antigravity, Codex) MUST read and follow these rules in every session.

## 🏛️ Codebase & Architecture Invariants
- **Framework**: Next.js (App Router, Server Components by default, Client Components at leaves).
- **Styling**: Tailwind CSS with clean, minimal zinc/monochrome aesthetics.
- **Verification**: Always run verification builds (npm run build:lib & npm run build) before marking tasks complete.

## 🚫 Anti-Patterns (Strictly Prohibited)
- **Zero AI Slop**: Do NOT use decorative rainbow gradient overlays or meaningless glow icons.
- **Zero Raw Secrets**: Never hardcode API keys or database connection strings into source code. Always use .env.
- **Zero Premature Merges**: Never mark a task as completed without compiling and testing.

## 🧠 Learned Lessons & Decisions
- *ECC Integration*: Skills are triggered via /<command> in Claude/Continue, @<rule> in Cursor, and SKILL.md in Antigravity.
- *Subagents*: 68 specialist personas are stored in .agents/subagents/.
- *Security*: Run 'npx awesome-ai-tools scan' regularly to audit repository hygiene.
- [2026-08-21] Always use flat monochrome design and prevent AI rainbow slop

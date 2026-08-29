---
name: Enterprise Monorepo Architect with Turborepo & pnpm
description: High-speed monorepo workspace architecture with pnpm workspaces, Turborepo remote caching, internal package sharing, and boundary linting.
frameworks: [Turborepo, pnpm, TypeScript, Next.js]
---

# Turborepo & pnpm Monorepo Architecture
1. Define pipeline task dependencies and cache hash inputs inside turbo.json.
2. Share internal UI and utility packages using TypeScript path aliases and package.json exports.
3. Enable remote caching in CI pipelines to achieve instant sub-minute builds.
4. Enforce strict boundary rules between apps and internal packages.

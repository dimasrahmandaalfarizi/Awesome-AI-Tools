---
name: Next.js 16 & React 19 Architect
description: Enforces cutting-edge Next.js 16 App Router paradigms, React 19 Server Components, Server Actions, and strict async params.
frameworks: [Cursor, Claude Code, Windsurf, Cline]
---

When developing in Next.js 16 & React 19:
1. Strict Async Params: Always await `params` and `searchParams` in Page and Layout components (e.g. `const { slug } = await params;`).
2. Server-First: Default to Server Components. Only add 'use client' when using browser hooks (useState, useEffect, event listeners).
3. Data Mutation: Use React 19 Server Actions and `useActionState` / `useOptimistic` for forms instead of raw useEffect fetchers.
4. Metadata & SEO: Always export typed `Metadata` objects or `generateMetadata` functions with Open Graph and Twitter cards.

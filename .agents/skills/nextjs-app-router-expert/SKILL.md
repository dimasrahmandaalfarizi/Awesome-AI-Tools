---
name: Next.js App Router Expert
description: Strictly enforces Next.js 14+ App Router conventions and Server Components.
frameworks: [Cursor, Copilot, Cline]
---

When building Next.js applications:
1. Default to React Server Components (RSC). Only use `'use client'` when interactivity (hooks, event listeners) is strictly required.
2. Use the `app/` directory routing conventions (`page.tsx`, `layout.tsx`, `loading.tsx`).
3. Implement data fetching at the server component level using `fetch` with appropriate caching strategies.
4. Use Server Actions for form mutations instead of API routes.

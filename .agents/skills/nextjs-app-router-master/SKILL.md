---
name: Next.js App Router Master
description: Ensures the agent uses correct Next.js App Router conventions instead of legacy Pages Router patterns.
frameworks: [Cursor, Cline, Claude Code]
---

You are an expert in Next.js App Router. Follow these rules:
- Always use 'use client' for components that require interactivity (hooks, event listeners).
- Keep data fetching in Server Components where possible.
- Do NOT use 'next/router', use 'next/navigation'.
- Do NOT use 'getServerSideProps' or 'getStaticProps'. Use native async/await in Server Components.
- Use `loading.tsx` and `error.tsx` for suspense and error boundaries.

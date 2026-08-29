---
name: TanStack Query (React Query) Async State Master
description: Production async state management with TanStack Query v5, query key factories, optimistic updates, pagination, and prefetching.
frameworks: [React Query, TypeScript, React, Next.js]
---

# TanStack Query v5 Architecture
1. Centralize query keys using Query Key Factory pattern for deterministic cache invalidation.
2. Implement optimistic updates for snappy UI interactions with rollback on mutation failure.
3. Configure staleTime and gcTime appropriately to eliminate redundant network fetches.
4. Use select function to memoize and transform server response structures.

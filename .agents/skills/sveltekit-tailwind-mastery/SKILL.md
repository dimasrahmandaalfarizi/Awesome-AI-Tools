---
name: SvelteKit & Tailwind Mastery
description: Enforces idiomatic SvelteKit folder structures, reactive declarations, and Tailwind styling.
frameworks: [Cursor, Cline]
---

When writing SvelteKit code:
- Use standard `+page.svelte`, `+page.server.ts`, and `+layout.svelte` routing conventions.
- Use `$: ` reactive declarations instead of manual state synchronization.
- Keep logic inside `<script context="module">` or external TS files if it doesn't depend on component state.
- Apply Tailwind classes directly in the template; avoid `<style>` blocks unless absolutely necessary.

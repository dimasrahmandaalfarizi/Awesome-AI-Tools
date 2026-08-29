---
name: Svelte 5 Runes & Modern Reactive Architecture
description: Master Svelte 5 universal reactivity using runes ($state, $derived, $effect), snippet composition, and high-performance client rendering.
frameworks: [Svelte, TypeScript, JavaScript]
---

# Svelte 5 Runes Architecture Guide
1. Use $state for fine-grained reactive variables and $derived for computed state.
2. Keep $effect minimal and avoid using it for state synchronization.
3. Use snippets instead of slots for reusable, type-safe component templates.
4. Prefer universal reactivity in .svelte.ts files for shared store logic.

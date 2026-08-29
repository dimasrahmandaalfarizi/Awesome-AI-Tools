---
name: Vue 3 Composition API
description: Forces the agent to use Vue 3's `<script setup>` syntax and reactivity APIs exclusively.
frameworks: [Cursor, Copilot]
---

When writing Vue 3 components:
- Always use `<script setup>` syntax. Never use the legacy Options API.
- Use `ref` for primitive values and `reactive` for deeply nested objects.
- Prefer composables (functions starting with `use`) for reusable state logic instead of mixins.
- Use `defineProps` and `defineEmits` with TypeScript interfaces for strong typing.
- Optimize large lists using virtual scroll libraries.

---
name: Design System Enforcer
description: Strictly enforces existing design tokens, spacing scales, and typography defined in the project.
frameworks: [Cursor, Copilot]
---

When writing frontend code in this project:
1. NEVER use arbitrary values in Tailwind (e.g., `w-[324px]`). Always use the defined spacing scale.
2. Do not introduce new colors; use only the CSS variables defined in `globals.css` or the Tailwind config.
3. Use predefined typography classes for headings and body text.
4. If a requested component violates the design system, warn the user and suggest a compliant alternative.

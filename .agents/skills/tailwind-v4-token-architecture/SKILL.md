---
name: Tailwind CSS v4 Token Architecture
description: Enforces modern Tailwind CSS v4 CSS-first configuration using @theme directives and native CSS variables.
frameworks: [Cursor, Windsurf, Copilot]
---

When writing styling with Tailwind CSS v4:
1. Configuration is CSS-first: Define design tokens in `globals.css` using `@theme` rather than a JS config file.
2. Use CSS variables for semantic colors (`var(--background)`, `var(--primary)`).
3. Utilize modern container queries and CSS color-mix functions where appropriate.
4. Avoid legacy `@apply` chains; compose clean utility classes directly in JSX.

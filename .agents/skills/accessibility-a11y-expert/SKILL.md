---
name: Accessibility (a11y) Expert
description: Ensures all generated UI components adhere strictly to WCAG 2.1 guidelines.
frameworks: [Cursor, v0, Copilot]
---

All UI components must be accessible:
- Ensure text contrast ratios meet WCAG AA standards (4.5:1 for normal text).
- Provide `aria-label` or `aria-labelledby` for icon-only buttons.
- Support full keyboard navigation (focus states, tab order).
- Use semantic HTML tags (`<nav>`, `<main>`, `<article>`) instead of generic `<div>`s.
- Never remove focus outlines without providing an accessible custom alternative.

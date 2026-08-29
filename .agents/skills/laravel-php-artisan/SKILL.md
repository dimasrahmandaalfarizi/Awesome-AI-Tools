---
name: Laravel PHP Artisan
description: Enforces Laravel best practices, Eloquent ORM usage, and strict typing in PHP 8+.
frameworks: [Cursor, Copilot]
---

When writing Laravel code:
- Use Eloquent ORM and explicit relationships instead of raw DB queries when possible.
- Prevent N+1 query problems by eagerly loading relationships using `with()`.
- Always use Form Requests for validation instead of validating in the controller.
- Take advantage of PHP 8+ features: constructor property promotion, match expressions, and typed properties.
- Keep controllers thin and move complex business logic into Action or Service classes.

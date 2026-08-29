---
name: PostgreSQL DBA
description: Guides the agent to write highly optimized, secure, and robust PostgreSQL queries.
frameworks: [Cursor, Copilot]
---

When writing PostgreSQL queries or schema migrations:
- Always consider indexing for columns used in WHERE, JOIN, and ORDER BY clauses.
- Avoid `SELECT *`; explicitly select only the required columns.
- Use EXPLAIN ANALYZE for query optimization if asked.
- Prefer Common Table Expressions (CTEs) for complex nested queries to improve readability.
- Use proper foreign key constraints with ON DELETE actions defined.

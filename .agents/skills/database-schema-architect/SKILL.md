---
name: Database Schema Architect
description: Forces the LLM to design normalized, scalable SQL schemas.
frameworks: [Claude Code, Cursor]
---

When designing database schemas:
1. Normalize to at least 3NF (Third Normal Form) to reduce data redundancy.
2. Define clear Primary Keys and Foreign Keys with appropriate cascading actions.
3. Recommend indexes for frequently queried or joined columns.
4. Use appropriate data types (e.g., `TIMESTAMPTZ` instead of `TIMESTAMP`).
5. Provide the raw SQL DDL script and an Entity-Relationship (ER) explanation.

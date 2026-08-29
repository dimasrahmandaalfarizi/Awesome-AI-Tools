---
name: Rust Systems Programmer
description: Guides the agent to write idiomatic, safe Rust code avoiding unnecessary clones or unwraps.
frameworks: [Cursor, Claude Code]
---

When writing Rust code:
- Prioritize safe ownership and borrowing over `Clone` or `Rc`/`Arc` unless necessary.
- Do NOT use `.unwrap()` or `.expect()` in production code; handle errors properly with `Result` and the `?` operator.
- Utilize the type system to enforce state invariants.
- Write comprehensive documentation comments (`///`) and inline unit tests for every public function.

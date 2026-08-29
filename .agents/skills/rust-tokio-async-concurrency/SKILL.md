---
name: Rust Async Tokio & Actor Concurrency Expert
description: Build ultra-fast async networking and distributed systems using Rust Tokio runtime, mpsc channels, Arc/Mutex, and async-trait.
frameworks: [Rust, Tokio, Async, Backend]
---

# Rust Async Tokio Concurrency Architecture
1. Never block the Tokio executor thread with synchronous I/O or heavy CPU calculations (use spawn_blocking).
2. Communicate between tasks using Tokio mpsc or broadcast channels instead of shared mutable state.
3. Implement graceful shutdown using tokio::select! and CancellationToken.
4. Structure actor loops with message enums for isolated state ownership.

---
name: Redis Caching & Distributed Locks Master
description: Production patterns for Redis caching strategies (Cache-Aside, Write-Through), rate limiting with sliding windows, and Redlock distributed locking.
frameworks: [Redis, Node.js, Python, Go]
---

# Redis Production Best Practices
1. Use Cache-Aside pattern with explicit TTL on all cached keys.
2. Prevent cache stampedes using mutex locks or probabilistic early expiration.
3. Implement Redlock for cross-instance distributed critical sections.
4. Use Redis Streams or BullMQ for reliable background queues.

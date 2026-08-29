---
name: Go Microservices: Concurrency, Channels & gRPC
description: High-throughput Go 1.22+ backend microservices with goroutines, channels, context cancellation, and gRPC protocol buffers.
frameworks: [Go, gRPC, Microservices, Docker]
---

# Go Microservices & Concurrency Best Practices
1. Always propagate context.Context across all I/O and database operations.
2. Prevent goroutine leaks by ensuring channel receivers have exit conditions.
3. Define type-safe service contracts using Protobuf v3 with gRPC-Go.
4. Implement structured slog logging and Prometheus metrics middleware.

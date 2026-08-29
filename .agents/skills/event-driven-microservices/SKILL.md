---
name: Event-Driven Microservices with Kafka & RabbitMQ
description: Scalable distributed systems architecture using Event Sourcing, Outbox Pattern, Apache Kafka partition keys, and RabbitMQ dead-letter exchanges.
frameworks: [Kafka, RabbitMQ, Architecture, Go, Node.js]
---

# Event-Driven Microservices Architecture
1. Implement the Transactional Outbox Pattern to guarantee message delivery with database commits.
2. Choose partition keys strategically to maintain strict message ordering per entity.
3. Configure Dead Letter Queues (DLQ) with automated retry policies for poison-pill messages.
4. Version event schemas using Apache Avro or JSON Schema registries.

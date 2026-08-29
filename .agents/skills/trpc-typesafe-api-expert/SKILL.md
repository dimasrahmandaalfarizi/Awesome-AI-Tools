---
name: tRPC End-to-End Type-Safe API Architect
description: Build fully type-safe fullstack applications without code generation using tRPC v11, procedure middlewares, Zod validation, and React Query.
frameworks: [tRPC, TypeScript, Next.js, React]
---

# tRPC End-to-End Type-Safety Guidelines
1. Define modular sub-routers split by domain boundary.
2. Enforce authentication and role permissions inside reusable procedure middlewares.
3. Validate all input payloads strictly with Zod schemas.
4. Handle server errors gracefully using TRPCError with standard HTTP status codes.

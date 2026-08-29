---
name: Zod & Runtime Type-Safety Validator
description: Expert schema definition, runtime validation, nested object transforms, custom error formatters, and TypeScript type inference with Zod.
frameworks: [Zod, TypeScript, Next.js, React]
---

# Zod Schema Architecture
1. Define all API contract boundaries and environment variables with Zod.
2. Infer TypeScript types directly using z.infer<typeof Schema>.
3. Use .transform() and .refine() for business rule assertions.
4. Format user-friendly validation error messages for forms.

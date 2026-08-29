---
name: Docker & Kubernetes Architect
description: Guides the creation of minimal, secure Dockerfiles and production-ready K8s manifests.
frameworks: [Cursor, Cline, Claude Code]
---

When generating Dockerfiles or K8s manifests:
- Always use multi-stage builds to keep final image sizes minimal.
- Never run containers as root; define a non-root `USER`.
- Base images should use specific tags (e.g., `alpine:3.19`), never `latest`.
- In Kubernetes deployments, always define `resources.requests` and `resources.limits` to prevent node starvation.
- Define health checks (`livenessProbe`, `readinessProbe`) for all web services.

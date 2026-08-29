---
name: Clean Architecture Planner
description: Enforces SOLID principles and Clean Architecture structure on newly generated codebase modules.
frameworks: [Cline, Claude Code, Cursor]
---

When designing or generating new features, enforce Clean Architecture:
1. Separate concerns into standard layers: Domain (Entities), Use Cases (Interactors), Interface Adapters (Controllers/Presenters), and Frameworks/Drivers.
2. Apply SOLID principles, particularly Dependency Inversion (use interfaces/abstract classes for external services).
3. Never import database or web framework dependencies directly into the Domain layer.

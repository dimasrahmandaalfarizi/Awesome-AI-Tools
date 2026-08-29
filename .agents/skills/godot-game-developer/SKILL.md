---
name: Godot Game Developer
description: Configures the agent to write performant GDScript and structure Godot engine scenes correctly.
frameworks: [Cursor, Claude Code]
---

When writing Godot code:
- Prefer static typing in GDScript (e.g., `var health: int = 100`) for performance and autocomplete.
- Structure scenes hierarchically and favor composition over deep inheritance.
- Use Signals for decoupling components instead of direct node references where appropriate.
- Avoid heavy logic in `_process` or `_physics_process`; use timers or event-driven logic if possible.
- Preload resources (scenes, sounds) at the top of the script using `preload()` to prevent stuttering during gameplay.

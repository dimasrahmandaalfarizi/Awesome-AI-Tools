---
name: React Native Expo Expert
description: Configures the agent to build cross-platform mobile apps using modern Expo and React Native best practices.
frameworks: [Cursor, Copilot]
---

When writing React Native code:
- Always prefer Expo APIs (e.g., `expo-router`, `expo-image`) over third-party alternatives when possible.
- Use `StyleSheet.create` for styling unless a utility library like NativeWind is explicitly configured.
- Optimize lists using `FlashList` instead of `FlatList` for better performance.
- Avoid heavy synchronous operations on the JS thread to maintain 60 FPS.

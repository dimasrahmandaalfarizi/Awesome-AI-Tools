---
name: Macos Screen Recorder
description: macOS screen recorder that captures the main display PLUS system audio via ScreenCaptureKit — no BlackHole/loopback driver, no sudo, just the standard Screen Recording permission. CLI-driven; fills the headless-screen-recording-with-system-sound gap QuickTime and `screencapture -v` can't.
frameworks: [Uncategorized, macos, screen-recording, system-audio, screencapturekit, AAS Core, Agentic]
---

# Macos Screen Recorder

macOS screen recorder that captures the main display PLUS system audio via ScreenCaptureKit — no BlackHole/loopback driver, no sudo, just the standard Screen Recording permission. CLI-driven; fills the headless-screen-recording-with-system-sound gap QuickTime and `screencapture -v` can't.

## Category & Classification
- **Domain**: Uncategorized
- **Risk Profile**: `critical`
- **Source**: community
- **Triggers**: `macos`, `screen-recording`, `system-audio`, `screencapturekit`, `cli`, `swift`, `screen`, `recorder`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with macos screen recorder tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/macos-screen-recorder`
- **Antigravity / OpenAI Codex**: `.agents/skills/macos-screen-recorder/SKILL.md`
- **Cursor**: `.cursor/rules/macos-screen-recorder.mdc`


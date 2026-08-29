---
name: Terminal Wizard
description: Instructs the agent to write robust, cross-platform bash/shell scripts.
frameworks: [Antigravity, AutoGPT]
---

When writing shell scripts:
1. Always start with `set -euo pipefail` to ensure the script exits on errors or unbound variables.
2. Avoid using `cat` when input redirection (`<`) is sufficient.
3. Quote all variables to prevent word splitting.
4. Prefer `awk` or `sed` for text processing instead of complex loops.
5. Provide a fallback or error message if required dependencies are missing.

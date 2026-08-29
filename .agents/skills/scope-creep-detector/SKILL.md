---
name: Scope Creep Detector
description: Analyzes code modifications to prevent accidental feature creep beyond the original intent.
frameworks: [GitHub Copilot, Cursor]
---

When reviewing a diff or planning changes:
1. Compare the proposed code changes strictly against the original stated intent or issue description.
2. Flag any modifications, refactoring, or new features that fall outside this scope.
3. Recommend splitting out-of-scope changes into a separate PR or branch.
4. Ask for explicit user justification before proceeding with out-of-scope code.

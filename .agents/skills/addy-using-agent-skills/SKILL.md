---
name: using-agent-skills
description: Discovers and invokes agent skills. Use when starting a session or when you need to discover which skill applies to the current task. This is the meta-skill that governs how all other skills are discovered and invoked.
frameworks: [Universal, Claude Code, Cursor, Antigravity, Codex]
---

---
name: using-agent-skills
description: Discovers and invokes agent skills. Use when starting a session or when you need to discover which skill applies to the current task. This is the meta-skill that governs how all other skills are discovered and invoked.
---

# Using Agent Skills

## Overview

Agent Skills is a collection of engineering workflow skills organized by development phase. Each skill encodes a specific process that senior engineers follow. This meta-skill helps you discover and apply the right skill for your current task.

## Skill Discovery

When a task arrives, identify the development phase and apply the corresponding skill:

```
Task arrives
    â”‚
    â”œâ”€â”€ Don't know what you want yet? â”€â”€â”€â”€â”€â”€â†’ interview-me
    â”œâ”€â”€ Have a rough concept, need variants? â†’ idea-refine
    â”œâ”€â”€ New project/feature/change? â”€â”€â†’ spec-driven-development
    â”œâ”€â”€ Have a spec, need tasks? â”€â”€â”€â”€â”€â”€â†’ planning-and-task-breakdown
    â”œâ”€â”€ Implementing code? â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â†’ incremental-implementation
    â”‚   â”œâ”€â”€ UI work? â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â†’ frontend-ui-engineering
    â”‚   â”œâ”€â”€ API work? â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â†’ api-and-interface-design
    â”‚   â”œâ”€â”€ Need better context? â”€â”€â”€â”€â”€â†’ context-engineering
    â”‚   â”œâ”€â”€ Need doc-verified code? â”€â”€â”€â†’ source-driven-development
    â”‚   â””â”€â”€ Stakes high / unfamiliar code? â”€â”€â†’ doubt-driven-development
    â”œâ”€â”€ Writing/running tests? â”€â”€â”€â”€â”€â”€â”€â”€â†’ test-driven-development
    â”‚   â””â”€â”€ Browser-based? â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â†’ browser-testing-with-devtools
    â”œâ”€â”€ Something broke? â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â†’ debugging-and-error-recovery
    â”œâ”€â”€ Reviewing code? â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â†’ code-review-and-quality
    â”‚   â”œâ”€â”€ Too complex? â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â†’ code-simplification
    â”‚   â”œâ”€â”€ Security concerns? â”€â”€â”€â”€â”€â”€â”€â†’ security-and-hardening
    â”‚   â””â”€â”€ Performance concerns? â”€â”€â”€â”€â†’ performance-optimization
    â”œâ”€â”€ Committing/branching? â”€â”€â”€â”€â”€â”€â”€â”€â”€â†’ git-workflow-and-versioning
    â”œâ”€â”€ CI/CD pipeline work? â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â†’ ci-cd-and-automation
    â”œâ”€â”€ Deprecating/migrating? â”€â”€â”€â”€â”€â”€â”€â”€â†’ deprecation-and-migration
    â”œâ”€â”€ Writing docs/ADRs? â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â†’ documentation-and-adrs
    â”œâ”€â”€ Adding logs/metrics/alerts? â”€â”€â”€â†’ observability-and-instrumentation
    â””â”€â”€ Deploying/launching? â”€â”€â”€â”€â”€â”€â”€â”€â”€â†’ shipping-and-launch
```

## Core Operating Behaviors

These behaviors apply at all times, across all skills. They are non-negotiable.

### 1. Surface Assumptions

Before implementing anything non-trivial, explicitly state your assumptions:

```
ASSUMPTIONS I'M MAKING:
1. [assumption about requirements]
2. [assumption about architecture]
3. [assumption about scope]
â†’ Correct me now or I'll proceed with these.
```

Don't silently fill in ambiguous requirements. The most common failure mode is making wrong assumptions and running with them unchecked. Surface uncertainty early â€” it's cheaper than rework.

### 2. Manage Confusion Actively

When you encounter inconsistencies, conflicting requirements, or unclear specifications:

1. **STOP.** Do not proceed with a guess.
2. Name the specific confusion.
3. Present the tradeoff or ask the clarifying question.
4. Wait for resolution before continuing.

**Bad:** Silently picking one interpretation and hoping it's right.
**Good:** "I see X in the spec but Y in the existing code. Which takes precedence?"

### 3. Push Back When Warranted

You are not a yes-machine. When an approach has clear problems:

- Point out the issue directly
- Explain the concrete downside (quantify when possible â€” "this adds ~200ms latency" not "this might be slower")
- Propose an alternative
- Accept the human's decision if they override with full information

Sycophancy is a failure mode. "Of course!" followed by implementing a bad idea helps no one. Honest technical disagreement is more valuable than false agreement.

### 4. Enforce Simplicity

Your natural tendency is to overcomplicate. Actively resist it.

Before finishing any implementation, ask:
- Can this be done in fewer lines?
- Are these abstractions earning their complexity?
- Would a staff engineer look at this and say "why didn't you just..."?

If you build 1000 lines and 100 would suffice, you have failed. Prefer the boring, obvious solution. Cleverness is expensive.

### 5. Maintain Scope Discipline

Touch only what you're asked to touch.

Do NOT:
- Remove comments you don't understand
- "Clean up" code orthogonal to the task
- Refactor adjacent systems as a side effect
- Delete code that seems unused without explicit approval
- Add features not in the spec because they "seem useful"

Your job is surgical precision, not unsolicited renovation.

### 6. Verify, Don't Assume

Every skill includes a verification step. A task is not complete until verification passes. "Seems right" is never sufficient â€” there must be evidence (passing tests, build output, runtime data).

Per-skill verification is the local check. The project-wide bar that applies to *every* change, regardless of which skill is active, is the Definition of Done: tests pass, no regressions, behavior verified at runtime, docs updated. See `../../references/definition-of-done.md`. It complements each task's acceptance criteria rather than replacing them.

## Failure Modes to Avoid

These are the subtle errors that look like productivity but create problems:

1. Making wrong assumptions without checking
2. Not managing your own confusion â€” plowing ahead when lost
3. Not surfacing inconsistencies you notice
4. Not presenting tradeoffs on non-obvious decisions
5. Being sycophantic ("Of course!") to approaches with clear problems
6. Overcomplicating code and APIs
7. Modifying code or comments orthogonal to the task
8. Removing things you don't fully understand
9. Building without a spec because "it's obvious"
10. Skipping verification because "it looks right"

## Skill Rules

1. **Check for an applicable skill before starting work.** Skills encode processes that prevent common mistakes.

2. **Skills are workflows, not suggestions.** Follow the steps in order. Don't skip verification steps.

3. **Multiple skills can apply.** A feature implementation might involve `idea-refine` â†’ `spec-driven-development` â†’ `planning-and-task-breakdown` â†’ `incremental-implementation` â†’ `test-driven-development` â†’ `code-review-and-quality` â†’ `code-simplification` â†’ `shipping-and-launch` in sequence.

4. **When in doubt, start with a spec.** If the task is non-trivial and there's no spec, begin with `spec-driven-development`.

## Lifecycle Sequence

For a complete feature, the typical skill sequence is:

```
1.  interview-me                â†’ Extract what the user actually wants
2.  idea-refine                 â†’ Refine vague ideas
3.  spec-driven-development     â†’ Define what we're building
4.  planning-and-task-breakdown â†’ Break into verifiable chunks
5.  context-engineering         â†’ Load the right context
6.  source-driven-development   â†’ Verify against official docs
7.  incremental-implementation  â†’ Build slice by slice
8.  observability-and-instrumentation â†’ Instrument as you build (runs parallel with 7-9, not after)
9.  doubt-driven-development    â†’ Cross-examine non-trivial decisions in-flight
10. test-driven-development     â†’ Prove each slice works
11. code-review-and-quality     â†’ Review before merge
12. code-simplification         â†’ Reduce unnecessary complexity while preserving behavior
13. git-workflow-and-versioning â†’ Clean commit history
14. documentation-and-adrs      â†’ Document decisions
15. deprecation-and-migration   â†’ Retire old systems and move users safely when needed
16. shipping-and-launch         â†’ Deploy safely
```

Not every task needs every skill. A bug fix might only need: `debugging-and-error-recovery` â†’ `test-driven-development` â†’ `code-review-and-quality`.

## Quick Reference

| Phase | Skill | One-Line Summary |
|-------|-------|-----------------|
| Define | interview-me | Surface what the user actually wants before any plan, spec, or code exists |
| Define | idea-refine | Refine ideas through structured divergent and convergent thinking |
| Define | spec-driven-development | Requirements and acceptance criteria before code |
| Plan | planning-and-task-breakdown | Decompose into small, verifiable tasks |
| Build | incremental-implementation | Thin vertical slices, test each before expanding |
| Build | source-driven-development | Verify against official docs before implementing |
| Build | doubt-driven-development | Adversarial fresh-context review of every non-trivial decision |
| Build | context-engineering | Right context at the right time |
| Build | frontend-ui-engineering | Production-quality UI with accessibility |
| Build | api-and-interface-design | Stable interfaces with clear contracts |
| Verify | test-driven-development | Failing test first, then make it pass |
| Verify | browser-testing-with-devtools | Chrome DevTools MCP for runtime verification |
| Verify | debugging-and-error-recovery | Reproduce â†’ localize â†’ fix â†’ guard |
| Review | code-review-and-quality | Five-axis review with quality gates |
| Review | code-simplification | Preserve behavior while reducing unnecessary complexity |
| Review | security-and-hardening | OWASP prevention, input validation, least privilege |
| Review | performance-optimization | Measure first, optimize only what matters |
| Ship | git-workflow-and-versioning | Atomic commits, clean history |
| Ship | ci-cd-and-automation | Automated quality gates on every change |
| Ship | deprecation-and-migration | Remove old systems and migrate users safely |
| Ship | documentation-and-adrs | Document the why, not just the what |
| Ship | observability-and-instrumentation | Structured logs, RED metrics, traces, symptom-based alerts |
| Ship | shipping-and-launch | Pre-launch checklist, monitoring, rollback plan |


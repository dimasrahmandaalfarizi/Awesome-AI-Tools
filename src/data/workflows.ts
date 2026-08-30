export interface CompositeWorkflow {
  name: string;
  slug: string;
  command: string;
  description: string;
  steps: {
    step: number;
    subagent: string;
    action: string;
    instructions: string;
  }[];
  content: string;
}

export const COMPOSITE_WORKFLOWS: CompositeWorkflow[] = [
  {
    name: "Multi-Agent Code & Security Review",
    slug: "review",
    command: "/review",
    description: "Orchestrates a 2-stage fresh-context review: first audits security vulnerabilities with AgentShield, then verifies code logic, race conditions, and standards.",
    steps: [
      {
        step: 1,
        subagent: "security-auditor",
        action: "AgentShield Security & Dependency Audit",
        instructions: "Scan diff and modified files for hardcoded secrets, prompt injection vectors, unvalidated inputs, and permission leaks."
      },
      {
        step: 2,
        subagent: "code-reviewer",
        action: "Fresh-Context Logic & Architecture Review",
        instructions: "Analyze code diff with zero author bias. Check for race conditions, null safety, architectural consistency, and test coverage."
      }
    ],
    content: [
      "# /review — Multi-Agent Code & Security Review Workflow",
      "",
      "When this command is triggered:",
      "1. **Stage 1 (Security Audit)**:",
      "   - Invoke \`security-auditor\` subagent persona.",
      "   - Scan all recent diffs and modified files for secret leaks, injection points, and OWASP Top 10 vulnerabilities.",
      "   - If critical vulnerabilities are found, BLOCK the review and output remediation steps.",
      "",
      "2. **Stage 2 (Logic & Architecture Review)**:",
      "   - Invoke \`code-reviewer\` subagent persona.",
      "   - Review logic flow, error handling, nullability, and conformance to project \`instincts.md\` rules.",
      "   - Output structured feedback grouped by Severity: [CRITICAL], [WARNING], [SUGGESTION]."
    ].join("\n")
  },
  {
    name: "Autonomous TDD Cycle",
    slug: "tdd",
    command: "/tdd",
    description: "Strict Red-Green-Refactor cycle: writes failing unit tests first, implements the minimal passing code, and safely refactors with test coverage protection.",
    steps: [
      {
        step: 1,
        subagent: "tdd-driver",
        action: "RED Phase — Write Failing Tests",
        instructions: "Create isolated test cases covering the required behavior, edge cases, and error boundaries."
      },
      {
        step: 2,
        subagent: "tdd-driver",
        action: "GREEN Phase — Minimal Implementation",
        instructions: "Write the minimal amount of implementation code required to pass the failing tests."
      },
      {
        step: 3,
        subagent: "refactoring-specialist",
        action: "REFACTOR Phase — Clean & Modernize",
        instructions: "Clean code structure while keeping all tests 100% green."
      }
    ],
    content: [
      "# /tdd — Autonomous Test-Driven Development Cycle",
      "",
      "When this command is triggered:",
      "1. **RED Phase**: Write comprehensive unit tests for the requested feature/fix. Run test runner and verify failure.",
      "2. **GREEN Phase**: Write the cleanest minimal code to make the test pass. Verify all tests pass.",
      "3. **REFACTOR Phase**: Optimize code readability and modularity with tests running as safety harness."
    ].join("\n")
  },
  {
    name: "Context Compaction & Token Garbage Collection",
    slug: "compact",
    command: "/compact",
    description: "Summarizes active conversation history, clears redundant tokens, and extracts key codebase instincts to prevent context degradation.",
    steps: [
      {
        step: 1,
        subagent: "agent-introspection-debugger",
        action: "Extract Key Decisions & Active Goal",
        instructions: "Identify current objectives, modified files, unresolved blockers, and technical decisions."
      },
      {
        step: 2,
        subagent: "continuous-memory-architect",
        action: "Save Memory Snapshot & Clean Slate",
        instructions: "Persist architectural discoveries to instincts.md and prune stale trajectory tokens."
      }
    ],
    content: [
      "# /compact — Context Compaction & Token Garbage Collection",
      "",
      "When this command is triggered:",
      "1. Summarize the main task, current status, modified files, and remaining steps.",
      "2. Extract any permanent codebase patterns learned during the session into \`instincts.md\`.",
      "3. Present a concise 3-bullet progress summary and continue execution with fresh token headroom."
    ].join("\n")
  },
  {
    name: "Multi-Model Council Deliberation",
    slug: "council",
    command: "/council",
    description: "Evaluates difficult architectural decisions across multiple reasoning perspectives before writing implementation code.",
    steps: [
      {
        step: 1,
        subagent: "council-moderator",
        action: "Formulate Architectural Dilemma",
        instructions: "Frame the trade-offs, constraints, and non-functional requirements."
      },
      {
        step: 2,
        subagent: "software-architect",
        action: "Synthesize Consensus & ADR",
        instructions: "Draft an Architecture Decision Record (ADR) outlining the chosen path."
      }
    ],
    content: [
      "# /council — Multi-Model Council Deliberation",
      "",
      "When this command is triggered:",
      "1. Frame the technical challenge, performance criteria, and existing system constraints.",
      "2. Compare 2-3 architectural approaches with pros/cons.",
      "3. Produce a definitive Architecture Decision Record (ADR) before starting implementation."
    ].join("\n")
  }
];

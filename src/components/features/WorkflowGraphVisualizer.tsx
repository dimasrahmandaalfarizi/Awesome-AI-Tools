"use client"

import * as React from "react"
import { Shield, Code2, Layers, Bot, ArrowRight, CheckCircle2, Terminal, AlertTriangle, FileCode2, Cpu } from "lucide-react"

interface WorkflowNode {
  id: string
  title: string
  subtitle: string
  agentRole: string
  tools: string[]
  description: string
  promptExcerpt: string
  status: "ready" | "active" | "verified"
}

interface WorkflowDefinition {
  id: string
  command: string
  name: string
  category: string
  summary: string
  nodes: WorkflowNode[]
}

const WORKFLOW_DATA: WorkflowDefinition[] = [
  {
    id: "review",
    command: "/review",
    name: "Multi-Agent Code & Security Review",
    category: "Security & QA",
    summary: "Two-stage fresh-context review: AgentShield audits security AST, then Code Reviewer verifies correctness and race conditions.",
    nodes: [
      {
        id: "rev-1",
        title: "Stage 1: AgentShield Audit",
        subtitle: "Security & Vulnerability Hunter",
        agentRole: "AgentShield Lead",
        tools: ["read_file", "grep_search", "find_by_name"],
        description: "Scans changed files for SSRF, BOLA/IDOR, SQL injection, token leaks, and improper input sanitization.",
        promptExcerpt: "You are AgentShield. Audit changes with zero tolerance for SSRF, unvalidated redirect, or prototype pollution.",
        status: "verified",
      },
      {
        id: "rev-2",
        title: "Hand-off Context Bridge",
        subtitle: "Sanitized Findings Transfer",
        agentRole: "Context Governor",
        tools: ["memory_transfer", "instinct_reader"],
        description: "Condenses security findings into an immutable checklist before invoking the code review agent.",
        promptExcerpt: "Transmit security invariants without token bloat to the next review stage.",
        status: "ready",
      },
      {
        id: "rev-3",
        title: "Stage 2: Code Reviewer",
        subtitle: "Logic & Concurrency Specialist",
        agentRole: "Senior Reviewer",
        tools: ["read_file", "git_diff"],
        description: "Verifies asynchronous race conditions, error handling, component re-render performance, and adherence to clean code.",
        promptExcerpt: "Verify code correctness, edge cases, and ensure no behavioral regressions were introduced.",
        status: "verified",
      },
      {
        id: "rev-4",
        title: "Verdict & Gate Approval",
        subtitle: "Automated Sign-Off",
        agentRole: "Release Governor",
        tools: ["github_pr", "instinct_writer"],
        description: "Synthesizes multi-agent findings into structured markdown PR comments and stamps the release.",
        promptExcerpt: "Produce final actionable verdict: APPROVE or REQUEST_CHANGES.",
        status: "ready",
      },
    ],
  },
  {
    id: "tdd",
    command: "/tdd",
    name: "Autonomous TDD Cycle",
    category: "Engineering",
    summary: "Strict Red-Green-Refactor loop: writes failing unit test first, implements minimal passing code, and refactors under coverage protection.",
    nodes: [
      {
        id: "tdd-1",
        title: "Specification Ingestion",
        subtitle: "Contract & Invariant Definition",
        agentRole: "Requirements Engineer",
        tools: ["read_file"],
        description: "Parses target function signatures, edge conditions, and expected behaviors into strict assertions.",
        promptExcerpt: "Define exact assertions and test boundaries before writing any implementation code.",
        status: "ready",
      },
      {
        id: "tdd-2",
        title: "Phase 1: RED (Failing Test)",
        subtitle: "Unit Test Generation",
        agentRole: "Vitest / Jest Driver",
        tools: ["write_to_file", "run_command"],
        description: "Creates comprehensive unit tests and runs them to verify they fail for the right reasons.",
        promptExcerpt: "Write failing tests first. Confirm test execution fails with expected assertion errors.",
        status: "verified",
      },
      {
        id: "tdd-3",
        title: "Phase 2: GREEN (Passing Code)",
        subtitle: "Minimal Implementation",
        agentRole: "Software Engineer",
        tools: ["write_to_file", "replace_file_content", "run_command"],
        description: "Implements the minimum viable code required to make all failing unit tests pass without over-engineering.",
        promptExcerpt: "Write only enough code to pass the unit tests. Do not add speculative abstractions.",
        status: "verified",
      },
      {
        id: "tdd-4",
        title: "Phase 3: REFACTOR",
        subtitle: "Coverage-Guaranteed Polish",
        agentRole: "Refactoring Lead",
        tools: ["replace_file_content", "run_command"],
        description: "Eliminates duplication, cleans types, and optimizes performance while maintaining 100% test coverage green.",
        promptExcerpt: "Refactor for clarity and performance while guaranteeing test suite remains completely green.",
        status: "ready",
      },
    ],
  },
  {
    id: "council",
    command: "/council",
    name: "Multi-Model Council Deliberation",
    category: "Architecture",
    summary: "Evaluates difficult architectural trade-offs across 3 specialized reasoning personas before generating code.",
    nodes: [
      {
        id: "cnl-1",
        title: "Architect Perspective",
        subtitle: "Modularity & Boundaries",
        agentRole: "Software Architect",
        tools: ["read_file", "architecture_scanner"],
        description: "Evaluates coupling, cohesive boundaries, event-driven decoupling, and domain-driven design.",
        promptExcerpt: "Analyze system modularity, DDD bounded contexts, and future-proof interface contracts.",
        status: "verified",
      },
      {
        id: "cnl-2",
        title: "Security Lead Perspective",
        subtitle: "Threat Modeling & Zero-Trust",
        agentRole: "Security Architect",
        tools: ["threat_modeler", "cve_database"],
        description: "Evaluates attack vectors, token blast-radius, cryptographic safety, and principle of least privilege.",
        promptExcerpt: "Challenge assumptions from an adversarial red-team and zero-trust perspective.",
        status: "verified",
      },
      {
        id: "cnl-3",
        title: "Performance & SRE Perspective",
        subtitle: "Scale, P99 Latency & Resilience",
        agentRole: "SRE Profiler",
        tools: ["benchmark_runner", "profiler"],
        description: "Calculates memory overhead, connection saturation, p99 latency spikes, and cache invalidation strategies.",
        promptExcerpt: "Evaluate high-load concurrency, database connection pooling, and memory consumption limits.",
        status: "verified",
      },
      {
        id: "cnl-4",
        title: "Consensus Synthesis Matrix",
        subtitle: "Unified Architectural Decision Record",
        agentRole: "Council Moderator",
        tools: ["write_to_file", "adr_scaffolder"],
        description: "Synthesizes competing trade-offs into an ADR document ready for engineering implementation.",
        promptExcerpt: "Synthesize perspectives into a balanced, pragmatic consensus ADR with documented trade-offs.",
        status: "ready",
      },
    ],
  },
  {
    id: "compact",
    command: "/compact",
    name: "Context Compaction & Memory GC",
    category: "Context & FinOps",
    summary: "Summarizes active conversation history, clears redundant tokens, and extracts key codebase instincts into instincts.md.",
    nodes: [
      {
        id: "cmp-1",
        title: "Sliding Window Ingestion",
        subtitle: "Active Conversation Parser",
        agentRole: "Context Profiler",
        tools: ["read_transcript"],
        description: "Analyzes message tokens across user requests, tool outputs, and assistant answers.",
        promptExcerpt: "Profile active token consumption and identify low-entropy conversational clutter.",
        status: "verified",
      },
      {
        id: "cmp-2",
        title: "Garbage Collection & Pruning",
        subtitle: "Token Redundancy Removal",
        agentRole: "Token GC Engine",
        tools: ["prune_tokens"],
        description: "Prunes repetitive stack traces, massive JSON dumps, and duplicate function listings.",
        promptExcerpt: "Compact history into dense milestone bullets while retaining critical state invariants.",
        status: "verified",
      },
      {
        id: "cmp-3",
        title: "Instinct Extraction",
        subtitle: "Continuous Rule Learning",
        agentRole: "Knowledge Distiller",
        tools: ["instinct_extractor"],
        description: "Identifies recurring user preferences, conventions, and architectural guardrails from the session.",
        promptExcerpt: "Extract crisp, actionable rules from user corrections and setup resolutions.",
        status: "verified",
      },
      {
        id: "cmp-4",
        title: "instincts.md Persistence",
        subtitle: "Cross-Session Memory Storage",
        agentRole: "Memory Governor",
        tools: ["write_to_file"],
        description: "Writes new durable rules to instincts.md so future agent sessions inherit the learned patterns.",
        promptExcerpt: "Append validated rules to instincts.md with zero duplicate entries.",
        status: "ready",
      },
    ],
  },
]

export function WorkflowGraphVisualizer() {
  const [activeWorkflowId, setActiveWorkflowId] = React.useState<string>("review")
  const [selectedNodeId, setSelectedNodeId] = React.useState<string>("rev-1")

  const currentWorkflow = WORKFLOW_DATA.find((w) => w.id === activeWorkflowId) || WORKFLOW_DATA[0]
  const selectedNode = currentWorkflow.nodes.find((n) => n.id === selectedNodeId) || currentWorkflow.nodes[0]

  // Switch node selection when workflow changes
  React.useEffect(() => {
    if (currentWorkflow.nodes.length > 0) {
      setSelectedNodeId(currentWorkflow.nodes[0].id)
    }
  }, [activeWorkflowId, currentWorkflow])

  return (
    <div className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-xl overflow-hidden font-sans">
      {/* Header bar with Workflow selector tabs */}
      <div className="p-4 border-b border-[var(--border)] bg-[var(--background)] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)]">
            <Layers className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)] tracking-tight">
              Agent Swarm Workflow Orchestrator
            </h3>
            <p className="text-[11px] text-[var(--muted)]">
              Interactive multi-agent pipeline and context hand-off visualizer
            </p>
          </div>
        </div>

        {/* Workflow Switcher Pills */}
        <div className="flex items-center gap-1 bg-[var(--surface)] p-1 rounded-xl border border-[var(--border)]">
          {WORKFLOW_DATA.map((wf) => {
            const isActive = wf.id === activeWorkflowId
            return (
              <button
                key={wf.id}
                onClick={() => setActiveWorkflowId(wf.id)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-[var(--foreground)] text-[var(--background)] shadow-xs"
                    : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
                }`}
              >
                {wf.command}
              </button>
            )
          })}
        </div>
      </div>

      {/* Workflow Summary Header */}
      <div className="px-6 py-3 border-b border-[var(--border)] bg-[var(--surface)]/50 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono font-semibold text-[var(--foreground)]">
            {currentWorkflow.name}
          </span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            {currentWorkflow.category}
          </span>
        </div>
        <p className="text-[11px] text-[var(--muted)] max-w-lg truncate hidden md:block">
          {currentWorkflow.summary}
        </p>
      </div>

      {/* Graph Visual Canvas & Node Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left: Pipeline Graph Nodes */}
        <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-[var(--border)] bg-[var(--background)] flex flex-col justify-center space-y-4">
          <div className="text-[11px] font-mono text-[var(--muted)] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            <span>Execution Pipeline (Click node to inspect persona bounds)</span>
          </div>

          <div className="space-y-3">
            {currentWorkflow.nodes.map((node, index) => {
              const isSelected = node.id === selectedNodeId
              const isLast = index === currentWorkflow.nodes.length - 1

              return (
                <div key={node.id} className="relative">
                  <div
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-[var(--surface)] border-[var(--foreground)]/60 shadow-md ring-1 ring-[var(--foreground)]/20"
                        : "bg-[var(--surface)]/60 border-[var(--border)] hover:border-[var(--foreground)]/30 hover:bg-[var(--surface)]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                        isSelected
                          ? "bg-[var(--foreground)] text-[var(--background)]"
                          : "bg-[var(--background)] border border-[var(--border)] text-[var(--muted)]"
                      }`}>
                        {index + 1}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-semibold text-[var(--foreground)] truncate">
                            {node.title}
                          </h4>
                          {node.status === "verified" && (
                            <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] text-[var(--muted)] truncate">
                          {node.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[var(--background)] border border-[var(--border)] text-[var(--muted)]">
                        {node.agentRole}
                      </span>
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? "text-[var(--foreground)] translate-x-0.5" : "text-transparent"}`} />
                    </div>
                  </div>

                  {!isLast && (
                    <div className="flex items-center justify-center my-1">
                      <div className="w-0.5 h-3 bg-[var(--border)]" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: Selected Node Detail Inspector */}
        <div className="lg:col-span-5 p-6 bg-[var(--surface)] space-y-4">
          <div className="text-[11px] font-mono text-[var(--muted)] uppercase tracking-wider flex items-center justify-between">
            <span>Agent Persona Specification</span>
            <span className="text-emerald-500 font-medium">Ready</span>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-[10px] font-mono text-[var(--muted)] uppercase">Assigned Agent</span>
              <h4 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2 mt-0.5">
                <Bot className="w-4 h-4 text-emerald-500" />
                <span>{selectedNode.agentRole}</span>
              </h4>
            </div>

            <div>
              <span className="text-[10px] font-mono text-[var(--muted)] uppercase">Operational Scope</span>
              <p className="text-xs text-[var(--foreground)] leading-relaxed mt-1">
                {selectedNode.description}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-mono text-[var(--muted)] uppercase">Bounded Tools Access</span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {selectedNode.tools.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md font-mono text-[10px] bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] flex items-center gap-1"
                  >
                    <Terminal className="w-2.5 h-2.5 text-amber-500" />
                    <span>{t}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--border)]">
              <span className="text-[10px] font-mono text-[var(--muted)] uppercase">System Prompt Invariant</span>
              <div className="mt-1.5 p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] font-mono text-[11px] text-[var(--muted)] leading-relaxed italic">
                "{selectedNode.promptExcerpt}"
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/cli/index.ts
var import_commander = require("commander");
var import_prompts = __toESM(require("prompts"));
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));

// src/data/mock.ts
var AI_SKILLS = [
  {
    "id": "skill-1",
    "name": "TDD Expert",
    "slug": "tdd-expert",
    "description": "Forces the agent to strictly follow Test-Driven Development (TDD) by writing tests before implementation.",
    "frameworks": [
      "Cursor",
      "Copilot",
      "Claude Code"
    ],
    "content": "When writing new features, ALWAYS follow Test-Driven Development (TDD):\n1. Ask me to clarify requirements if ambiguous.\n2. Write the failing tests FIRST.\n3. Wait for me to run the tests and confirm they fail.\n4. Write the minimum code necessary to make the tests pass.\n5. Refactor the code while keeping tests green.",
    "author": "VoltAgent",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-2",
    "name": "Next.js App Router Master",
    "slug": "nextjs-app-router-master",
    "description": "Ensures the agent uses correct Next.js App Router conventions instead of legacy Pages Router patterns.",
    "frameworks": [
      "Cursor",
      "Cline",
      "Claude Code"
    ],
    "content": "You are an expert in Next.js App Router. Follow these rules:\n- Always use 'use client' for components that require interactivity (hooks, event listeners).\n- Keep data fetching in Server Components where possible.\n- Do NOT use 'next/router', use 'next/navigation'.\n- Do NOT use 'getServerSideProps' or 'getStaticProps'. Use native async/await in Server Components.\n- Use `loading.tsx` and `error.tsx` for suspense and error boundaries.",
    "author": "Community",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-3",
    "name": "Security Auditor",
    "slug": "security-auditor",
    "description": "Instructs the agent to scan code for common vulnerabilities (OWASP Top 10) before committing.",
    "frameworks": [
      "Copilot",
      "Claude Code",
      "GitHub Actions"
    ],
    "content": "Before proposing any code changes, perform a security audit:\n1. Check for SQL Injection risks in database queries.\n2. Ensure all user inputs are sanitized and escaped (XSS prevention).\n3. Verify that no hardcoded secrets or API keys are included.\n4. Check for proper authorization checks on protected routes.\n5. If any vulnerabilities are found, explain the risk and provide a secure alternative.",
    "author": "VoltAgent",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-4",
    "name": "UI/UX Designer",
    "slug": "ui-ux-designer",
    "description": "Guides the agent to generate beautiful, accessible, and responsive Tailwind UI components.",
    "frameworks": [
      "Cursor",
      "v0",
      "Cline"
    ],
    "content": "When generating UI components:\n- Use Tailwind CSS for all styling.\n- Prioritize accessibility (use aria-labels, semantic HTML elements, sufficient contrast).\n- Ensure the design is fully responsive using Tailwind breakpoints (sm, md, lg, xl).\n- Use modern aesthetics: subtle shadows, glassmorphism (backdrop-blur), rounded corners, and consistent spacing.\n- Avoid hardcoding colors; use CSS variables (e.g., var(--background), var(--primary)) if a theme system is present.",
    "author": "UI Guild",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-5",
    "name": "Git Commit Convention",
    "slug": "git-commit-convention",
    "description": "Forces the agent to write Conventional Commits.",
    "frameworks": [
      "Cursor",
      "Copilot",
      "Cline"
    ],
    "content": "Always generate commit messages using the Conventional Commits specification:\n- Format: <type>(<scope>): <subject>\n- Types: feat, fix, docs, style, refactor, perf, test, chore.\n- Scope is optional but recommended.\n- Subject must be imperative, present tense (e.g., 'add feature' not 'added feature').\n- Do not capitalize the first letter of the subject.\n- Do not end the subject with a period.",
    "author": "Community",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-6",
    "name": "Python Data Scientist",
    "slug": "python-data-scientist",
    "description": "Configures the agent to excel at data analysis, visualization, and machine learning using standard Python libraries.",
    "frameworks": [
      "Cursor",
      "Jupyter",
      "Copilot"
    ],
    "content": "When writing Python data science code:\n- Always prefer pandas for data manipulation and numpy for numerical operations.\n- Handle missing data explicitly before analysis.\n- Use matplotlib or seaborn for visualizations with proper titles and labels.\n- Vectorize operations instead of using for-loops when iterating over DataFrames.\n- For ML, adhere to the scikit-learn API (fit/predict).",
    "author": "DataCommunity",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-7",
    "name": "Clean Architecture Planner",
    "slug": "clean-architecture-planner",
    "description": "Enforces SOLID principles and Clean Architecture structure on newly generated codebase modules.",
    "frameworks": [
      "Cline",
      "Claude Code",
      "Cursor"
    ],
    "content": "When designing or generating new features, enforce Clean Architecture:\n1. Separate concerns into standard layers: Domain (Entities), Use Cases (Interactors), Interface Adapters (Controllers/Presenters), and Frameworks/Drivers.\n2. Apply SOLID principles, particularly Dependency Inversion (use interfaces/abstract classes for external services).\n3. Never import database or web framework dependencies directly into the Domain layer.",
    "author": "UncleBobFans",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-8",
    "name": "Accessibility (a11y) Expert",
    "slug": "accessibility-a11y-expert",
    "description": "Ensures all generated UI components adhere strictly to WCAG 2.1 guidelines.",
    "frameworks": [
      "Cursor",
      "v0",
      "Copilot"
    ],
    "content": "All UI components must be accessible:\n- Ensure text contrast ratios meet WCAG AA standards (4.5:1 for normal text).\n- Provide `aria-label` or `aria-labelledby` for icon-only buttons.\n- Support full keyboard navigation (focus states, tab order).\n- Use semantic HTML tags (`<nav>`, `<main>`, `<article>`) instead of generic `<div>`s.\n- Never remove focus outlines without providing an accessible custom alternative.",
    "author": "A11yProject",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-9",
    "name": "Rust Systems Programmer",
    "slug": "rust-systems-programmer",
    "description": "Guides the agent to write idiomatic, safe Rust code avoiding unnecessary clones or unwraps.",
    "frameworks": [
      "Cursor",
      "Claude Code"
    ],
    "content": "When writing Rust code:\n- Prioritize safe ownership and borrowing over `Clone` or `Rc`/`Arc` unless necessary.\n- Do NOT use `.unwrap()` or `.expect()` in production code; handle errors properly with `Result` and the `?` operator.\n- Utilize the type system to enforce state invariants.\n- Write comprehensive documentation comments (`///`) and inline unit tests for every public function.",
    "author": "Rustaceans",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-10",
    "name": "GitHub Actions DevOps",
    "slug": "github-actions-devops",
    "description": "Instructs the agent to write secure and efficient GitHub Actions YAML workflows.",
    "frameworks": [
      "Copilot",
      "Claude Code"
    ],
    "content": "When generating GitHub Actions workflows:\n- Pin all actions to specific commit SHAs instead of mutable tags (e.g., v2).\n- Always use least-privilege for `permissions` (e.g., `contents: read`).\n- Never log secrets or credentials.\n- Use caching strategies (`actions/cache`) to speed up build and dependency installation times.\n- Run tests on multiple OS matrices only when explicitly required.",
    "author": "DevOpsGuild",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-11",
    "name": "API Documentation Generator",
    "slug": "api-documentation-generator",
    "description": "Forces the agent to accurately document APIs using OpenAPI/Swagger standards or comprehensive docstrings.",
    "frameworks": [
      "Cursor",
      "Claude Code"
    ],
    "content": "Whenever you create or modify an API endpoint:\n1. Provide comprehensive OpenAPI (Swagger) annotations or equivalent standard docstrings.\n2. Clearly define the request schema (body, parameters, headers) and all possible response schemas (200, 400, 401, 404, 500).\n3. Include a realistic example for both the request payload and the response.\n4. Document authorization requirements clearly.",
    "author": "API-First",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-12",
    "name": "PostgreSQL DBA",
    "slug": "postgresql-dba",
    "description": "Guides the agent to write highly optimized, secure, and robust PostgreSQL queries.",
    "frameworks": [
      "Cursor",
      "Copilot"
    ],
    "content": "When writing PostgreSQL queries or schema migrations:\n- Always consider indexing for columns used in WHERE, JOIN, and ORDER BY clauses.\n- Avoid `SELECT *`; explicitly select only the required columns.\n- Use EXPLAIN ANALYZE for query optimization if asked.\n- Prefer Common Table Expressions (CTEs) for complex nested queries to improve readability.\n- Use proper foreign key constraints with ON DELETE actions defined.",
    "author": "PostgresCommunity",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-13",
    "name": "React Native Expo Expert",
    "slug": "react-native-expo-expert",
    "description": "Configures the agent to build cross-platform mobile apps using modern Expo and React Native best practices.",
    "frameworks": [
      "Cursor",
      "Copilot"
    ],
    "content": "When writing React Native code:\n- Always prefer Expo APIs (e.g., `expo-router`, `expo-image`) over third-party alternatives when possible.\n- Use `StyleSheet.create` for styling unless a utility library like NativeWind is explicitly configured.\n- Optimize lists using `FlashList` instead of `FlatList` for better performance.\n- Avoid heavy synchronous operations on the JS thread to maintain 60 FPS.",
    "author": "ExpoCommunity",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-14",
    "name": "SvelteKit & Tailwind Mastery",
    "slug": "sveltekit-tailwind-mastery",
    "description": "Enforces idiomatic SvelteKit folder structures, reactive declarations, and Tailwind styling.",
    "frameworks": [
      "Cursor",
      "Cline"
    ],
    "content": 'When writing SvelteKit code:\n- Use standard `+page.svelte`, `+page.server.ts`, and `+layout.svelte` routing conventions.\n- Use `$: ` reactive declarations instead of manual state synchronization.\n- Keep logic inside `<script context="module">` or external TS files if it doesn\'t depend on component state.\n- Apply Tailwind classes directly in the template; avoid `<style>` blocks unless absolutely necessary.',
    "author": "RichHarrisFans",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-15",
    "name": "Go API Developer (Gin/Fiber)",
    "slug": "go-api-developer",
    "description": "Guides the agent to write idiomatic, high-performance Go web servers.",
    "frameworks": [
      "Cursor",
      "Claude Code"
    ],
    "content": "When writing Go backend code:\n- Adhere to effective Go guidelines (e.g., return early, handle errors explicitly without nesting).\n- Use channels and goroutines responsibly to avoid memory leaks.\n- Prefer the standard library `net/http` or lightweight frameworks like Fiber/Gin.\n- Never ignore errors with `_` unless explicitly documented why it's safe.\n- Use table-driven tests for comprehensive unit testing.",
    "author": "Gophers",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-16",
    "name": "Vue 3 Composition API",
    "slug": "vue-3-composition-api",
    "description": "Forces the agent to use Vue 3's `<script setup>` syntax and reactivity APIs exclusively.",
    "frameworks": [
      "Cursor",
      "Copilot"
    ],
    "content": "When writing Vue 3 components:\n- Always use `<script setup>` syntax. Never use the legacy Options API.\n- Use `ref` for primitive values and `reactive` for deeply nested objects.\n- Prefer composables (functions starting with `use`) for reusable state logic instead of mixins.\n- Use `defineProps` and `defineEmits` with TypeScript interfaces for strong typing.\n- Optimize large lists using virtual scroll libraries.",
    "author": "VueMastery",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-17",
    "name": "Solidity Smart Contract Auditor",
    "slug": "solidity-smart-contract-auditor",
    "description": "Instructs the agent to prioritize gas optimization and common exploit prevention in EVM contracts.",
    "frameworks": [
      "Cursor",
      "GitHub Actions"
    ],
    "content": "When writing or reviewing Solidity code:\n- Always check for reentrancy vulnerabilities and use the Checks-Effects-Interactions pattern or `ReentrancyGuard`.\n- Ensure exact pragmas are used (e.g., `pragma solidity 0.8.24;`).\n- Optimize gas usage by packing structs tightly and caching storage variables in memory.\n- Explicitly mark variable visibility and restrict function access with `onlyOwner` or similar modifiers.\n- Avoid using `tx.origin` for authorization.",
    "author": "Web3Guild",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-18",
    "name": "Docker & Kubernetes Architect",
    "slug": "docker-kubernetes-architect",
    "description": "Guides the creation of minimal, secure Dockerfiles and production-ready K8s manifests.",
    "frameworks": [
      "Cursor",
      "Cline",
      "Claude Code"
    ],
    "content": "When generating Dockerfiles or K8s manifests:\n- Always use multi-stage builds to keep final image sizes minimal.\n- Never run containers as root; define a non-root `USER`.\n- Base images should use specific tags (e.g., `alpine:3.19`), never `latest`.\n- In Kubernetes deployments, always define `resources.requests` and `resources.limits` to prevent node starvation.\n- Define health checks (`livenessProbe`, `readinessProbe`) for all web services.",
    "author": "CloudNative",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-19",
    "name": "Laravel PHP Artisan",
    "slug": "laravel-php-artisan",
    "description": "Enforces Laravel best practices, Eloquent ORM usage, and strict typing in PHP 8+.",
    "frameworks": [
      "Cursor",
      "Copilot"
    ],
    "content": "When writing Laravel code:\n- Use Eloquent ORM and explicit relationships instead of raw DB queries when possible.\n- Prevent N+1 query problems by eagerly loading relationships using `with()`.\n- Always use Form Requests for validation instead of validating in the controller.\n- Take advantage of PHP 8+ features: constructor property promotion, match expressions, and typed properties.\n- Keep controllers thin and move complex business logic into Action or Service classes.",
    "author": "Artisans",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-20",
    "name": "Godot Game Developer",
    "slug": "godot-game-developer",
    "description": "Configures the agent to write performant GDScript and structure Godot engine scenes correctly.",
    "frameworks": [
      "Cursor",
      "Claude Code"
    ],
    "content": "When writing Godot code:\n- Prefer static typing in GDScript (e.g., `var health: int = 100`) for performance and autocomplete.\n- Structure scenes hierarchically and favor composition over deep inheritance.\n- Use Signals for decoupling components instead of direct node references where appropriate.\n- Avoid heavy logic in `_process` or `_physics_process`; use timers or event-driven logic if possible.\n- Preload resources (scenes, sounds) at the top of the script using `preload()` to prevent stuttering during gameplay.",
    "author": "GodotCommunity",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-21",
    "name": "Spec-Driven Development",
    "slug": "spec-driven-development",
    "description": "Guides agents to create a formal specification and define edge cases before writing code.",
    "frameworks": [
      "Cursor",
      "Claude Code",
      "Cline"
    ],
    "content": "Before writing any implementation code:\n1. Ask clarifying questions to eliminate ambiguity in the requirements.\n2. Draft a formal specification document detailing the intended behavior and edge cases.\n3. Wait for the user's explicit approval on the specification.\n4. Only proceed with coding once the spec is finalized. Do not make assumptions.",
    "author": "AddyOsmani",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-22",
    "name": "Test-Driven Development (TDD)",
    "slug": "test-driven-development",
    "description": "Strictly enforces the RED-GREEN-REFACTOR cycle for all code generation.",
    "frameworks": [
      "Cursor",
      "Copilot"
    ],
    "content": "Enforce strict Test-Driven Development (RED-GREEN-REFACTOR):\n1. Write a failing test for the next piece of functionality.\n2. Run the test and verify it fails (RED).\n3. Write the absolute minimum amount of code required to make the test pass (GREEN).\n4. Refactor the code for quality while keeping tests passing.\n5. Never write implementation code without a failing test first.",
    "author": "AddyOsmani",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-23",
    "name": "Subagent Task Delegation",
    "slug": "subagent-driven-development",
    "description": "Breaks complex work into independent subagent tasks with strict compliance reviews.",
    "frameworks": [
      "Antigravity",
      "Claude Code",
      "Cursor"
    ],
    "content": "When tackling a complex feature:\n1. Break the work down into bite-sized tasks (2-5 minutes each).\n2. Dispatch a separate context or subagent for each task.\n3. Perform a two-stage review on each task's output: first check for spec compliance, then check for code quality.\n4. Do not proceed to the next task until the current one passes review.",
    "author": "Obra Superpowers",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-24",
    "name": "Scope Creep Detector",
    "slug": "scope-creep-detector",
    "description": "Analyzes code modifications to prevent accidental feature creep beyond the original intent.",
    "frameworks": [
      "GitHub Copilot",
      "Cursor"
    ],
    "content": "When reviewing a diff or planning changes:\n1. Compare the proposed code changes strictly against the original stated intent or issue description.\n2. Flag any modifications, refactoring, or new features that fall outside this scope.\n3. Recommend splitting out-of-scope changes into a separate PR or branch.\n4. Ask for explicit user justification before proceeding with out-of-scope code.",
    "author": "ShubhamSaboo",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-25",
    "name": "Project Graveyard Analyzer",
    "slug": "project-graveyard",
    "description": "Examines abandoned projects to diagnose code rot and create a revival roadmap.",
    "frameworks": [
      "Claude Code",
      "Cursor"
    ],
    "content": "When analyzing an old or abandoned project:\n1. Scan the repository to identify the last active commit and the state of the codebase.\n2. Determine the core blockers or missing features that caused development to stop.\n3. Check for deprecated dependencies or code rot.\n4. Provide a structured roadmap with prioritized steps on how to modernize and finish the project.",
    "author": "ShubhamSaboo",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-26",
    "name": "Claude Code: Plan Before Execution",
    "slug": "claude-code-plan-before-execution",
    "description": "Forces Claude Code to generate and agree on a plan.md before making any code changes.",
    "frameworks": [
      "Claude Code"
    ],
    "content": "When given a complex task:\n1. Do NOT write any implementation code immediately.\n2. Analyze the requirements and generate a `plan.md` file outlining the architecture, file changes, and edge cases.\n3. Ask the user for explicit approval on the plan.\n4. Only begin execution after the user approves.",
    "author": "Claude Experts",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-27",
    "name": "Claude Code: Context Compaction",
    "slug": "claude-code-context-compaction",
    "description": "A workflow for managing Claude Code's context window during long sessions.",
    "frameworks": [
      "Claude Code"
    ],
    "content": "When a session becomes long or complex:\n1. Pause and run `/compact` to summarize the current state and discard irrelevant history.\n2. Use `/clear` if moving to a completely unrelated feature.\n3. Always start new major features by running `/init` to refresh codebase understanding and prevent hallucinated dependencies.",
    "author": "Claude Experts",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-28",
    "name": "Aider: Atomic Git Commits",
    "slug": "aider-atomic-git-commits",
    "description": "Configures Aider to make small, focused changes per commit to maintain a clean git history.",
    "frameworks": [
      "Aider"
    ],
    "content": "When editing code in Aider:\n1. Focus on one specific goal or file change at a time.\n2. Avoid big, sweeping refactors across the entire codebase in a single prompt.\n3. Ensure that every edit results in a working state before moving to the next task.\n4. Use the `/architect` mode for complex, multi-file refactoring before writing code.",
    "author": "Aider Community",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-29",
    "name": "Aider: Conventions Enforcement",
    "slug": "aider-conventions-enforcement",
    "description": "Instructs Aider to strictly follow project-specific guidelines defined in CONVENTIONS.md.",
    "frameworks": [
      "Aider"
    ],
    "content": "For every code change:\n1. Always read and adhere to the project's `CONVENTIONS.md` file.\n2. Strictly follow the defined Tech Stack, Linting rules, and Testing requirements (e.g., TDD).\n3. If a request contradicts the conventions, notify the user and ask for clarification before proceeding.",
    "author": "Aider Community",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-30",
    "name": "Autonomous Agent: Error Recovery",
    "slug": "autonomous-agent-error-recovery",
    "description": "Guides autonomous agents (Devin/AutoGPT) on how to handle terminal errors or build failures.",
    "frameworks": [
      "Devin",
      "AutoGPT",
      "Antigravity"
    ],
    "content": "If a command or build fails:\n1. Do not panic or ask the user immediately.\n2. Analyze the error output completely.\n3. Check the documentation or source code for the failing component.\n4. Propose a hypothesis for the failure.\n5. Attempt a fix and re-run the command up to 3 times before escalating to the user.",
    "author": "Autonomous Guild",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-31",
    "name": "Chain of Thought (CoT) Master",
    "slug": "chain-of-thought-master",
    "description": "Forces any LLM to explicitly write out its reasoning steps before providing an answer.",
    "frameworks": [
      "GPT-4",
      "Claude 3.5 Sonnet",
      "Gemini 1.5 Pro"
    ],
    "content": "Before providing your final answer or code:\n1. Write a `<thinking>` block.\n2. Break down the problem into logical steps.\n3. Identify constraints, potential pitfalls, and edge cases.\n4. Evaluate alternative approaches and select the optimal one.\n5. Only after closing the `</thinking>` block, provide your final implementation.",
    "author": "Prompt Engineers",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-32",
    "name": "Security Vulnerability Scanner",
    "slug": "security-vulnerability-scanner",
    "description": "Configures the LLM to act as a strict AppSec auditor checking against OWASP Top 10.",
    "frameworks": [
      "GPT-4",
      "Claude 3.5 Sonnet"
    ],
    "content": "When reviewing code, act as a strict Application Security Auditor:\n1. Scan for OWASP Top 10 vulnerabilities (e.g., SQLi, XSS, CSRF, IDOR).\n2. Check for hardcoded secrets or credentials.\n3. Validate that all user inputs are sanitized and parameterized.\n4. Report findings categorized by Severity (Critical, High, Medium, Low) with actionable remediation steps.",
    "author": "SecOps",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-33",
    "name": "SEO & Semantic HTML Optimizer",
    "slug": "seo-semantic-html-optimizer",
    "description": "Ensures web code is optimized for search engines and screen readers.",
    "frameworks": [
      "Cursor",
      "Copilot"
    ],
    "content": "When generating frontend code:\n1. Always use semantic HTML5 elements (header, main, nav, article).\n2. Ensure a proper heading hierarchy (h1 -> h2 -> h3) without skipping levels.\n3. Include descriptive alt attributes for all images.\n4. Add appropriate meta tags for SEO and social sharing (OpenGraph, Twitter Cards).\n5. Ensure fast load performance by avoiding render-blocking scripts.",
    "author": "WebMasters",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-34",
    "name": "Regex Ninja",
    "slug": "regex-ninja",
    "description": "Guides the LLM to write highly optimized, safe, and heavily commented Regular Expressions.",
    "frameworks": [
      "GPT-4",
      "Claude 3.5 Sonnet"
    ],
    "content": "When tasked with writing Regular Expressions:\n1. Avoid catastrophic backtracking by failing fast.\n2. Use non-capturing groups `(?:)` unless extraction is explicitly needed.\n3. Provide a detailed, line-by-line explanation of how the pattern works.\n4. Generate at least 5 positive and 5 negative test cases to prove the regex is robust.",
    "author": "RegexMasters",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-35",
    "name": "Python Performance Profiler",
    "slug": "python-performance-profiler",
    "description": "Instructs the agent to optimize Python code for speed and memory efficiency.",
    "frameworks": [
      "Cursor",
      "Jupyter"
    ],
    "content": "When optimizing Python code:\n1. Identify bottlenecks using `cProfile` or line profilers.\n2. Replace nested loops with vectorized NumPy or Pandas operations where applicable.\n3. Use generators (`yield`) instead of lists for large datasets to save memory.\n4. Utilize list comprehensions instead of `for.append()`.\n5. Consider `multiprocessing` or `asyncio` for I/O bound tasks.",
    "author": "Pythonistas",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-36",
    "name": "Database Schema Architect",
    "slug": "database-schema-architect",
    "description": "Forces the LLM to design normalized, scalable SQL schemas.",
    "frameworks": [
      "Claude Code",
      "Cursor"
    ],
    "content": "When designing database schemas:\n1. Normalize to at least 3NF (Third Normal Form) to reduce data redundancy.\n2. Define clear Primary Keys and Foreign Keys with appropriate cascading actions.\n3. Recommend indexes for frequently queried or joined columns.\n4. Use appropriate data types (e.g., `TIMESTAMPTZ` instead of `TIMESTAMP`).\n5. Provide the raw SQL DDL script and an Entity-Relationship (ER) explanation.",
    "author": "DBAGuild",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-37",
    "name": "Next.js App Router Expert",
    "slug": "nextjs-app-router-expert",
    "description": "Strictly enforces Next.js 14+ App Router conventions and Server Components.",
    "frameworks": [
      "Cursor",
      "Copilot",
      "Cline"
    ],
    "content": "When building Next.js applications:\n1. Default to React Server Components (RSC). Only use `'use client'` when interactivity (hooks, event listeners) is strictly required.\n2. Use the `app/` directory routing conventions (`page.tsx`, `layout.tsx`, `loading.tsx`).\n3. Implement data fetching at the server component level using `fetch` with appropriate caching strategies.\n4. Use Server Actions for form mutations instead of API routes.",
    "author": "VercelFans",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-38",
    "name": "Code Review Assistant",
    "slug": "code-review-assistant",
    "description": "Configures the agent to perform polite but rigorous code reviews.",
    "frameworks": [
      "Claude Code",
      "GitHub Actions"
    ],
    "content": "When reviewing a Pull Request:\n1. Be constructive, polite, and objective.\n2. Focus on logic errors, performance issues, and architectural flaws rather than nitpicking style (assume a linter handles style).\n3. If suggesting a change, provide a concrete code snippet showing the improvement.\n4. Call out missing test coverage for new business logic.",
    "author": "QA Guild",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-39",
    "name": "Terminal Wizard",
    "slug": "terminal-wizard",
    "description": "Instructs the agent to write robust, cross-platform bash/shell scripts.",
    "frameworks": [
      "Antigravity",
      "AutoGPT"
    ],
    "content": "When writing shell scripts:\n1. Always start with `set -euo pipefail` to ensure the script exits on errors or unbound variables.\n2. Avoid using `cat` when input redirection (`<`) is sufficient.\n3. Quote all variables to prevent word splitting.\n4. Prefer `awk` or `sed` for text processing instead of complex loops.\n5. Provide a fallback or error message if required dependencies are missing.",
    "author": "SysAdmins",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-40",
    "name": "Antigravity Meta-Agent",
    "slug": "antigravity-meta-agent",
    "description": "Advanced instructions for Google Antigravity to manage workspaces and subagents.",
    "frameworks": [
      "Antigravity"
    ],
    "content": "As an Antigravity agent:\n1. Always prioritize checking Knowledge Items (KIs) before conducting deep research.\n2. Use the `command_status` tool for background tasks instead of blocking.\n3. When writing markdown artifacts, strictly adhere to GitHub Flavored Markdown and use Alerts for critical info.\n4. Spawn subagents using `browser_subagent` when visual interactions or dynamic web scraping are required.",
    "author": "Deepmind Team",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-41",
    "name": "UI/UX Pro Max",
    "slug": "ui-ux-pro-max",
    "description": "Extensive styling and design instructions covering over 50 UI styles and shadcn/ui integration.",
    "frameworks": [
      "Cursor",
      "v0",
      "Claude Code"
    ],
    "content": "When acting as a UI/UX Designer:\n1. Adhere strictly to the requested aesthetic (e.g., Neumorphism, Glassmorphism, Brutalism).\n2. Automatically configure Tailwind configuration for appropriate color scales.\n3. Integrate headless UI components like shadcn/ui or Radix UI for accessible primitives.\n4. Ensure micro-interactions (hover, focus, active states) are always defined.",
    "author": "escapeboy",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-42",
    "name": "Senior Product Manager",
    "slug": "senior-product-manager",
    "description": "Forces the LLM to analyze product requirements, define user flows, and identify edge cases before coding.",
    "frameworks": [
      "Claude Code",
      "Cursor"
    ],
    "content": "Before writing any code, act as a Senior PM:\n1. Define the core user journey and 'Happy Path'.\n2. Outline UI/UX highlights that will delight the user.\n3. Identify at least 3 edge cases or failure modes and how the UI should handle them.\n4. Present a markdown specification for approval.",
    "author": "wwwazzz",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-43",
    "name": "Vibe Coding Optimizer",
    "slug": "vibe-coding-optimizer",
    "description": "Workflows for UI/UX improvements, performance optimization, and preparing apps for production.",
    "frameworks": [
      "Cursor",
      "Windsurf"
    ],
    "content": "When refining an application for production:\n1. Perform a 'Vibe Check'\u2014ensure animations are smooth (60fps) and transitions are natural.\n2. Run Lighthouse optimization checks mentally: minimize layout shifts (CLS) and optimize largest contentful paint (LCP).\n3. Clean up console.logs and unused CSS classes.\n4. Verify responsive design on mobile, tablet, and desktop breakpoints.",
    "author": "KhazP",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-44",
    "name": "Scientific Research Agent",
    "slug": "scientific-research-agent",
    "description": "Equips the agent with skills to parse scientific papers, query academic databases, and format LaTeX.",
    "frameworks": [
      "AutoGPT",
      "LangChain"
    ],
    "content": "As a Scientific Researcher:\n1. Use PubMed or ArXiv APIs to retrieve peer-reviewed literature.\n2. Summarize abstracts highlighting methodology and limitations.\n3. Format mathematical equations strictly in LaTeX.\n4. Provide inline citations in APA or IEEE format whenever stating a factual claim.",
    "author": "K-Dense-AI",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-45",
    "name": "Design System Enforcer",
    "slug": "design-system-enforcer",
    "description": "Strictly enforces existing design tokens, spacing scales, and typography defined in the project.",
    "frameworks": [
      "Cursor",
      "Copilot"
    ],
    "content": "When writing frontend code in this project:\n1. NEVER use arbitrary values in Tailwind (e.g., `w-[324px]`). Always use the defined spacing scale.\n2. Do not introduce new colors; use only the CSS variables defined in `globals.css` or the Tailwind config.\n3. Use predefined typography classes for headings and body text.\n4. If a requested component violates the design system, warn the user and suggest a compliant alternative.",
    "author": "spencergoldade",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-46",
    "name": "AI Agent Orchestrator",
    "slug": "ai-agent-orchestrator",
    "description": "Instructions for managing multiple sub-agents in a complex workflow (routing, delegation, aggregation).",
    "frameworks": [
      "AutoGen",
      "LangGraph"
    ],
    "content": "When orchestrating multiple agents:\n1. Define clear boundaries and responsibilities for each agent (e.g., Researcher, Coder, Reviewer).\n2. Ensure the output of one agent is correctly formatted as the input for the next.\n3. Implement a 'Supervisor' node that verifies the final aggregated output meets the original user request before presenting it.\n4. Handle timeouts or infinite loops gracefully by setting a maximum step limit.",
    "author": "repowise-dev",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-47",
    "name": "Next.js 16 & React 19 Architect",
    "slug": "nextjs-16-react-19-architect",
    "description": "Enforces cutting-edge Next.js 16 App Router paradigms, React 19 Server Components, Server Actions, and strict async params.",
    "frameworks": [
      "Cursor",
      "Claude Code",
      "Windsurf",
      "Cline"
    ],
    "content": "When developing in Next.js 16 & React 19:\n1. Strict Async Params: Always await `params` and `searchParams` in Page and Layout components (e.g. `const { slug } = await params;`).\n2. Server-First: Default to Server Components. Only add 'use client' when using browser hooks (useState, useEffect, event listeners).\n3. Data Mutation: Use React 19 Server Actions and `useActionState` / `useOptimistic` for forms instead of raw useEffect fetchers.\n4. Metadata & SEO: Always export typed `Metadata` objects or `generateMetadata` functions with Open Graph and Twitter cards.",
    "author": "dimasrahmanda",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-48",
    "name": "DeepSeek R1 Reasoning Prompter",
    "slug": "deepseek-r1-reasoning-prompter",
    "description": "Optimizes agent queries for deep reasoning models by encouraging zero-shot thinking, step verification, and mathematical rigor.",
    "frameworks": [
      "Cursor",
      "Claude Code",
      "Cline"
    ],
    "content": "When querying DeepSeek R1 or reasoning LLMs:\n1. Allow natural chain-of-thought exploration without artificial temperature manipulation (keep temp around 0.6).\n2. Format complex algorithmic questions with clear constraints, expected time/space complexity, and edge cases.\n3. Instruct the model to double-check boundary conditions (null, overflow, empty lists) before outputting final code blocks.\n4. Avoid overly verbose meta-prompts; direct problem statements yield the best reasoning traces.",
    "author": "dimasrahmanda",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-49",
    "name": "MCP Server Builder",
    "slug": "mcp-server-builder",
    "description": "Guidance and scaffolding rules for building high-performance Model Context Protocol (MCP) servers using TypeScript or Python.",
    "frameworks": [
      "Cursor",
      "Claude Code",
      "Roo Code"
    ],
    "content": "When authoring an MCP (Model Context Protocol) server:\n1. Use `@modelcontextprotocol/sdk` (TypeScript) or `mcp` (Python).\n2. Define structured JSON Schema for every tool with explicit parameter descriptions.\n3. Include resource templates (URIs) for data exposure and tools for actionable execution.\n4. Ensure error handling returns informative MCP ToolError messages rather than unhandled process crashes.\n5. Provide a stdio transport configuration snippet for Claude Desktop and Cline in the README.",
    "author": "dimasrahmanda",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-50",
    "name": "Claude Code Project Memory (CLAUDE.md)",
    "slug": "claude-code-project-memory",
    "description": "Structure and guidelines for maintaining a high-fidelity CLAUDE.md project context file for Anthropic's Claude Code CLI.",
    "frameworks": [
      "Claude Code"
    ],
    "content": "# CLAUDE.md Guidelines\nWhen maintaining CLAUDE.md for Claude Code CLI:\n1. Keep it concise and high-signal (< 200 lines).\n2. Document frequent terminal commands (build, test, lint, typecheck).\n3. Explicitly state code conventions, naming rules, and architectural patterns.\n4. Mention sensitive files or patterns the agent should never overwrite.\n5. Include guidelines on how git commits should be formatted.",
    "author": "dimasrahmanda",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-51",
    "name": "Tailwind CSS v4 Token Architecture",
    "slug": "tailwind-v4-token-architecture",
    "description": "Enforces modern Tailwind CSS v4 CSS-first configuration using @theme directives and native CSS variables.",
    "frameworks": [
      "Cursor",
      "Windsurf",
      "Copilot"
    ],
    "content": "When writing styling with Tailwind CSS v4:\n1. Configuration is CSS-first: Define design tokens in `globals.css` using `@theme` rather than a JS config file.\n2. Use CSS variables for semantic colors (`var(--background)`, `var(--primary)`).\n3. Utilize modern container queries and CSS color-mix functions where appropriate.\n4. Avoid legacy `@apply` chains; compose clean utility classes directly in JSX.",
    "author": "dimasrahmanda",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-52",
    "name": "Next.js 15 App Router & Server Actions Architect",
    "slug": "nextjs-15-app-router-expert",
    "description": "Master Next.js 15 App Router architecture with Server Components, async request headers/cookies, streaming, Turbopack, and type-safe Server Actions.",
    "frameworks": [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS"
    ],
    "content": "# Next.js 15 App Router Architecture\n1. Default to Server Components for layout and data fetching.\n2. In Next.js 15, params and searchParams in pages are async Promises.\n3. Validate Server Action inputs with Zod.\n4. Use Suspense for streaming UI.",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-53",
    "name": "Tailwind CSS v4 CSS-First Architecture",
    "slug": "tailwind-v4-expert",
    "description": "Best practices for Tailwind CSS v4 using @import tailwindcss, @theme inline variables, container queries, and class-based dark mode.",
    "frameworks": [
      "Tailwind CSS",
      "CSS",
      "React",
      "Next.js"
    ],
    "content": "# Tailwind CSS v4 Guidelines\n1. Configure themes via @theme inline.\n2. Declare @custom-variant dark for class-based dark mode.\n3. Avoid obsolete tailwind.config.js.\n4. Leverage container queries and subgrid.",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-54",
    "name": "FastAPI Async Microservices & Pydantic V2",
    "slug": "fastapi-async-pydantic-v2",
    "description": "High-performance asynchronous Python backend services using FastAPI, Pydantic V2, SQLAlchemy 2.0 async, and Docker deployment.",
    "frameworks": [
      "FastAPI",
      "Python",
      "Pydantic",
      "Docker"
    ],
    "content": "# FastAPI Production Standards\n1. Define I/O bound endpoints as async def.\n2. Use Pydantic V2 models for validation.\n3. Use Depends() for dependency injection.\n4. Structured JSON logging with correlation IDs.",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-55",
    "name": "PostgreSQL Query Optimizer & Indexing Strategist",
    "slug": "postgres-query-optimization",
    "description": "Expert guide for optimizing PostgreSQL performance, EXPLAIN ANALYZE interpretation, composite B-tree indexing, and connection pooling.",
    "frameworks": [
      "PostgreSQL",
      "SQL",
      "Database"
    ],
    "content": "# PostgreSQL Optimization Guide\n1. Verify EXPLAIN ANALYZE before deploying queries.\n2. Place most selective column first in composite indexes.\n3. Use Partial Indexes for targeted filtering.\n4. Configure connection pooling for serverless.",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-56",
    "name": "AI Agent Prompt Injection & Security Hardening",
    "slug": "ai-prompt-injection-defense",
    "description": "Defensive security patterns to protect AI agents, RAG systems, and tool-calling models against indirect prompt injection and jailbreaks.",
    "frameworks": [
      "Security",
      "LLM",
      "Python",
      "TypeScript"
    ],
    "content": "# AI Agent Security Protocol\n1. Treat all user input and retrieved context as untrusted.\n2. Isolate agent tool execution in microVM sandboxes.\n3. Validate and sanitize tool-call arguments.\n4. Enforce strict output schemas.",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-57",
    "name": "Docker & CI/CD GitHub Actions Workflow Master",
    "slug": "docker-github-actions-devops",
    "description": "Production-ready multi-stage Docker builds, image caching, security vulnerability scanning, and automated GitHub Actions CI/CD pipelines.",
    "frameworks": [
      "Docker",
      "GitHub Actions",
      "CI/CD",
      "DevOps"
    ],
    "content": "# Modern Docker & CI/CD Architecture\n1. Multi-stage Docker builds with non-root user execution.\n2. Cache Docker layers in GitHub Actions.\n3. Run automated linting and security scans on PR.\n4. Automated rollback on health check failure.",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-58",
    "name": "Model Context Protocol (MCP) Server Developer",
    "slug": "mcp-server-development",
    "description": "Build robust, type-safe Model Context Protocol servers in TypeScript and Python for Cursor, Claude Desktop, and autonomous agents.",
    "frameworks": [
      "MCP",
      "TypeScript",
      "Python",
      "Node.js"
    ],
    "content": "# MCP Server Developer Guide\n1. Expose typed JSON schemas for all tools.\n2. Implement stdio for desktop and SSE for cloud.\n3. Paginate large data sets.\n4. Provide structured error responses.",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-59",
    "name": "Clean Architecture & Domain-Driven Design (DDD)",
    "slug": "clean-architecture-ddd",
    "description": "Enterprise software architecture using Clean Architecture, Bounded Contexts, Value Objects, and Domain Events for maintainable systems.",
    "frameworks": [
      "Architecture",
      "TypeScript",
      "Java",
      "Go"
    ],
    "content": "# Clean Architecture & DDD\n1. Domain logic has zero dependencies on external frameworks.\n2. Use Repository Interfaces implemented by infrastructure.\n3. Encapsulate business rules in Value Objects.\n4. Decouple side-effects using Domain Events.",
    "createdAt": "2026-08-19T06:15:06.536Z"
  },
  {
    "id": "skill-60",
    "name": "GraphQL & Apollo Federation Architect",
    "slug": "graphql-federation-expert",
    "description": "Design and build high-performance GraphQL APIs, schema stitching, Apollo Federation v2 subgraphs, and DataLoader batching.",
    "frameworks": [
      "GraphQL",
      "Node.js",
      "TypeScript",
      "Apollo"
    ],
    "content": "# GraphQL & Apollo Federation Architecture\n1. Always use DataLoader to prevent N+1 query database bottlenecks.\n2. Keep subgraphs modular by business domain.\n3. Enforce strict input validation on mutations.\n4. Implement depth limiting and query complexity analysis.",
    "createdAt": "2026-08-19T06:18:21.615Z"
  },
  {
    "id": "skill-61",
    "name": "Redis Caching & Distributed Locks Master",
    "slug": "redis-caching-distributed-locks",
    "description": "Production patterns for Redis caching strategies (Cache-Aside, Write-Through), rate limiting with sliding windows, and Redlock distributed locking.",
    "frameworks": [
      "Redis",
      "Node.js",
      "Python",
      "Go"
    ],
    "content": "# Redis Production Best Practices\n1. Use Cache-Aside pattern with explicit TTL on all cached keys.\n2. Prevent cache stampedes using mutex locks or probabilistic early expiration.\n3. Implement Redlock for cross-instance distributed critical sections.\n4. Use Redis Streams or BullMQ for reliable background queues.",
    "createdAt": "2026-08-19T06:18:21.615Z"
  },
  {
    "id": "skill-62",
    "name": "Kubernetes & Helm Cloud-Native Operator",
    "slug": "kubernetes-helm-devops",
    "description": "Production Kubernetes deployment manifests, Helm charts, Horizontal Pod Autoscaling (HPA), Ingress-NGINX, and zero-downtime rolling updates.",
    "frameworks": [
      "Kubernetes",
      "Helm",
      "DevOps",
      "Docker"
    ],
    "content": "# Kubernetes Cloud-Native Deployment Guide\n1. Always specify resource requests and limits on all containers.\n2. Configure readinessProbe and livenessProbe with graceful shutdown periods.\n3. Use Helm value templates for environment-specific configs (dev/stage/prod).\n4. Implement Horizontal Pod Autoscaling based on CPU and custom metrics.",
    "createdAt": "2026-08-19T06:18:21.615Z"
  },
  {
    "id": "skill-63",
    "name": "Web Scraping & Browser Automation Engineer",
    "slug": "web-scraping-playwright-automation",
    "description": "Resilient web scraping using Playwright, stealth browsing, anti-bot bypass techniques, proxy rotation, and structured data extraction.",
    "frameworks": [
      "Playwright",
      "Python",
      "TypeScript",
      "Browser AI"
    ],
    "content": "# Web Scraping & Browser Automation Protocol\n1. Use Playwright with stealth evasions and randomized viewport headers.\n2. Implement exponential backoff and residential proxy rotation.\n3. Extract structured JSON using DOM selectors with fallback regex.\n4. Handle dynamic infinite-scroll pagination and rate limit traps.",
    "createdAt": "2026-08-19T06:18:21.615Z"
  },
  {
    "id": "skill-64",
    "name": "Zod & Runtime Type-Safety Validator",
    "slug": "zod-type-safety-expert",
    "description": "Expert schema definition, runtime validation, nested object transforms, custom error formatters, and TypeScript type inference with Zod.",
    "frameworks": [
      "Zod",
      "TypeScript",
      "Next.js",
      "React"
    ],
    "content": "# Zod Schema Architecture\n1. Define all API contract boundaries and environment variables with Zod.\n2. Infer TypeScript types directly using z.infer<typeof Schema>.\n3. Use .transform() and .refine() for business rule assertions.\n4. Format user-friendly validation error messages for forms.",
    "createdAt": "2026-08-19T06:18:21.615Z"
  },
  {
    "id": "skill-66",
    "name": "Rust WebAssembly (Wasm) Browser Engineer",
    "slug": "rust-wasm-developer",
    "description": "High-performance in-browser computation using Rust compiled to WebAssembly (Wasm), wasm-bindgen, Web Workers, and SIMD optimizations.",
    "frameworks": [
      "Rust",
      "WebAssembly",
      "TypeScript",
      "Performance"
    ],
    "content": "# Rust Wasm High-Performance Guide\n1. Use wasm-bindgen to export type-safe functions to JavaScript.\n2. Minimize serialization overhead by sharing ArrayBuffer and SharedArrayBuffer memory.\n3. Run heavy computational loops inside Web Workers to avoid freezing the UI thread.\n4. Enable LTO (Link-Time Optimization) and wasm-opt for minimal binary sizes.",
    "createdAt": "2026-08-19T06:31:20.575Z"
  },
  {
    "id": "skill-67",
    "name": "Solidity Smart Contract Security & Audit Specialist",
    "slug": "solidity-security-audit",
    "description": "Smart contract development, reentrancy guards, ERC standards (ERC-20, ERC-721, ERC-1155), Foundry testing, and Slither static analysis.",
    "frameworks": [
      "Solidity",
      "Foundry",
      "Ethereum",
      "Security"
    ],
    "content": "# Solidity Smart Contract Security Protocol\n1. Always adhere to the Checks-Effects-Interactions pattern to prevent reentrancy attacks.\n2. Use OpenZeppelin audited contracts for token standards and access control.\n3. Run comprehensive fuzz tests and invariant testing using Foundry.\n4. Audit bytecode with Slither and Mythril before mainnet deployment.",
    "createdAt": "2026-08-19T06:31:20.575Z"
  },
  {
    "id": "skill-68",
    "name": "TanStack Query (React Query) Async State Master",
    "slug": "tanstack-query-master",
    "description": "Production async state management with TanStack Query v5, query key factories, optimistic updates, pagination, and prefetching.",
    "frameworks": [
      "React Query",
      "TypeScript",
      "React",
      "Next.js"
    ],
    "content": "# TanStack Query v5 Architecture\n1. Centralize query keys using Query Key Factory pattern for deterministic cache invalidation.\n2. Implement optimistic updates for snappy UI interactions with rollback on mutation failure.\n3. Configure staleTime and gcTime appropriately to eliminate redundant network fetches.\n4. Use select function to memoize and transform server response structures.",
    "createdAt": "2026-08-19T06:31:20.575Z"
  },
  {
    "id": "skill-69",
    "name": "tRPC End-to-End Type-Safe API Architect",
    "slug": "trpc-typesafe-api-expert",
    "description": "Build fully type-safe fullstack applications without code generation using tRPC v11, procedure middlewares, Zod validation, and React Query.",
    "frameworks": [
      "tRPC",
      "TypeScript",
      "Next.js",
      "React"
    ],
    "content": "# tRPC End-to-End Type-Safety Guidelines\n1. Define modular sub-routers split by domain boundary.\n2. Enforce authentication and role permissions inside reusable procedure middlewares.\n3. Validate all input payloads strictly with Zod schemas.\n4. Handle server errors gracefully using TRPCError with standard HTTP status codes.",
    "createdAt": "2026-08-19T06:31:20.575Z"
  },
  {
    "id": "skill-70",
    "name": "Prisma & Drizzle ORM Schema Migration Specialist",
    "slug": "prisma-drizzle-orm-expert",
    "description": "Database schema modeling, type-safe migrations, zero-downtime column alterations, and high-performance SQL query tuning with Prisma & Drizzle.",
    "frameworks": [
      "Prisma",
      "Drizzle ORM",
      "TypeScript",
      "PostgreSQL"
    ],
    "content": "# Prisma & Drizzle ORM Best Practices\n1. Keep schema migrations modular and version-controlled with reversible rollback scripts.\n2. Use Drizzle ORM for latency-critical serverless edge backends.\n3. Avoid N+1 relation queries by leveraging explicit joins and relation queries.\n4. Enforce strict foreign key constraints and cascade rules at the database level.",
    "createdAt": "2026-08-19T06:31:20.575Z"
  },
  {
    "id": "skill-71",
    "name": "Event-Driven Microservices with Kafka & RabbitMQ",
    "slug": "event-driven-microservices",
    "description": "Scalable distributed systems architecture using Event Sourcing, Outbox Pattern, Apache Kafka partition keys, and RabbitMQ dead-letter exchanges.",
    "frameworks": [
      "Kafka",
      "RabbitMQ",
      "Architecture",
      "Go",
      "Node.js"
    ],
    "content": "# Event-Driven Microservices Architecture\n1. Implement the Transactional Outbox Pattern to guarantee message delivery with database commits.\n2. Choose partition keys strategically to maintain strict message ordering per entity.\n3. Configure Dead Letter Queues (DLQ) with automated retry policies for poison-pill messages.\n4. Version event schemas using Apache Avro or JSON Schema registries.",
    "createdAt": "2026-08-19T06:31:20.575Z"
  },
  {
    "id": "skill-72",
    "name": "Technical SEO, Structured Data & Core Web Vitals Architect",
    "slug": "technical-seo-web-vitals",
    "description": "Optimize web applications for Google search rankings, JSON-LD Schema.org markup, semantic HTML, and sub-second Core Web Vitals (LCP, INP, CLS).",
    "frameworks": [
      "SEO",
      "Next.js",
      "HTML",
      "Performance"
    ],
    "content": "# Technical SEO & Core Web Vitals Standards\n1. Ensure canonical URLs, dynamic XML sitemaps, and robots.txt are generated correctly.\n2. Inject structured Schema.org JSON-LD (SoftwareApplication, Article, BreadcrumbList).\n3. Keep Largest Contentful Paint (LCP) under 1.2s by optimizing hero image preloads.\n4. Minimize Interaction to Next Paint (INP) by breaking long JavaScript tasks.",
    "createdAt": "2026-08-19T06:31:20.575Z"
  },
  {
    "id": "skill-73",
    "name": "Stripe Subscriptions & Webhook Idempotency Engineer",
    "slug": "stripe-payments-webhook-architect",
    "description": "Flawless Stripe billing integration, recurring subscriptions, customer portal, webhook signature verification, and idempotent transaction processing.",
    "frameworks": [
      "Stripe",
      "TypeScript",
      "Node.js",
      "Next.js"
    ],
    "content": "# Stripe Payments & Webhooks Architecture\n1. Always verify Stripe webhook signatures using stripe.webhooks.constructEvent.\n2. Store processed event IDs in your database to ensure idempotent handling of duplicate webhooks.\n3. Update user subscription status based on customer.subscription.updated and invoice.payment_failed.\n4. Use Stripe Customer Portal for secure self-serve billing and card updates.",
    "createdAt": "2026-08-19T06:31:20.575Z"
  },
  {
    "id": "skill-74",
    "name": "Advanced RAG: Chunking, Hybrid Search & Cohere Rerank",
    "slug": "advanced-rag-hybrid-search-rerank",
    "description": "Enterprise Retrieval-Augmented Generation using semantic chunking, BM25 + dense hybrid search, cross-encoder reranking, and contextual compression.",
    "frameworks": [
      "RAG",
      "Python",
      "TypeScript",
      "Vector Database"
    ],
    "content": "# Advanced RAG Architecture Guide\n1. Use Semantic Chunking or Document Hierarchy chunking rather than naive fixed token splits.\n2. Combine BM25 keyword search with dense vector similarity using Reciprocal Rank Fusion (RRF).\n3. Pass top 25 retrieved candidates through Cohere Rerank (cross-encoder) to select top 5.\n4. Inject contextual document summaries directly into chunk headers for higher retrieval accuracy.",
    "createdAt": "2026-08-19T06:31:20.575Z"
  },
  {
    "id": "skill-75",
    "name": "Linux eBPF Performance Profiler & Kernel Observability",
    "slug": "linux-ebpf-profiler",
    "description": "Low-overhead Linux kernel observability, CPU profiling, memory leak detection, and network latency tracing using eBPF and BCC tools.",
    "frameworks": [
      "Linux",
      "eBPF",
      "C",
      "Performance"
    ],
    "content": "# Linux eBPF Performance Profiling Protocol\n1. Use bpftrace and BCC tools to attach to kernel kprobes and tracepoints with near-zero overhead.\n2. Profile on-CPU and off-CPU latency bottlenecks using flame graphs.\n3. Monitor TCP socket retransmissions and dropped packets at the kernel interface.\n4. Inspect system call frequency and memory page faults per container process.",
    "createdAt": "2026-08-19T06:31:20.575Z"
  },
  {
    "id": "skill-76",
    "name": "Svelte 5 Runes & Modern Reactive Architecture",
    "slug": "svelte-5-runes-expert",
    "description": "Master Svelte 5 universal reactivity using runes ($state, $derived, $effect), snippet composition, and high-performance client rendering.",
    "frameworks": [
      "Svelte",
      "TypeScript",
      "JavaScript"
    ],
    "content": "# Svelte 5 Runes Architecture Guide\n1. Use $state for fine-grained reactive variables and $derived for computed state.\n2. Keep $effect minimal and avoid using it for state synchronization.\n3. Use snippets instead of slots for reusable, type-safe component templates.\n4. Prefer universal reactivity in .svelte.ts files for shared store logic.",
    "createdAt": "2026-08-19T07:57:39.635Z"
  },
  {
    "id": "skill-77",
    "name": "Vue 3 Composition API & Nuxt 3 Fullstack Master",
    "slug": "vue-3-nuxt-3-master",
    "description": "Production-ready fullstack Vue 3 applications with Nuxt 3, Nitro server engine, Pinia state stores, and auto-imports.",
    "frameworks": [
      "Vue",
      "Nuxt.js",
      "TypeScript",
      "Tailwind CSS"
    ],
    "content": "# Nuxt 3 & Vue 3 Composition Architecture\n1. Use script setup with TypeScript and explicit defineProps/defineEmits.\n2. Leverage useAsyncData and useFetch with unique keys for SSR data hydration.\n3. Organize persistent global state inside modular Pinia stores.\n4. Write lightweight server API routes under server/api/ using Nitro engine.",
    "createdAt": "2026-08-19T07:57:39.635Z"
  },
  {
    "id": "skill-78",
    "name": "Rust Async Tokio & Actor Concurrency Expert",
    "slug": "rust-tokio-async-concurrency",
    "description": "Build ultra-fast async networking and distributed systems using Rust Tokio runtime, mpsc channels, Arc/Mutex, and async-trait.",
    "frameworks": [
      "Rust",
      "Tokio",
      "Async",
      "Backend"
    ],
    "content": "# Rust Async Tokio Concurrency Architecture\n1. Never block the Tokio executor thread with synchronous I/O or heavy CPU calculations (use spawn_blocking).\n2. Communicate between tasks using Tokio mpsc or broadcast channels instead of shared mutable state.\n3. Implement graceful shutdown using tokio::select! and CancellationToken.\n4. Structure actor loops with message enums for isolated state ownership.",
    "createdAt": "2026-08-19T07:57:39.635Z"
  },
  {
    "id": "skill-79",
    "name": "Go Microservices: Concurrency, Channels & gRPC",
    "slug": "golang-microservices-grpc",
    "description": "High-throughput Go 1.22+ backend microservices with goroutines, channels, context cancellation, and gRPC protocol buffers.",
    "frameworks": [
      "Go",
      "gRPC",
      "Microservices",
      "Docker"
    ],
    "content": "# Go Microservices & Concurrency Best Practices\n1. Always propagate context.Context across all I/O and database operations.\n2. Prevent goroutine leaks by ensuring channel receivers have exit conditions.\n3. Define type-safe service contracts using Protobuf v3 with gRPC-Go.\n4. Implement structured slog logging and Prometheus metrics middleware.",
    "createdAt": "2026-08-19T07:57:39.635Z"
  },
  {
    "id": "skill-80",
    "name": "Cloudflare Workers & Hono Edge API Specialist",
    "slug": "cloudflare-workers-hono-expert",
    "description": "Ultra-low latency serverless edge applications using Cloudflare Workers, Hono web framework, Cloudflare D1 (SQL), and KV caching.",
    "frameworks": [
      "Cloudflare",
      "Hono",
      "TypeScript",
      "Serverless"
    ],
    "content": "# Cloudflare Workers & Hono Edge Architecture\n1. Use Hono for lightweight, zero-dependency routing on the edge runtime.\n2. Store relational data in Cloudflare D1 with prepared statements.\n3. Cache read-heavy API responses using Cloudflare Workers KV and Cache API.\n4. Deploy with Wrangler CLI using modular environment bindings.",
    "createdAt": "2026-08-19T07:57:39.635Z"
  },
  {
    "id": "skill-81",
    "name": "WebSockets & WebRTC Real-Time Streaming Engineer",
    "slug": "websockets-webrtc-realtime",
    "description": "Low-latency bidirectional audio/video streaming, data channels, heartbeat keep-alive, and horizontal websocket scaling with Redis PUB/SUB.",
    "frameworks": [
      "WebSockets",
      "WebRTC",
      "Node.js",
      "TypeScript"
    ],
    "content": "# WebSockets & WebRTC Real-Time Architecture\n1. Implement ping/pong heartbeat intervals to detect broken network connections.\n2. Scale WebSocket connections across multiple nodes using Redis PUB/SUB adapters.\n3. Use WebRTC DataChannels for ultra-low latency peer-to-peer binary streaming.\n4. Handle client reconnects with exponential backoff and message queue buffers.",
    "createdAt": "2026-08-19T07:57:39.635Z"
  },
  {
    "id": "skill-82",
    "name": "Distributed Tracing & Metrics with OpenTelemetry",
    "slug": "opentelemetry-distributed-tracing",
    "description": "End-to-end observability, auto-instrumentation, trace context propagation (W3C), and metric exports to Jaeger, Prometheus, and Grafana.",
    "frameworks": [
      "OpenTelemetry",
      "DevOps",
      "Observability",
      "Node.js"
    ],
    "content": "# OpenTelemetry Observability Protocol\n1. Instrument HTTP servers and database clients using OpenTelemetry SDK.\n2. Propagate traceparent and tracestate W3C headers across service boundaries.\n3. Attach business context attributes to spans without logging sensitive PII.\n4. Export spans and metrics via OTLP gRPC collector for minimal overhead.",
    "createdAt": "2026-08-19T07:57:39.635Z"
  },
  {
    "id": "skill-83",
    "name": "Enterprise Monorepo Architect with Turborepo & pnpm",
    "slug": "turborepo-pnpm-monorepo-master",
    "description": "High-speed monorepo workspace architecture with pnpm workspaces, Turborepo remote caching, internal package sharing, and boundary linting.",
    "frameworks": [
      "Turborepo",
      "pnpm",
      "TypeScript",
      "Next.js"
    ],
    "content": "# Turborepo & pnpm Monorepo Architecture\n1. Define pipeline task dependencies and cache hash inputs inside turbo.json.\n2. Share internal UI and utility packages using TypeScript path aliases and package.json exports.\n3. Enable remote caching in CI pipelines to achieve instant sub-minute builds.\n4. Enforce strict boundary rules between apps and internal packages.",
    "createdAt": "2026-08-19T07:57:39.635Z"
  },
  {
    "id": "skill-84",
    "name": "Accessibility (a11y) & WCAG 2.2 AAA Standards Master",
    "slug": "wcag-accessibility-expert",
    "description": "Accessible web development meeting WCAG 2.2 AAA guidelines: keyboard navigation, ARIA landmarks, screen reader announcements, and focus management.",
    "frameworks": [
      "Accessibility",
      "HTML",
      "React",
      "CSS"
    ],
    "content": "# Accessibility & WCAG 2.2 Guidelines\n1. Ensure all interactive components are fully operable via Keyboard (Tab, Enter, Space, Escape).\n2. Maintain minimum color contrast ratios (4.5:1 for normal text, 7:1 for AAA).\n3. Use semantic HTML elements (<button>, <nav>, <main>) before resorting to ARIA roles.\n4. Manage modal focus traps and announce dynamic state changes with aria-live.",
    "createdAt": "2026-08-19T07:57:39.635Z"
  },
  {
    "id": "skill-85",
    "name": "Multi-Agent Swarm Orchestration & Consensus Protocol",
    "slug": "multi-agent-swarm-orchestrator",
    "description": "Design autonomous multi-agent swarms with supervisor routing, voting consensus, tool delegation, and hierarchical memory architectures.",
    "frameworks": [
      "Autonomous Agent",
      "Python",
      "TypeScript",
      "LangGraph"
    ],
    "content": "# Multi-Agent Swarm Orchestration Protocol\n1. Implement hierarchical supervisor agents to route tasks to domain specialists.\n2. Use majority voting and debate consensus algorithms for high-stakes decisions.\n3. Isolate subagent context windows to prevent token budget depletion.\n4. Provide deterministic checkpointing and rollback capabilities on agent failure.",
    "createdAt": "2026-08-19T07:57:39.635Z"
  },
  {
    "id": "skill-86",
    "name": "TDD Workflow",
    "slug": "tdd-workflow",
    "description": "Complete test-driven development workflow: plan \u2192 RED (failing test) \u2192 GREEN (minimal impl) \u2192 REFACTOR \u2192 verify.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# TDD Workflow\n\nComplete test-driven development workflow: plan \u2192 RED (failing test) \u2192 GREEN (minimal impl) \u2192 REFACTOR \u2192 verify.\n\n## Use Case\nBuilding any feature where correctness is critical. Start with a failing test, implement the minimum to pass, then clean up.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **TDD Workflow** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-87",
    "name": "Context Budget",
    "slug": "context-budget",
    "description": "Monitor and manage LLM context window usage to avoid degradation. Track token consumption, trigger compaction at 70%, and save session state before limits are hit.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Context Budget\n\nMonitor and manage LLM context window usage to avoid degradation. Track token consumption, trigger compaction at 70%, and save session state before limits are hit.\n\n## Use Case\nLong coding sessions, large codebases, or complex multi-step tasks where context window pressure builds up.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Context Budget** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-88",
    "name": "Continuous Learning",
    "slug": "continuous-learning",
    "description": "Automatically capture and persist learnings from each coding session. Extract patterns, mistakes, and insights into a reusable memory file.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Memory"
    ],
    "content": "# Continuous Learning\n\nAutomatically capture and persist learnings from each coding session. Extract patterns, mistakes, and insights into a reusable memory file.\n\n## Use Case\nLong-running projects where agent needs to accumulate knowledge about codebase conventions and gotchas.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Continuous Learning** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-89",
    "name": "Search First",
    "slug": "search-first",
    "description": "Always search and read existing code before writing new code. Prevents duplication and respects existing architecture.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Search First\n\nAlways search and read existing code before writing new code. Prevents duplication and respects existing architecture.\n\n## Use Case\nAny coding task in an existing codebase. Prevents creating duplicate functions/classes.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Search First** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-90",
    "name": "Code Review Fresh Context",
    "slug": "code-review-fresh-context",
    "description": "Review code from a completely fresh perspective with zero author assumptions. Catches logic bugs, security gaps, and maintainability issues.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Code Review"
    ],
    "content": "# Code Review Fresh Context\n\nReview code from a completely fresh perspective with zero author assumptions. Catches logic bugs, security gaps, and maintainability issues.\n\n## Use Case\nAfter implementing a feature. Run an unbiased secondary agent pass without historical baggage.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Code Review Fresh Context** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-91",
    "name": "Build Fix",
    "slug": "build-fix",
    "description": "Systematically diagnose and repair broken builds, CI failures, and compilation errors by analyzing full error logs before editing.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Build Fix\n\nSystematically diagnose and repair broken builds, CI failures, and compilation errors by analyzing full error logs before editing.\n\n## Use Case\nCI failures, compiler errors, or broken dependencies preventing execution.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Build Fix** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-92",
    "name": "Refactor Clean",
    "slug": "refactor-clean",
    "description": "Clean up technical debt, dead code, and bloated functions without altering runtime behavior. Verified by automated tests.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Refactor Clean\n\nClean up technical debt, dead code, and bloated functions without altering runtime behavior. Verified by automated tests.\n\n## Use Case\nPost-feature cleanup, eliminating legacy hacks, improving naming and modularity.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Refactor Clean** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-93",
    "name": "Save Session",
    "slug": "save-session",
    "description": "Snapshot current work state before ending a session: completed items, pending tasks, design choices, and context summary.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Memory"
    ],
    "content": "# Save Session\n\nSnapshot current work state before ending a session: completed items, pending tasks, design choices, and context summary.\n\n## Use Case\nEnding an agent session to ensure seamless resumption in the next session.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Save Session** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-94",
    "name": "Resume Session",
    "slug": "resume-session",
    "description": "Load and reconstruct context from a saved session state without re-reading the entire codebase.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Memory"
    ],
    "content": "# Resume Session\n\nLoad and reconstruct context from a saved session state without re-reading the entire codebase.\n\n## Use Case\nStarting a new agent turn on an existing project to immediately continue pending work.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Resume Session** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-95",
    "name": "Learn Eval",
    "slug": "learn-eval",
    "description": "Evaluate lessons learned in the current session: what succeeded, what failed, and record anti-patterns to avoid.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Learning"
    ],
    "content": "# Learn Eval\n\nEvaluate lessons learned in the current session: what succeeded, what failed, and record anti-patterns to avoid.\n\n## Use Case\nContinuous self-improvement loop for autonomous coding agents.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Learn Eval** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-96",
    "name": "Security Scan",
    "slug": "security-scan",
    "description": "AgentShield security audit: scan for prompt injections, secret leaks, vulnerable dependencies, and insecure MCP configs.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Cursor"
    ],
    "content": "# Security Scan\n\nAgentShield security audit: scan for prompt injections, secret leaks, vulnerable dependencies, and insecure MCP configs.\n\n## Use Case\nPre-deployment checks and PR reviews to prevent malicious injections or leaked keys.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n- Cursor\n\n## Core Engineering Rules\n1. Apply the **Security Scan** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-97",
    "name": "Plan First",
    "slug": "plan-first",
    "description": "Formulate a concrete, atomic plan before making code modifications. Align on architecture and edge cases upfront.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Plan First\n\nFormulate a concrete, atomic plan before making code modifications. Align on architecture and edge cases upfront.\n\n## Use Case\nAny non-trivial task requiring multi-file edits or database migrations.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Plan First** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-98",
    "name": "Verification Loop",
    "slug": "verification-loop",
    "description": "Rigorous post-implementation verification: run test suites, check edge cases, inspect UI states, and validate acceptance criteria.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Verification Loop\n\nRigorous post-implementation verification: run test suites, check edge cases, inspect UI states, and validate acceptance criteria.\n\n## Use Case\nThe closing phase of plan-implement-verify loop ensuring 100% working delivery.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Verification Loop** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-99",
    "name": "Unified Memory",
    "slug": "unified-memory",
    "description": "Single persistent memory store for project facts, architectural decisions, and agent guidelines shared across tools.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Memory"
    ],
    "content": "# Unified Memory\n\nSingle persistent memory store for project facts, architectural decisions, and agent guidelines shared across tools.\n\n## Use Case\nMulti-agent coordination and long-term project development.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Unified Memory** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-100",
    "name": "Agent Introspection Debugging",
    "slug": "agent-introspection-debugging",
    "description": "Debug agent failure modes by evaluating its own reasoning chain, tool inputs, and decision deviations.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Debugging"
    ],
    "content": "# Agent Introspection Debugging\n\nDebug agent failure modes by evaluating its own reasoning chain, tool inputs, and decision deviations.\n\n## Use Case\nWhen an agent gets stuck in infinite loops or generates suboptimal solutions.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Agent Introspection Debugging** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-101",
    "name": "Deep Research",
    "slug": "deep-research",
    "description": "Multi-source research workflow: fetch documentation, synthesize technical tradeoffs, and verify contradictory claims.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Deep Research\n\nMulti-source research workflow: fetch documentation, synthesize technical tradeoffs, and verify contradictory claims.\n\n## Use Case\nAdopting unfamiliar frameworks, debugging obscure SDK quirks, or designing system architecture.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Deep Research** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-102",
    "name": "Documentation Lookup",
    "slug": "documentation-lookup",
    "description": "Fetch live official API specifications and library guides before coding to avoid outdated hallucinations.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Documentation Lookup\n\nFetch live official API specifications and library guides before coding to avoid outdated hallucinations.\n\n## Use Case\nWorking with rapidly changing libraries (Next.js 15, Tailwind v4, Bun, LangChain).\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Documentation Lookup** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-103",
    "name": "Eval Harness",
    "slug": "eval-harness",
    "description": "Automated benchmark evaluation harness: run prompt test suites, compute assertion accuracy, and score model consistency.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Evaluation"
    ],
    "content": "# Eval Harness\n\nAutomated benchmark evaluation harness: run prompt test suites, compute assertion accuracy, and score model consistency.\n\n## Use Case\nBuilding and testing enterprise LLM features with quantitative quality metrics.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Eval Harness** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-104",
    "name": "Benchmark Methodology",
    "slug": "benchmark-methodology",
    "description": "Statistically rigorous benchmarking: warmup cycles, memory heap inspection, latency percentiles (p50/p95/p99).",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Benchmark Methodology\n\nStatistically rigorous benchmarking: warmup cycles, memory heap inspection, latency percentiles (p50/p95/p99).\n\n## Use Case\nPerformance optimization comparisons and latency bottleneck diagnosis.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Benchmark Methodology** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-105",
    "name": "MCP Server Patterns",
    "slug": "mcp-server-patterns",
    "description": "Production MCP (Model Context Protocol) server engineering: tool definition, Zod schema validation, stdio/SSE transports, and error recovery.",
    "frameworks": [
      "Claude Code",
      "Antigravity",
      "Codex",
      "MCP"
    ],
    "content": "# MCP Server Patterns\n\nProduction MCP (Model Context Protocol) server engineering: tool definition, Zod schema validation, stdio/SSE transports, and error recovery.\n\n## Use Case\nBuilding custom MCP tools for Claude Code, Antigravity, and OpenAI Codex.\n\n## Supported Platforms\n- Claude Code\n- Antigravity\n- Codex\n\n## Core Engineering Rules\n1. Apply the **MCP Server Patterns** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-106",
    "name": "API Design",
    "slug": "api-design",
    "description": "RESTful & RPC API design standards: predictable URI naming, idempotency keys, RFC 7807 error responses, and semantic versioning.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# API Design\n\nRESTful & RPC API design standards: predictable URI naming, idempotency keys, RFC 7807 error responses, and semantic versioning.\n\n## Use Case\nDesigning backend contracts that scale cleanly across frontend, mobile, and third-party consumers.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **API Design** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-107",
    "name": "Backend Patterns",
    "slug": "backend-patterns",
    "description": "Clean backend architecture: layered domain services, repository pattern, database transaction boundaries, and structured logging.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Backend Patterns\n\nClean backend architecture: layered domain services, repository pattern, database transaction boundaries, and structured logging.\n\n## Use Case\nEnterprise server development in Node.js, Go, Python, Rust, and Java.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Backend Patterns** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-108",
    "name": "Frontend Patterns",
    "slug": "frontend-patterns",
    "description": "Component composition, server-side data fetching, atomic UI design, accessibility, and state management in React/Next.js.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Frontend Patterns\n\nComponent composition, server-side data fetching, atomic UI design, accessibility, and state management in React/Next.js.\n\n## Use Case\nModern web frontend application development.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Frontend Patterns** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-109",
    "name": "Coding Standards",
    "slug": "coding-standards",
    "description": "Universal clean code principles: single responsibility, small functions, strict type discipline, and self-documenting naming.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Coding Standards\n\nUniversal clean code principles: single responsibility, small functions, strict type discipline, and self-documenting naming.\n\n## Use Case\nEstablishing high code quality baselines for AI coding assistants across any language.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Coding Standards** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-110",
    "name": "E2E Testing",
    "slug": "e2e-testing",
    "description": "End-to-end browser automation with Playwright and Cypress: test isolation, realistic authentication mocks, and visual diff checks.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# E2E Testing\n\nEnd-to-end browser automation with Playwright and Cypress: test isolation, realistic authentication mocks, and visual diff checks.\n\n## Use Case\nCritical user checkout, onboarding, and auth flow test automation.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **E2E Testing** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-111",
    "name": "MLE Workflow",
    "slug": "mle-workflow",
    "description": "Machine learning engineering pipeline: data ingestion, feature validation, model tracking (MLflow/W&B), and containerized deployment.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# MLE Workflow\n\nMachine learning engineering pipeline: data ingestion, feature validation, model tracking (MLflow/W&B), and containerized deployment.\n\n## Use Case\nProductionizing ML models with reproducible training and automated evaluation.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **MLE Workflow** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-112",
    "name": "Agent Sort",
    "slug": "agent-sort",
    "description": "Task routing taxonomy for multi-agent systems: categorizes tasks by complexity and assigns to specialized agents.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Multi-Agent"
    ],
    "content": "# Agent Sort\n\nTask routing taxonomy for multi-agent systems: categorizes tasks by complexity and assigns to specialized agents.\n\n## Use Case\nDispatching tasks dynamically in multi-agent orchestration systems.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Agent Sort** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-113",
    "name": "Dmux Workflows",
    "slug": "dmux-workflows",
    "description": "Parallel agent execution using terminal multiplexer sessions: run concurrent refactoring, testing, and documentation jobs.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Parallel"
    ],
    "content": "# Dmux Workflows\n\nParallel agent execution using terminal multiplexer sessions: run concurrent refactoring, testing, and documentation jobs.\n\n## Use Case\nScaling productivity by executing independent tasks across multiple concurrent agent processes.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Dmux Workflows** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-114",
    "name": "Strategic Compact",
    "slug": "strategic-compact",
    "description": "Context summarization algorithm that discards ephemeral tool outputs while preserving high-level architectural goals.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Context"
    ],
    "content": "# Strategic Compact\n\nContext summarization algorithm that discards ephemeral tool outputs while preserving high-level architectural goals.\n\n## Use Case\nPreventing context bloat and hallucination during massive refactoring sessions.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Strategic Compact** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-115",
    "name": "Plan Canvas",
    "slug": "plan-canvas",
    "description": "Visual system modeling canvas: maps bounded contexts, API endpoints, entity relationships, and execution phases before coding.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Plan Canvas\n\nVisual system modeling canvas: maps bounded contexts, API endpoints, entity relationships, and execution phases before coding.\n\n## Use Case\nComplex system design and multi-service migration architecture.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Plan Canvas** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-116",
    "name": "Agent Architecture Audit",
    "slug": "agent-architecture-audit",
    "description": "Comprehensive audit of agent prompt configs, tool permissions, memory adapters, and safety boundaries.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Agent"
    ],
    "content": "# Agent Architecture Audit\n\nComprehensive audit of agent prompt configs, tool permissions, memory adapters, and safety boundaries.\n\n## Use Case\nOptimizing agent harnesses and fixing reliability bottlenecks.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Agent Architecture Audit** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-117",
    "name": "Agent Eval",
    "slug": "agent-eval",
    "description": "Automated benchmark evaluation measuring agent task completion, tool call accuracy, and context efficiency.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Agent"
    ],
    "content": "# Agent Eval\n\nAutomated benchmark evaluation measuring agent task completion, tool call accuracy, and context efficiency.\n\n## Use Case\nTracking agent quality regressions during system updates.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Agent Eval** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-118",
    "name": "Agent Harness Construction",
    "slug": "agent-harness-construction",
    "description": "Build custom agent harnesses with CLI hooks, skill discovery, persistent scratchpads, and MCP client bridges.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Cursor"
    ],
    "content": "# Agent Harness Construction\n\nBuild custom agent harnesses with CLI hooks, skill discovery, persistent scratchpads, and MCP client bridges.\n\n## Use Case\nCreating tailored developer agent environments for proprietary internal codebases.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n- Cursor\n\n## Core Engineering Rules\n1. Apply the **Agent Harness Construction** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-119",
    "name": "Agent Payment X402",
    "slug": "agent-payment-x402",
    "description": "Autonomous agent micro-transactions using the X402 HTTP 402 payment standard for API metering and compute credits.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Payments"
    ],
    "content": "# Agent Payment X402\n\nAutonomous agent micro-transactions using the X402 HTTP 402 payment standard for API metering and compute credits.\n\n## Use Case\nAutonomous agents paying for third-party compute, APIs, and data streams on demand.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Agent Payment X402** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-120",
    "name": "Agent Self Evaluation",
    "slug": "agent-self-evaluation",
    "description": "Pre-delivery self-audit: checks output against acceptance criteria, verifies types, and tests for regressions.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Self-Review"
    ],
    "content": "# Agent Self Evaluation\n\nPre-delivery self-audit: checks output against acceptance criteria, verifies types, and tests for regressions.\n\n## Use Case\nHigh-stakes autonomous task execution where human review is minimal.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Agent Self Evaluation** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-121",
    "name": "Agentic Engineering",
    "slug": "agentic-engineering",
    "description": "Software engineering designed for agent collaboration: deterministic tools, structured outputs, and observable side-effects.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Agentic Engineering\n\nSoftware engineering designed for agent collaboration: deterministic tools, structured outputs, and observable side-effects.\n\n## Use Case\nBuilding codebases that are easy for both humans and AI agents to navigate and modify.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Agentic Engineering** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-122",
    "name": "Agentic OS",
    "slug": "agentic-os",
    "description": "Process scheduling, inter-agent messaging, memory locks, and sandboxed compute environments for multi-agent swarms.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "OS"
    ],
    "content": "# Agentic OS\n\nProcess scheduling, inter-agent messaging, memory locks, and sandboxed compute environments for multi-agent swarms.\n\n## Use Case\nManaging swarms of agents operating concurrently on shared infrastructure.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Agentic OS** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-123",
    "name": "AI First Engineering",
    "slug": "ai-first-engineering",
    "description": "Architecting software from day one around AI agents, generative APIs, vector indexes, and semantic search.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# AI First Engineering\n\nArchitecting software from day one around AI agents, generative APIs, vector indexes, and semantic search.\n\n## Use Case\nCreating modern AI-native SaaS products and development platforms.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **AI First Engineering** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-124",
    "name": "AI Regression Testing",
    "slug": "ai-regression-testing",
    "description": "Regression test suites detecting behavioral shifts and output degradations across foundation model upgrades.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Testing"
    ],
    "content": "# AI Regression Testing\n\nRegression test suites detecting behavioral shifts and output degradations across foundation model upgrades.\n\n## Use Case\nProtecting production LLM pipelines when updating models from 4o to 5 or Sonnet 3.5 to 3.7.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **AI Regression Testing** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-125",
    "name": "Android Clean Architecture",
    "slug": "android-clean-architecture",
    "description": "Android Clean Architecture with Jetpack Compose, Kotlin Coroutines/Flow, Hilt dependency injection, and Room DB.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Android Clean Architecture\n\nAndroid Clean Architecture with Jetpack Compose, Kotlin Coroutines/Flow, Hilt dependency injection, and Room DB.\n\n## Use Case\nScalable, testable, enterprise-ready Android application development.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Android Clean Architecture** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-126",
    "name": "Angular Developer",
    "slug": "angular-developer",
    "description": "Angular 18+ development with Signals, Standalone Components, deferrable views, and NgRx state management.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Angular Developer\n\nAngular 18+ development with Signals, Standalone Components, deferrable views, and NgRx state management.\n\n## Use Case\nModern enterprise single-page applications with reactive change detection.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Angular Developer** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-127",
    "name": "API Connector Builder",
    "slug": "api-connector-builder",
    "description": "Type-safe API client generation from OpenAPI/Swagger specs with exponential backoff retries and token refresh.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# API Connector Builder\n\nType-safe API client generation from OpenAPI/Swagger specs with exponential backoff retries and token refresh.\n\n## Use Case\nIntegrating third-party SaaS APIs into backend microservices.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **API Connector Builder** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-128",
    "name": "Architecture Decision Records",
    "slug": "architecture-decision-records",
    "description": "ADR methodology: documenting technical context, decision drivers, considered options, and trade-offs.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Architecture Decision Records\n\nADR methodology: documenting technical context, decision drivers, considered options, and trade-offs.\n\n## Use Case\nPreserving institutional knowledge and design rationale for long-term codebase evolution.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Architecture Decision Records** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-129",
    "name": "Article Writing",
    "slug": "article-writing",
    "description": "Technical writing framework: clear introductions, pedagogical code snippets, diagram references, and SEO optimization.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Article Writing\n\nTechnical writing framework: clear introductions, pedagogical code snippets, diagram references, and SEO optimization.\n\n## Use Case\nPublishing developer engineering blogs, changelogs, and tutorials.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Article Writing** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-130",
    "name": "Automation Audit Ops",
    "slug": "automation-audit-ops",
    "description": "Audit and optimize CI/CD pipelines, cron jobs, and webhook automation for execution time, cost, and reliability.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Automation"
    ],
    "content": "# Automation Audit Ops\n\nAudit and optimize CI/CD pipelines, cron jobs, and webhook automation for execution time, cost, and reliability.\n\n## Use Case\nDevOps infrastructure review and pipeline latency reduction.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Automation Audit Ops** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-131",
    "name": "Autonomous Agent Harness",
    "slug": "autonomous-agent-harness",
    "description": "End-to-end harness for non-interactive autonomous task execution with safety circuit breakers and rollbacks.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Autonomous"
    ],
    "content": "# Autonomous Agent Harness\n\nEnd-to-end harness for non-interactive autonomous task execution with safety circuit breakers and rollbacks.\n\n## Use Case\nOvernight batch issue fixing and automated dependency upgrades.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Autonomous Agent Harness** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-132",
    "name": "Autonomous Loops",
    "slug": "autonomous-loops",
    "description": "Self-correcting execution loops: plan \u2192 execute \u2192 inspect error \u2192 adjust approach \u2192 verify outcome.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Autonomous"
    ],
    "content": "# Autonomous Loops\n\nSelf-correcting execution loops: plan \u2192 execute \u2192 inspect error \u2192 adjust approach \u2192 verify outcome.\n\n## Use Case\nAutonomous bug hunting and automated test repair.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Autonomous Loops** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-133",
    "name": "Benchmark Optimization Loop",
    "slug": "benchmark-optimization-loop",
    "description": "Continuous profiling loop that benchmarks code, flags hot functions, applies refactors, and measures gains.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Benchmark Optimization Loop\n\nContinuous profiling loop that benchmarks code, flags hot functions, applies refactors, and measures gains.\n\n## Use Case\nData-driven performance tuning for high-load systems.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Benchmark Optimization Loop** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-134",
    "name": "Blueprint",
    "slug": "blueprint",
    "description": "Full-stack project generator: sets up Next.js/Turborepo, Prisma/Drizzle, Tailwind CSS, and GitHub Actions.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Blueprint\n\nFull-stack project generator: sets up Next.js/Turborepo, Prisma/Drizzle, Tailwind CSS, and GitHub Actions.\n\n## Use Case\nBootstrapping production-ready SaaS projects in minutes.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Blueprint** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-135",
    "name": "Brand Discovery",
    "slug": "brand-discovery",
    "description": "Brand positioning framework: defining tone of voice, audience personas, visual guidelines, and value propositions.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Brand Discovery\n\nBrand positioning framework: defining tone of voice, audience personas, visual guidelines, and value propositions.\n\n## Use Case\nCrafting distinct developer tool identity and landing page messaging.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Brand Discovery** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-136",
    "name": "Brand Voice",
    "slug": "brand-voice",
    "description": "Enforcing consistent brand voice, tone guidelines, and vocabulary across all documentation and UI copy.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Brand Voice\n\nEnforcing consistent brand voice, tone guidelines, and vocabulary across all documentation and UI copy.\n\n## Use Case\nConsistent marketing copy and technical documentation generation.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Brand Voice** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-137",
    "name": "Browser QA",
    "slug": "browser-qa",
    "description": "Visual regression and interactive browser QA using automated DOM assertions and snapshot comparisons.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Browser QA\n\nVisual regression and interactive browser QA using automated DOM assertions and snapshot comparisons.\n\n## Use Case\nValidating complex responsive web UIs across multiple viewport sizes.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Browser QA** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-138",
    "name": "Bun Runtime",
    "slug": "bun-runtime",
    "description": "High-performance JavaScript/TypeScript development using Bun's native bundler, test runner, and HTTP server.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Bun Runtime\n\nHigh-performance JavaScript/TypeScript development using Bun's native bundler, test runner, and HTTP server.\n\n## Use Case\nUltra-fast microservices, scripts, and build tooling replacing Node.js.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Bun Runtime** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-139",
    "name": "Canary Watch",
    "slug": "canary-watch",
    "description": "Automated canary deployment verification: monitors error rate spikes, latency changes, and initiates rollbacks.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Canary"
    ],
    "content": "# Canary Watch\n\nAutomated canary deployment verification: monitors error rate spikes, latency changes, and initiates rollbacks.\n\n## Use Case\nZero-downtime production releases with automated blast-radius containment.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Canary Watch** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-140",
    "name": "ClickHouse IO",
    "slug": "clickhouse-io",
    "description": "Columnar analytical queries, MergeTree engine optimization, and high-throughput real-time ingestion with ClickHouse.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# ClickHouse IO\n\nColumnar analytical queries, MergeTree engine optimization, and high-throughput real-time ingestion with ClickHouse.\n\n## Use Case\nBig data analytics, time-series metrics, and observability data stores.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **ClickHouse IO** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-141",
    "name": "Code Tour",
    "slug": "code-tour",
    "description": "Interactive codebase walkthrough generator: annotates key entrypoints, state flows, and core business logic.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Code Tour\n\nInteractive codebase walkthrough generator: annotates key entrypoints, state flows, and core business logic.\n\n## Use Case\nRapid onboarding for new team members and developer orientation.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Code Tour** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-142",
    "name": "Codebase Onboarding",
    "slug": "codebase-onboarding",
    "description": "Systematic repo exploration: maps package structures, dependency graphs, and environment configurations.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Codebase Onboarding\n\nSystematic repo exploration: maps package structures, dependency graphs, and environment configurations.\n\n## Use Case\nFirst session on unfamiliar codebases to build mental context before making edits.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Codebase Onboarding** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-143",
    "name": "Code Health MCP",
    "slug": "codehealth-mcp",
    "description": "MCP tool exposing real-time metrics for cyclomatic complexity, test coverage, and code churn to AI agents.",
    "frameworks": [
      "Claude Code",
      "Antigravity",
      "MCP",
      "Code Quality"
    ],
    "content": "# Code Health MCP\n\nMCP tool exposing real-time metrics for cyclomatic complexity, test coverage, and code churn to AI agents.\n\n## Use Case\nEnabling AI agents to check code health scores during refactoring tasks.\n\n## Supported Platforms\n- Claude Code\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Code Health MCP** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-144",
    "name": "Compose Multiplatform Patterns",
    "slug": "compose-multiplatform-patterns",
    "description": "Kotlin Multiplatform (KMP) shared UI development across Android, iOS, Desktop, and Web using Jetpack Compose.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Compose Multiplatform Patterns\n\nKotlin Multiplatform (KMP) shared UI development across Android, iOS, Desktop, and Web using Jetpack Compose.\n\n## Use Case\nCross-platform mobile and desktop apps sharing 90%+ code.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Compose Multiplatform Patterns** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-145",
    "name": "Config GC",
    "slug": "config-gc",
    "description": "Garbage collection for stale configuration: removes dead environment variables, abandoned feature flags, and orphaned secrets.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Config GC\n\nGarbage collection for stale configuration: removes dead environment variables, abandoned feature flags, and orphaned secrets.\n\n## Use Case\nCleaning accumulated technical debt in long-running projects.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Config GC** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-146",
    "name": "Connections Optimizer",
    "slug": "connections-optimizer",
    "description": "Database connection pool tuning, PgBouncer setup, idle connection timeouts, and connection leak diagnostics.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Connections Optimizer\n\nDatabase connection pool tuning, PgBouncer setup, idle connection timeouts, and connection leak diagnostics.\n\n## Use Case\nPreventing database connection exhaustion in serverless architectures.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Connections Optimizer** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-147",
    "name": "Content Hash Cache Pattern",
    "slug": "content-hash-cache-pattern",
    "description": "Immutable static asset caching with sha256 content hashing, long cache-control headers, and instant CDN invalidation.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Content Hash Cache Pattern\n\nImmutable static asset caching with sha256 content hashing, long cache-control headers, and instant CDN invalidation.\n\n## Use Case\nMaximizing web frontend cache hit ratios and CDN performance.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Content Hash Cache Pattern** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-148",
    "name": "Continuous Agent Loop",
    "slug": "continuous-agent-loop",
    "description": "Background task queue processor where agents poll, execute, verify, and report without user interaction.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Loop"
    ],
    "content": "# Continuous Agent Loop\n\nBackground task queue processor where agents poll, execute, verify, and report without user interaction.\n\n## Use Case\nAutomating background GitHub issue resolution and pull request triage.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Continuous Agent Loop** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-149",
    "name": "Contract First Development",
    "slug": "contract-first",
    "description": "Schema-first development with OpenAPI, Protobuf, or GraphQL before writing server or client implementations.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Contract First Development\n\nSchema-first development with OpenAPI, Protobuf, or GraphQL before writing server or client implementations.\n\n## Use Case\nDecoupling frontend and backend teams to work in parallel against locked contracts.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Contract First Development** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-150",
    "name": "Cost-Aware LLM Pipeline",
    "slug": "cost-aware-llm-pipeline",
    "description": "Multi-tier LLM routing: dispatches simple queries to light models (Flash/Haiku) and complex reasoning to Pro/Opus.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Cost-Aware LLM Pipeline\n\nMulti-tier LLM routing: dispatches simple queries to light models (Flash/Haiku) and complex reasoning to Pro/Opus.\n\n## Use Case\nCutting production AI costs by 70% while maintaining high output quality.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Cost-Aware LLM Pipeline** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-151",
    "name": "Cost Tracking",
    "slug": "cost-tracking",
    "description": "Real-time token counting, API credit monitoring, and granular cost attribution per user/feature.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Cost"
    ],
    "content": "# Cost Tracking\n\nReal-time token counting, API credit monitoring, and granular cost attribution per user/feature.\n\n## Use Case\nSaaS financial predictability and unit economics tracking for AI features.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Cost Tracking** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-152",
    "name": "Council Multi-Model",
    "slug": "council-multi-model",
    "description": "Ensemble decision framework querying multiple model families (Claude, GPT, Gemini) to reach balanced consensus.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Multi-Model"
    ],
    "content": "# Council Multi-Model\n\nEnsemble decision framework querying multiple model families (Claude, GPT, Gemini) to reach balanced consensus.\n\n## Use Case\nHigh-stakes architectural reviews, security audits, and complex trade-off analysis.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Council Multi-Model** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-153",
    "name": "C++ Coding Standards",
    "slug": "cpp-coding-standards",
    "description": "Modern C++20/23 patterns: RAII memory safety, smart pointers, concept constraints, and zero-cost abstractions.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# C++ Coding Standards\n\nModern C++20/23 patterns: RAII memory safety, smart pointers, concept constraints, and zero-cost abstractions.\n\n## Use Case\nHigh-performance systems programming in modern C++.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **C++ Coding Standards** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-154",
    "name": "C++ Testing",
    "slug": "cpp-testing",
    "description": "Modern C++ test automation with GoogleTest, Catch2, doctest, and address sanitizers in CI.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# C++ Testing\n\nModern C++ test automation with GoogleTest, Catch2, doctest, and address sanitizers in CI.\n\n## Use Case\nUnit and integration testing for systems software and embedded systems.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **C++ Testing** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-155",
    "name": "Crosspost",
    "slug": "crosspost",
    "description": "Cross-platform technical content syndication adapted for X/Twitter, LinkedIn, Dev.to, and Hacker News.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Crosspost\n\nCross-platform technical content syndication adapted for X/Twitter, LinkedIn, Dev.to, and Hacker News.\n\n## Use Case\nDeveloper marketing and content distribution across developer communities.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Crosspost** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-156",
    "name": "C# Testing",
    "slug": "csharp-testing",
    "description": ".NET 8/9 testing with xUnit, FluentAssertions, Moq, and WebApplicationFactory integration tests.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# C# Testing\n\n.NET 8/9 testing with xUnit, FluentAssertions, Moq, and WebApplicationFactory integration tests.\n\n## Use Case\nEnterprise C# .NET Core backend API test suites.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **C# Testing** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-157",
    "name": "Database Migration",
    "slug": "database-migration",
    "description": "Zero-downtime database migrations: expand-and-contract patterns, backwards-compatible schemas, and rollbacks.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Database Migration\n\nZero-downtime database migrations: expand-and-contract patterns, backwards-compatible schemas, and rollbacks.\n\n## Use Case\nProduction schema alterations on high-traffic PostgreSQL and MySQL databases.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Database Migration** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-158",
    "name": "Docker Patterns",
    "slug": "docker-patterns",
    "description": "Multi-stage Docker builds, Alpine/distroless minimal containers, rootless security, and layer caching.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Docker Patterns\n\nMulti-stage Docker builds, Alpine/distroless minimal containers, rootless security, and layer caching.\n\n## Use Case\nCreating fast, secure, production-ready container images.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Docker Patterns** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-159",
    "name": "Feature Flags",
    "slug": "feature-flags",
    "description": "Server-side and client-side feature flag integration with gradual rollouts, canary groups, and instant killswitches.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Feature Flags\n\nServer-side and client-side feature flag integration with gradual rollouts, canary groups, and instant killswitches.\n\n## Use Case\nDecoupling software deployment from feature release.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Feature Flags** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-160",
    "name": "Git Workflow",
    "slug": "git-workflow",
    "description": "Structured Git conventions: Conventional Commits, trunk-based development, atomic PRs, and branch protection rules.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Git Workflow\n\nStructured Git conventions: Conventional Commits, trunk-based development, atomic PRs, and branch protection rules.\n\n## Use Case\nMaintaining a clean, bisectable git history and reliable CI triggers.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Git Workflow** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-161",
    "name": "GraphQL Patterns",
    "slug": "graphql-patterns",
    "description": "GraphQL schema design, DataLoader N+1 query prevention, cursor-based pagination, and schema stitching.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# GraphQL Patterns\n\nGraphQL schema design, DataLoader N+1 query prevention, cursor-based pagination, and schema stitching.\n\n## Use Case\nBuilding flexible, strongly-typed API layers for web and mobile clients.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **GraphQL Patterns** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-162",
    "name": "Helm Charts",
    "slug": "helm-charts",
    "description": "Kubernetes application packaging with Helm 3: templated manifests, values.yaml hierarchies, and release lifecycle hooks.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Helm Charts\n\nKubernetes application packaging with Helm 3: templated manifests, values.yaml hierarchies, and release lifecycle hooks.\n\n## Use Case\nDeploying multi-service applications across dev, staging, and production Kubernetes clusters.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Helm Charts** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-163",
    "name": "Infrastructure as Code",
    "slug": "infrastructure-as-code",
    "description": "Declarative cloud infrastructure using Terraform, OpenTofu, and Pulumi with remote state locking and drift detection.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Infrastructure as Code\n\nDeclarative cloud infrastructure using Terraform, OpenTofu, and Pulumi with remote state locking and drift detection.\n\n## Use Case\nReproducible, version-controlled cloud infrastructure across AWS, GCP, and Azure.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Infrastructure as Code** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-164",
    "name": "Integration Testing",
    "slug": "integration-testing",
    "description": "Integration testing using Testcontainers for real PostgreSQL, Redis, and Kafka instances during automated test runs.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Integration Testing\n\nIntegration testing using Testcontainers for real PostgreSQL, Redis, and Kafka instances during automated test runs.\n\n## Use Case\nTesting real service interactions without fragile in-memory mocks.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Integration Testing** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-165",
    "name": "Kubernetes Patterns",
    "slug": "kubernetes-patterns",
    "description": "Production Kubernetes resilience: PodDisruptionBudgets, resource limits, readiness probes, and HPA autoscaling.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Kubernetes Patterns\n\nProduction Kubernetes resilience: PodDisruptionBudgets, resource limits, readiness probes, and HPA autoscaling.\n\n## Use Case\nOperating reliable, auto-healing container workloads in Kubernetes.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Kubernetes Patterns** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-166",
    "name": "LLM Caching",
    "slug": "llm-caching",
    "description": "Semantic caching with Redis vector similarity and exact prompt caching (Anthropic Prompt Caching) to cut latency.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# LLM Caching\n\nSemantic caching with Redis vector similarity and exact prompt caching (Anthropic Prompt Caching) to cut latency.\n\n## Use Case\nAccelerating repetitive LLM agent queries and lowering API billing.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **LLM Caching** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-167",
    "name": "LLM Evaluation",
    "slug": "llm-evaluation",
    "description": "Systematic evaluation of LLM applications using automated assertions, LLM-as-a-judge, and ground-truth test datasets.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "LLM"
    ],
    "content": "# LLM Evaluation\n\nSystematic evaluation of LLM applications using automated assertions, LLM-as-a-judge, and ground-truth test datasets.\n\n## Use Case\nEnsuring production LLM output accuracy, safety, and formatting compliance.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **LLM Evaluation** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-168",
    "name": "Load Testing",
    "slug": "load-testing",
    "description": "High-concurrency load testing with k6: virtual user ramp-ups, latency threshold assertions, and bottleneck discovery.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Load Testing\n\nHigh-concurrency load testing with k6: virtual user ramp-ups, latency threshold assertions, and bottleneck discovery.\n\n## Use Case\nStress-testing APIs and database backends before product launches.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Load Testing** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-169",
    "name": "Microservices Patterns",
    "slug": "microservices-patterns",
    "description": "Distributed systems patterns: Saga distributed transactions, Circuit Breakers, Outbox event publishing, and API Gateways.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Microservices Patterns\n\nDistributed systems patterns: Saga distributed transactions, Circuit Breakers, Outbox event publishing, and API Gateways.\n\n## Use Case\nBuilding resilient distributed microservices without distributed lock deadlocks.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Microservices Patterns** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-170",
    "name": "Mobile Testing",
    "slug": "mobile-testing",
    "description": "Mobile app test automation with Maestro, Detox, and Appium across iOS Simulator and Android Emulator.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Mobile Testing\n\nMobile app test automation with Maestro, Detox, and Appium across iOS Simulator and Android Emulator.\n\n## Use Case\nAutomated regression testing for React Native, Flutter, and native mobile apps.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Mobile Testing** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-171",
    "name": "Monitoring Alerting",
    "slug": "monitoring-alerting",
    "description": "SLO-driven alerting with Prometheus, Grafana, and PagerDuty: multi-window multi-burn-rate alert rules.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Monitoring Alerting\n\nSLO-driven alerting with Prometheus, Grafana, and PagerDuty: multi-window multi-burn-rate alert rules.\n\n## Use Case\nEliminating alert fatigue and catching real production user degradation early.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Monitoring Alerting** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-172",
    "name": "Next.js Turbopack",
    "slug": "nextjs-turbopack",
    "description": "Next.js 15+ App Router optimization: Server Components, Turbopack incremental bundling, and streaming SSR.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Next.js Turbopack\n\nNext.js 15+ App Router optimization: Server Components, Turbopack incremental bundling, and streaming SSR.\n\n## Use Case\nHigh-performance React full-stack applications with sub-second page loads.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Next.js Turbopack** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-173",
    "name": "Observability Patterns",
    "slug": "observability-patterns",
    "description": "OpenTelemetry unified telemetry: structured JSON logs, trace context propagation, and metric collection.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Observability Patterns\n\nOpenTelemetry unified telemetry: structured JSON logs, trace context propagation, and metric collection.\n\n## Use Case\nEnd-to-end distributed system diagnostics and performance bottleneck identification.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Observability Patterns** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-174",
    "name": "OpenAPI Spec",
    "slug": "openapi-spec",
    "description": "Writing and validating OpenAPI 3.1 specifications with complete request/response schemas and examples.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# OpenAPI Spec\n\nWriting and validating OpenAPI 3.1 specifications with complete request/response schemas and examples.\n\n## Use Case\nContract-first API documentation and automated SDK generation.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **OpenAPI Spec** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-175",
    "name": "Performance Profiling",
    "slug": "performance-profiling",
    "description": "Application profiling with flamegraphs, V8 heap snapshots, Node.js clinic, and Linux perf tools.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Performance Profiling\n\nApplication profiling with flamegraphs, V8 heap snapshots, Node.js clinic, and Linux perf tools.\n\n## Use Case\nDiagnosing CPU bottlenecks, memory leaks, and event loop lag.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Performance Profiling** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-176",
    "name": "PostgreSQL Optimization",
    "slug": "postgres-optimization",
    "description": "Postgres performance tuning: EXPLAIN ANALYZE interpretation, BRIN/GIN indexing, table partitioning, and autovacuum tuning.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# PostgreSQL Optimization\n\nPostgres performance tuning: EXPLAIN ANALYZE interpretation, BRIN/GIN indexing, table partitioning, and autovacuum tuning.\n\n## Use Case\nScaling PostgreSQL databases to hundreds of millions of rows.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **PostgreSQL Optimization** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-177",
    "name": "Product Capability",
    "slug": "product-capability",
    "description": "Product capability mapping: feature matrix definition, user journey mapping, and value driver prioritization.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Product Capability\n\nProduct capability mapping: feature matrix definition, user journey mapping, and value driver prioritization.\n\n## Use Case\nAligning software architecture directly with business product roadmaps.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Product Capability** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-178",
    "name": "Prompt Engineering",
    "slug": "prompt-engineering",
    "description": "Advanced prompt design: Chain-of-Thought, few-shot demonstration exemplars, XML output tagging, and persona framing.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Prompt Engineering\n\nAdvanced prompt design: Chain-of-Thought, few-shot demonstration exemplars, XML output tagging, and persona framing.\n\n## Use Case\nMaximizing reasoning consistency and structured output compliance from LLMs.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Prompt Engineering** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-179",
    "name": "Python Testing",
    "slug": "python-testing",
    "description": "Modern Python testing with pytest: fixtures, parametrize, test isolation, coverage.py, and type checking with mypy.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Python Testing\n\nModern Python testing with pytest: fixtures, parametrize, test isolation, coverage.py, and type checking with mypy.\n\n## Use Case\nComprehensive test suites for Python web apps, CLI tools, and data pipelines.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Python Testing** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-180",
    "name": "RAG Patterns",
    "slug": "rag-patterns",
    "description": "Advanced Retrieval-Augmented Generation: semantic chunking, Cohere re-ranking, hybrid vector + keyword search, and reciprocal rank fusion.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# RAG Patterns\n\nAdvanced Retrieval-Augmented Generation: semantic chunking, Cohere re-ranking, hybrid vector + keyword search, and reciprocal rank fusion.\n\n## Use Case\nBuilding accurate question-answering systems on top of private documentation.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **RAG Patterns** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-181",
    "name": "Redis Patterns",
    "slug": "redis-patterns",
    "description": "Redis design patterns: distributed locks (Redlock), rate limit token buckets, sorted sets for leaderboards, and pub/sub streams.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Redis Patterns\n\nRedis design patterns: distributed locks (Redlock), rate limit token buckets, sorted sets for leaderboards, and pub/sub streams.\n\n## Use Case\nHigh-speed caching and ephemeral distributed state synchronization.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Redis Patterns** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-182",
    "name": "Rust Patterns",
    "slug": "rust-patterns",
    "description": "Idiomatic Rust development: ownership patterns, Tokio async concurrency, error handling with thiserror/anyhow, and trait abstractions.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Rust Patterns\n\nIdiomatic Rust development: ownership patterns, Tokio async concurrency, error handling with thiserror/anyhow, and trait abstractions.\n\n## Use Case\nMemory-safe, high-performance systems and backend services in Rust.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Rust Patterns** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-183",
    "name": "Serverless Patterns",
    "slug": "serverless-patterns",
    "description": "Event-driven serverless architecture on AWS Lambda, Vercel, and Cloudflare Workers with cold start minimization.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Serverless Patterns\n\nEvent-driven serverless architecture on AWS Lambda, Vercel, and Cloudflare Workers with cold start minimization.\n\n## Use Case\nCost-effective, automatically scaling microservices and background job processors.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Serverless Patterns** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-184",
    "name": "SLO Implementation",
    "slug": "slo-implementation",
    "description": "Quantifying service reliability: defining SLIs (Service Level Indicators), SLO targets (99.9%), and managing error budgets.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# SLO Implementation\n\nQuantifying service reliability: defining SLIs (Service Level Indicators), SLO targets (99.9%), and managing error budgets.\n\n## Use Case\nSite Reliability Engineering (SRE) practices for production applications.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **SLO Implementation** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-185",
    "name": "SQL Optimization",
    "slug": "sql-optimization",
    "description": "Query tuning: removing N+1 queries, writing efficient window functions, CTE optimization, and index design.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# SQL Optimization\n\nQuery tuning: removing N+1 queries, writing efficient window functions, CTE optimization, and index design.\n\n## Use Case\nEliminating database query bottlenecks in relational databases.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **SQL Optimization** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-186",
    "name": "System Design",
    "slug": "system-design",
    "description": "Architectural blueprinting: capacity estimation, data sharding, caching layers, load balancing, and failure domains.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# System Design\n\nArchitectural blueprinting: capacity estimation, data sharding, caching layers, load balancing, and failure domains.\n\n## Use Case\nDesigning large-scale distributed systems that scale to millions of users.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **System Design** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-187",
    "name": "Terraform Patterns",
    "slug": "terraform-patterns",
    "description": "Reusable Terraform modules, state locking with DynamoDB, secret injection, and plan validation in CI.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Terraform Patterns\n\nReusable Terraform modules, state locking with DynamoDB, secret injection, and plan validation in CI.\n\n## Use Case\nStandardizing enterprise cloud infrastructure deployment across environments.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Terraform Patterns** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-188",
    "name": "Token Optimization",
    "slug": "token-optimization",
    "description": "Prompt token pruning, structured JSON outputs, schema-guided generation, and prompt compression techniques.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Token Optimization\n\nPrompt token pruning, structured JSON outputs, schema-guided generation, and prompt compression techniques.\n\n## Use Case\nMaximizing available context space and lowering agent operational token overhead.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Token Optimization** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-189",
    "name": "TypeScript Patterns",
    "slug": "typescript-patterns",
    "description": "Advanced TypeScript type gymnastics: conditional types, discriminated unions, template literals, and branded types.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# TypeScript Patterns\n\nAdvanced TypeScript type gymnastics: conditional types, discriminated unions, template literals, and branded types.\n\n## Use Case\nWriting rock-solid type-safe libraries, SDKs, and enterprise application logic.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **TypeScript Patterns** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-190",
    "name": "Unit Testing",
    "slug": "unit-testing",
    "description": "Test isolation, AAA (Arrange-Act-Assert) pattern, test doubles (mocks/stubs/spies), and boundary value analysis.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Unit Testing\n\nTest isolation, AAA (Arrange-Act-Assert) pattern, test doubles (mocks/stubs/spies), and boundary value analysis.\n\n## Use Case\nFoundational automated testing providing instant developer feedback.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Unit Testing** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-191",
    "name": "Vector Database",
    "slug": "vector-database",
    "description": "Vector indexing with pgvector, Pinecone, Qdrant, and Weaviate: HNSW vs IVF index trade-offs and metadata filtering.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Vector Database\n\nVector indexing with pgvector, Pinecone, Qdrant, and Weaviate: HNSW vs IVF index trade-offs and metadata filtering.\n\n## Use Case\nHigh-throughput semantic similarity search and AI recommendation engines.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Vector Database** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-192",
    "name": "Video Editing",
    "slug": "video-editing",
    "description": "Automated video post-processing using FFmpeg pipelines: clipping, subtitling, transcoding, and thumbnail generation.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Video"
    ],
    "content": "# Video Editing\n\nAutomated video post-processing using FFmpeg pipelines: clipping, subtitling, transcoding, and thumbnail generation.\n\n## Use Case\nProgrammatic video rendering and content production pipelines.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Video Editing** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-193",
    "name": "Vulnerability Scanning",
    "slug": "vulnerability-scanning",
    "description": "Automated vulnerability detection with Semgrep, Snyk, Trivy, and npm audit integrated into CI pipelines.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Vulnerability Scanning\n\nAutomated vulnerability detection with Semgrep, Snyk, Trivy, and npm audit integrated into CI pipelines.\n\n## Use Case\nPreventing known CVEs and security regressions from reaching production.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Vulnerability Scanning** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-194",
    "name": "Web Performance",
    "slug": "web-performance",
    "description": "Core Web Vitals optimization: reducing LCP with image optimization, eliminating CLS, and optimizing INP.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Web Performance\n\nCore Web Vitals optimization: reducing LCP with image optimization, eliminating CLS, and optimizing INP.\n\n## Use Case\nImproving user conversion rates and Google SEO rankings through faster page speeds.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Web Performance** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-195",
    "name": "WebSocket Patterns",
    "slug": "websocket-patterns",
    "description": "Bidirectional WebSocket communication: heartbeat keepalives, reconnection backoff, and horizontal scaling with Redis Pub/Sub.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# WebSocket Patterns\n\nBidirectional WebSocket communication: heartbeat keepalives, reconnection backoff, and horizontal scaling with Redis Pub/Sub.\n\n## Use Case\nBuilding real-time collaboration apps, live chats, and streaming dashboards.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **WebSocket Patterns** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-196",
    "name": "Workflow Automation",
    "slug": "workflow-automation",
    "description": "Reliable event-driven business workflows with Temporal, Inngest, and n8n with built-in retries and state checkpoints.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Workflow Automation\n\nReliable event-driven business workflows with Temporal, Inngest, and n8n with built-in retries and state checkpoints.\n\n## Use Case\nMission-critical background billing, user onboarding, and third-party integrations.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Workflow Automation** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-197",
    "name": "X API Integration",
    "slug": "x-api",
    "description": "Twitter/X API v2 integration: OAuth 2.0 PKCE, programmatic posting, media uploads, and rate limit management.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# X API Integration\n\nTwitter/X API v2 integration: OAuth 2.0 PKCE, programmatic posting, media uploads, and rate limit management.\n\n## Use Case\nBuilding social media automation tools, bots, and developer publishing pipelines.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Zed\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **X API Integration** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-198",
    "name": "Zero Trust Security",
    "slug": "zero-trust-security",
    "description": "Zero Trust architecture: mTLS service-to-service authentication, least-privilege IAM, and continuous session verification.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Cursor",
      "Antigravity"
    ],
    "content": "# Zero Trust Security\n\nZero Trust architecture: mTLS service-to-service authentication, least-privilege IAM, and continuous session verification.\n\n## Use Case\nHardening cloud infrastructure against lateral movement attacks.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Cursor\n- Antigravity\n- Copilot\n\n## Core Engineering Rules\n1. Apply the **Zero Trust Security** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-199",
    "name": "Exa Search",
    "slug": "exa-search",
    "description": "Neural web search API integration with Exa: retrieves semantically relevant developer docs and real-time facts.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Search"
    ],
    "content": "# Exa Search\n\nNeural web search API integration with Exa: retrieves semantically relevant developer docs and real-time facts.\n\n## Use Case\nEmpowering AI agents with grounded, real-time web search capabilities.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Exa Search** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-200",
    "name": "AgentShield Security",
    "slug": "agentshield-security",
    "description": "AgentShield security scanner: protects agent configurations against prompt injection, hook tampering, and leaked credentials.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Security"
    ],
    "content": "# AgentShield Security\n\nAgentShield security scanner: protects agent configurations against prompt injection, hook tampering, and leaked credentials.\n\n## Use Case\nPre-flight security audits for AI agent configurations.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **AgentShield Security** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-201",
    "name": "Hooks Runtime",
    "slug": "hooks-runtime",
    "description": "Agent execution hooks: pre-tool and post-tool lifecycle triggers for rule enforcement, telemetry, and input validation.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Hooks",
      "Runtime"
    ],
    "content": "# Hooks Runtime\n\nAgent execution hooks: pre-tool and post-tool lifecycle triggers for rule enforcement, telemetry, and input validation.\n\n## Use Case\nCustomizing and monitoring agent execution flows deterministically.\n\n## Supported Platforms\n- Claude Code\n- Codex\n\n## Core Engineering Rules\n1. Apply the **Hooks Runtime** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  },
  {
    "id": "skill-202",
    "name": "Memory Persistence",
    "slug": "memory-persistence",
    "description": "Cross-session memory persistence: extracts facts, decisions, and codebase quirks into structured markdown journals.",
    "frameworks": [
      "Claude Code",
      "Codex",
      "Antigravity",
      "Memory"
    ],
    "content": "# Memory Persistence\n\nCross-session memory persistence: extracts facts, decisions, and codebase quirks into structured markdown journals.\n\n## Use Case\nMaintaining long-term context across multiple independent agent turns.\n\n## Supported Platforms\n- Claude Code\n- Codex\n- Antigravity\n\n## Core Engineering Rules\n1. Apply the **Memory Persistence** pattern systematically before making code changes.\n2. Validate outputs across supported AI harnesses (Claude Code, Codex, Antigravity, Cursor).\n3. Prevent context pollution and maintain strict verification standards.",
    "createdAt": "2026-08-21T19:50:00.000Z"
  }
];

// src/cli/index.ts
var program = new import_commander.Command();
program.name("awesome-ai-tools").description("CLI to instantly install 200+ cross-platform AI skills & slash commands (ECC-style) to your projects").version("0.3.0");
function toCommandName(slug) {
  return slug.replace(/^skill-/, "").replace(/[^a-zA-Z0-9_-]/g, "-").toLowerCase();
}
program.command("list").description("List all available AI skills and their slash command triggers").action(() => {
  console.log("\n\u{1F680} Available AI Agent Skills & Slash Commands:\n");
  AI_SKILLS.forEach((skill) => {
    const cmd = toCommandName(skill.slug);
    console.log(`- \x1B[36m${skill.name}\x1B[0m (\x1B[35m/${cmd}\x1B[0m)`);
    console.log(`  ${skill.description}`);
    console.log(`  Frameworks: ${skill.frameworks.join(", ")}
`);
  });
  console.log("Run 'npx awesome-ai-tools init' to install ALL slash commands into your project.");
  console.log("Or run 'npx awesome-ai-tools add <slug>' to add a single skill.\n");
});
program.command("init").description("Install all 200+ AI skills and slash commands to your local project (ECC Flow)").option("-t, --target <type>", "Target platforms (all, claude, agents, cursor)").action(async (options) => {
  let target = options.target;
  if (!target) {
    const response = await (0, import_prompts.default)({
      type: "select",
      name: "target",
      message: "Select which AI Harness formats to generate:",
      choices: [
        {
          title: "Full Suite: Claude Commands (/.claude/commands) + Universal Agents (.agents/skills) + Cursor Rules",
          value: "all",
          description: "Recommended (Works in Claude Code, Codex, Antigravity, Cursor & Zed)"
        },
        {
          title: "Claude Code Slash Commands (.claude/commands/*.md)",
          value: "claude",
          description: "Enables all /command triggers directly in Claude Code CLI"
        },
        {
          title: "Universal Agent Skills (.agents/skills/*/SKILL.md)",
          value: "agents",
          description: "Standard for Antigravity, Codex, and OpenAI agents"
        },
        {
          title: "Cursor MDC Rules (.cursor/rules/*.mdc)",
          value: "cursor",
          description: "Modern rules format for Cursor editor"
        }
      ]
    });
    target = response.target;
  }
  if (!target) {
    console.log("\nOperation cancelled.\n");
    process.exit(0);
  }
  const cwd = process.cwd();
  let totalGenerated = 0;
  console.log("\n\u2699\uFE0F  Scaffolding AI skills & slash commands...\n");
  if (target === "all" || target === "claude") {
    const claudeCmdDir = import_path.default.join(cwd, ".claude", "commands");
    if (!import_fs.default.existsSync(claudeCmdDir)) {
      import_fs.default.mkdirSync(claudeCmdDir, { recursive: true });
    }
    AI_SKILLS.forEach((skill) => {
      const cmdName = toCommandName(skill.slug);
      const filePath = import_path.default.join(claudeCmdDir, `${cmdName}.md`);
      const fileContent = `# /${cmdName} \u2014 ${skill.name}

${skill.description}

## Instructions for AI Agent:
When this command is triggered:
1. Apply the **${skill.name}** pattern and guidelines immediately.
2. Ensure all changes adhere strictly to the rules below without hallucination.

---

${skill.content}
`;
      import_fs.default.writeFileSync(filePath, fileContent, "utf8");
    });
    console.log(`\u2705 Generated \x1B[32m${AI_SKILLS.length} Slash Commands\x1B[0m in \x1B[36m.claude/commands/\x1B[0m (access via /<command_name>)`);
    totalGenerated += AI_SKILLS.length;
  }
  if (target === "all" || target === "agents") {
    const agentsSkillsDir = import_path.default.join(cwd, ".agents", "skills");
    AI_SKILLS.forEach((skill) => {
      const skillDir = import_path.default.join(agentsSkillsDir, skill.slug);
      if (!import_fs.default.existsSync(skillDir)) {
        import_fs.default.mkdirSync(skillDir, { recursive: true });
      }
      const filePath = import_path.default.join(skillDir, "SKILL.md");
      const fileContent = `---
name: ${skill.name}
description: ${skill.description}
frameworks: [${skill.frameworks.join(", ")}]
---

${skill.content}
`;
      import_fs.default.writeFileSync(filePath, fileContent, "utf8");
    });
    console.log(`\u2705 Generated \x1B[32m${AI_SKILLS.length} Universal Skills\x1B[0m in \x1B[36m.agents/skills/\x1B[0m (Antigravity & Codex)`);
    totalGenerated += AI_SKILLS.length;
  }
  if (target === "all" || target === "cursor") {
    const cursorRulesDir = import_path.default.join(cwd, ".cursor", "rules");
    if (!import_fs.default.existsSync(cursorRulesDir)) {
      import_fs.default.mkdirSync(cursorRulesDir, { recursive: true });
    }
    AI_SKILLS.forEach((skill) => {
      const filePath = import_path.default.join(cursorRulesDir, `${skill.slug}.mdc`);
      const fileContent = `---
description: ${skill.description}
globs: *
alwaysApply: false
---

${skill.content}
`;
      import_fs.default.writeFileSync(filePath, fileContent, "utf8");
    });
    console.log(`\u2705 Generated \x1B[32m${AI_SKILLS.length} MDC Rules\x1B[0m in \x1B[36m.cursor/rules/\x1B[0m (Cursor)`);
    totalGenerated += AI_SKILLS.length;
  }
  const agentsMdPath = import_path.default.join(cwd, "AGENTS.md");
  const agentsMdContent = `# Project AI Agent Guidelines & Slash Commands

This repository is equipped with **Awesome AI Tools & ECC Skills Suite** (${AI_SKILLS.length} active skills).

## Available Slash Commands in Claude Code:
${AI_SKILLS.map((s) => `- \`/${toCommandName(s.slug)}\` : **${s.name}** \u2014 ${s.description}`).join("\n")}

## Quick Start
Type any slash command in your AI coding assistant prompt (e.g. \`/tdd-workflow\`, \`/plan-first\`, \`/security-scan\`) to activate specific engineering modes.
`;
  import_fs.default.writeFileSync(agentsMdPath, agentsMdContent, "utf8");
  console.log(`\u2705 Generated master \x1B[32mAGENTS.md\x1B[0m index in project root.`);
  console.log(`
\u{1F389} \x1B[32mSetup Complete!\x1B[0m Total ${totalGenerated} files generated.`);
  console.log("You can now open Claude Code, Antigravity, or Cursor and type slash commands like \x1B[35m/tdd-workflow\x1B[0m or \x1B[35m/plan-first\x1B[0m!\n");
});
program.command("add").description("Add a specific AI skill / command to your project").argument("<slug>", "The slug of the skill to add (e.g., tdd-workflow)").option("-e, --editor <type>", "Target editor (claude-cmd, cursor, claude, windsurf, cline, copilot)").action(async (slug, options) => {
  const skill = AI_SKILLS.find((s) => s.slug === slug);
  if (!skill) {
    console.error(`
\u274C Error: Skill with slug '${slug}' not found.`);
    console.log("Run 'npx awesome-ai-tools list' to see available skills.\n");
    process.exit(1);
  }
  let editor = options.editor;
  const cmdName = toCommandName(skill.slug);
  if (!editor) {
    const response = await (0, import_prompts.default)({
      type: "select",
      name: "editor",
      message: "Which format would you like to install?",
      choices: [
        { title: `Claude Slash Command (/.claude/commands/${cmdName}.md) [Recommended]`, value: "claude-cmd", description: `Enables /${cmdName} directly in Claude Code CLI` },
        { title: "Universal Agent Skill (.agents/skills/<slug>/SKILL.md)", value: "agent-skill", description: "Standard for Antigravity, Codex & OpenAI" },
        { title: "Cursor MDC Rule (.cursor/rules/<slug>.mdc)", value: "cursor", description: "Creates modern multi-file MDC rule" },
        { title: "Append to CLAUDE.md", value: "claude", description: "Appends to project CLAUDE.md guidelines" },
        { title: "Windsurf (.windsurfrules)", value: "windsurf", description: "Creates or appends to .windsurfrules" },
        { title: "Cline / Roo Code (.clinerules)", value: "cline", description: "Creates or appends to .clinerules" },
        { title: "GitHub Copilot (.github/copilot-instructions.md)", value: "copilot", description: "Creates repository custom instructions" }
      ]
    });
    editor = response.editor;
  }
  if (!editor) {
    console.log("\nOperation cancelled.\n");
    process.exit(0);
  }
  let targetPath = "";
  let fileContent = skill.content;
  switch (editor) {
    case "claude-cmd": {
      const cmdDir = import_path.default.join(process.cwd(), ".claude", "commands");
      if (!import_fs.default.existsSync(cmdDir)) {
        import_fs.default.mkdirSync(cmdDir, { recursive: true });
      }
      targetPath = import_path.default.join(cmdDir, `${cmdName}.md`);
      fileContent = `# /${cmdName} \u2014 ${skill.name}

${skill.description}

## Instructions for AI Agent:
When this command is invoked:
1. Follow the **${skill.name}** pattern and guidelines strictly.
2. Adhere to all verification and quality rules below.

---

${skill.content}
`;
      break;
    }
    case "agent-skill": {
      const skillDir = import_path.default.join(process.cwd(), ".agents", "skills", slug);
      if (!import_fs.default.existsSync(skillDir)) {
        import_fs.default.mkdirSync(skillDir, { recursive: true });
      }
      targetPath = import_path.default.join(skillDir, "SKILL.md");
      fileContent = `---
name: ${skill.name}
description: ${skill.description}
frameworks: [${skill.frameworks.join(", ")}]
---

${skill.content}
`;
      break;
    }
    case "cursor": {
      const rulesDir = import_path.default.join(process.cwd(), ".cursor", "rules");
      if (!import_fs.default.existsSync(rulesDir)) {
        import_fs.default.mkdirSync(rulesDir, { recursive: true });
      }
      targetPath = import_path.default.join(rulesDir, `${slug}.mdc`);
      fileContent = `---
description: ${skill.description}
globs: *
alwaysApply: true
---

${skill.content}
`;
      break;
    }
    case "claude":
      targetPath = import_path.default.join(process.cwd(), "CLAUDE.md");
      fileContent = `
## Skill: ${skill.name} (Trigger: /${cmdName})
${skill.content}
`;
      break;
    case "windsurf":
      targetPath = import_path.default.join(process.cwd(), ".windsurfrules");
      break;
    case "cline":
      targetPath = import_path.default.join(process.cwd(), ".clinerules");
      break;
    case "copilot": {
      const githubDir = import_path.default.join(process.cwd(), ".github");
      if (!import_fs.default.existsSync(githubDir)) {
        import_fs.default.mkdirSync(githubDir, { recursive: true });
      }
      targetPath = import_path.default.join(githubDir, "copilot-instructions.md");
      break;
    }
    default:
      console.error("\n\u274C Error: Unsupported format type.");
      process.exit(1);
  }
  const relativeTarget = import_path.default.relative(process.cwd(), targetPath) || import_path.default.basename(targetPath);
  try {
    if (import_fs.default.existsSync(targetPath)) {
      if (editor === "cursor" || editor === "claude-cmd" || editor === "agent-skill") {
        import_fs.default.writeFileSync(targetPath, fileContent, "utf8");
        console.log(`
\u2705 Updated: \x1B[32m${relativeTarget}\x1B[0m
`);
        if (editor === "claude-cmd") {
          console.log(`\u{1F4A1} You can now type \x1B[35m/${cmdName}\x1B[0m in Claude Code CLI!
`);
        }
      } else {
        const { action } = await (0, import_prompts.default)({
          type: "select",
          name: "action",
          message: `${relativeTarget} already exists. What would you like to do?`,
          choices: [
            { title: "Append skill rules to existing file", value: "append" },
            { title: "Overwrite existing file", value: "overwrite" },
            { title: "Cancel", value: "cancel" }
          ],
          initial: 0
        });
        if (action === "cancel" || !action) {
          console.log("\nOperation cancelled.\n");
          process.exit(0);
        }
        if (action === "overwrite") {
          import_fs.default.writeFileSync(targetPath, fileContent, "utf8");
          console.log(`
\u2705 Overwrote \x1B[32m${relativeTarget}\x1B[0m with '${skill.name}' rules.
`);
        } else {
          import_fs.default.appendFileSync(targetPath, "\n\n" + fileContent, "utf8");
          console.log(`
\u2705 Appended '${skill.name}' rules to \x1B[32m${relativeTarget}\x1B[0m.
`);
        }
      }
    } else {
      import_fs.default.writeFileSync(targetPath, fileContent, "utf8");
      console.log(`
\u2705 Created \x1B[32m${relativeTarget}\x1B[0m
`);
      if (editor === "claude-cmd") {
        console.log(`\u{1F4A1} You can now type \x1B[35m/${cmdName}\x1B[0m in Claude Code CLI!
`);
      }
    }
  } catch (error) {
    console.error(`
\u274C Failed to write file: ${error.message}
`);
  }
});
program.parse();
//# sourceMappingURL=index.js.map
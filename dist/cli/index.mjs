#!/usr/bin/env node

// src/cli/index.ts
import { Command } from "commander";
import prompts from "prompts";
import fs from "fs";
import path from "path";

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
  },
  {
    "id": "skill-203",
    "name": "Accessibility",
    "slug": "accessibility",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Accessibility.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Accessibility\n\nSpecialized engineering guidelines and best practices for **Accessibility**.\n\n## Instructions for AI Agent:\n1. Apply the **Accessibility** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/accessibility`)\n- Antigravity & OpenAI Codex (`.agents/skills/accessibility/SKILL.md`)\n- Cursor (`.cursor/rules/accessibility.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-204",
    "name": "Benchmark",
    "slug": "benchmark",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Benchmark.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Benchmark\n\nSpecialized engineering guidelines and best practices for **Benchmark**.\n\n## Instructions for AI Agent:\n1. Apply the **Benchmark** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/benchmark`)\n- Antigravity & OpenAI Codex (`.agents/skills/benchmark/SKILL.md`)\n- Cursor (`.cursor/rules/benchmark.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-205",
    "name": "Blender Motion State Inspection",
    "slug": "blender-motion-state-inspection",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Blender Motion State Inspection.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Blender Motion State Inspection\n\nSpecialized engineering guidelines and best practices for **Blender Motion State Inspection**.\n\n## Instructions for AI Agent:\n1. Apply the **Blender Motion State Inspection** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/blender-motion-state-inspection`)\n- Antigravity & OpenAI Codex (`.agents/skills/blender-motion-state-inspection/SKILL.md`)\n- Cursor (`.cursor/rules/blender-motion-state-inspection.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-206",
    "name": "Carrier Relationship Management",
    "slug": "carrier-relationship-management",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Carrier Relationship Management.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Carrier Relationship Management\n\nSpecialized engineering guidelines and best practices for **Carrier Relationship Management**.\n\n## Instructions for AI Agent:\n1. Apply the **Carrier Relationship Management** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/carrier-relationship-management`)\n- Antigravity & OpenAI Codex (`.agents/skills/carrier-relationship-management/SKILL.md`)\n- Cursor (`.cursor/rules/carrier-relationship-management.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-207",
    "name": "Cisco Ios Patterns",
    "slug": "cisco-ios-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Cisco Ios Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Cisco Ios Patterns\n\nSpecialized engineering guidelines and best practices for **Cisco Ios Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Cisco Ios Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/cisco-ios-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/cisco-ios-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/cisco-ios-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-208",
    "name": "Ck",
    "slug": "ck",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Ck.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Ck\n\nSpecialized engineering guidelines and best practices for **Ck**.\n\n## Instructions for AI Agent:\n1. Apply the **Ck** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/ck`)\n- Antigravity & OpenAI Codex (`.agents/skills/ck/SKILL.md`)\n- Cursor (`.cursor/rules/ck.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-209",
    "name": "Claude Devfleet",
    "slug": "claude-devfleet",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Claude Devfleet.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Claude Devfleet\n\nSpecialized engineering guidelines and best practices for **Claude Devfleet**.\n\n## Instructions for AI Agent:\n1. Apply the **Claude Devfleet** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/claude-devfleet`)\n- Antigravity & OpenAI Codex (`.agents/skills/claude-devfleet/SKILL.md`)\n- Cursor (`.cursor/rules/claude-devfleet.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-210",
    "name": "Click Path Audit",
    "slug": "click-path-audit",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Click Path Audit.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Click Path Audit\n\nSpecialized engineering guidelines and best practices for **Click Path Audit**.\n\n## Instructions for AI Agent:\n1. Apply the **Click Path Audit** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/click-path-audit`)\n- Antigravity & OpenAI Codex (`.agents/skills/click-path-audit/SKILL.md`)\n- Cursor (`.cursor/rules/click-path-audit.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-211",
    "name": "Competitive Platform Analysis",
    "slug": "competitive-platform-analysis",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Competitive Platform Analysis.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Competitive Platform Analysis\n\nSpecialized engineering guidelines and best practices for **Competitive Platform Analysis**.\n\n## Instructions for AI Agent:\n1. Apply the **Competitive Platform Analysis** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/competitive-platform-analysis`)\n- Antigravity & OpenAI Codex (`.agents/skills/competitive-platform-analysis/SKILL.md`)\n- Cursor (`.cursor/rules/competitive-platform-analysis.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-212",
    "name": "Competitive Report Structure",
    "slug": "competitive-report-structure",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Competitive Report Structure.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Competitive Report Structure\n\nSpecialized engineering guidelines and best practices for **Competitive Report Structure**.\n\n## Instructions for AI Agent:\n1. Apply the **Competitive Report Structure** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/competitive-report-structure`)\n- Antigravity & OpenAI Codex (`.agents/skills/competitive-report-structure/SKILL.md`)\n- Cursor (`.cursor/rules/competitive-report-structure.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-213",
    "name": "Configure Ecc",
    "slug": "configure-ecc",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Configure Ecc.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Configure Ecc\n\nSpecialized engineering guidelines and best practices for **Configure Ecc**.\n\n## Instructions for AI Agent:\n1. Apply the **Configure Ecc** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/configure-ecc`)\n- Antigravity & OpenAI Codex (`.agents/skills/configure-ecc/SKILL.md`)\n- Cursor (`.cursor/rules/configure-ecc.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-214",
    "name": "Content Engine",
    "slug": "content-engine",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Content Engine.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Content Engine\n\nSpecialized engineering guidelines and best practices for **Content Engine**.\n\n## Instructions for AI Agent:\n1. Apply the **Content Engine** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/content-engine`)\n- Antigravity & OpenAI Codex (`.agents/skills/content-engine/SKILL.md`)\n- Cursor (`.cursor/rules/content-engine.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-215",
    "name": "Continuous Learning V2",
    "slug": "continuous-learning-v2",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Continuous Learning V2.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Continuous Learning V2\n\nSpecialized engineering guidelines and best practices for **Continuous Learning V2**.\n\n## Instructions for AI Agent:\n1. Apply the **Continuous Learning V2** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/continuous-learning-v2`)\n- Antigravity & OpenAI Codex (`.agents/skills/continuous-learning-v2/SKILL.md`)\n- Cursor (`.cursor/rules/continuous-learning-v2.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-216",
    "name": "Council",
    "slug": "council",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Council.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Council\n\nSpecialized engineering guidelines and best practices for **Council**.\n\n## Instructions for AI Agent:\n1. Apply the **Council** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/council`)\n- Antigravity & OpenAI Codex (`.agents/skills/council/SKILL.md`)\n- Cursor (`.cursor/rules/council.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-217",
    "name": "Customer Billing Ops",
    "slug": "customer-billing-ops",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Customer Billing Ops.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Customer Billing Ops\n\nSpecialized engineering guidelines and best practices for **Customer Billing Ops**.\n\n## Instructions for AI Agent:\n1. Apply the **Customer Billing Ops** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/customer-billing-ops`)\n- Antigravity & OpenAI Codex (`.agents/skills/customer-billing-ops/SKILL.md`)\n- Cursor (`.cursor/rules/customer-billing-ops.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-218",
    "name": "Customs Trade Compliance",
    "slug": "customs-trade-compliance",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Customs Trade Compliance.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Customs Trade Compliance\n\nSpecialized engineering guidelines and best practices for **Customs Trade Compliance**.\n\n## Instructions for AI Agent:\n1. Apply the **Customs Trade Compliance** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/customs-trade-compliance`)\n- Antigravity & OpenAI Codex (`.agents/skills/customs-trade-compliance/SKILL.md`)\n- Cursor (`.cursor/rules/customs-trade-compliance.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-219",
    "name": "Dart Flutter Patterns",
    "slug": "dart-flutter-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Dart Flutter Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Dart Flutter Patterns\n\nSpecialized engineering guidelines and best practices for **Dart Flutter Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Dart Flutter Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/dart-flutter-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/dart-flutter-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/dart-flutter-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-220",
    "name": "Dashboard Builder",
    "slug": "dashboard-builder",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Dashboard Builder.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Dashboard Builder\n\nSpecialized engineering guidelines and best practices for **Dashboard Builder**.\n\n## Instructions for AI Agent:\n1. Apply the **Dashboard Builder** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/dashboard-builder`)\n- Antigravity & OpenAI Codex (`.agents/skills/dashboard-builder/SKILL.md`)\n- Cursor (`.cursor/rules/dashboard-builder.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-221",
    "name": "Data Scraper Agent",
    "slug": "data-scraper-agent",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Data Scraper Agent.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Data Scraper Agent\n\nSpecialized engineering guidelines and best practices for **Data Scraper Agent**.\n\n## Instructions for AI Agent:\n1. Apply the **Data Scraper Agent** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/data-scraper-agent`)\n- Antigravity & OpenAI Codex (`.agents/skills/data-scraper-agent/SKILL.md`)\n- Cursor (`.cursor/rules/data-scraper-agent.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-222",
    "name": "Data Throughput Accelerator",
    "slug": "data-throughput-accelerator",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Data Throughput Accelerator.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Data Throughput Accelerator\n\nSpecialized engineering guidelines and best practices for **Data Throughput Accelerator**.\n\n## Instructions for AI Agent:\n1. Apply the **Data Throughput Accelerator** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/data-throughput-accelerator`)\n- Antigravity & OpenAI Codex (`.agents/skills/data-throughput-accelerator/SKILL.md`)\n- Cursor (`.cursor/rules/data-throughput-accelerator.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-223",
    "name": "Database Migrations",
    "slug": "database-migrations",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Database Migrations.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Database Migrations\n\nSpecialized engineering guidelines and best practices for **Database Migrations**.\n\n## Instructions for AI Agent:\n1. Apply the **Database Migrations** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/database-migrations`)\n- Antigravity & OpenAI Codex (`.agents/skills/database-migrations/SKILL.md`)\n- Cursor (`.cursor/rules/database-migrations.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-224",
    "name": "Defi Amm Security",
    "slug": "defi-amm-security",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Defi Amm Security.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Defi Amm Security\n\nSpecialized engineering guidelines and best practices for **Defi Amm Security**.\n\n## Instructions for AI Agent:\n1. Apply the **Defi Amm Security** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/defi-amm-security`)\n- Antigravity & OpenAI Codex (`.agents/skills/defi-amm-security/SKILL.md`)\n- Cursor (`.cursor/rules/defi-amm-security.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-225",
    "name": "Delivery Gate",
    "slug": "delivery-gate",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Delivery Gate.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Delivery Gate\n\nSpecialized engineering guidelines and best practices for **Delivery Gate**.\n\n## Instructions for AI Agent:\n1. Apply the **Delivery Gate** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/delivery-gate`)\n- Antigravity & OpenAI Codex (`.agents/skills/delivery-gate/SKILL.md`)\n- Cursor (`.cursor/rules/delivery-gate.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-226",
    "name": "Deployment Patterns",
    "slug": "deployment-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Deployment Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Deployment Patterns\n\nSpecialized engineering guidelines and best practices for **Deployment Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Deployment Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/deployment-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/deployment-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/deployment-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-227",
    "name": "Design System",
    "slug": "design-system",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Design System.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Design System\n\nSpecialized engineering guidelines and best practices for **Design System**.\n\n## Instructions for AI Agent:\n1. Apply the **Design System** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/design-system`)\n- Antigravity & OpenAI Codex (`.agents/skills/design-system/SKILL.md`)\n- Cursor (`.cursor/rules/design-system.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-228",
    "name": "Dev Team",
    "slug": "dev-team",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Dev Team.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Dev Team\n\nSpecialized engineering guidelines and best practices for **Dev Team**.\n\n## Instructions for AI Agent:\n1. Apply the **Dev Team** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/dev-team`)\n- Antigravity & OpenAI Codex (`.agents/skills/dev-team/SKILL.md`)\n- Cursor (`.cursor/rules/dev-team.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-229",
    "name": "Django Celery",
    "slug": "django-celery",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Django Celery.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Django Celery\n\nSpecialized engineering guidelines and best practices for **Django Celery**.\n\n## Instructions for AI Agent:\n1. Apply the **Django Celery** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/django-celery`)\n- Antigravity & OpenAI Codex (`.agents/skills/django-celery/SKILL.md`)\n- Cursor (`.cursor/rules/django-celery.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-230",
    "name": "Django Patterns",
    "slug": "django-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Django Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Django Patterns\n\nSpecialized engineering guidelines and best practices for **Django Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Django Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/django-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/django-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/django-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-231",
    "name": "Django Security",
    "slug": "django-security",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Django Security.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Django Security\n\nSpecialized engineering guidelines and best practices for **Django Security**.\n\n## Instructions for AI Agent:\n1. Apply the **Django Security** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/django-security`)\n- Antigravity & OpenAI Codex (`.agents/skills/django-security/SKILL.md`)\n- Cursor (`.cursor/rules/django-security.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-232",
    "name": "Django Tdd",
    "slug": "django-tdd",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Django Tdd.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Django Tdd\n\nSpecialized engineering guidelines and best practices for **Django Tdd**.\n\n## Instructions for AI Agent:\n1. Apply the **Django Tdd** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/django-tdd`)\n- Antigravity & OpenAI Codex (`.agents/skills/django-tdd/SKILL.md`)\n- Cursor (`.cursor/rules/django-tdd.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-233",
    "name": "Django Verification",
    "slug": "django-verification",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Django Verification.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Django Verification\n\nSpecialized engineering guidelines and best practices for **Django Verification**.\n\n## Instructions for AI Agent:\n1. Apply the **Django Verification** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/django-verification`)\n- Antigravity & OpenAI Codex (`.agents/skills/django-verification/SKILL.md`)\n- Cursor (`.cursor/rules/django-verification.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-234",
    "name": "Dotnet Patterns",
    "slug": "dotnet-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Dotnet Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Dotnet Patterns\n\nSpecialized engineering guidelines and best practices for **Dotnet Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Dotnet Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/dotnet-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/dotnet-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/dotnet-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-235",
    "name": "Dynamic Workflow Mode",
    "slug": "dynamic-workflow-mode",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Dynamic Workflow Mode.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Dynamic Workflow Mode\n\nSpecialized engineering guidelines and best practices for **Dynamic Workflow Mode**.\n\n## Instructions for AI Agent:\n1. Apply the **Dynamic Workflow Mode** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/dynamic-workflow-mode`)\n- Antigravity & OpenAI Codex (`.agents/skills/dynamic-workflow-mode/SKILL.md`)\n- Cursor (`.cursor/rules/dynamic-workflow-mode.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-236",
    "name": "Ecc Guide",
    "slug": "ecc-guide",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Ecc Guide.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Ecc Guide\n\nSpecialized engineering guidelines and best practices for **Ecc Guide**.\n\n## Instructions for AI Agent:\n1. Apply the **Ecc Guide** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/ecc-guide`)\n- Antigravity & OpenAI Codex (`.agents/skills/ecc-guide/SKILL.md`)\n- Cursor (`.cursor/rules/ecc-guide.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-237",
    "name": "Ecc Recipes",
    "slug": "ecc-recipes",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Ecc Recipes.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Ecc Recipes\n\nSpecialized engineering guidelines and best practices for **Ecc Recipes**.\n\n## Instructions for AI Agent:\n1. Apply the **Ecc Recipes** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/ecc-recipes`)\n- Antigravity & OpenAI Codex (`.agents/skills/ecc-recipes/SKILL.md`)\n- Cursor (`.cursor/rules/ecc-recipes.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-238",
    "name": "Ecc Tools Cost Audit",
    "slug": "ecc-tools-cost-audit",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Ecc Tools Cost Audit.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Ecc Tools Cost Audit\n\nSpecialized engineering guidelines and best practices for **Ecc Tools Cost Audit**.\n\n## Instructions for AI Agent:\n1. Apply the **Ecc Tools Cost Audit** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/ecc-tools-cost-audit`)\n- Antigravity & OpenAI Codex (`.agents/skills/ecc-tools-cost-audit/SKILL.md`)\n- Cursor (`.cursor/rules/ecc-tools-cost-audit.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-239",
    "name": "Email Ops",
    "slug": "email-ops",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Email Ops.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Email Ops\n\nSpecialized engineering guidelines and best practices for **Email Ops**.\n\n## Instructions for AI Agent:\n1. Apply the **Email Ops** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/email-ops`)\n- Antigravity & OpenAI Codex (`.agents/skills/email-ops/SKILL.md`)\n- Cursor (`.cursor/rules/email-ops.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-240",
    "name": "Energy Procurement",
    "slug": "energy-procurement",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Energy Procurement.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Energy Procurement\n\nSpecialized engineering guidelines and best practices for **Energy Procurement**.\n\n## Instructions for AI Agent:\n1. Apply the **Energy Procurement** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/energy-procurement`)\n- Antigravity & OpenAI Codex (`.agents/skills/energy-procurement/SKILL.md`)\n- Cursor (`.cursor/rules/energy-procurement.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-241",
    "name": "Enterprise Agent Ops",
    "slug": "enterprise-agent-ops",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Enterprise Agent Ops.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Enterprise Agent Ops\n\nSpecialized engineering guidelines and best practices for **Enterprise Agent Ops**.\n\n## Instructions for AI Agent:\n1. Apply the **Enterprise Agent Ops** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/enterprise-agent-ops`)\n- Antigravity & OpenAI Codex (`.agents/skills/enterprise-agent-ops/SKILL.md`)\n- Cursor (`.cursor/rules/enterprise-agent-ops.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-242",
    "name": "Error Handling",
    "slug": "error-handling",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Error Handling.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Error Handling\n\nSpecialized engineering guidelines and best practices for **Error Handling**.\n\n## Instructions for AI Agent:\n1. Apply the **Error Handling** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/error-handling`)\n- Antigravity & OpenAI Codex (`.agents/skills/error-handling/SKILL.md`)\n- Cursor (`.cursor/rules/error-handling.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-243",
    "name": "Evm Token Decimals",
    "slug": "evm-token-decimals",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Evm Token Decimals.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Evm Token Decimals\n\nSpecialized engineering guidelines and best practices for **Evm Token Decimals**.\n\n## Instructions for AI Agent:\n1. Apply the **Evm Token Decimals** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/evm-token-decimals`)\n- Antigravity & OpenAI Codex (`.agents/skills/evm-token-decimals/SKILL.md`)\n- Cursor (`.cursor/rules/evm-token-decimals.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-244",
    "name": "Fal Ai Media",
    "slug": "fal-ai-media",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Fal Ai Media.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Fal Ai Media\n\nSpecialized engineering guidelines and best practices for **Fal Ai Media**.\n\n## Instructions for AI Agent:\n1. Apply the **Fal Ai Media** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/fal-ai-media`)\n- Antigravity & OpenAI Codex (`.agents/skills/fal-ai-media/SKILL.md`)\n- Cursor (`.cursor/rules/fal-ai-media.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-245",
    "name": "Fastapi Patterns",
    "slug": "fastapi-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Fastapi Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Fastapi Patterns\n\nSpecialized engineering guidelines and best practices for **Fastapi Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Fastapi Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/fastapi-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/fastapi-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/fastapi-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-246",
    "name": "Finance Billing Ops",
    "slug": "finance-billing-ops",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Finance Billing Ops.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Finance Billing Ops\n\nSpecialized engineering guidelines and best practices for **Finance Billing Ops**.\n\n## Instructions for AI Agent:\n1. Apply the **Finance Billing Ops** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/finance-billing-ops`)\n- Antigravity & OpenAI Codex (`.agents/skills/finance-billing-ops/SKILL.md`)\n- Cursor (`.cursor/rules/finance-billing-ops.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-247",
    "name": "Flox Environments",
    "slug": "flox-environments",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Flox Environments.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Flox Environments\n\nSpecialized engineering guidelines and best practices for **Flox Environments**.\n\n## Instructions for AI Agent:\n1. Apply the **Flox Environments** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/flox-environments`)\n- Antigravity & OpenAI Codex (`.agents/skills/flox-environments/SKILL.md`)\n- Cursor (`.cursor/rules/flox-environments.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-248",
    "name": "Flutter Dart Code Review",
    "slug": "flutter-dart-code-review",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Flutter Dart Code Review.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Flutter Dart Code Review\n\nSpecialized engineering guidelines and best practices for **Flutter Dart Code Review**.\n\n## Instructions for AI Agent:\n1. Apply the **Flutter Dart Code Review** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/flutter-dart-code-review`)\n- Antigravity & OpenAI Codex (`.agents/skills/flutter-dart-code-review/SKILL.md`)\n- Cursor (`.cursor/rules/flutter-dart-code-review.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-249",
    "name": "Foundation Models On Device",
    "slug": "foundation-models-on-device",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Foundation Models On Device.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Foundation Models On Device\n\nSpecialized engineering guidelines and best practices for **Foundation Models On Device**.\n\n## Instructions for AI Agent:\n1. Apply the **Foundation Models On Device** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/foundation-models-on-device`)\n- Antigravity & OpenAI Codex (`.agents/skills/foundation-models-on-device/SKILL.md`)\n- Cursor (`.cursor/rules/foundation-models-on-device.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-250",
    "name": "Frontend A11y",
    "slug": "frontend-a11y",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Frontend A11y.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Frontend A11y\n\nSpecialized engineering guidelines and best practices for **Frontend A11y**.\n\n## Instructions for AI Agent:\n1. Apply the **Frontend A11y** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/frontend-a11y`)\n- Antigravity & OpenAI Codex (`.agents/skills/frontend-a11y/SKILL.md`)\n- Cursor (`.cursor/rules/frontend-a11y.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-251",
    "name": "Frontend Design Direction",
    "slug": "frontend-design-direction",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Frontend Design Direction.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Frontend Design Direction\n\nSpecialized engineering guidelines and best practices for **Frontend Design Direction**.\n\n## Instructions for AI Agent:\n1. Apply the **Frontend Design Direction** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/frontend-design-direction`)\n- Antigravity & OpenAI Codex (`.agents/skills/frontend-design-direction/SKILL.md`)\n- Cursor (`.cursor/rules/frontend-design-direction.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-252",
    "name": "Frontend Slides",
    "slug": "frontend-slides",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Frontend Slides.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Frontend Slides\n\nSpecialized engineering guidelines and best practices for **Frontend Slides**.\n\n## Instructions for AI Agent:\n1. Apply the **Frontend Slides** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/frontend-slides`)\n- Antigravity & OpenAI Codex (`.agents/skills/frontend-slides/SKILL.md`)\n- Cursor (`.cursor/rules/frontend-slides.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-253",
    "name": "Fsharp Testing",
    "slug": "fsharp-testing",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Fsharp Testing.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Fsharp Testing\n\nSpecialized engineering guidelines and best practices for **Fsharp Testing**.\n\n## Instructions for AI Agent:\n1. Apply the **Fsharp Testing** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/fsharp-testing`)\n- Antigravity & OpenAI Codex (`.agents/skills/fsharp-testing/SKILL.md`)\n- Cursor (`.cursor/rules/fsharp-testing.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-254",
    "name": "Gan Style Harness",
    "slug": "gan-style-harness",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Gan Style Harness.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Gan Style Harness\n\nSpecialized engineering guidelines and best practices for **Gan Style Harness**.\n\n## Instructions for AI Agent:\n1. Apply the **Gan Style Harness** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/gan-style-harness`)\n- Antigravity & OpenAI Codex (`.agents/skills/gan-style-harness/SKILL.md`)\n- Cursor (`.cursor/rules/gan-style-harness.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-255",
    "name": "Gateguard",
    "slug": "gateguard",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Gateguard.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Gateguard\n\nSpecialized engineering guidelines and best practices for **Gateguard**.\n\n## Instructions for AI Agent:\n1. Apply the **Gateguard** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/gateguard`)\n- Antigravity & OpenAI Codex (`.agents/skills/gateguard/SKILL.md`)\n- Cursor (`.cursor/rules/gateguard.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-256",
    "name": "Generating Python Installer",
    "slug": "generating-python-installer",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Generating Python Installer.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Generating Python Installer\n\nSpecialized engineering guidelines and best practices for **Generating Python Installer**.\n\n## Instructions for AI Agent:\n1. Apply the **Generating Python Installer** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/generating-python-installer`)\n- Antigravity & OpenAI Codex (`.agents/skills/generating-python-installer/SKILL.md`)\n- Cursor (`.cursor/rules/generating-python-installer.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-257",
    "name": "Github Ops",
    "slug": "github-ops",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Github Ops.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Github Ops\n\nSpecialized engineering guidelines and best practices for **Github Ops**.\n\n## Instructions for AI Agent:\n1. Apply the **Github Ops** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/github-ops`)\n- Antigravity & OpenAI Codex (`.agents/skills/github-ops/SKILL.md`)\n- Cursor (`.cursor/rules/github-ops.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-258",
    "name": "Golang Patterns",
    "slug": "golang-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Golang Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Golang Patterns\n\nSpecialized engineering guidelines and best practices for **Golang Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Golang Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/golang-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/golang-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/golang-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-259",
    "name": "Golang Testing",
    "slug": "golang-testing",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Golang Testing.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Golang Testing\n\nSpecialized engineering guidelines and best practices for **Golang Testing**.\n\n## Instructions for AI Agent:\n1. Apply the **Golang Testing** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/golang-testing`)\n- Antigravity & OpenAI Codex (`.agents/skills/golang-testing/SKILL.md`)\n- Cursor (`.cursor/rules/golang-testing.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-260",
    "name": "Google Workspace Ops",
    "slug": "google-workspace-ops",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Google Workspace Ops.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Google Workspace Ops\n\nSpecialized engineering guidelines and best practices for **Google Workspace Ops**.\n\n## Instructions for AI Agent:\n1. Apply the **Google Workspace Ops** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/google-workspace-ops`)\n- Antigravity & OpenAI Codex (`.agents/skills/google-workspace-ops/SKILL.md`)\n- Cursor (`.cursor/rules/google-workspace-ops.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-261",
    "name": "Growth Log",
    "slug": "growth-log",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Growth Log.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Growth Log\n\nSpecialized engineering guidelines and best practices for **Growth Log**.\n\n## Instructions for AI Agent:\n1. Apply the **Growth Log** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/growth-log`)\n- Antigravity & OpenAI Codex (`.agents/skills/growth-log/SKILL.md`)\n- Cursor (`.cursor/rules/growth-log.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-262",
    "name": "Healthcare Cdss Patterns",
    "slug": "healthcare-cdss-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Healthcare Cdss Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Healthcare Cdss Patterns\n\nSpecialized engineering guidelines and best practices for **Healthcare Cdss Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Healthcare Cdss Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/healthcare-cdss-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/healthcare-cdss-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/healthcare-cdss-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-263",
    "name": "Healthcare Emr Patterns",
    "slug": "healthcare-emr-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Healthcare Emr Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Healthcare Emr Patterns\n\nSpecialized engineering guidelines and best practices for **Healthcare Emr Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Healthcare Emr Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/healthcare-emr-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/healthcare-emr-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/healthcare-emr-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-264",
    "name": "Healthcare Eval Harness",
    "slug": "healthcare-eval-harness",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Healthcare Eval Harness.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Healthcare Eval Harness\n\nSpecialized engineering guidelines and best practices for **Healthcare Eval Harness**.\n\n## Instructions for AI Agent:\n1. Apply the **Healthcare Eval Harness** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/healthcare-eval-harness`)\n- Antigravity & OpenAI Codex (`.agents/skills/healthcare-eval-harness/SKILL.md`)\n- Cursor (`.cursor/rules/healthcare-eval-harness.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-265",
    "name": "Healthcare Phi Compliance",
    "slug": "healthcare-phi-compliance",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Healthcare Phi Compliance.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Healthcare Phi Compliance\n\nSpecialized engineering guidelines and best practices for **Healthcare Phi Compliance**.\n\n## Instructions for AI Agent:\n1. Apply the **Healthcare Phi Compliance** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/healthcare-phi-compliance`)\n- Antigravity & OpenAI Codex (`.agents/skills/healthcare-phi-compliance/SKILL.md`)\n- Cursor (`.cursor/rules/healthcare-phi-compliance.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-266",
    "name": "Hermes Imports",
    "slug": "hermes-imports",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Hermes Imports.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Hermes Imports\n\nSpecialized engineering guidelines and best practices for **Hermes Imports**.\n\n## Instructions for AI Agent:\n1. Apply the **Hermes Imports** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/hermes-imports`)\n- Antigravity & OpenAI Codex (`.agents/skills/hermes-imports/SKILL.md`)\n- Cursor (`.cursor/rules/hermes-imports.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-267",
    "name": "Hexagonal Architecture",
    "slug": "hexagonal-architecture",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Hexagonal Architecture.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Hexagonal Architecture\n\nSpecialized engineering guidelines and best practices for **Hexagonal Architecture**.\n\n## Instructions for AI Agent:\n1. Apply the **Hexagonal Architecture** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/hexagonal-architecture`)\n- Antigravity & OpenAI Codex (`.agents/skills/hexagonal-architecture/SKILL.md`)\n- Cursor (`.cursor/rules/hexagonal-architecture.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-268",
    "name": "Hipaa Compliance",
    "slug": "hipaa-compliance",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Hipaa Compliance.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Hipaa Compliance\n\nSpecialized engineering guidelines and best practices for **Hipaa Compliance**.\n\n## Instructions for AI Agent:\n1. Apply the **Hipaa Compliance** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/hipaa-compliance`)\n- Antigravity & OpenAI Codex (`.agents/skills/hipaa-compliance/SKILL.md`)\n- Cursor (`.cursor/rules/hipaa-compliance.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-269",
    "name": "Homelab Network Readiness",
    "slug": "homelab-network-readiness",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Homelab Network Readiness.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Homelab Network Readiness\n\nSpecialized engineering guidelines and best practices for **Homelab Network Readiness**.\n\n## Instructions for AI Agent:\n1. Apply the **Homelab Network Readiness** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/homelab-network-readiness`)\n- Antigravity & OpenAI Codex (`.agents/skills/homelab-network-readiness/SKILL.md`)\n- Cursor (`.cursor/rules/homelab-network-readiness.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-270",
    "name": "Homelab Network Setup",
    "slug": "homelab-network-setup",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Homelab Network Setup.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Homelab Network Setup\n\nSpecialized engineering guidelines and best practices for **Homelab Network Setup**.\n\n## Instructions for AI Agent:\n1. Apply the **Homelab Network Setup** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/homelab-network-setup`)\n- Antigravity & OpenAI Codex (`.agents/skills/homelab-network-setup/SKILL.md`)\n- Cursor (`.cursor/rules/homelab-network-setup.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-271",
    "name": "Homelab Pihole Dns",
    "slug": "homelab-pihole-dns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Homelab Pihole Dns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Homelab Pihole Dns\n\nSpecialized engineering guidelines and best practices for **Homelab Pihole Dns**.\n\n## Instructions for AI Agent:\n1. Apply the **Homelab Pihole Dns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/homelab-pihole-dns`)\n- Antigravity & OpenAI Codex (`.agents/skills/homelab-pihole-dns/SKILL.md`)\n- Cursor (`.cursor/rules/homelab-pihole-dns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-272",
    "name": "Homelab Vlan Segmentation",
    "slug": "homelab-vlan-segmentation",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Homelab Vlan Segmentation.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Homelab Vlan Segmentation\n\nSpecialized engineering guidelines and best practices for **Homelab Vlan Segmentation**.\n\n## Instructions for AI Agent:\n1. Apply the **Homelab Vlan Segmentation** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/homelab-vlan-segmentation`)\n- Antigravity & OpenAI Codex (`.agents/skills/homelab-vlan-segmentation/SKILL.md`)\n- Cursor (`.cursor/rules/homelab-vlan-segmentation.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-273",
    "name": "Homelab Wireguard Vpn",
    "slug": "homelab-wireguard-vpn",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Homelab Wireguard Vpn.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Homelab Wireguard Vpn\n\nSpecialized engineering guidelines and best practices for **Homelab Wireguard Vpn**.\n\n## Instructions for AI Agent:\n1. Apply the **Homelab Wireguard Vpn** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/homelab-wireguard-vpn`)\n- Antigravity & OpenAI Codex (`.agents/skills/homelab-wireguard-vpn/SKILL.md`)\n- Cursor (`.cursor/rules/homelab-wireguard-vpn.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-274",
    "name": "Hookify Rules",
    "slug": "hookify-rules",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Hookify Rules.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Hookify Rules\n\nSpecialized engineering guidelines and best practices for **Hookify Rules**.\n\n## Instructions for AI Agent:\n1. Apply the **Hookify Rules** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/hookify-rules`)\n- Antigravity & OpenAI Codex (`.agents/skills/hookify-rules/SKILL.md`)\n- Cursor (`.cursor/rules/hookify-rules.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-275",
    "name": "Inherit Legacy Style",
    "slug": "inherit-legacy-style",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Inherit Legacy Style.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Inherit Legacy Style\n\nSpecialized engineering guidelines and best practices for **Inherit Legacy Style**.\n\n## Instructions for AI Agent:\n1. Apply the **Inherit Legacy Style** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/inherit-legacy-style`)\n- Antigravity & OpenAI Codex (`.agents/skills/inherit-legacy-style/SKILL.md`)\n- Cursor (`.cursor/rules/inherit-legacy-style.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-276",
    "name": "Intent Driven Development",
    "slug": "intent-driven-development",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Intent Driven Development.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Intent Driven Development\n\nSpecialized engineering guidelines and best practices for **Intent Driven Development**.\n\n## Instructions for AI Agent:\n1. Apply the **Intent Driven Development** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/intent-driven-development`)\n- Antigravity & OpenAI Codex (`.agents/skills/intent-driven-development/SKILL.md`)\n- Cursor (`.cursor/rules/intent-driven-development.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-277",
    "name": "Inventory Demand Planning",
    "slug": "inventory-demand-planning",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Inventory Demand Planning.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Inventory Demand Planning\n\nSpecialized engineering guidelines and best practices for **Inventory Demand Planning**.\n\n## Instructions for AI Agent:\n1. Apply the **Inventory Demand Planning** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/inventory-demand-planning`)\n- Antigravity & OpenAI Codex (`.agents/skills/inventory-demand-planning/SKILL.md`)\n- Cursor (`.cursor/rules/inventory-demand-planning.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-278",
    "name": "Investor Materials",
    "slug": "investor-materials",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Investor Materials.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Investor Materials\n\nSpecialized engineering guidelines and best practices for **Investor Materials**.\n\n## Instructions for AI Agent:\n1. Apply the **Investor Materials** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/investor-materials`)\n- Antigravity & OpenAI Codex (`.agents/skills/investor-materials/SKILL.md`)\n- Cursor (`.cursor/rules/investor-materials.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-279",
    "name": "Investor Outreach",
    "slug": "investor-outreach",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Investor Outreach.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Investor Outreach\n\nSpecialized engineering guidelines and best practices for **Investor Outreach**.\n\n## Instructions for AI Agent:\n1. Apply the **Investor Outreach** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/investor-outreach`)\n- Antigravity & OpenAI Codex (`.agents/skills/investor-outreach/SKILL.md`)\n- Cursor (`.cursor/rules/investor-outreach.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-280",
    "name": "Ios Icon Gen",
    "slug": "ios-icon-gen",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Ios Icon Gen.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Ios Icon Gen\n\nSpecialized engineering guidelines and best practices for **Ios Icon Gen**.\n\n## Instructions for AI Agent:\n1. Apply the **Ios Icon Gen** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/ios-icon-gen`)\n- Antigravity & OpenAI Codex (`.agents/skills/ios-icon-gen/SKILL.md`)\n- Cursor (`.cursor/rules/ios-icon-gen.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-281",
    "name": "Iterative Retrieval",
    "slug": "iterative-retrieval",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Iterative Retrieval.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Iterative Retrieval\n\nSpecialized engineering guidelines and best practices for **Iterative Retrieval**.\n\n## Instructions for AI Agent:\n1. Apply the **Iterative Retrieval** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/iterative-retrieval`)\n- Antigravity & OpenAI Codex (`.agents/skills/iterative-retrieval/SKILL.md`)\n- Cursor (`.cursor/rules/iterative-retrieval.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-282",
    "name": "Ito Baskets",
    "slug": "ito-baskets",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Ito Baskets.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Ito Baskets\n\nSpecialized engineering guidelines and best practices for **Ito Baskets**.\n\n## Instructions for AI Agent:\n1. Apply the **Ito Baskets** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/ito-baskets`)\n- Antigravity & OpenAI Codex (`.agents/skills/ito-baskets/SKILL.md`)\n- Cursor (`.cursor/rules/ito-baskets.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-283",
    "name": "Ito Compute",
    "slug": "ito-compute",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Ito Compute.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Ito Compute\n\nSpecialized engineering guidelines and best practices for **Ito Compute**.\n\n## Instructions for AI Agent:\n1. Apply the **Ito Compute** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/ito-compute`)\n- Antigravity & OpenAI Codex (`.agents/skills/ito-compute/SKILL.md`)\n- Cursor (`.cursor/rules/ito-compute.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-284",
    "name": "Ito Inference",
    "slug": "ito-inference",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Ito Inference.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Ito Inference\n\nSpecialized engineering guidelines and best practices for **Ito Inference**.\n\n## Instructions for AI Agent:\n1. Apply the **Ito Inference** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/ito-inference`)\n- Antigravity & OpenAI Codex (`.agents/skills/ito-inference/SKILL.md`)\n- Cursor (`.cursor/rules/ito-inference.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-285",
    "name": "Ito Training",
    "slug": "ito-training",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Ito Training.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Ito Training\n\nSpecialized engineering guidelines and best practices for **Ito Training**.\n\n## Instructions for AI Agent:\n1. Apply the **Ito Training** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/ito-training`)\n- Antigravity & OpenAI Codex (`.agents/skills/ito-training/SKILL.md`)\n- Cursor (`.cursor/rules/ito-training.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-286",
    "name": "Java Coding Standards",
    "slug": "java-coding-standards",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Java Coding Standards.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Java Coding Standards\n\nSpecialized engineering guidelines and best practices for **Java Coding Standards**.\n\n## Instructions for AI Agent:\n1. Apply the **Java Coding Standards** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/java-coding-standards`)\n- Antigravity & OpenAI Codex (`.agents/skills/java-coding-standards/SKILL.md`)\n- Cursor (`.cursor/rules/java-coding-standards.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-287",
    "name": "Jira Integration",
    "slug": "jira-integration",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Jira Integration.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Jira Integration\n\nSpecialized engineering guidelines and best practices for **Jira Integration**.\n\n## Instructions for AI Agent:\n1. Apply the **Jira Integration** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/jira-integration`)\n- Antigravity & OpenAI Codex (`.agents/skills/jira-integration/SKILL.md`)\n- Cursor (`.cursor/rules/jira-integration.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-288",
    "name": "Jpa Patterns",
    "slug": "jpa-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Jpa Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Jpa Patterns\n\nSpecialized engineering guidelines and best practices for **Jpa Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Jpa Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/jpa-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/jpa-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/jpa-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-289",
    "name": "Knowledge Ops",
    "slug": "knowledge-ops",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Knowledge Ops.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Knowledge Ops\n\nSpecialized engineering guidelines and best practices for **Knowledge Ops**.\n\n## Instructions for AI Agent:\n1. Apply the **Knowledge Ops** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/knowledge-ops`)\n- Antigravity & OpenAI Codex (`.agents/skills/knowledge-ops/SKILL.md`)\n- Cursor (`.cursor/rules/knowledge-ops.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-290",
    "name": "Kotlin Coroutines Flows",
    "slug": "kotlin-coroutines-flows",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Kotlin Coroutines Flows.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Kotlin Coroutines Flows\n\nSpecialized engineering guidelines and best practices for **Kotlin Coroutines Flows**.\n\n## Instructions for AI Agent:\n1. Apply the **Kotlin Coroutines Flows** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/kotlin-coroutines-flows`)\n- Antigravity & OpenAI Codex (`.agents/skills/kotlin-coroutines-flows/SKILL.md`)\n- Cursor (`.cursor/rules/kotlin-coroutines-flows.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-291",
    "name": "Kotlin Exposed Patterns",
    "slug": "kotlin-exposed-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Kotlin Exposed Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Kotlin Exposed Patterns\n\nSpecialized engineering guidelines and best practices for **Kotlin Exposed Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Kotlin Exposed Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/kotlin-exposed-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/kotlin-exposed-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/kotlin-exposed-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-292",
    "name": "Kotlin Ktor Patterns",
    "slug": "kotlin-ktor-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Kotlin Ktor Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Kotlin Ktor Patterns\n\nSpecialized engineering guidelines and best practices for **Kotlin Ktor Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Kotlin Ktor Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/kotlin-ktor-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/kotlin-ktor-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/kotlin-ktor-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-293",
    "name": "Kotlin Patterns",
    "slug": "kotlin-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Kotlin Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Kotlin Patterns\n\nSpecialized engineering guidelines and best practices for **Kotlin Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Kotlin Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/kotlin-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/kotlin-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/kotlin-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-294",
    "name": "Kotlin Testing",
    "slug": "kotlin-testing",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Kotlin Testing.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Kotlin Testing\n\nSpecialized engineering guidelines and best practices for **Kotlin Testing**.\n\n## Instructions for AI Agent:\n1. Apply the **Kotlin Testing** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/kotlin-testing`)\n- Antigravity & OpenAI Codex (`.agents/skills/kotlin-testing/SKILL.md`)\n- Cursor (`.cursor/rules/kotlin-testing.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-295",
    "name": "Laravel Patterns",
    "slug": "laravel-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Laravel Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Laravel Patterns\n\nSpecialized engineering guidelines and best practices for **Laravel Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Laravel Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/laravel-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/laravel-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/laravel-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-296",
    "name": "Laravel Plugin Discovery",
    "slug": "laravel-plugin-discovery",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Laravel Plugin Discovery.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Laravel Plugin Discovery\n\nSpecialized engineering guidelines and best practices for **Laravel Plugin Discovery**.\n\n## Instructions for AI Agent:\n1. Apply the **Laravel Plugin Discovery** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/laravel-plugin-discovery`)\n- Antigravity & OpenAI Codex (`.agents/skills/laravel-plugin-discovery/SKILL.md`)\n- Cursor (`.cursor/rules/laravel-plugin-discovery.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-297",
    "name": "Laravel Security",
    "slug": "laravel-security",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Laravel Security.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Laravel Security\n\nSpecialized engineering guidelines and best practices for **Laravel Security**.\n\n## Instructions for AI Agent:\n1. Apply the **Laravel Security** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/laravel-security`)\n- Antigravity & OpenAI Codex (`.agents/skills/laravel-security/SKILL.md`)\n- Cursor (`.cursor/rules/laravel-security.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-298",
    "name": "Laravel Tdd",
    "slug": "laravel-tdd",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Laravel Tdd.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Laravel Tdd\n\nSpecialized engineering guidelines and best practices for **Laravel Tdd**.\n\n## Instructions for AI Agent:\n1. Apply the **Laravel Tdd** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/laravel-tdd`)\n- Antigravity & OpenAI Codex (`.agents/skills/laravel-tdd/SKILL.md`)\n- Cursor (`.cursor/rules/laravel-tdd.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-299",
    "name": "Laravel Verification",
    "slug": "laravel-verification",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Laravel Verification.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Laravel Verification\n\nSpecialized engineering guidelines and best practices for **Laravel Verification**.\n\n## Instructions for AI Agent:\n1. Apply the **Laravel Verification** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/laravel-verification`)\n- Antigravity & OpenAI Codex (`.agents/skills/laravel-verification/SKILL.md`)\n- Cursor (`.cursor/rules/laravel-verification.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-300",
    "name": "Latency Critical Systems",
    "slug": "latency-critical-systems",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Latency Critical Systems.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Latency Critical Systems\n\nSpecialized engineering guidelines and best practices for **Latency Critical Systems**.\n\n## Instructions for AI Agent:\n1. Apply the **Latency Critical Systems** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/latency-critical-systems`)\n- Antigravity & OpenAI Codex (`.agents/skills/latency-critical-systems/SKILL.md`)\n- Cursor (`.cursor/rules/latency-critical-systems.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-301",
    "name": "Lead Intelligence",
    "slug": "lead-intelligence",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Lead Intelligence.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Lead Intelligence\n\nSpecialized engineering guidelines and best practices for **Lead Intelligence**.\n\n## Instructions for AI Agent:\n1. Apply the **Lead Intelligence** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/lead-intelligence`)\n- Antigravity & OpenAI Codex (`.agents/skills/lead-intelligence/SKILL.md`)\n- Cursor (`.cursor/rules/lead-intelligence.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-302",
    "name": "Liquid Glass Design",
    "slug": "liquid-glass-design",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Liquid Glass Design.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Liquid Glass Design\n\nSpecialized engineering guidelines and best practices for **Liquid Glass Design**.\n\n## Instructions for AI Agent:\n1. Apply the **Liquid Glass Design** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/liquid-glass-design`)\n- Antigravity & OpenAI Codex (`.agents/skills/liquid-glass-design/SKILL.md`)\n- Cursor (`.cursor/rules/liquid-glass-design.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-303",
    "name": "Living Docs Governance",
    "slug": "living-docs-governance",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Living Docs Governance.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Living Docs Governance\n\nSpecialized engineering guidelines and best practices for **Living Docs Governance**.\n\n## Instructions for AI Agent:\n1. Apply the **Living Docs Governance** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/living-docs-governance`)\n- Antigravity & OpenAI Codex (`.agents/skills/living-docs-governance/SKILL.md`)\n- Cursor (`.cursor/rules/living-docs-governance.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-304",
    "name": "Llm Trading Agent Security",
    "slug": "llm-trading-agent-security",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Llm Trading Agent Security.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Llm Trading Agent Security\n\nSpecialized engineering guidelines and best practices for **Llm Trading Agent Security**.\n\n## Instructions for AI Agent:\n1. Apply the **Llm Trading Agent Security** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/llm-trading-agent-security`)\n- Antigravity & OpenAI Codex (`.agents/skills/llm-trading-agent-security/SKILL.md`)\n- Cursor (`.cursor/rules/llm-trading-agent-security.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-305",
    "name": "Logistics Exception Management",
    "slug": "logistics-exception-management",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Logistics Exception Management.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Logistics Exception Management\n\nSpecialized engineering guidelines and best practices for **Logistics Exception Management**.\n\n## Instructions for AI Agent:\n1. Apply the **Logistics Exception Management** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/logistics-exception-management`)\n- Antigravity & OpenAI Codex (`.agents/skills/logistics-exception-management/SKILL.md`)\n- Cursor (`.cursor/rules/logistics-exception-management.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-306",
    "name": "Loop Design Check",
    "slug": "loop-design-check",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Loop Design Check.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Loop Design Check\n\nSpecialized engineering guidelines and best practices for **Loop Design Check**.\n\n## Instructions for AI Agent:\n1. Apply the **Loop Design Check** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/loop-design-check`)\n- Antigravity & OpenAI Codex (`.agents/skills/loop-design-check/SKILL.md`)\n- Cursor (`.cursor/rules/loop-design-check.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-307",
    "name": "Mailtrap Email Integration",
    "slug": "mailtrap-email-integration",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Mailtrap Email Integration.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Mailtrap Email Integration\n\nSpecialized engineering guidelines and best practices for **Mailtrap Email Integration**.\n\n## Instructions for AI Agent:\n1. Apply the **Mailtrap Email Integration** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/mailtrap-email-integration`)\n- Antigravity & OpenAI Codex (`.agents/skills/mailtrap-email-integration/SKILL.md`)\n- Cursor (`.cursor/rules/mailtrap-email-integration.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-308",
    "name": "Make Interfaces Feel Better",
    "slug": "make-interfaces-feel-better",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Make Interfaces Feel Better.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Make Interfaces Feel Better\n\nSpecialized engineering guidelines and best practices for **Make Interfaces Feel Better**.\n\n## Instructions for AI Agent:\n1. Apply the **Make Interfaces Feel Better** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/make-interfaces-feel-better`)\n- Antigravity & OpenAI Codex (`.agents/skills/make-interfaces-feel-better/SKILL.md`)\n- Cursor (`.cursor/rules/make-interfaces-feel-better.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-309",
    "name": "Manim Video",
    "slug": "manim-video",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Manim Video.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Manim Video\n\nSpecialized engineering guidelines and best practices for **Manim Video**.\n\n## Instructions for AI Agent:\n1. Apply the **Manim Video** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/manim-video`)\n- Antigravity & OpenAI Codex (`.agents/skills/manim-video/SKILL.md`)\n- Cursor (`.cursor/rules/manim-video.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-310",
    "name": "Market Research",
    "slug": "market-research",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Market Research.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Market Research\n\nSpecialized engineering guidelines and best practices for **Market Research**.\n\n## Instructions for AI Agent:\n1. Apply the **Market Research** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/market-research`)\n- Antigravity & OpenAI Codex (`.agents/skills/market-research/SKILL.md`)\n- Cursor (`.cursor/rules/market-research.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-311",
    "name": "Marketing Campaign",
    "slug": "marketing-campaign",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Marketing Campaign.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Marketing Campaign\n\nSpecialized engineering guidelines and best practices for **Marketing Campaign**.\n\n## Instructions for AI Agent:\n1. Apply the **Marketing Campaign** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/marketing-campaign`)\n- Antigravity & OpenAI Codex (`.agents/skills/marketing-campaign/SKILL.md`)\n- Cursor (`.cursor/rules/marketing-campaign.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-312",
    "name": "Messages Ops",
    "slug": "messages-ops",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Messages Ops.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Messages Ops\n\nSpecialized engineering guidelines and best practices for **Messages Ops**.\n\n## Instructions for AI Agent:\n1. Apply the **Messages Ops** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/messages-ops`)\n- Antigravity & OpenAI Codex (`.agents/skills/messages-ops/SKILL.md`)\n- Cursor (`.cursor/rules/messages-ops.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-313",
    "name": "Ml Adoption Playbook",
    "slug": "ml-adoption-playbook",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Ml Adoption Playbook.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Ml Adoption Playbook\n\nSpecialized engineering guidelines and best practices for **Ml Adoption Playbook**.\n\n## Instructions for AI Agent:\n1. Apply the **Ml Adoption Playbook** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/ml-adoption-playbook`)\n- Antigravity & OpenAI Codex (`.agents/skills/ml-adoption-playbook/SKILL.md`)\n- Cursor (`.cursor/rules/ml-adoption-playbook.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-314",
    "name": "Motion Advanced",
    "slug": "motion-advanced",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Motion Advanced.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Motion Advanced\n\nSpecialized engineering guidelines and best practices for **Motion Advanced**.\n\n## Instructions for AI Agent:\n1. Apply the **Motion Advanced** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/motion-advanced`)\n- Antigravity & OpenAI Codex (`.agents/skills/motion-advanced/SKILL.md`)\n- Cursor (`.cursor/rules/motion-advanced.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-315",
    "name": "Motion Foundations",
    "slug": "motion-foundations",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Motion Foundations.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Motion Foundations\n\nSpecialized engineering guidelines and best practices for **Motion Foundations**.\n\n## Instructions for AI Agent:\n1. Apply the **Motion Foundations** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/motion-foundations`)\n- Antigravity & OpenAI Codex (`.agents/skills/motion-foundations/SKILL.md`)\n- Cursor (`.cursor/rules/motion-foundations.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-316",
    "name": "Motion Patterns",
    "slug": "motion-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Motion Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Motion Patterns\n\nSpecialized engineering guidelines and best practices for **Motion Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Motion Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/motion-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/motion-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/motion-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-317",
    "name": "Motion Ui",
    "slug": "motion-ui",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Motion Ui.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Motion Ui\n\nSpecialized engineering guidelines and best practices for **Motion Ui**.\n\n## Instructions for AI Agent:\n1. Apply the **Motion Ui** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/motion-ui`)\n- Antigravity & OpenAI Codex (`.agents/skills/motion-ui/SKILL.md`)\n- Cursor (`.cursor/rules/motion-ui.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-318",
    "name": "Mysql Patterns",
    "slug": "mysql-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Mysql Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Mysql Patterns\n\nSpecialized engineering guidelines and best practices for **Mysql Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Mysql Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/mysql-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/mysql-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/mysql-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-319",
    "name": "Nanoclaw Repl",
    "slug": "nanoclaw-repl",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Nanoclaw Repl.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Nanoclaw Repl\n\nSpecialized engineering guidelines and best practices for **Nanoclaw Repl**.\n\n## Instructions for AI Agent:\n1. Apply the **Nanoclaw Repl** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/nanoclaw-repl`)\n- Antigravity & OpenAI Codex (`.agents/skills/nanoclaw-repl/SKILL.md`)\n- Cursor (`.cursor/rules/nanoclaw-repl.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-320",
    "name": "Nasiko Control Plane",
    "slug": "nasiko-control-plane",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Nasiko Control Plane.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Nasiko Control Plane\n\nSpecialized engineering guidelines and best practices for **Nasiko Control Plane**.\n\n## Instructions for AI Agent:\n1. Apply the **Nasiko Control Plane** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/nasiko-control-plane`)\n- Antigravity & OpenAI Codex (`.agents/skills/nasiko-control-plane/SKILL.md`)\n- Cursor (`.cursor/rules/nasiko-control-plane.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-321",
    "name": "Nestjs Patterns",
    "slug": "nestjs-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Nestjs Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Nestjs Patterns\n\nSpecialized engineering guidelines and best practices for **Nestjs Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Nestjs Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/nestjs-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/nestjs-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/nestjs-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-322",
    "name": "Netmiko Ssh Automation",
    "slug": "netmiko-ssh-automation",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Netmiko Ssh Automation.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Netmiko Ssh Automation\n\nSpecialized engineering guidelines and best practices for **Netmiko Ssh Automation**.\n\n## Instructions for AI Agent:\n1. Apply the **Netmiko Ssh Automation** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/netmiko-ssh-automation`)\n- Antigravity & OpenAI Codex (`.agents/skills/netmiko-ssh-automation/SKILL.md`)\n- Cursor (`.cursor/rules/netmiko-ssh-automation.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-323",
    "name": "Network Bgp Diagnostics",
    "slug": "network-bgp-diagnostics",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Network Bgp Diagnostics.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Network Bgp Diagnostics\n\nSpecialized engineering guidelines and best practices for **Network Bgp Diagnostics**.\n\n## Instructions for AI Agent:\n1. Apply the **Network Bgp Diagnostics** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/network-bgp-diagnostics`)\n- Antigravity & OpenAI Codex (`.agents/skills/network-bgp-diagnostics/SKILL.md`)\n- Cursor (`.cursor/rules/network-bgp-diagnostics.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-324",
    "name": "Network Config Validation",
    "slug": "network-config-validation",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Network Config Validation.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Network Config Validation\n\nSpecialized engineering guidelines and best practices for **Network Config Validation**.\n\n## Instructions for AI Agent:\n1. Apply the **Network Config Validation** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/network-config-validation`)\n- Antigravity & OpenAI Codex (`.agents/skills/network-config-validation/SKILL.md`)\n- Cursor (`.cursor/rules/network-config-validation.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-325",
    "name": "Network Interface Health",
    "slug": "network-interface-health",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Network Interface Health.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Network Interface Health\n\nSpecialized engineering guidelines and best practices for **Network Interface Health**.\n\n## Instructions for AI Agent:\n1. Apply the **Network Interface Health** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/network-interface-health`)\n- Antigravity & OpenAI Codex (`.agents/skills/network-interface-health/SKILL.md`)\n- Cursor (`.cursor/rules/network-interface-health.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-326",
    "name": "Nodejs Keccak256",
    "slug": "nodejs-keccak256",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Nodejs Keccak256.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Nodejs Keccak256\n\nSpecialized engineering guidelines and best practices for **Nodejs Keccak256**.\n\n## Instructions for AI Agent:\n1. Apply the **Nodejs Keccak256** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/nodejs-keccak256`)\n- Antigravity & OpenAI Codex (`.agents/skills/nodejs-keccak256/SKILL.md`)\n- Cursor (`.cursor/rules/nodejs-keccak256.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-327",
    "name": "Nutrient Document Processing",
    "slug": "nutrient-document-processing",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Nutrient Document Processing.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Nutrient Document Processing\n\nSpecialized engineering guidelines and best practices for **Nutrient Document Processing**.\n\n## Instructions for AI Agent:\n1. Apply the **Nutrient Document Processing** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/nutrient-document-processing`)\n- Antigravity & OpenAI Codex (`.agents/skills/nutrient-document-processing/SKILL.md`)\n- Cursor (`.cursor/rules/nutrient-document-processing.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-328",
    "name": "Nuxt4 Patterns",
    "slug": "nuxt4-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Nuxt4 Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Nuxt4 Patterns\n\nSpecialized engineering guidelines and best practices for **Nuxt4 Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Nuxt4 Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/nuxt4-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/nuxt4-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/nuxt4-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-329",
    "name": "Openclaw Persona Forge",
    "slug": "openclaw-persona-forge",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Openclaw Persona Forge.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Openclaw Persona Forge\n\nSpecialized engineering guidelines and best practices for **Openclaw Persona Forge**.\n\n## Instructions for AI Agent:\n1. Apply the **Openclaw Persona Forge** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/openclaw-persona-forge`)\n- Antigravity & OpenAI Codex (`.agents/skills/openclaw-persona-forge/SKILL.md`)\n- Cursor (`.cursor/rules/openclaw-persona-forge.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-330",
    "name": "Opensource Pipeline",
    "slug": "opensource-pipeline",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Opensource Pipeline.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Opensource Pipeline\n\nSpecialized engineering guidelines and best practices for **Opensource Pipeline**.\n\n## Instructions for AI Agent:\n1. Apply the **Opensource Pipeline** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/opensource-pipeline`)\n- Antigravity & OpenAI Codex (`.agents/skills/opensource-pipeline/SKILL.md`)\n- Cursor (`.cursor/rules/opensource-pipeline.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-331",
    "name": "Orch Add Feature",
    "slug": "orch-add-feature",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Orch Add Feature.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Orch Add Feature\n\nSpecialized engineering guidelines and best practices for **Orch Add Feature**.\n\n## Instructions for AI Agent:\n1. Apply the **Orch Add Feature** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/orch-add-feature`)\n- Antigravity & OpenAI Codex (`.agents/skills/orch-add-feature/SKILL.md`)\n- Cursor (`.cursor/rules/orch-add-feature.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-332",
    "name": "Orch Build Mvp",
    "slug": "orch-build-mvp",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Orch Build Mvp.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Orch Build Mvp\n\nSpecialized engineering guidelines and best practices for **Orch Build Mvp**.\n\n## Instructions for AI Agent:\n1. Apply the **Orch Build Mvp** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/orch-build-mvp`)\n- Antigravity & OpenAI Codex (`.agents/skills/orch-build-mvp/SKILL.md`)\n- Cursor (`.cursor/rules/orch-build-mvp.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-333",
    "name": "Orch Change Feature",
    "slug": "orch-change-feature",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Orch Change Feature.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Orch Change Feature\n\nSpecialized engineering guidelines and best practices for **Orch Change Feature**.\n\n## Instructions for AI Agent:\n1. Apply the **Orch Change Feature** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/orch-change-feature`)\n- Antigravity & OpenAI Codex (`.agents/skills/orch-change-feature/SKILL.md`)\n- Cursor (`.cursor/rules/orch-change-feature.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-334",
    "name": "Orch Fix Defect",
    "slug": "orch-fix-defect",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Orch Fix Defect.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Orch Fix Defect\n\nSpecialized engineering guidelines and best practices for **Orch Fix Defect**.\n\n## Instructions for AI Agent:\n1. Apply the **Orch Fix Defect** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/orch-fix-defect`)\n- Antigravity & OpenAI Codex (`.agents/skills/orch-fix-defect/SKILL.md`)\n- Cursor (`.cursor/rules/orch-fix-defect.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-335",
    "name": "Orch Pipeline",
    "slug": "orch-pipeline",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Orch Pipeline.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Orch Pipeline\n\nSpecialized engineering guidelines and best practices for **Orch Pipeline**.\n\n## Instructions for AI Agent:\n1. Apply the **Orch Pipeline** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/orch-pipeline`)\n- Antigravity & OpenAI Codex (`.agents/skills/orch-pipeline/SKILL.md`)\n- Cursor (`.cursor/rules/orch-pipeline.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-336",
    "name": "Orch Refine Code",
    "slug": "orch-refine-code",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Orch Refine Code.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Orch Refine Code\n\nSpecialized engineering guidelines and best practices for **Orch Refine Code**.\n\n## Instructions for AI Agent:\n1. Apply the **Orch Refine Code** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/orch-refine-code`)\n- Antigravity & OpenAI Codex (`.agents/skills/orch-refine-code/SKILL.md`)\n- Cursor (`.cursor/rules/orch-refine-code.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-337",
    "name": "Parallel Execution Optimizer",
    "slug": "parallel-execution-optimizer",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Parallel Execution Optimizer.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Parallel Execution Optimizer\n\nSpecialized engineering guidelines and best practices for **Parallel Execution Optimizer**.\n\n## Instructions for AI Agent:\n1. Apply the **Parallel Execution Optimizer** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/parallel-execution-optimizer`)\n- Antigravity & OpenAI Codex (`.agents/skills/parallel-execution-optimizer/SKILL.md`)\n- Cursor (`.cursor/rules/parallel-execution-optimizer.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-338",
    "name": "Perl Patterns",
    "slug": "perl-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Perl Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Perl Patterns\n\nSpecialized engineering guidelines and best practices for **Perl Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Perl Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/perl-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/perl-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/perl-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-339",
    "name": "Perl Security",
    "slug": "perl-security",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Perl Security.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Perl Security\n\nSpecialized engineering guidelines and best practices for **Perl Security**.\n\n## Instructions for AI Agent:\n1. Apply the **Perl Security** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/perl-security`)\n- Antigravity & OpenAI Codex (`.agents/skills/perl-security/SKILL.md`)\n- Cursor (`.cursor/rules/perl-security.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-340",
    "name": "Perl Testing",
    "slug": "perl-testing",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Perl Testing.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Perl Testing\n\nSpecialized engineering guidelines and best practices for **Perl Testing**.\n\n## Instructions for AI Agent:\n1. Apply the **Perl Testing** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/perl-testing`)\n- Antigravity & OpenAI Codex (`.agents/skills/perl-testing/SKILL.md`)\n- Cursor (`.cursor/rules/perl-testing.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-341",
    "name": "Plan Orchestrate",
    "slug": "plan-orchestrate",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Plan Orchestrate.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Plan Orchestrate\n\nSpecialized engineering guidelines and best practices for **Plan Orchestrate**.\n\n## Instructions for AI Agent:\n1. Apply the **Plan Orchestrate** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/plan-orchestrate`)\n- Antigravity & OpenAI Codex (`.agents/skills/plan-orchestrate/SKILL.md`)\n- Cursor (`.cursor/rules/plan-orchestrate.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-342",
    "name": "Plankton Code Quality",
    "slug": "plankton-code-quality",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Plankton Code Quality.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Plankton Code Quality\n\nSpecialized engineering guidelines and best practices for **Plankton Code Quality**.\n\n## Instructions for AI Agent:\n1. Apply the **Plankton Code Quality** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/plankton-code-quality`)\n- Antigravity & OpenAI Codex (`.agents/skills/plankton-code-quality/SKILL.md`)\n- Cursor (`.cursor/rules/plankton-code-quality.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-343",
    "name": "Postgres Patterns",
    "slug": "postgres-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Postgres Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Postgres Patterns\n\nSpecialized engineering guidelines and best practices for **Postgres Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Postgres Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/postgres-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/postgres-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/postgres-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-344",
    "name": "Prediction Market Oracle Research",
    "slug": "prediction-market-oracle-research",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Prediction Market Oracle Research.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Prediction Market Oracle Research\n\nSpecialized engineering guidelines and best practices for **Prediction Market Oracle Research**.\n\n## Instructions for AI Agent:\n1. Apply the **Prediction Market Oracle Research** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/prediction-market-oracle-research`)\n- Antigravity & OpenAI Codex (`.agents/skills/prediction-market-oracle-research/SKILL.md`)\n- Cursor (`.cursor/rules/prediction-market-oracle-research.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-345",
    "name": "Prediction Market Risk Review",
    "slug": "prediction-market-risk-review",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Prediction Market Risk Review.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Prediction Market Risk Review\n\nSpecialized engineering guidelines and best practices for **Prediction Market Risk Review**.\n\n## Instructions for AI Agent:\n1. Apply the **Prediction Market Risk Review** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/prediction-market-risk-review`)\n- Antigravity & OpenAI Codex (`.agents/skills/prediction-market-risk-review/SKILL.md`)\n- Cursor (`.cursor/rules/prediction-market-risk-review.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-346",
    "name": "Prisma Patterns",
    "slug": "prisma-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Prisma Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Prisma Patterns\n\nSpecialized engineering guidelines and best practices for **Prisma Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Prisma Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/prisma-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/prisma-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/prisma-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-347",
    "name": "Product Lens",
    "slug": "product-lens",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Product Lens.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Product Lens\n\nSpecialized engineering guidelines and best practices for **Product Lens**.\n\n## Instructions for AI Agent:\n1. Apply the **Product Lens** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/product-lens`)\n- Antigravity & OpenAI Codex (`.agents/skills/product-lens/SKILL.md`)\n- Cursor (`.cursor/rules/product-lens.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-348",
    "name": "Production Audit",
    "slug": "production-audit",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Production Audit.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Production Audit\n\nSpecialized engineering guidelines and best practices for **Production Audit**.\n\n## Instructions for AI Agent:\n1. Apply the **Production Audit** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/production-audit`)\n- Antigravity & OpenAI Codex (`.agents/skills/production-audit/SKILL.md`)\n- Cursor (`.cursor/rules/production-audit.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-349",
    "name": "Production Scheduling",
    "slug": "production-scheduling",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Production Scheduling.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Production Scheduling\n\nSpecialized engineering guidelines and best practices for **Production Scheduling**.\n\n## Instructions for AI Agent:\n1. Apply the **Production Scheduling** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/production-scheduling`)\n- Antigravity & OpenAI Codex (`.agents/skills/production-scheduling/SKILL.md`)\n- Cursor (`.cursor/rules/production-scheduling.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-350",
    "name": "Project Flow Ops",
    "slug": "project-flow-ops",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Project Flow Ops.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Project Flow Ops\n\nSpecialized engineering guidelines and best practices for **Project Flow Ops**.\n\n## Instructions for AI Agent:\n1. Apply the **Project Flow Ops** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/project-flow-ops`)\n- Antigravity & OpenAI Codex (`.agents/skills/project-flow-ops/SKILL.md`)\n- Cursor (`.cursor/rules/project-flow-ops.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-351",
    "name": "Prompt Optimizer",
    "slug": "prompt-optimizer",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Prompt Optimizer.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Prompt Optimizer\n\nSpecialized engineering guidelines and best practices for **Prompt Optimizer**.\n\n## Instructions for AI Agent:\n1. Apply the **Prompt Optimizer** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/prompt-optimizer`)\n- Antigravity & OpenAI Codex (`.agents/skills/prompt-optimizer/SKILL.md`)\n- Cursor (`.cursor/rules/prompt-optimizer.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-352",
    "name": "Python Patterns",
    "slug": "python-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Python Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Python Patterns\n\nSpecialized engineering guidelines and best practices for **Python Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Python Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/python-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/python-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/python-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-353",
    "name": "Pytorch Patterns",
    "slug": "pytorch-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Pytorch Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Pytorch Patterns\n\nSpecialized engineering guidelines and best practices for **Pytorch Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Pytorch Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/pytorch-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/pytorch-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/pytorch-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-354",
    "name": "Quality Nonconformance",
    "slug": "quality-nonconformance",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Quality Nonconformance.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Quality Nonconformance\n\nSpecialized engineering guidelines and best practices for **Quality Nonconformance**.\n\n## Instructions for AI Agent:\n1. Apply the **Quality Nonconformance** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/quality-nonconformance`)\n- Antigravity & OpenAI Codex (`.agents/skills/quality-nonconformance/SKILL.md`)\n- Cursor (`.cursor/rules/quality-nonconformance.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-355",
    "name": "Quarkus Patterns",
    "slug": "quarkus-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Quarkus Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Quarkus Patterns\n\nSpecialized engineering guidelines and best practices for **Quarkus Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Quarkus Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/quarkus-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/quarkus-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/quarkus-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-356",
    "name": "Quarkus Security",
    "slug": "quarkus-security",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Quarkus Security.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Quarkus Security\n\nSpecialized engineering guidelines and best practices for **Quarkus Security**.\n\n## Instructions for AI Agent:\n1. Apply the **Quarkus Security** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/quarkus-security`)\n- Antigravity & OpenAI Codex (`.agents/skills/quarkus-security/SKILL.md`)\n- Cursor (`.cursor/rules/quarkus-security.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-357",
    "name": "Quarkus Tdd",
    "slug": "quarkus-tdd",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Quarkus Tdd.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Quarkus Tdd\n\nSpecialized engineering guidelines and best practices for **Quarkus Tdd**.\n\n## Instructions for AI Agent:\n1. Apply the **Quarkus Tdd** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/quarkus-tdd`)\n- Antigravity & OpenAI Codex (`.agents/skills/quarkus-tdd/SKILL.md`)\n- Cursor (`.cursor/rules/quarkus-tdd.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-358",
    "name": "Quarkus Verification",
    "slug": "quarkus-verification",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Quarkus Verification.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Quarkus Verification\n\nSpecialized engineering guidelines and best practices for **Quarkus Verification**.\n\n## Instructions for AI Agent:\n1. Apply the **Quarkus Verification** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/quarkus-verification`)\n- Antigravity & OpenAI Codex (`.agents/skills/quarkus-verification/SKILL.md`)\n- Cursor (`.cursor/rules/quarkus-verification.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-359",
    "name": "Ralphinho Rfc Pipeline",
    "slug": "ralphinho-rfc-pipeline",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Ralphinho Rfc Pipeline.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Ralphinho Rfc Pipeline\n\nSpecialized engineering guidelines and best practices for **Ralphinho Rfc Pipeline**.\n\n## Instructions for AI Agent:\n1. Apply the **Ralphinho Rfc Pipeline** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/ralphinho-rfc-pipeline`)\n- Antigravity & OpenAI Codex (`.agents/skills/ralphinho-rfc-pipeline/SKILL.md`)\n- Cursor (`.cursor/rules/ralphinho-rfc-pipeline.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-360",
    "name": "React Native Patterns",
    "slug": "react-native-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for React Native Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# React Native Patterns\n\nSpecialized engineering guidelines and best practices for **React Native Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **React Native Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/react-native-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/react-native-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/react-native-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-361",
    "name": "React Patterns",
    "slug": "react-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for React Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# React Patterns\n\nSpecialized engineering guidelines and best practices for **React Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **React Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/react-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/react-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/react-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-362",
    "name": "React Performance",
    "slug": "react-performance",
    "description": "Specialized engineering patterns, best practices, and automated workflow for React Performance.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# React Performance\n\nSpecialized engineering guidelines and best practices for **React Performance**.\n\n## Instructions for AI Agent:\n1. Apply the **React Performance** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/react-performance`)\n- Antigravity & OpenAI Codex (`.agents/skills/react-performance/SKILL.md`)\n- Cursor (`.cursor/rules/react-performance.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-363",
    "name": "React Testing",
    "slug": "react-testing",
    "description": "Specialized engineering patterns, best practices, and automated workflow for React Testing.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# React Testing\n\nSpecialized engineering guidelines and best practices for **React Testing**.\n\n## Instructions for AI Agent:\n1. Apply the **React Testing** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/react-testing`)\n- Antigravity & OpenAI Codex (`.agents/skills/react-testing/SKILL.md`)\n- Cursor (`.cursor/rules/react-testing.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-364",
    "name": "Recsys Pipeline Architect",
    "slug": "recsys-pipeline-architect",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Recsys Pipeline Architect.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Recsys Pipeline Architect\n\nSpecialized engineering guidelines and best practices for **Recsys Pipeline Architect**.\n\n## Instructions for AI Agent:\n1. Apply the **Recsys Pipeline Architect** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/recsys-pipeline-architect`)\n- Antigravity & OpenAI Codex (`.agents/skills/recsys-pipeline-architect/SKILL.md`)\n- Cursor (`.cursor/rules/recsys-pipeline-architect.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-365",
    "name": "Recursive Decision Ledger",
    "slug": "recursive-decision-ledger",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Recursive Decision Ledger.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Recursive Decision Ledger\n\nSpecialized engineering guidelines and best practices for **Recursive Decision Ledger**.\n\n## Instructions for AI Agent:\n1. Apply the **Recursive Decision Ledger** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/recursive-decision-ledger`)\n- Antigravity & OpenAI Codex (`.agents/skills/recursive-decision-ledger/SKILL.md`)\n- Cursor (`.cursor/rules/recursive-decision-ledger.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-366",
    "name": "Regex Vs Llm Structured Text",
    "slug": "regex-vs-llm-structured-text",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Regex Vs Llm Structured Text.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Regex Vs Llm Structured Text\n\nSpecialized engineering guidelines and best practices for **Regex Vs Llm Structured Text**.\n\n## Instructions for AI Agent:\n1. Apply the **Regex Vs Llm Structured Text** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/regex-vs-llm-structured-text`)\n- Antigravity & OpenAI Codex (`.agents/skills/regex-vs-llm-structured-text/SKILL.md`)\n- Cursor (`.cursor/rules/regex-vs-llm-structured-text.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-367",
    "name": "Remotion Video Creation",
    "slug": "remotion-video-creation",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Remotion Video Creation.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Remotion Video Creation\n\nSpecialized engineering guidelines and best practices for **Remotion Video Creation**.\n\n## Instructions for AI Agent:\n1. Apply the **Remotion Video Creation** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/remotion-video-creation`)\n- Antigravity & OpenAI Codex (`.agents/skills/remotion-video-creation/SKILL.md`)\n- Cursor (`.cursor/rules/remotion-video-creation.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-368",
    "name": "Repo Scan",
    "slug": "repo-scan",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Repo Scan.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Repo Scan\n\nSpecialized engineering guidelines and best practices for **Repo Scan**.\n\n## Instructions for AI Agent:\n1. Apply the **Repo Scan** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/repo-scan`)\n- Antigravity & OpenAI Codex (`.agents/skills/repo-scan/SKILL.md`)\n- Cursor (`.cursor/rules/repo-scan.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-369",
    "name": "Research Ops",
    "slug": "research-ops",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Research Ops.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Research Ops\n\nSpecialized engineering guidelines and best practices for **Research Ops**.\n\n## Instructions for AI Agent:\n1. Apply the **Research Ops** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/research-ops`)\n- Antigravity & OpenAI Codex (`.agents/skills/research-ops/SKILL.md`)\n- Cursor (`.cursor/rules/research-ops.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-370",
    "name": "Returns Reverse Logistics",
    "slug": "returns-reverse-logistics",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Returns Reverse Logistics.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Returns Reverse Logistics\n\nSpecialized engineering guidelines and best practices for **Returns Reverse Logistics**.\n\n## Instructions for AI Agent:\n1. Apply the **Returns Reverse Logistics** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/returns-reverse-logistics`)\n- Antigravity & OpenAI Codex (`.agents/skills/returns-reverse-logistics/SKILL.md`)\n- Cursor (`.cursor/rules/returns-reverse-logistics.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-371",
    "name": "Rules Distill",
    "slug": "rules-distill",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Rules Distill.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Rules Distill\n\nSpecialized engineering guidelines and best practices for **Rules Distill**.\n\n## Instructions for AI Agent:\n1. Apply the **Rules Distill** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/rules-distill`)\n- Antigravity & OpenAI Codex (`.agents/skills/rules-distill/SKILL.md`)\n- Cursor (`.cursor/rules/rules-distill.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-372",
    "name": "Rust Testing",
    "slug": "rust-testing",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Rust Testing.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Rust Testing\n\nSpecialized engineering guidelines and best practices for **Rust Testing**.\n\n## Instructions for AI Agent:\n1. Apply the **Rust Testing** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/rust-testing`)\n- Antigravity & OpenAI Codex (`.agents/skills/rust-testing/SKILL.md`)\n- Cursor (`.cursor/rules/rust-testing.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-373",
    "name": "Safety Guard",
    "slug": "safety-guard",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Safety Guard.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Safety Guard\n\nSpecialized engineering guidelines and best practices for **Safety Guard**.\n\n## Instructions for AI Agent:\n1. Apply the **Safety Guard** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/safety-guard`)\n- Antigravity & OpenAI Codex (`.agents/skills/safety-guard/SKILL.md`)\n- Cursor (`.cursor/rules/safety-guard.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-374",
    "name": "Santa Method",
    "slug": "santa-method",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Santa Method.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Santa Method\n\nSpecialized engineering guidelines and best practices for **Santa Method**.\n\n## Instructions for AI Agent:\n1. Apply the **Santa Method** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/santa-method`)\n- Antigravity & OpenAI Codex (`.agents/skills/santa-method/SKILL.md`)\n- Cursor (`.cursor/rules/santa-method.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-375",
    "name": "Scientific Db Pubmed Database",
    "slug": "scientific-db-pubmed-database",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Scientific Db Pubmed Database.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Scientific Db Pubmed Database\n\nSpecialized engineering guidelines and best practices for **Scientific Db Pubmed Database**.\n\n## Instructions for AI Agent:\n1. Apply the **Scientific Db Pubmed Database** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/scientific-db-pubmed-database`)\n- Antigravity & OpenAI Codex (`.agents/skills/scientific-db-pubmed-database/SKILL.md`)\n- Cursor (`.cursor/rules/scientific-db-pubmed-database.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-376",
    "name": "Scientific Db Uspto Database",
    "slug": "scientific-db-uspto-database",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Scientific Db Uspto Database.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Scientific Db Uspto Database\n\nSpecialized engineering guidelines and best practices for **Scientific Db Uspto Database**.\n\n## Instructions for AI Agent:\n1. Apply the **Scientific Db Uspto Database** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/scientific-db-uspto-database`)\n- Antigravity & OpenAI Codex (`.agents/skills/scientific-db-uspto-database/SKILL.md`)\n- Cursor (`.cursor/rules/scientific-db-uspto-database.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-377",
    "name": "Scientific Pkg Gget",
    "slug": "scientific-pkg-gget",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Scientific Pkg Gget.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Scientific Pkg Gget\n\nSpecialized engineering guidelines and best practices for **Scientific Pkg Gget**.\n\n## Instructions for AI Agent:\n1. Apply the **Scientific Pkg Gget** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/scientific-pkg-gget`)\n- Antigravity & OpenAI Codex (`.agents/skills/scientific-pkg-gget/SKILL.md`)\n- Cursor (`.cursor/rules/scientific-pkg-gget.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-378",
    "name": "Scientific Thinking Literature Review",
    "slug": "scientific-thinking-literature-review",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Scientific Thinking Literature Review.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Scientific Thinking Literature Review\n\nSpecialized engineering guidelines and best practices for **Scientific Thinking Literature Review**.\n\n## Instructions for AI Agent:\n1. Apply the **Scientific Thinking Literature Review** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/scientific-thinking-literature-review`)\n- Antigravity & OpenAI Codex (`.agents/skills/scientific-thinking-literature-review/SKILL.md`)\n- Cursor (`.cursor/rules/scientific-thinking-literature-review.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-379",
    "name": "Scientific Thinking Scholar Evaluation",
    "slug": "scientific-thinking-scholar-evaluation",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Scientific Thinking Scholar Evaluation.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Scientific Thinking Scholar Evaluation\n\nSpecialized engineering guidelines and best practices for **Scientific Thinking Scholar Evaluation**.\n\n## Instructions for AI Agent:\n1. Apply the **Scientific Thinking Scholar Evaluation** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/scientific-thinking-scholar-evaluation`)\n- Antigravity & OpenAI Codex (`.agents/skills/scientific-thinking-scholar-evaluation/SKILL.md`)\n- Cursor (`.cursor/rules/scientific-thinking-scholar-evaluation.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-380",
    "name": "Security Bounty Hunter",
    "slug": "security-bounty-hunter",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Security Bounty Hunter.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Security Bounty Hunter\n\nSpecialized engineering guidelines and best practices for **Security Bounty Hunter**.\n\n## Instructions for AI Agent:\n1. Apply the **Security Bounty Hunter** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/security-bounty-hunter`)\n- Antigravity & OpenAI Codex (`.agents/skills/security-bounty-hunter/SKILL.md`)\n- Cursor (`.cursor/rules/security-bounty-hunter.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-381",
    "name": "Security Review",
    "slug": "security-review",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Security Review.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Security Review\n\nSpecialized engineering guidelines and best practices for **Security Review**.\n\n## Instructions for AI Agent:\n1. Apply the **Security Review** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/security-review`)\n- Antigravity & OpenAI Codex (`.agents/skills/security-review/SKILL.md`)\n- Cursor (`.cursor/rules/security-review.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-382",
    "name": "Seo",
    "slug": "seo",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Seo.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Seo\n\nSpecialized engineering guidelines and best practices for **Seo**.\n\n## Instructions for AI Agent:\n1. Apply the **Seo** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/seo`)\n- Antigravity & OpenAI Codex (`.agents/skills/seo/SKILL.md`)\n- Cursor (`.cursor/rules/seo.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-383",
    "name": "Skill Comply",
    "slug": "skill-comply",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Skill Comply.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Skill Comply\n\nSpecialized engineering guidelines and best practices for **Skill Comply**.\n\n## Instructions for AI Agent:\n1. Apply the **Skill Comply** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/skill-comply`)\n- Antigravity & OpenAI Codex (`.agents/skills/skill-comply/SKILL.md`)\n- Cursor (`.cursor/rules/skill-comply.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-384",
    "name": "Skill Scout",
    "slug": "skill-scout",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Skill Scout.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Skill Scout\n\nSpecialized engineering guidelines and best practices for **Skill Scout**.\n\n## Instructions for AI Agent:\n1. Apply the **Skill Scout** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/skill-scout`)\n- Antigravity & OpenAI Codex (`.agents/skills/skill-scout/SKILL.md`)\n- Cursor (`.cursor/rules/skill-scout.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-385",
    "name": "Skill Stocktake",
    "slug": "skill-stocktake",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Skill Stocktake.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Skill Stocktake\n\nSpecialized engineering guidelines and best practices for **Skill Stocktake**.\n\n## Instructions for AI Agent:\n1. Apply the **Skill Stocktake** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/skill-stocktake`)\n- Antigravity & OpenAI Codex (`.agents/skills/skill-stocktake/SKILL.md`)\n- Cursor (`.cursor/rules/skill-stocktake.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-386",
    "name": "Social Graph Ranker",
    "slug": "social-graph-ranker",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Social Graph Ranker.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Social Graph Ranker\n\nSpecialized engineering guidelines and best practices for **Social Graph Ranker**.\n\n## Instructions for AI Agent:\n1. Apply the **Social Graph Ranker** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/social-graph-ranker`)\n- Antigravity & OpenAI Codex (`.agents/skills/social-graph-ranker/SKILL.md`)\n- Cursor (`.cursor/rules/social-graph-ranker.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-387",
    "name": "Social Publisher",
    "slug": "social-publisher",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Social Publisher.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Social Publisher\n\nSpecialized engineering guidelines and best practices for **Social Publisher**.\n\n## Instructions for AI Agent:\n1. Apply the **Social Publisher** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/social-publisher`)\n- Antigravity & OpenAI Codex (`.agents/skills/social-publisher/SKILL.md`)\n- Cursor (`.cursor/rules/social-publisher.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-388",
    "name": "Springboot Patterns",
    "slug": "springboot-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Springboot Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Springboot Patterns\n\nSpecialized engineering guidelines and best practices for **Springboot Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Springboot Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/springboot-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/springboot-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/springboot-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-389",
    "name": "Springboot Security",
    "slug": "springboot-security",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Springboot Security.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Springboot Security\n\nSpecialized engineering guidelines and best practices for **Springboot Security**.\n\n## Instructions for AI Agent:\n1. Apply the **Springboot Security** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/springboot-security`)\n- Antigravity & OpenAI Codex (`.agents/skills/springboot-security/SKILL.md`)\n- Cursor (`.cursor/rules/springboot-security.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-390",
    "name": "Springboot Tdd",
    "slug": "springboot-tdd",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Springboot Tdd.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Springboot Tdd\n\nSpecialized engineering guidelines and best practices for **Springboot Tdd**.\n\n## Instructions for AI Agent:\n1. Apply the **Springboot Tdd** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/springboot-tdd`)\n- Antigravity & OpenAI Codex (`.agents/skills/springboot-tdd/SKILL.md`)\n- Cursor (`.cursor/rules/springboot-tdd.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-391",
    "name": "Springboot Verification",
    "slug": "springboot-verification",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Springboot Verification.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Springboot Verification\n\nSpecialized engineering guidelines and best practices for **Springboot Verification**.\n\n## Instructions for AI Agent:\n1. Apply the **Springboot Verification** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/springboot-verification`)\n- Antigravity & OpenAI Codex (`.agents/skills/springboot-verification/SKILL.md`)\n- Cursor (`.cursor/rules/springboot-verification.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-392",
    "name": "Swift Actor Persistence",
    "slug": "swift-actor-persistence",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Swift Actor Persistence.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Swift Actor Persistence\n\nSpecialized engineering guidelines and best practices for **Swift Actor Persistence**.\n\n## Instructions for AI Agent:\n1. Apply the **Swift Actor Persistence** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/swift-actor-persistence`)\n- Antigravity & OpenAI Codex (`.agents/skills/swift-actor-persistence/SKILL.md`)\n- Cursor (`.cursor/rules/swift-actor-persistence.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-393",
    "name": "Swift Concurrency 6 2",
    "slug": "swift-concurrency-6-2",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Swift Concurrency 6 2.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Swift Concurrency 6 2\n\nSpecialized engineering guidelines and best practices for **Swift Concurrency 6 2**.\n\n## Instructions for AI Agent:\n1. Apply the **Swift Concurrency 6 2** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/swift-concurrency-6-2`)\n- Antigravity & OpenAI Codex (`.agents/skills/swift-concurrency-6-2/SKILL.md`)\n- Cursor (`.cursor/rules/swift-concurrency-6-2.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-394",
    "name": "Swift Protocol Di Testing",
    "slug": "swift-protocol-di-testing",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Swift Protocol Di Testing.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Swift Protocol Di Testing\n\nSpecialized engineering guidelines and best practices for **Swift Protocol Di Testing**.\n\n## Instructions for AI Agent:\n1. Apply the **Swift Protocol Di Testing** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/swift-protocol-di-testing`)\n- Antigravity & OpenAI Codex (`.agents/skills/swift-protocol-di-testing/SKILL.md`)\n- Cursor (`.cursor/rules/swift-protocol-di-testing.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-395",
    "name": "Swiftui Patterns",
    "slug": "swiftui-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Swiftui Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Swiftui Patterns\n\nSpecialized engineering guidelines and best practices for **Swiftui Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Swiftui Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/swiftui-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/swiftui-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/swiftui-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-396",
    "name": "Taste",
    "slug": "taste",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Taste.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Taste\n\nSpecialized engineering guidelines and best practices for **Taste**.\n\n## Instructions for AI Agent:\n1. Apply the **Taste** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/taste`)\n- Antigravity & OpenAI Codex (`.agents/skills/taste/SKILL.md`)\n- Cursor (`.cursor/rules/taste.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-397",
    "name": "Tasteforge Video",
    "slug": "tasteforge-video",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Tasteforge Video.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Tasteforge Video\n\nSpecialized engineering guidelines and best practices for **Tasteforge Video**.\n\n## Instructions for AI Agent:\n1. Apply the **Tasteforge Video** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/tasteforge-video`)\n- Antigravity & OpenAI Codex (`.agents/skills/tasteforge-video/SKILL.md`)\n- Cursor (`.cursor/rules/tasteforge-video.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-398",
    "name": "Team Agent Orchestration",
    "slug": "team-agent-orchestration",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Team Agent Orchestration.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Team Agent Orchestration\n\nSpecialized engineering guidelines and best practices for **Team Agent Orchestration**.\n\n## Instructions for AI Agent:\n1. Apply the **Team Agent Orchestration** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/team-agent-orchestration`)\n- Antigravity & OpenAI Codex (`.agents/skills/team-agent-orchestration/SKILL.md`)\n- Cursor (`.cursor/rules/team-agent-orchestration.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-399",
    "name": "Team Builder",
    "slug": "team-builder",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Team Builder.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Team Builder\n\nSpecialized engineering guidelines and best practices for **Team Builder**.\n\n## Instructions for AI Agent:\n1. Apply the **Team Builder** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/team-builder`)\n- Antigravity & OpenAI Codex (`.agents/skills/team-builder/SKILL.md`)\n- Cursor (`.cursor/rules/team-builder.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-400",
    "name": "Terminal Opener",
    "slug": "terminal-opener",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Terminal Opener.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Terminal Opener\n\nSpecialized engineering guidelines and best practices for **Terminal Opener**.\n\n## Instructions for AI Agent:\n1. Apply the **Terminal Opener** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/terminal-opener`)\n- Antigravity & OpenAI Codex (`.agents/skills/terminal-opener/SKILL.md`)\n- Cursor (`.cursor/rules/terminal-opener.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-401",
    "name": "Terminal Ops",
    "slug": "terminal-ops",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Terminal Ops.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Terminal Ops\n\nSpecialized engineering guidelines and best practices for **Terminal Ops**.\n\n## Instructions for AI Agent:\n1. Apply the **Terminal Ops** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/terminal-ops`)\n- Antigravity & OpenAI Codex (`.agents/skills/terminal-ops/SKILL.md`)\n- Cursor (`.cursor/rules/terminal-ops.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-402",
    "name": "Tinystruct Patterns",
    "slug": "tinystruct-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Tinystruct Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Tinystruct Patterns\n\nSpecialized engineering guidelines and best practices for **Tinystruct Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Tinystruct Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/tinystruct-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/tinystruct-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/tinystruct-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-403",
    "name": "Token Budget Advisor",
    "slug": "token-budget-advisor",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Token Budget Advisor.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Token Budget Advisor\n\nSpecialized engineering guidelines and best practices for **Token Budget Advisor**.\n\n## Instructions for AI Agent:\n1. Apply the **Token Budget Advisor** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/token-budget-advisor`)\n- Antigravity & OpenAI Codex (`.agents/skills/token-budget-advisor/SKILL.md`)\n- Cursor (`.cursor/rules/token-budget-advisor.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-404",
    "name": "Ui Demo",
    "slug": "ui-demo",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Ui Demo.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Ui Demo\n\nSpecialized engineering guidelines and best practices for **Ui Demo**.\n\n## Instructions for AI Agent:\n1. Apply the **Ui Demo** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/ui-demo`)\n- Antigravity & OpenAI Codex (`.agents/skills/ui-demo/SKILL.md`)\n- Cursor (`.cursor/rules/ui-demo.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-405",
    "name": "Ui To Vue",
    "slug": "ui-to-vue",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Ui To Vue.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Ui To Vue\n\nSpecialized engineering guidelines and best practices for **Ui To Vue**.\n\n## Instructions for AI Agent:\n1. Apply the **Ui To Vue** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/ui-to-vue`)\n- Antigravity & OpenAI Codex (`.agents/skills/ui-to-vue/SKILL.md`)\n- Cursor (`.cursor/rules/ui-to-vue.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-406",
    "name": "Uncloud",
    "slug": "uncloud",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Uncloud.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Uncloud\n\nSpecialized engineering guidelines and best practices for **Uncloud**.\n\n## Instructions for AI Agent:\n1. Apply the **Uncloud** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/uncloud`)\n- Antigravity & OpenAI Codex (`.agents/skills/uncloud/SKILL.md`)\n- Cursor (`.cursor/rules/uncloud.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-407",
    "name": "Unified Notifications Ops",
    "slug": "unified-notifications-ops",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Unified Notifications Ops.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Unified Notifications Ops\n\nSpecialized engineering guidelines and best practices for **Unified Notifications Ops**.\n\n## Instructions for AI Agent:\n1. Apply the **Unified Notifications Ops** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/unified-notifications-ops`)\n- Antigravity & OpenAI Codex (`.agents/skills/unified-notifications-ops/SKILL.md`)\n- Cursor (`.cursor/rules/unified-notifications-ops.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-408",
    "name": "Videodb",
    "slug": "videodb",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Videodb.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Videodb\n\nSpecialized engineering guidelines and best practices for **Videodb**.\n\n## Instructions for AI Agent:\n1. Apply the **Videodb** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/videodb`)\n- Antigravity & OpenAI Codex (`.agents/skills/videodb/SKILL.md`)\n- Cursor (`.cursor/rules/videodb.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-409",
    "name": "Visa Doc Translate",
    "slug": "visa-doc-translate",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Visa Doc Translate.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Visa Doc Translate\n\nSpecialized engineering guidelines and best practices for **Visa Doc Translate**.\n\n## Instructions for AI Agent:\n1. Apply the **Visa Doc Translate** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/visa-doc-translate`)\n- Antigravity & OpenAI Codex (`.agents/skills/visa-doc-translate/SKILL.md`)\n- Cursor (`.cursor/rules/visa-doc-translate.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-410",
    "name": "Vite Patterns",
    "slug": "vite-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Vite Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Vite Patterns\n\nSpecialized engineering guidelines and best practices for **Vite Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Vite Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/vite-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/vite-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/vite-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-411",
    "name": "Vue Patterns",
    "slug": "vue-patterns",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Vue Patterns.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Vue Patterns\n\nSpecialized engineering guidelines and best practices for **Vue Patterns**.\n\n## Instructions for AI Agent:\n1. Apply the **Vue Patterns** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/vue-patterns`)\n- Antigravity & OpenAI Codex (`.agents/skills/vue-patterns/SKILL.md`)\n- Cursor (`.cursor/rules/vue-patterns.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-412",
    "name": "Windows Desktop E2e",
    "slug": "windows-desktop-e2e",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Windows Desktop E2e.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Windows Desktop E2e\n\nSpecialized engineering guidelines and best practices for **Windows Desktop E2e**.\n\n## Instructions for AI Agent:\n1. Apply the **Windows Desktop E2e** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/windows-desktop-e2e`)\n- Antigravity & OpenAI Codex (`.agents/skills/windows-desktop-e2e/SKILL.md`)\n- Cursor (`.cursor/rules/windows-desktop-e2e.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  },
  {
    "id": "skill-413",
    "name": "Workspace Surface Audit",
    "slug": "workspace-surface-audit",
    "description": "Specialized engineering patterns, best practices, and automated workflow for Workspace Surface Audit.",
    "frameworks": [
      "Cross-Platform",
      "Agentic",
      "CLI",
      "TypeScript"
    ],
    "content": "# Workspace Surface Audit\n\nSpecialized engineering guidelines and best practices for **Workspace Surface Audit**.\n\n## Instructions for AI Agent:\n1. Apply the **Workspace Surface Audit** pattern and conventions when working in this domain.\n2. Verify all modifications with relevant test suites and static analysis tools.\n3. Keep implementation clean, modular, and well-documented.\n\n## Supported Harnesses:\n- Claude Code (`/workspace-surface-audit`)\n- Antigravity & OpenAI Codex (`.agents/skills/workspace-surface-audit/SKILL.md`)\n- Cursor (`.cursor/rules/workspace-surface-audit.mdc`)",
    "createdAt": "2026-08-21T20:50:00.000Z"
  }
];

// src/cli/index.ts
var program = new Command();
program.name("awesome-ai-tools").description("CLI to instantly install 400+ AI skills across all AI IDEs (Cursor, Antigravity, Windsurf, Copilot, Continue) and CLI harnesses (Claude Code, Codex)").version("0.4.0");
function toCommandName(slug) {
  return slug.replace(/^skill-/, "").replace(/[^a-zA-Z0-9_-]/g, "-").toLowerCase();
}
program.command("list").description("List all available AI skills and their IDE / CLI triggers").action(() => {
  console.log("\n\u{1F680} Available AI Skills & Triggers (IDE + CLI):\n");
  AI_SKILLS.forEach((skill) => {
    const cmd = toCommandName(skill.slug);
    console.log(`- \x1B[36m${skill.name}\x1B[0m`);
    console.log(`  CLI Trigger: \x1B[35m/${cmd}\x1B[0m | Cursor: \x1B[33m@${cmd}\x1B[0m | Copilot/Continue: \x1B[32m/${cmd}\x1B[0m`);
    console.log(`  ${skill.description}
`);
  });
  console.log("Run 'npx awesome-ai-tools init' to configure your IDE & CLI automatically.\n");
});
program.command("init").description("Install all AI skills into your favorite IDE or CLI harness").option("-t, --target <type>", "Target IDE/Platform (all, cursor, antigravity, claude, continue, copilot, windsurf, cline)").action(async (options) => {
  let target = options.target;
  if (!target) {
    const response = await prompts({
      type: "select",
      name: "target",
      message: "Select your AI IDE / CLI environment to configure:",
      choices: [
        {
          title: "\u{1F31F} All-in-One Universal Suite (CLI + Cursor + Antigravity + Copilot + Continue + Windsurf)",
          value: "all",
          description: "Generates full structure for every AI coding environment"
        },
        {
          title: "Cursor IDE (.cursor/rules/*.mdc) [Trigger via @rule]",
          value: "cursor",
          description: "Modern multi-file MDC rules for Cursor with auto-triggers"
        },
        {
          title: "Google Antigravity & OpenAI Codex (.agents/skills/*/SKILL.md)",
          value: "antigravity",
          description: "Native agent skill specifications with multi-agent support"
        },
        {
          title: "Claude Code CLI (.claude/commands/*.md) [Trigger via /command]",
          value: "claude",
          description: "Full slash command suite in Claude Code terminal"
        },
        {
          title: "Continue.dev (.continue/prompts/*.prompt) [Trigger via /command]",
          value: "continue",
          description: "Custom slash commands for Continue.dev in VS Code / JetBrains"
        },
        {
          title: "GitHub Copilot (.github/prompts/*.prompt.md & instructions)",
          value: "copilot",
          description: "Prompt files and instructions for Copilot Chat in VS Code"
        },
        {
          title: "Windsurf IDE (.windsurfrules & .windsurf/workflows/)",
          value: "windsurf",
          description: "Rules & workflow files for Codeium Windsurf Cascade"
        },
        {
          title: "Cline / Roo Code (.clinerules & workflows)",
          value: "cline",
          description: "Custom rules and workflow directives for Cline"
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
  console.log(`
\u2699\uFE0F  Scaffolding ${AI_SKILLS.length} skills for [${target.toUpperCase()}]...
`);
  if (target === "all" || target === "claude") {
    const claudeCmdDir = path.join(cwd, ".claude", "commands");
    if (!fs.existsSync(claudeCmdDir)) fs.mkdirSync(claudeCmdDir, { recursive: true });
    AI_SKILLS.forEach((skill) => {
      const cmdName = toCommandName(skill.slug);
      const filePath = path.join(claudeCmdDir, `${cmdName}.md`);
      const fileContent = `# /${cmdName} \u2014 ${skill.name}

${skill.description}

## Instructions for AI Agent:
When this command is triggered:
1. Apply the **${skill.name}** pattern and guidelines immediately.
2. Adhere to verification rules and prevent hallucinated APIs.

---

${skill.content}
`;
      fs.writeFileSync(filePath, fileContent, "utf8");
    });
    console.log(`\u2705 Generated \x1B[32m${AI_SKILLS.length} Slash Commands\x1B[0m in \x1B[36m.claude/commands/\x1B[0m (Trigger: /command)`);
    totalGenerated += AI_SKILLS.length;
  }
  if (target === "all" || target === "cursor") {
    const cursorRulesDir = path.join(cwd, ".cursor", "rules");
    if (!fs.existsSync(cursorRulesDir)) fs.mkdirSync(cursorRulesDir, { recursive: true });
    AI_SKILLS.forEach((skill) => {
      const cmdName = toCommandName(skill.slug);
      const filePath = path.join(cursorRulesDir, `${cmdName}.mdc`);
      const fileContent = `---
description: ${skill.description}
globs: *
alwaysApply: false
---

# ${skill.name}

${skill.content}
`;
      fs.writeFileSync(filePath, fileContent, "utf8");
    });
    console.log(`\u2705 Generated \x1B[32m${AI_SKILLS.length} MDC Rules\x1B[0m in \x1B[36m.cursor/rules/\x1B[0m (Trigger in Cursor chat: @rule)`);
    totalGenerated += AI_SKILLS.length;
  }
  if (target === "all" || target === "antigravity") {
    const agentsSkillsDir = path.join(cwd, ".agents", "skills");
    AI_SKILLS.forEach((skill) => {
      const skillDir = path.join(agentsSkillsDir, skill.slug);
      if (!fs.existsSync(skillDir)) fs.mkdirSync(skillDir, { recursive: true });
      const filePath = path.join(skillDir, "SKILL.md");
      const fileContent = `---
name: ${skill.name}
description: ${skill.description}
frameworks: [${skill.frameworks.join(", ")}]
---

${skill.content}
`;
      fs.writeFileSync(filePath, fileContent, "utf8");
    });
    console.log(`\u2705 Generated \x1B[32m${AI_SKILLS.length} Universal Skills\x1B[0m in \x1B[36m.agents/skills/\x1B[0m (Antigravity & Codex)`);
    totalGenerated += AI_SKILLS.length;
  }
  if (target === "all" || target === "continue") {
    const continuePromptsDir = path.join(cwd, ".continue", "prompts");
    if (!fs.existsSync(continuePromptsDir)) fs.mkdirSync(continuePromptsDir, { recursive: true });
    AI_SKILLS.forEach((skill) => {
      const cmdName = toCommandName(skill.slug);
      const filePath = path.join(continuePromptsDir, `${cmdName}.prompt`);
      const fileContent = `temperature: 0.2
description: ${skill.description}
---
# ${skill.name} Pattern Directive
{{{ input }}}

---
Guidelines to follow:
${skill.content}
`;
      fs.writeFileSync(filePath, fileContent, "utf8");
    });
    console.log(`\u2705 Generated \x1B[32m${AI_SKILLS.length} Custom Prompts\x1B[0m in \x1B[36m.continue/prompts/\x1B[0m (Trigger in Continue: /command)`);
    totalGenerated += AI_SKILLS.length;
  }
  if (target === "all" || target === "copilot") {
    const copilotPromptsDir = path.join(cwd, ".github", "prompts");
    if (!fs.existsSync(copilotPromptsDir)) fs.mkdirSync(copilotPromptsDir, { recursive: true });
    AI_SKILLS.forEach((skill) => {
      const cmdName = toCommandName(skill.slug);
      const filePath = path.join(copilotPromptsDir, `${cmdName}.prompt.md`);
      const fileContent = `---
name: ${cmdName}
description: ${skill.description}
---

Apply the ${skill.name} engineering rules:

${skill.content}
`;
      fs.writeFileSync(filePath, fileContent, "utf8");
    });
    const instructionsPath = path.join(cwd, ".github", "copilot-instructions.md");
    const instructionsContent = `# Copilot Custom Instructions & Skills Suite
Active skills registered: ${AI_SKILLS.length} skills in .github/prompts/
Reference prompt files or use slash commands in VS Code Copilot Chat.
`;
    fs.writeFileSync(instructionsPath, instructionsContent, "utf8");
    console.log(`\u2705 Generated \x1B[32m${AI_SKILLS.length} Copilot Prompts\x1B[0m in \x1B[36m.github/prompts/\x1B[0m (Trigger in Copilot: /command)`);
    totalGenerated += AI_SKILLS.length;
  }
  if (target === "all" || target === "windsurf") {
    const windsurfDir = path.join(cwd, ".windsurf", "workflows");
    if (!fs.existsSync(windsurfDir)) fs.mkdirSync(windsurfDir, { recursive: true });
    AI_SKILLS.forEach((skill) => {
      const cmdName = toCommandName(skill.slug);
      const filePath = path.join(windsurfDir, `${cmdName}.md`);
      const fileContent = `# Windsurf Workflow: ${skill.name}

${skill.description}

## Rules:
${skill.content}
`;
      fs.writeFileSync(filePath, fileContent, "utf8");
    });
    console.log(`\u2705 Generated \x1B[32m${AI_SKILLS.length} Workflows\x1B[0m in \x1B[36m.windsurf/workflows/\x1B[0m`);
    totalGenerated += AI_SKILLS.length;
  }
  const agentsMdPath = path.join(cwd, "AGENTS.md");
  const agentsMdContent = `# Universal AI Agent Guidelines & Skills Suite

This repository is equipped with **${AI_SKILLS.length} AI Skills** supporting both **CLI Agents** (Claude Code, Codex) and **AI IDEs** (Cursor, Antigravity, Windsurf, Copilot, Continue).

## Triggering Skills in your AI Environment:
- **Claude Code CLI**: Type \`/<command>\` (e.g. \`/tdd-workflow\`, \`/plan-first\`, \`/security-scan\`)
- **Cursor IDE**: Mention \`@<command>\` or rules apply based on context
- **Continue.dev**: Type \`/<command>\` in the Continue sidebar
- **GitHub Copilot**: Type \`/<command>\` in Copilot Chat
- **Antigravity / Codex**: Automatically read from \`.agents/skills/\`

## Full Skills Catalog:
${AI_SKILLS.map((s) => `- \`/${toCommandName(s.slug)}\` (\`@${toCommandName(s.slug)}\`): **${s.name}** \u2014 ${s.description}`).join("\n")}
`;
  fs.writeFileSync(agentsMdPath, agentsMdContent, "utf8");
  console.log(`\u2705 Generated master \x1B[32mAGENTS.md\x1B[0m index in project root.`);
  console.log(`
\u{1F389} \x1B[32mSetup Complete!\x1B[0m Total ${totalGenerated} configuration files generated.`);
  console.log("Open your AI IDE or CLI terminal and start coding with instant triggers!\n");
});
program.command("add").description("Add a specific AI skill into your project in any IDE or CLI format").argument("<slug>", "The slug of the skill to add (e.g., tdd-workflow)").option("-e, --editor <type>", "Target format (cursor, claude, antigravity, continue, copilot, windsurf, cline)").action(async (slug, options) => {
  const skill = AI_SKILLS.find((s) => s.slug === slug || toCommandName(s.slug) === toCommandName(slug));
  if (!skill) {
    console.error(`
\u274C Error: Skill with slug '${slug}' not found.`);
    console.log("Run 'npx awesome-ai-tools list' to see available skills.\n");
    process.exit(1);
  }
  let editor = options.editor;
  const cmdName = toCommandName(skill.slug);
  if (!editor) {
    const response = await prompts({
      type: "select",
      name: "editor",
      message: "Select which IDE / CLI format to create for this skill:",
      choices: [
        { title: `Cursor IDE Rule (.cursor/rules/${cmdName}.mdc) [Trigger: @${cmdName}]`, value: "cursor" },
        { title: `Claude Code Slash Command (/.claude/commands/${cmdName}.md) [Trigger: /${cmdName}]`, value: "claude" },
        { title: `Google Antigravity & Codex (.agents/skills/${skill.slug}/SKILL.md)`, value: "antigravity" },
        { title: `Continue.dev Prompt (.continue/prompts/${cmdName}.prompt) [Trigger: /${cmdName}]`, value: "continue" },
        { title: `GitHub Copilot Prompt (.github/prompts/${cmdName}.prompt.md) [Trigger: /${cmdName}]`, value: "copilot" },
        { title: `Windsurf IDE Workflow (.windsurf/workflows/${cmdName}.md)`, value: "windsurf" },
        { title: "Append to project CLAUDE.md", value: "claude-append" },
        { title: "Append to .cursorrules", value: "cursor-legacy" }
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
    case "cursor": {
      const rulesDir = path.join(process.cwd(), ".cursor", "rules");
      if (!fs.existsSync(rulesDir)) fs.mkdirSync(rulesDir, { recursive: true });
      targetPath = path.join(rulesDir, `${cmdName}.mdc`);
      fileContent = `---
description: ${skill.description}
globs: *
alwaysApply: true
---

# ${skill.name}

${skill.content}
`;
      break;
    }
    case "claude": {
      const cmdDir = path.join(process.cwd(), ".claude", "commands");
      if (!fs.existsSync(cmdDir)) fs.mkdirSync(cmdDir, { recursive: true });
      targetPath = path.join(cmdDir, `${cmdName}.md`);
      fileContent = `# /${cmdName} \u2014 ${skill.name}

${skill.description}

## Instructions for AI Agent:
${skill.content}
`;
      break;
    }
    case "antigravity": {
      const skillDir = path.join(process.cwd(), ".agents", "skills", skill.slug);
      if (!fs.existsSync(skillDir)) fs.mkdirSync(skillDir, { recursive: true });
      targetPath = path.join(skillDir, "SKILL.md");
      fileContent = `---
name: ${skill.name}
description: ${skill.description}
frameworks: [${skill.frameworks.join(", ")}]
---

${skill.content}
`;
      break;
    }
    case "continue": {
      const continueDir = path.join(process.cwd(), ".continue", "prompts");
      if (!fs.existsSync(continueDir)) fs.mkdirSync(continueDir, { recursive: true });
      targetPath = path.join(continueDir, `${cmdName}.prompt`);
      fileContent = `temperature: 0.2
description: ${skill.description}
---
# ${skill.name}
{{{ input }}}

${skill.content}
`;
      break;
    }
    case "copilot": {
      const copilotDir = path.join(process.cwd(), ".github", "prompts");
      if (!fs.existsSync(copilotDir)) fs.mkdirSync(copilotDir, { recursive: true });
      targetPath = path.join(copilotDir, `${cmdName}.prompt.md`);
      fileContent = `---
name: ${cmdName}
description: ${skill.description}
---

${skill.content}
`;
      break;
    }
    case "windsurf": {
      const wsDir = path.join(process.cwd(), ".windsurf", "workflows");
      if (!fs.existsSync(wsDir)) fs.mkdirSync(wsDir, { recursive: true });
      targetPath = path.join(wsDir, `${cmdName}.md`);
      fileContent = `# Windsurf: ${skill.name}

${skill.description}

${skill.content}
`;
      break;
    }
    case "claude-append":
      targetPath = path.join(process.cwd(), "CLAUDE.md");
      fileContent = `
## Skill: ${skill.name} (Trigger: /${cmdName})
${skill.content}
`;
      break;
    case "cursor-legacy":
      targetPath = path.join(process.cwd(), ".cursorrules");
      break;
    default:
      console.error("\n\u274C Error: Unsupported format type.");
      process.exit(1);
  }
  const relativeTarget = path.relative(process.cwd(), targetPath) || path.basename(targetPath);
  try {
    fs.writeFileSync(targetPath, fileContent, "utf8");
    console.log(`
\u2705 Created / Updated: \x1B[32m${relativeTarget}\x1B[0m`);
    console.log(`\u{1F4A1} Ready to trigger in your IDE or CLI as \x1B[35m/${cmdName}\x1B[0m or \x1B[33m@${cmdName}\x1B[0m!
`);
  } catch (error) {
    console.error(`
\u274C Failed to write file: ${error.message}
`);
  }
});
program.parse();
//# sourceMappingURL=index.mjs.map
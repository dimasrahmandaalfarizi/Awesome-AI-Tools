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
  }
];

// src/cli/index.ts
var program = new Command();
program.name("awesome-ai-tools").description("CLI to instantly apply AI skills & rules to your local projects").version("0.2.0");
program.command("list").description("List all available AI skills").action(() => {
  console.log("\n\u{1F680} Available AI Agent Skills:\n");
  AI_SKILLS.forEach((skill) => {
    console.log(`- \x1B[36m${skill.name}\x1B[0m (\x1B[33m${skill.slug}\x1B[0m)`);
    console.log(`  ${skill.description}`);
    console.log(`  Frameworks: ${skill.frameworks.join(", ")}
`);
  });
  console.log("Run 'npx awesome-ai-tools add <slug>' to apply a skill to your project.\n");
});
program.command("add").description("Add a specific AI skill to your project").argument("<slug>", "The slug of the skill to add (e.g., nextjs-16-react-19-architect)").option("-e, --editor <type>", "Target editor (cursor, cursor-legacy, claude, windsurf, cline, copilot)").action(async (slug, options) => {
  const skill = AI_SKILLS.find((s) => s.slug === slug);
  if (!skill) {
    console.error(`
\u274C Error: Skill with slug '${slug}' not found.`);
    console.log("Run 'npx awesome-ai-tools list' to see available skills.\n");
    process.exit(1);
  }
  let editor = options.editor;
  if (!editor) {
    const response = await prompts({
      type: "select",
      name: "editor",
      message: "Which AI Editor / Assistant are you using?",
      choices: [
        { title: "Cursor (.cursor/rules/<slug>.mdc) [Recommended]", value: "cursor", description: "Creates modern multi-file MDC rule" },
        { title: "Claude Code (CLAUDE.md)", value: "claude", description: "Appends to project CLAUDE.md guidelines" },
        { title: "Windsurf (.windsurfrules)", value: "windsurf", description: "Creates or appends to .windsurfrules" },
        { title: "Cline / Roo Code (.clinerules)", value: "cline", description: "Creates or appends to .clinerules" },
        { title: "GitHub Copilot (.github/copilot-instructions.md)", value: "copilot", description: "Creates repository custom instructions" },
        { title: "Cursor Legacy (.cursorrules)", value: "cursor-legacy", description: "Single-file legacy .cursorrules" }
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
      if (!fs.existsSync(rulesDir)) {
        fs.mkdirSync(rulesDir, { recursive: true });
      }
      targetPath = path.join(rulesDir, `${slug}.mdc`);
      fileContent = `---
description: ${skill.description}
globs: *
alwaysApply: true
---

${skill.content}
`;
      break;
    }
    case "cursor-legacy":
      targetPath = path.join(process.cwd(), ".cursorrules");
      break;
    case "claude":
      targetPath = path.join(process.cwd(), "CLAUDE.md");
      fileContent = `
## Skill: ${skill.name}
${skill.content}
`;
      break;
    case "windsurf":
      targetPath = path.join(process.cwd(), ".windsurfrules");
      break;
    case "cline":
      targetPath = path.join(process.cwd(), ".clinerules");
      break;
    case "copilot": {
      const githubDir = path.join(process.cwd(), ".github");
      if (!fs.existsSync(githubDir)) {
        fs.mkdirSync(githubDir, { recursive: true });
      }
      targetPath = path.join(githubDir, "copilot-instructions.md");
      break;
    }
    default:
      console.error("\n\u274C Error: Unsupported editor type.");
      process.exit(1);
  }
  const relativeTarget = path.relative(process.cwd(), targetPath) || path.basename(targetPath);
  try {
    if (fs.existsSync(targetPath)) {
      if (editor === "cursor") {
        fs.writeFileSync(targetPath, fileContent, "utf8");
        console.log(`
\u2705 Updated rule file: \x1B[32m${relativeTarget}\x1B[0m
`);
      } else {
        const { action } = await prompts({
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
          fs.writeFileSync(targetPath, fileContent, "utf8");
          console.log(`
\u2705 Overwrote \x1B[32m${relativeTarget}\x1B[0m with '${skill.name}' skill rules.
`);
        } else {
          fs.appendFileSync(targetPath, "\n\n" + fileContent, "utf8");
          console.log(`
\u2705 Appended '${skill.name}' skill rules to \x1B[32m${relativeTarget}\x1B[0m.
`);
        }
      }
    } else {
      fs.writeFileSync(targetPath, fileContent, "utf8");
      console.log(`
\u2705 Created \x1B[32m${relativeTarget}\x1B[0m with '${skill.name}' rules.
`);
    }
  } catch (error) {
    console.error(`
\u274C Failed to write file: ${error.message}
`);
  }
});
program.parse();
//# sourceMappingURL=index.mjs.map
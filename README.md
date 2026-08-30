<div align="center">

# Awesome AI Tools

**An open-source platform for discovering, managing, and deploying AI skills, subagents, and multi-agent workflows.**

[Platform](https://awesome-ai-tools-suite.vercel.app) · [Documentation](#documentation) · [CLI Reference](#cli-reference) · [API Reference](#api-reference) · [Self-Hosting](#self-hosting)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-6B7280?style=flat-square)](LICENSE)
[![npm](https://img.shields.io/npm/v/awesome-ai-tools?style=flat-square&color=6B7280)](https://www.npmjs.com/package/awesome-ai-tools)

</div>

---

## Overview

Awesome AI Tools is a full-stack platform that centralizes 2,582 AI skills, 68 specialist subagents, and 4 composite multi-agent workflows. It ships as both a web application and a CLI tool.

**Web platform** — Browse, search, and export AI configurations for your IDE or agent runtime. Includes a universal AI chat interface with a 5-tier provider fallback (Groq, OpenRouter, DeepSeek, LLM7, and local synthesis).

**CLI tool** — Install skills directly into your workspace from the terminal. Compatible with Cursor, Claude Code, Windsurf, Cline, Roo Code, and GitHub Copilot.

---

## Contents

- [Platform](#platform)
- [CLI Reference](#cli-reference)
- [Documentation](#documentation)
  - [Quickstart](#quickstart)
  - [Skills System](#skills-system)
  - [Subagents](#subagents)
  - [Multi-Agent Workflows](#multi-agent-workflows)
  - [AI Chat & Provider Cascade](#ai-chat--provider-cascade)
  - [Local Proxy Router](#local-proxy-router)
  - [IDE Config Export](#ide-config-export)
- [API Reference](#api-reference)
- [Self-Hosting](#self-hosting)
- [Contributing](#contributing)

---

## Platform

Live at **[https://awesome-ai-tools-suite.vercel.app](https://awesome-ai-tools-suite.vercel.app)**

| Page | Path | Description |
|:-----|:-----|:------------|
| Home | `/` | Overview and ecosystem metrics |
| Skills Browser | `/skills` | Browse and search all 2,582 AI skills |
| Subagents | `/agents` | 68 specialist subagents directory |
| Router | `/router` | Multi-agent workflow visualizer and local proxy setup |
| AI Chat | `/chat` | Universal AI chat with slash command palette |
| Stack Builder | `/stack` | Compose and export your agent stack |
| Docs | `/docs` | Full documentation |
| APIs | `/apis` | Public AI API directory |

---

## CLI Reference

### Installation

```bash
# Run without installing
npx awesome-ai-tools <command>

# Install globally
npm install -g awesome-ai-tools
```

**Requirements:** Node.js >= 18.0.0

### Commands

#### `init`

Initialize your workspace with skills, subagents, hooks, and instincts memory.

```bash
npx awesome-ai-tools init
```

This creates:
- `.agents/skills/` — all 2,582 skill files
- `.agents/subagents/` — all 68 subagent definitions
- `.claude/hooks/` — hook scripts for agent lifecycle events
- `instincts.md` — persistent codebase memory file

Options:

```bash
npx awesome-ai-tools init --minimal     # Skills only, no hooks
npx awesome-ai-tools init --dry-run     # Preview without writing files
```

---

#### `pull`

Download a domain-specific skill bundle into your workspace.

```bash
npx awesome-ai-tools pull <category>
```

Available categories:

| Category | Skills | Description |
|:---------|:-------|:------------|
| `frontend` | 320+ | React, Next.js, Vue, Tailwind, accessibility |
| `backend` | 280+ | Node.js, FastAPI, Django, Rails, Go, Rust |
| `security` | 190+ | Penetration testing, SAST, OWASP, secrets |
| `devops` | 240+ | Docker, Kubernetes, Terraform, CI/CD, AWS |
| `architecture` | 210+ | DDD, microservices, event sourcing, CQRS |
| `all` | 2,582 | Full bundle |

Example:

```bash
npx awesome-ai-tools pull frontend
# Downloads skills to .agents/skills/frontend/
```

---

#### `list`

List all available skills, subagents, and workflows.

```bash
npx awesome-ai-tools list
```

---

#### `scan`

Run AgentShield security audit on your current workspace.

```bash
npx awesome-ai-tools scan
npx awesome-ai-tools scan --fix          # Apply auto-fixes where safe
npx awesome-ai-tools scan --report json  # Output as JSON
```

Checks for:
- Hardcoded secrets and API keys in source files
- Insecure environment variable usage
- Prompt injection vulnerabilities in agent instructions
- Overly permissive agent tool scopes

---

#### `learn`

Persist a rule or preference to `instincts.md` for agent memory.

```bash
npx awesome-ai-tools learn "Always use Zod for runtime validation"
npx awesome-ai-tools learn "Prefer server components over client components in Next.js"
```

Rules are appended to `instincts.md` and read by agents on every session start.

---

## Documentation

### Quickstart

**Option A — Use the hosted platform**

Visit [https://awesome-ai-tools-suite.vercel.app](https://awesome-ai-tools-suite.vercel.app). No account required.

**Option B — CLI in an existing project**

```bash
cd your-project
npx awesome-ai-tools init
```

**Option C — Self-host**

See [Self-Hosting](#self-hosting).

---

### Skills System

A skill is a structured markdown instruction file that configures an AI agent's behavior for a specific domain. Each skill contains:

- A YAML frontmatter block with `name` and `description`
- Detailed instructions, patterns, and examples
- Optional reference files and scripts

Skills are stored in `.agents/skills/<slug>/SKILL.md` and are loaded automatically by compatible runtimes (Claude Code, Cursor, Windsurf, Cline).

**Skill categories:**

```
frontend/        backend/         security/
devops/          architecture/    mobile/
database/        testing/         ai-ml/
cloud/           design/          workflow/
```

**Using a skill in Cursor:**

```bash
npx awesome-ai-tools pull frontend
# Then in Cursor, reference .agents/skills/react-patterns/SKILL.md
```

**Using a skill in Claude Code:**

Skills are auto-loaded from `.agents/skills/` when you run `claude` in a workspace initialized with `npx awesome-ai-tools init`.

---

### Subagents

Subagents are specialist agent definitions configured for a narrow domain. Unlike general-purpose AI, each subagent has a fixed role, restricted tool scope, and domain-specific system prompt.

The 68 included subagents cover:

| Domain | Subagents |
|:-------|:----------|
| Frontend | `nextjs-frontend-lead`, `tailwind-design-system-architect` |
| Backend | `backend-microservices-architect`, `fastapi-async-engineer` |
| Security | `security-auditor`, `prompt-red-teamer`, `dependency-vulnerability-scanner` |
| DevOps | `devops-engineer`, `kubernetes-operator-dev`, `cicd-accelerator` |
| Data | `python-data-engineer`, `clickhouse-olap-architect`, `duckdb-analytics-lead` |
| AI/ML | `mlops-rag-engineer`, `prompt-engineer`, `vector-db-engineer` |
| Testing | `playwright-e2e-architect`, `vitest-unit-master`, `tdd-driver` |
| Architecture | `software-architect`, `clean-architecture-modeler`, `event-sourcing-cqrs-architect` |

Subagent definitions are in `.agents/subagents/<name>.md`.

---

### Multi-Agent Workflows

Four composite workflows are available via the `/router` page and the `trigger` command.

#### `/review` — Code & Security Review

Two-stage review pipeline:
1. **AgentShield** scans for security vulnerabilities, injections, and exposed secrets
2. **Code Logic Reviewer** checks correctness, race conditions, and standards compliance

```bash
# Trigger from CLI (coming in v1.1)
npx awesome-ai-tools trigger review
```

#### `/tdd` — Autonomous TDD Cycle

Strict Red-Green-Refactor:
1. **Red** — writes failing unit tests against the spec
2. **Green** — implements minimal passing code
3. **Refactor** — safely refactors with test coverage protection

#### `/council` — Multi-Model Deliberation

Routes an architectural decision through multiple reasoning perspectives before writing implementation code. Use before major system design choices.

#### `/compact` — Context Compaction

Summarizes active conversation history, clears redundant tokens, and extracts key codebase instincts. Run when context window is degrading.

---

### AI Chat & Provider Cascade

The chat interface at `/chat` routes requests through a 5-tier fallback cascade:

```
Tier 1  BYOK           User-supplied API key via Settings modal
Tier 2  Server keys    GROQ → OPENROUTER → DEEPSEEK → OPENAI
Tier 3  Ollama         http://localhost:11434 (self-hosted only)
Tier 4  LLM7           Free DeepSeek-V4-Flash (no key required)
Tier 5  Local          Contextual knowledge synthesis (zero downtime)
```

The AI responds regardless of API key configuration. Tiers 1–2 provide the best quality and speed.

**Slash command palette:**

Type `/` in the chat input to open the command palette. All 2,582 skills and 4 workflows are searchable and insertable inline.

---

### Local Proxy Router

The router at `/router` exposes a local OpenAI-compatible API endpoint. Point any IDE or client to it instead of calling providers directly.

**Setup:**

```bash
git clone https://github.com/dimasrahmandaalfarizi/Awesome-AI-Tools
cd Awesome-AI-Tools
npm install
npm run dev
```

Endpoint: `http://localhost:3000/api/v1`

Configure your IDE:

| IDE | Setting | Value |
|:----|:--------|:------|
| **Cursor** | OpenAI Base URL | `http://localhost:3000/api/v1` |
| **Cline** | API Base URL | `http://localhost:3000/api/v1` |
| **Roo Code** | Custom API Base | `http://localhost:3000/api/v1` |
| **Continue** | apiBase | `http://localhost:3000/api/v1` |

Leave the API key field blank or enter any string. The router forwards requests using your configured provider credentials.

**Supported providers:**

- Groq (recommended — fast, free tier)
- OpenRouter
- DeepSeek
- Google Gemini
- OpenAI
- Ollama (local)

---

### IDE Config Export

From `/stack` or `/chat`, click **Export IDE Config** to generate ready-to-use configuration files:

| IDE | Output file |
|:----|:-----------|
| Cursor | `.cursorrules` |
| VS Code Continue | `.continue/config.json` |
| Claude Desktop | `claude_desktop_config.json` |
| Windsurf | `.windsurfrules` |

---

## API Reference

Base URL (production): `https://awesome-ai-tools-suite.vercel.app`
Base URL (local): `http://localhost:3000`

### `POST /api/chat/universal`

Universal chat endpoint with provider cascade.

**Request:**

```json
{
  "messages": [
    { "role": "user", "content": "Explain server components in Next.js" }
  ],
  "provider": "groq",
  "model": "llama-3.3-70b-versatile",
  "apiKey": "optional-byok-key"
}
```

**Response:** Server-sent events (SSE) stream.

```
data: {"content": "Server components are..."}
data: {"content": " rendered on the server"}
data: [DONE]
```

---

### `POST /api/v1/chat/completions`

OpenAI-compatible endpoint. Drop-in replacement for `api.openai.com/v1/chat/completions`.

**Request:**

```json
{
  "model": "gpt-4o",
  "messages": [{ "role": "user", "content": "Hello" }],
  "stream": true
}
```

---

### `GET /api/search`

Full-text search across skills, subagents, tools, and APIs.

```
GET /api/search?q=react+hooks&type=skills
```

**Parameters:**

| Param | Type | Description |
|:------|:-----|:------------|
| `q` | string | Search query |
| `type` | string | `skills`, `agents`, `tools`, `apis`, or `all` |
| `limit` | number | Max results (default: 20) |

---

### `GET /api/ai/semantic-search`

Semantic vector search across the skills database.

```
GET /api/ai/semantic-search?q=rate+limiting+middleware&limit=5
```

---

### `GET /api/router/config`

Returns the current proxy router configuration.

---

## Self-Hosting

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dimasrahmandaalfarizi/Awesome-AI-Tools)

Set the following environment variables in the Vercel dashboard:

| Variable | Required | Description |
|:---------|:---------|:------------|
| `NEXT_PUBLIC_APP_URL` | Yes | Your deployment URL |
| `GROQ_API_KEY` | Recommended | From [console.groq.com](https://console.groq.com) — free tier |
| `OPENROUTER_API_KEY` | Optional | From [openrouter.ai](https://openrouter.ai) |
| `DEEPSEEK_API_KEY` | Optional | From [platform.deepseek.com](https://platform.deepseek.com) |
| `OPENAI_API_KEY` | Optional | From [platform.openai.com](https://platform.openai.com) |

The platform functions without API keys via LLM7 fallback.

### Local Development

```bash
git clone https://github.com/dimasrahmandaalfarizi/Awesome-AI-Tools
cd Awesome-AI-Tools
npm install
cp .env.example .env.local
# Add your keys to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
GROQ_API_KEY=
OPENROUTER_API_KEY=
DEEPSEEK_API_KEY=
GEMINI_API_KEY=
OPENAI_API_KEY=
```

---

## Contributing

Pull requests are welcome.

**Adding a new skill:**

1. Create a directory under `.agents/skills/<slug>/`
2. Add `SKILL.md` with YAML frontmatter (`name`, `description`) and instructions
3. Run `node scripts/bundle-skills.mjs` to regenerate skill bundles
4. Submit a PR

**Adding a new tool to the directory:**

Edit `src/data/mock.ts` and add to the `TOOLS` array.

**Adding a new subagent:**

Add a markdown file to `.agents/subagents/<name>.md` following the existing format.

---

## License

MIT — see [LICENSE](LICENSE)

---

<div align="center">

Built by [Dimas Rahmat Daalfarizi](https://github.com/dimasrahmandaalfarizi)

</div>

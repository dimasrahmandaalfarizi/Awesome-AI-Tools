# ⚡ Awesome AI Tools

> The modern open-source ecosystem directory, CLI package manager, and local AI proxy router for AI developers, reasoning models, autonomous agents, and MCP servers.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js 16](https://img.shields.io/badge/Next.js%2016-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

---

## 🚀 Key Features

- 🧠 **Frontier AI Ecosystem (2025/2026):** DeepSeek-R1 / V3, Claude 3.7 Sonnet, Qwen 2.5 Coder, OpenAI o3-mini, Flux.1, and Wan 2.1.
- 🤖 **Autonomous Coding Agents & IDEs:** Claude Code, Roo Code, Trae, Goose, OpenHands, Cline, and Cursor.
- 🔌 **Official Model Context Protocol (MCP) Directory:** Curated MCP servers including GitHub, PostgreSQL, Filesystem, Puppeteer, and Persistent Memory.
- 📦 **Agentic Skills & Rules Hub:** Ready-to-use domain prompt rules for Cursor (`.cursor/rules/<name>.mdc`), Claude Code (`CLAUDE.md`), Windsurf (`.windsurfrules`), and Cline (`.clinerules`).
- 🔄 **Local AI Proxy Router (`/router`):** Centralized local OpenAI-compatible API gateway (`http://localhost:3000/api/v1`) supporting DeepSeek, OpenRouter, Google Gemini, Groq, and Ollama with automatic model remapping.
- 🔍 **Interactive Command Palette (`⌘K` / `Ctrl+K`):** Global instantaneous search across tools, categories, and AI skills.
- 🌐 **Full Internationalization (i18n):** Native multilingual support for English (`en`) and Indonesian (`id`).
- 💻 **Cross-Platform CLI & NPM Package:** Install skills or query AI metadata directly from your terminal or TypeScript code.

---

## 🛠️ CLI Quick Start

Add agent skills directly to your project in one command:

```bash
# Add Next.js 16 / React 19 skill as a Cursor MDC rule
npx awesome-ai-tools add nextjs-16-react-19-architect --target cursor

# Add DeepSeek R1 reasoning skill to Claude Code root memory
npx awesome-ai-tools add deepseek-r1-reasoning-prompter --target claude

# Add MCP Server Builder skill to Cline / Roo Code
npx awesome-ai-tools add mcp-server-builder --target cline

# List all available AI skills
npx awesome-ai-tools list
```

### Supported Targets
| Target | Flag | Output Location |
| :--- | :--- | :--- |
| **Cursor (MDC format)** | `-t cursor` | `.cursor/rules/<slug>.mdc` |
| **Claude Code** | `-t claude` | `CLAUDE.md` |
| **Cline / Roo Code** | `-t cline` | `.clinerules` |
| **Windsurf** | `-t windsurf` | `.windsurfrules` |
| **GitHub Copilot** | `-t copilot` | `.github/copilot-instructions.md` |

---

## 📦 NPM Package / TypeScript SDK

You can also use this repository as a library in your Node.js or TypeScript backend:

```bash
npm install awesome-ai-tools
```

```typescript
import { getAllSkills, getSkillBySlug, getAllTools, getToolsByCategory } from "awesome-ai-tools";

// Load all skills
const skills = getAllSkills();
console.log(`Loaded ${skills.length} agentic skills`);

// Get a specific skill
const skill = getSkillBySlug("deepseek-r1-reasoning-prompter");
console.log(skill?.content);

// Query tools by category
const mcpServers = getToolsByCategory("mcp-server");
console.log(mcpServers.map(s => s.name));
```

---

## ⚡ Local AI Proxy Router Setup

The built-in proxy router allows you to point Cursor, Cline, Roo Code, or any OpenAI-compatible client to a local endpoint and route calls through high-speed, cost-effective providers (DeepSeek, Groq, OpenRouter, Gemini, Ollama).

1. Start the local server:
   ```bash
   npm run dev
   ```
2. Navigate to [http://localhost:3000/router](http://localhost:3000/router).
3. Select your active provider (e.g. **DeepSeek** or **Groq**) and paste your API key.
4. Set your editor's **OpenAI Base URL** to:
   ```text
   http://localhost:3000/api/v1
   ```
5. You can leave the API key in your editor blank or enter any dummy string. The router will securely forward the request with your configured credentials and apply model remapping automatically.

---

## 💻 Web App Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Build library bundle (dist/)
npm run build:lib
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 🤝 Contributing

Contributions are welcome!
- To submit a new tool or MCP server, edit `src/data/mock.ts` and add it to `TOOLS`.
- To submit a new agent skill, add it to `AI_SKILLS` in `src/data/mock.ts`.
- Submit a pull request on GitHub.

---

## 📄 License

MIT License © 2026 Awesome AI Tools.

import { Category, Tool, Collection, Tag } from "@/types"

export const CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "AI IDE",
    slug: "ai-ide",
    description: "Integrated Development Environments with native AI capabilities.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "cat-2",
    name: "Coding Assistant",
    slug: "coding-assistant",
    description: "Tools that assist with writing, reviewing, and debugging code.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "cat-3",
    name: "Agent Framework",
    slug: "agent-framework",
    description: "Frameworks for building autonomous AI agents.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "cat-4",
    name: "LLM",
    slug: "llm",
    description: "Large Language Models and related tooling.",
    createdAt: new Date().toISOString(),
  }
]

export const TAGS: Tag[] = [
  { id: "tag-1", name: "Copilot", slug: "copilot" },
  { id: "tag-2", name: "Editor", slug: "editor" },
  { id: "tag-3", name: "Python", slug: "python" },
  { id: "tag-4", name: "TypeScript", slug: "typescript" },
]

export const TOOLS: Tool[] = [
  {
    id: "tool-1",
    name: "Cursor",
    slug: "cursor",
    description: "The AI-first Code Editor. Built for pair-programming with AI.",
    website: "https://cursor.com",
    github: "https://github.com/getcursor/cursor",
    pricing: "Freemium",
    isOpenSource: false,
    platform: ["macOS", "Windows", "Linux"],
    categoryId: "cat-1",
    tags: ["editor", "copilot"],
    lastUpdated: new Date().toISOString(),
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "tool-2",
    name: "Windsurf",
    slug: "windsurf",
    description: "The first agentic IDE, designed to keep you in the flow.",
    website: "https://codeium.com/windsurf",
    pricing: "Freemium",
    isOpenSource: false,
    platform: ["macOS", "Windows", "Linux"],
    categoryId: "cat-1",
    tags: ["editor"],
    lastUpdated: new Date().toISOString(),
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "tool-3",
    name: "OpenHands",
    slug: "openhands",
    description: "Platform for AI software developers. Open-source alternative to Devin.",
    website: "https://openhands.ai",
    github: "https://github.com/All-Hands-AI/OpenHands",
    pricing: "Free",
    isOpenSource: true,
    platform: ["Web", "Linux"],
    categoryId: "cat-3",
    tags: ["python", "typescript"],
    lastUpdated: new Date().toISOString(),
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "tool-4",
    name: "LangChain",
    slug: "langchain",
    description: "Building applications with LLMs through composability.",
    website: "https://langchain.com",
    github: "https://github.com/langchain-ai/langchain",
    pricing: "Free",
    isOpenSource: true,
    platform: ["Python", "TypeScript"],
    categoryId: "cat-3",
    tags: ["python", "typescript"],
    lastUpdated: new Date().toISOString(),
    featured: false,
    createdAt: new Date().toISOString(),
  }
]

export const COLLECTIONS: Collection[] = [
  {
    id: "col-1",
    title: "Best AI IDEs",
    slug: "best-ai-ides",
    description: "The top AI-first code editors for maximum productivity.",
    toolIds: ["tool-1", "tool-2"]
  },
  {
    id: "col-2",
    title: "Open Source Agents",
    slug: "open-source-agents",
    description: "Fully open-source frameworks for building autonomous agents.",
    toolIds: ["tool-3"]
  }
]

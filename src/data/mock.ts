import { Category, Tool, Collection, Tag } from "@/types"

export const CATEGORIES: Category[] = [
  { id: "cat-1", name: "AI IDE", slug: "ai-ide", description: "Integrated Development Environments with native AI capabilities.", createdAt: new Date().toISOString() },
  { id: "cat-2", name: "Coding Assistant", slug: "coding-assistant", description: "Tools that assist with writing, reviewing, and debugging code.", createdAt: new Date().toISOString() },
  { id: "cat-3", name: "LLM", slug: "llm", description: "Large Language Models and related tooling.", createdAt: new Date().toISOString() },
  { id: "cat-4", name: "Agent Framework", slug: "agent-framework", description: "Frameworks for building autonomous AI agents.", createdAt: new Date().toISOString() },
  { id: "cat-5", name: "MCP Server", slug: "mcp-server", description: "Model Context Protocol servers and implementations.", createdAt: new Date().toISOString() },
  { id: "cat-6", name: "Image Generation", slug: "image-generation", description: "Tools to generate and edit images using AI.", createdAt: new Date().toISOString() },
  { id: "cat-7", name: "Video Generation", slug: "video-generation", description: "Tools to generate and edit video using AI.", createdAt: new Date().toISOString() },
  { id: "cat-8", name: "Audio AI", slug: "audio-ai", description: "Text-to-speech, speech-to-text, and audio generation tools.", createdAt: new Date().toISOString() },
  { id: "cat-9", name: "Prompt Engineering", slug: "prompt-engineering", description: "Tools for managing, testing, and optimizing prompts.", createdAt: new Date().toISOString() },
  { id: "cat-10", name: "Deployment", slug: "deployment", description: "Infrastructure and tools for deploying AI models.", createdAt: new Date().toISOString() },
  { id: "cat-11", name: "Database", slug: "database", description: "AI-enhanced databases and related tooling.", createdAt: new Date().toISOString() },
  { id: "cat-12", name: "Vector Database", slug: "vector-database", description: "Databases optimized for storing and querying vector embeddings.", createdAt: new Date().toISOString() },
  { id: "cat-13", name: "Automation", slug: "automation", description: "Tools for automating workflows with AI.", createdAt: new Date().toISOString() },
  { id: "cat-14", name: "Browser AI", slug: "browser-ai", description: "Browser extensions and web automation AI.", createdAt: new Date().toISOString() },
  { id: "cat-15", name: "Productivity", slug: "productivity", description: "General productivity tools supercharged with AI.", createdAt: new Date().toISOString() },
  { id: "cat-16", name: "Documentation", slug: "documentation", description: "Tools for generating and managing technical documentation.", createdAt: new Date().toISOString() },
  { id: "cat-17", name: "Testing", slug: "testing", description: "AI-powered testing and QA tools.", createdAt: new Date().toISOString() },
  { id: "cat-18", name: "Security", slug: "security", description: "Tools for AI safety, security, and vulnerability scanning.", createdAt: new Date().toISOString() },
  { id: "cat-19", name: "Research", slug: "research", description: "Tools for academic and industry AI research.", createdAt: new Date().toISOString() },
  { id: "cat-20", name: "Open Source", slug: "open-source", description: "A selection of purely open-source AI projects.", createdAt: new Date().toISOString() },
]

export const TAGS: Tag[] = [
  { id: "tag-1", name: "Copilot", slug: "copilot" },
  { id: "tag-2", name: "Editor", slug: "editor" },
  { id: "tag-3", name: "Python", slug: "python" },
  { id: "tag-4", name: "TypeScript", slug: "typescript" },
  { id: "tag-5", name: "Local", slug: "local" },
  { id: "tag-6", name: "React", slug: "react" },
  { id: "tag-7", name: "Terminal", slug: "terminal" },
  { id: "tag-8", name: "RAG", slug: "rag" },
  { id: "tag-9", name: "Open Source", slug: "open-source" },
  { id: "tag-10", name: "Serverless", slug: "serverless" },
]

export const TOOLS: Tool[] = [
  {
    id: "tool-1",
    name: "Cursor",
    slug: "cursor",
    description: "The AI-first Code Editor. Built for pair-programming with AI. Features include Composer, inline chat, and codebase-aware answers.",
    website: "https://cursor.com",
    github: "https://github.com/getcursor/cursor",
    pricing: "Freemium",
    isOpenSource: false,
    platform: ["macOS", "Windows", "Linux"],
    categoryId: "cat-1", // AI IDE
    tags: ["editor", "copilot"],
    lastUpdated: new Date().toISOString(),
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "tool-2",
    name: "GitHub Copilot",
    slug: "github-copilot",
    description: "Your AI pair programmer. Works directly in your editor to suggest code and entire functions in real-time.",
    website: "https://github.com/features/copilot",
    pricing: "Paid",
    isOpenSource: false,
    platform: ["VS Code", "JetBrains", "Neovim"],
    categoryId: "cat-2", // Coding Assistant
    tags: ["copilot"],
    lastUpdated: new Date().toISOString(),
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "tool-3",
    name: "LangChain",
    slug: "langchain",
    description: "Framework for developing applications powered by language models through composability.",
    website: "https://langchain.com",
    github: "https://github.com/langchain-ai/langchain",
    pricing: "Free",
    isOpenSource: true,
    platform: ["Python", "TypeScript"],
    categoryId: "cat-4", // Agent Framework
    tags: ["python", "typescript", "rag"],
    lastUpdated: new Date().toISOString(),
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "tool-4",
    name: "Ollama",
    slug: "ollama",
    description: "Get up and running with large language models locally. Run Llama 3, Mistral, Gemma, and other models.",
    website: "https://ollama.com",
    github: "https://github.com/ollama/ollama",
    pricing: "Free",
    isOpenSource: true,
    platform: ["macOS", "Windows", "Linux"],
    categoryId: "cat-3", // LLM
    tags: ["local", "terminal"],
    lastUpdated: new Date().toISOString(),
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "tool-5",
    name: "Pinecone",
    slug: "pinecone",
    description: "The vector database for AI. Fast, scalable, and fully managed.",
    website: "https://pinecone.io",
    pricing: "Freemium",
    isOpenSource: false,
    platform: ["Web", "API"],
    categoryId: "cat-12", // Vector Database
    tags: ["serverless", "rag"],
    lastUpdated: new Date().toISOString(),
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "tool-6",
    name: "StitchMCP",
    slug: "stitchmcp",
    description: "Model Context Protocol server for connecting AI agents directly to design systems and UI generation tools.",
    website: "https://modelcontextprotocol.io",
    pricing: "Free",
    isOpenSource: true,
    platform: ["API"],
    categoryId: "cat-5", // MCP Server
    tags: ["typescript"],
    lastUpdated: new Date().toISOString(),
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "tool-7",
    name: "Midjourney",
    slug: "midjourney",
    description: "An independent research lab exploring new mediums of thought and expanding the imaginative powers of the human species.",
    website: "https://midjourney.com",
    pricing: "Paid",
    isOpenSource: false,
    platform: ["Discord", "Web"],
    categoryId: "cat-6", // Image Generation
    tags: [],
    lastUpdated: new Date().toISOString(),
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "tool-8",
    name: "Runway",
    slug: "runway",
    description: "Advancing creativity with artificial intelligence. Offers Gen-2, a multi-modal AI system that can generate novel videos.",
    website: "https://runwayml.com",
    pricing: "Freemium",
    isOpenSource: false,
    platform: ["Web"],
    categoryId: "cat-7", // Video Generation
    tags: [],
    lastUpdated: new Date().toISOString(),
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "tool-9",
    name: "ElevenLabs",
    slug: "elevenlabs",
    description: "The most realistic and versatile AI speech software, ever.",
    website: "https://elevenlabs.io",
    pricing: "Freemium",
    isOpenSource: false,
    platform: ["Web", "API"],
    categoryId: "cat-8", // Audio AI
    tags: [],
    lastUpdated: new Date().toISOString(),
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "tool-10",
    name: "Vercel AI SDK",
    slug: "vercel-ai-sdk",
    description: "The React/Svelte/Vue/Solid framework for building AI applications.",
    website: "https://sdk.vercel.ai",
    github: "https://github.com/vercel/ai",
    pricing: "Free",
    isOpenSource: true,
    platform: ["TypeScript", "React"],
    categoryId: "cat-10", // Deployment
    tags: ["react", "typescript"],
    lastUpdated: new Date().toISOString(),
    featured: true,
    createdAt: new Date().toISOString(),
  }
]

export const COLLECTIONS: Collection[] = [
  {
    id: "col-1",
    title: "Best AI Coding Tools",
    slug: "best-ai-coding-tools",
    description: "The most popular tools for software engineers to write code faster.",
    toolIds: ["tool-1", "tool-2"]
  },
  {
    id: "col-2",
    title: "Best AI IDEs",
    slug: "best-ai-ides",
    description: "Fully featured integrated development environments built around AI.",
    toolIds: ["tool-1"]
  },
  {
    id: "col-3",
    title: "Best Free AI",
    slug: "best-free-ai",
    description: "Powerful AI tools you can use completely for free.",
    toolIds: ["tool-3", "tool-4", "tool-6", "tool-10"]
  },
  {
    id: "col-4",
    title: "Best Open Source AI",
    slug: "best-open-source-ai",
    description: "Support the community with these amazing open source projects.",
    toolIds: ["tool-3", "tool-4", "tool-6", "tool-10"]
  },
  {
    id: "col-5",
    title: "Best MCP Servers",
    slug: "best-mcp-servers",
    description: "Top implementations for the Model Context Protocol.",
    toolIds: ["tool-6"]
  },
  {
    id: "col-6",
    title: "Best AI Agents",
    slug: "best-ai-agents",
    description: "Autonomous frameworks and systems to automate complex tasks.",
    toolIds: ["tool-3"]
  },
  {
    id: "col-7",
    title: "Best AI for Students",
    slug: "best-ai-for-students",
    description: "Tools that are great for learning, researching, and writing code on a budget.",
    toolIds: ["tool-1", "tool-4"]
  }
]

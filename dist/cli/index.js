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
var CATEGORIES = [
  { id: "cat-1", name: "AI IDE", slug: "ai-ide", description: "Integrated Development Environments with native AI capabilities.", createdAt: (/* @__PURE__ */ new Date()).toISOString() },
  { id: "cat-2", name: "Coding Assistant", slug: "coding-assistant", description: "Tools that assist with writing, reviewing, and debugging code.", createdAt: (/* @__PURE__ */ new Date()).toISOString() },
  { id: "cat-3", name: "LLM", slug: "llm", description: "Large Language Models and related tooling.", createdAt: (/* @__PURE__ */ new Date()).toISOString() },
  { id: "cat-4", name: "Agent Framework", slug: "agent-framework", description: "Frameworks for building autonomous AI agents.", createdAt: (/* @__PURE__ */ new Date()).toISOString() },
  { id: "cat-5", name: "MCP Server", slug: "mcp-server", description: "Model Context Protocol servers and implementations.", createdAt: (/* @__PURE__ */ new Date()).toISOString() },
  { id: "cat-6", name: "Image Generation", slug: "image-generation", description: "Tools to generate and edit images using AI.", createdAt: (/* @__PURE__ */ new Date()).toISOString() },
  { id: "cat-7", name: "Video Generation", slug: "video-generation", description: "Tools to generate and edit video using AI.", createdAt: (/* @__PURE__ */ new Date()).toISOString() },
  { id: "cat-8", name: "Audio AI", slug: "audio-ai", description: "Text-to-speech, speech-to-text, and audio generation tools.", createdAt: (/* @__PURE__ */ new Date()).toISOString() },
  { id: "cat-9", name: "Prompt Engineering", slug: "prompt-engineering", description: "Tools for managing, testing, and optimizing prompts.", createdAt: (/* @__PURE__ */ new Date()).toISOString() },
  { id: "cat-10", name: "Deployment", slug: "deployment", description: "Infrastructure and tools for deploying AI models.", createdAt: (/* @__PURE__ */ new Date()).toISOString() },
  { id: "cat-11", name: "Database", slug: "database", description: "AI-enhanced databases and related tooling.", createdAt: (/* @__PURE__ */ new Date()).toISOString() },
  { id: "cat-12", name: "Vector Database", slug: "vector-database", description: "Databases optimized for storing and querying vector embeddings.", createdAt: (/* @__PURE__ */ new Date()).toISOString() },
  { id: "cat-13", name: "Automation", slug: "automation", description: "Tools for automating workflows with AI.", createdAt: (/* @__PURE__ */ new Date()).toISOString() },
  { id: "cat-14", name: "Browser AI", slug: "browser-ai", description: "Browser extensions and web automation AI.", createdAt: (/* @__PURE__ */ new Date()).toISOString() },
  { id: "cat-15", name: "Productivity", slug: "productivity", description: "General productivity tools supercharged with AI.", createdAt: (/* @__PURE__ */ new Date()).toISOString() },
  { id: "cat-16", name: "Documentation", slug: "documentation", description: "Tools for generating and managing technical documentation.", createdAt: (/* @__PURE__ */ new Date()).toISOString() },
  { id: "cat-17", name: "Testing", slug: "testing", description: "AI-powered testing and QA tools.", createdAt: (/* @__PURE__ */ new Date()).toISOString() },
  { id: "cat-18", name: "Security", slug: "security", description: "Tools for AI safety, security, and vulnerability scanning.", createdAt: (/* @__PURE__ */ new Date()).toISOString() },
  { id: "cat-19", name: "Research", slug: "research", description: "Tools for academic and industry AI research.", createdAt: (/* @__PURE__ */ new Date()).toISOString() },
  { id: "cat-20", name: "Open Source", slug: "open-source", description: "A selection of purely open-source AI projects.", createdAt: (/* @__PURE__ */ new Date()).toISOString() },
  { id: "cat-21", name: "AI API Router", slug: "ai-api-router", description: "Local proxies and routing layers to manage multiple LLM APIs.", createdAt: (/* @__PURE__ */ new Date()).toISOString() }
];
var getScreenshot = (url) => `https://image.thum.io/get/width/1200/crop/800/${url}`;
var TOOLS = [
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
    categoryId: "cat-1",
    tags: ["editor", "copilot"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://cursor.com"),
    problem: "Developers spend too much time writing boilerplate code, navigating large codebases to find context, and switching between their editor and browser to search for solutions.",
    solution: "Cursor integrates advanced AI models directly into a familiar VS Code-forked environment, enabling real-time code generation, intelligent codebase-aware Q&A, and autonomous multi-file editing via Composer.",
    challenge: "Integrating AI deeply enough that it feels like a native part of the editor without causing massive disruption to established developer workflows or compromising on latency.",
    techChoices: ["Electron", "TypeScript", "React", "Rust", "OpenAI APIs"],
    targetUser: "Software Engineers, Full Stack Developers, and Technical Founders.",
    keyFeatures: ["Composer for multi-file generation", "Codebase-aware chat", "Familiar VS Code interface", "Privacy mode for enterprise"],
    impact: "Dramatically reduces time-to-market for software teams, allowing developers to focus on architecture and logic rather than syntax and boilerplate.",
    guide: [
      { step: 1, title: "Download & Install", description: "Visit cursor.com and download the installer for your OS. Run it and migrate your existing VS Code extensions." },
      { step: 2, title: "Open a Project", description: "Open any existing codebase. Press Ctrl+K (or Cmd+K) to open the inline generation prompt." },
      { step: 3, title: "Use Composer", description: "Press Ctrl+I (or Cmd+I) to open Composer. Type a complex request like 'Add a user profile page' and let it generate multiple files automatically." }
    ]
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
    categoryId: "cat-2",
    tags: ["copilot"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://github.com/features/copilot"),
    problem: "Context switching and looking up documentation interrupts the developer flow state, leading to decreased productivity.",
    solution: "A deeply integrated AI extension that provides real-time, context-aware code completions and suggestions directly in the editor as you type.",
    challenge: "Serving low-latency inference at massive scale while ensuring the suggestions are syntactically correct and relevant to the user's specific context.",
    techChoices: ["OpenAI Codex", "Azure AI Infrastructure", "TypeScript Extension"],
    targetUser: "Individual Developers, Enterprise Engineering Teams.",
    keyFeatures: ["Inline code suggestions", "Copilot Chat for Q&A", "Pull request summaries", "Enterprise grade security"],
    impact: "Adopted by millions of developers globally, increasing coding speed by up to 55% for repetitive tasks.",
    guide: [
      { step: 1, title: "Install the Extension", description: "Search for 'GitHub Copilot' in your IDE's extension marketplace and install it." },
      { step: 2, title: "Sign In", description: "Authenticate with your GitHub account that has an active Copilot subscription." },
      { step: 3, title: "Start Typing", description: "Write a comment describing the function you want, or just start writing the function signature. Press 'Tab' to accept the ghost-text suggestion." }
    ]
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
    categoryId: "cat-4",
    tags: ["python", "typescript", "rag"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://langchain.com"),
    problem: "Building complex applications with Large Language Models requires orchestrating multiple calls, managing state, and integrating with external data sources, which is tedious and repetitive.",
    solution: "A comprehensive open-source framework providing standardized abstractions for chains, agents, memory, and data retrieval (RAG).",
    challenge: "Maintaining a stable API surface while the underlying LLM ecosystem evolves at a breakneck pace with new models and paradigms weekly.",
    techChoices: ["Python", "TypeScript", "Pydantic", "FastAPI"],
    targetUser: "AI Engineers, Data Scientists, and Backend Developers building generative AI apps.",
    keyFeatures: ["Modular components", "Pre-built chains", "Vector store integrations", "Agent orchestration"],
    impact: "Became the industry standard framework for building LLM applications, powering thousands of production AI systems.",
    guide: [
      { step: 1, title: "Install", description: "Run 'pip install langchain' or 'npm install langchain' in your terminal." },
      { step: 2, title: "Set API Keys", description: "Export your LLM provider API keys (e.g., OPENAI_API_KEY) in your environment variables." },
      { step: 3, title: "Build a Chain", description: "Import a PromptTemplate and an LLM, create a standard LCEL (LangChain Expression Language) pipeline, and invoke it with your inputs." }
    ]
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
    categoryId: "cat-3",
    tags: ["local", "terminal"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://ollama.com"),
    problem: "Running advanced LLMs locally is highly technical, requiring complex environment setups, dependency management, and hardware configuration.",
    solution: "A streamlined CLI and background service that packages models, weights, and dependencies into a single, easily runnable container-like format.",
    challenge: "Optimizing inference performance across diverse consumer hardware (Apple Silicon, Nvidia GPUs, AMD) while keeping the UX incredibly simple.",
    techChoices: ["Go", "C++", "llama.cpp"],
    targetUser: "Developers, Researchers, and Privacy-conscious users.",
    keyFeatures: ["One-command model execution", "REST API", "Modelfiles for customization", "Cross-platform hardware acceleration"],
    impact: "Democratized access to open-weight models, allowing anyone with a modern laptop to experiment with AI without cloud costs or privacy risks.",
    guide: [
      { step: 1, title: "Download", description: "Download the executable for your OS from ollama.com and install it." },
      { step: 2, title: "Run a Model", description: "Open your terminal and type 'ollama run llama3'. It will automatically download the weights and start an interactive chat." },
      { step: 3, title: "Use the API", description: "Send a POST request to 'http://localhost:11434/api/generate' to integrate the local model into your own applications." }
    ]
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
    categoryId: "cat-12",
    tags: ["serverless", "rag"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: false,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://pinecone.io"),
    problem: "Traditional databases are not optimized for similarity search on high-dimensional vector embeddings, a core requirement for Retrieval-Augmented Generation (RAG).",
    solution: "A fully managed, purpose-built vector database designed for lightning-fast similarity search at massive scale with zero infrastructure overhead.",
    challenge: "Ensuring low-latency search across billions of vectors while providing strong consistency and a seamless serverless developer experience.",
    techChoices: ["Rust", "Kubernetes", "AWS/GCP/Azure Infrastructure"],
    targetUser: "AI Application Developers and Machine Learning Engineers.",
    keyFeatures: ["Serverless architecture", "Ultra-low latency", "Hybrid search (sparse + dense)", "Live index updates"],
    impact: "Powered the generative AI boom by providing the reliable memory layer required for enterprise-grade RAG applications.",
    guide: [
      { step: 1, title: "Create an Index", description: "Sign up at pinecone.io and create a new serverless index. Specify the dimension size that matches your embedding model (e.g., 1536 for OpenAI)." },
      { step: 2, title: "Upsert Vectors", description: "Use the Pinecone SDK to upload your text embeddings along with relevant metadata." },
      { step: 3, title: "Query", description: "Send a query vector to the index to retrieve the top-K most similar documents for your RAG pipeline." }
    ]
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
    categoryId: "cat-5",
    tags: ["typescript"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: false,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://modelcontextprotocol.io"),
    problem: "AI agents struggle to accurately generate UI components that strictly adhere to a company's specific, proprietary design system.",
    solution: "An MCP server that exposes design tokens, component libraries, and style guidelines directly to LLMs during the generation process.",
    challenge: "Standardizing complex, varied design systems into a structured format that an LLM can parse and reliably utilize in zero-shot generation.",
    techChoices: ["TypeScript", "Model Context Protocol", "Node.js"],
    targetUser: "Frontend Developers and UI/UX Designers building AI-integrated apps.",
    keyFeatures: ["Design token injection", "Component schema validation", "Real-time style syncing", "Open MCP standard"],
    impact: "Bridges the gap between raw AI generation and production-ready, brand-compliant user interfaces.",
    guide: [
      { step: 1, title: "Install Server", description: "Clone the StitchMCP repository and run 'npm install' then 'npm run build'." },
      { step: 2, title: "Configure Client", description: "Add the server to your Claude Desktop config file or your custom agent's MCP connections list." },
      { step: 3, title: "Prompt the Agent", description: "Ask your AI to 'Generate a login form using the current design system'. The agent will query StitchMCP for the exact tokens." }
    ]
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
    categoryId: "cat-6",
    tags: [],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: "/midjourney.png",
    problem: "Creating high-quality, artistic, and photorealistic digital imagery traditionally requires immense technical skill, software, and time.",
    solution: "A cutting-edge generative AI model accessible via Discord and Web that translates natural language prompts into stunning visual art in seconds.",
    challenge: "Balancing artistic stylization with photorealism while managing a massive compute cluster to serve millions of simultaneous users.",
    techChoices: ["Custom Diffusion Models", "Discord API", "Proprietary GPU Clusters"],
    targetUser: "Artists, Designers, Marketers, and Creative Professionals.",
    keyFeatures: ["V6 photorealism", "Style tuning", "Inpainting/Outpainting", "Consistent character generation"],
    impact: "Revolutionized the creative industry, enabling rapid concept art, marketing material generation, and entirely new forms of digital expression.",
    guide: [
      { step: 1, title: "Join the Discord", description: "Sign up for a Midjourney subscription and join their official Discord server." },
      { step: 2, title: "Use /imagine", description: "Type '/imagine prompt:' followed by a detailed description of the image you want to generate." },
      { step: 3, title: "Upscale and Vary", description: "Use the U1-U4 buttons to upscale your favorite result, or V1-V4 to create variations of a specific grid image." }
    ]
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
    categoryId: "cat-7",
    tags: [],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: false,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://runwayml.com"),
    problem: "Video production and VFX are incredibly resource-intensive, requiring expensive equipment, studios, and specialized editing skills.",
    solution: "A web-based creative suite featuring advanced Gen-2 and Gen-3 models that can generate video from text, images, or existing video, alongside automated editing tools.",
    challenge: "Achieving temporal consistency in AI-generated video (preventing flickering and morphing) while keeping rendering times reasonable.",
    techChoices: ["WebGL", "Custom Video Diffusion Models", "React"],
    targetUser: "Filmmakers, Video Editors, and Content Creators.",
    keyFeatures: ["Text-to-Video", "Image-to-Video", "Motion Brush", "AI Magic Tools (rotoscoping, inpainting)"],
    impact: "Pioneered generative video, empowering independent creators to produce cinematic content that previously required Hollywood budgets.",
    guide: [
      { step: 1, title: "Sign Up", description: "Create a free account on the Runway web app." },
      { step: 2, title: "Select a Model", description: "Choose Gen-3 Alpha for the highest quality text-to-video or image-to-video generation." },
      { step: 3, title: "Prompt and Generate", description: "Upload a starting image or write a descriptive prompt (e.g., 'A cinematic pan over a futuristic city'). Click generate and wait for the video." }
    ]
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
    categoryId: "cat-8",
    tags: [],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: false,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://elevenlabs.io"),
    problem: "Traditional Text-to-Speech (TTS) voices sound robotic, lack emotional nuance, and cannot dynamically adjust intonation based on context.",
    solution: "A deep learning model capable of generating highly realistic, emotionally expressive, and context-aware human speech from text.",
    challenge: "Capturing the subtle nuances of human emotion, breathing, and pacing without requiring manual pitch and speed adjustments from the user.",
    techChoices: ["Proprietary Audio Deep Learning Models", "Python", "FastAPI"],
    targetUser: "Game Developers, Audiobook Creators, and Video Producers.",
    keyFeatures: ["Voice cloning", "Emotional range control", "Multi-lingual generation", "Low-latency streaming API"],
    impact: "Transformed digital audio, making high-quality voiceovers instantly accessible for gaming, accessibility, and content creation.",
    guide: [
      { step: 1, title: "Pick a Voice", description: "Log in to the dashboard and browse the Voice Library to find a voice that matches your use case." },
      { step: 2, title: "Input Text", description: "Paste your script into the Speech Synthesis text box. Adjust the 'Stability' and 'Similarity' sliders if needed." },
      { step: 3, title: "Generate and Download", description: "Click generate to hear the audio. If it sounds good, click the download button to get the MP3 file." }
    ]
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
    categoryId: "cat-10",
    tags: ["react", "typescript"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://sdk.vercel.ai"),
    problem: "Streaming AI responses to the frontend while managing UI state, loading states, and tool-calling is complex and prone to boilerplate.",
    solution: "A unified, framework-agnostic SDK that abstracts away the complexities of streaming UI, function calling, and provider switching.",
    challenge: "Providing a unified API that seamlessly supports multiple model providers (OpenAI, Anthropic, Google) while integrating deeply with React Server Components.",
    techChoices: ["TypeScript", "React Server Components", "Web Streams API"],
    targetUser: "Frontend and Full Stack Developers.",
    keyFeatures: ["useChat and useCompletion hooks", "Generative UI support", "Unified provider API", "Edge-compatible streaming"],
    impact: "Dramatically accelerated the development of web-based AI interfaces by providing standard abstractions for streaming and state management.",
    guide: [
      { step: 1, title: "Install", description: "Run 'npm install ai @ai-sdk/openai' in your Next.js project." },
      { step: 2, title: "Create API Route", description: "Create an App Router API endpoint that imports 'streamText' and returns its response using the provider." },
      { step: 3, title: "Connect Frontend", description: "Use the 'useChat' hook in your client component to automatically handle message state, input bindings, and streaming updates." }
    ]
  },
  {
    id: "tool-11",
    name: "ChatGPT",
    slug: "chatgpt",
    description: "The most widely used conversational AI. Fast, versatile, and continually updated with the latest GPT models.",
    website: "https://chat.openai.com",
    pricing: "Freemium",
    isOpenSource: false,
    platform: ["Web", "iOS", "Android"],
    categoryId: "cat-3",
    tags: ["python", "typescript"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://openai.com/chatgpt"),
    problem: "People and developers need an accessible, general-purpose intelligence interface for brainstorming, writing, coding, and problem-solving without writing API code.",
    solution: "A highly optimized conversational interface built on top of state-of-the-art GPT models, offering multimodal capabilities (vision, audio, data analysis) out of the box.",
    challenge: "Scaling to hundreds of millions of daily active users while maintaining low latency, preventing harmful outputs, and managing massive GPU clusters.",
    techChoices: ["GPT-4", "React", "Next.js", "Python", "Kubernetes"],
    targetUser: "Everyone (Developers, Writers, Students, Professionals).",
    keyFeatures: ["Advanced Data Analysis", "Custom GPTs", "Voice Mode", "Web Browsing"],
    impact: "Kickstarted the generative AI revolution in late 2022, becoming the fastest-growing consumer application in history.",
    guide: [
      { step: 1, title: "Create an Account", description: "Go to chatgpt.com and sign up." },
      { step: 2, title: "Start Prompting", description: "Type a question or instruction in the chat box. Be specific about the format and tone you want." },
      { step: 3, title: "Use Advanced Features", description: "Click the attachment icon to upload documents for analysis, or use the mobile app to try the real-time Voice Mode." }
    ]
  },
  {
    id: "tool-12",
    name: "Claude",
    slug: "claude",
    description: "A next-generation AI assistant built for work and trained to be safe, accurate, and secure.",
    website: "https://claude.ai",
    pricing: "Freemium",
    isOpenSource: false,
    platform: ["Web", "iOS", "Android"],
    categoryId: "cat-3",
    tags: ["python", "typescript"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://anthropic.com/claude"),
    problem: "Enterprise users need AI models that suffer from fewer hallucinations, can process massive documents in a single prompt, and are highly steerable.",
    solution: "An AI assistant powered by the Claude 3 model family, featuring a massive context window (200K+ tokens) and built using Constitutional AI for safer outputs.",
    challenge: "Developing a training methodology (Constitutional AI) that allows the model to self-correct its behavior without relying solely on expensive human reinforcement learning.",
    techChoices: ["Constitutional AI", "Claude 3.5 Sonnet", "React", "AWS Bedrock"],
    targetUser: "Knowledge Workers, Researchers, and Developers.",
    keyFeatures: ["Artifacts UI", "Massive context window", "Advanced reasoning", "High safety standards"],
    impact: "Established a strong alternative to OpenAI, particularly favored by developers for coding tasks (via Sonnet 3.5) and document analysis.",
    guide: [
      { step: 1, title: "Log In", description: "Access claude.ai via your browser." },
      { step: 2, title: "Upload Context", description: "Drag and drop massive PDFs, codebases, or datasets into the chat box to take advantage of the 200K token window." },
      { step: 3, title: "Use Artifacts", description: "Ask Claude to 'build a React dashboard'. It will open a dedicated side-panel (Artifact) displaying the interactive generated code." }
    ]
  },
  {
    id: "tool-13",
    name: "Windsurf",
    slug: "windsurf",
    description: "The first agentic IDE, designed to keep you in the flow. Powered by Codeium, it acts as a proactive pair programmer.",
    website: "https://codeium.com/windsurf",
    pricing: "Freemium",
    isOpenSource: false,
    platform: ["macOS", "Windows", "Linux"],
    categoryId: "cat-1",
    tags: ["editor", "copilot"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://codeium.com/windsurf"),
    problem: "Existing AI coding assistants are purely reactive\u2014they wait for you to type or ask a question before providing help.",
    solution: "An agentic IDE that proactively understands your entire codebase and intent, suggesting multi-file edits and anticipating your next moves seamlessly.",
    challenge: "Building a context engine fast enough to index and understand a full repository in real-time without lagging the editor.",
    techChoices: ["Codeium Engine", "Electron", "TypeScript", "Rust"],
    targetUser: "Software Engineers looking for a deeply integrated, agentic workflow.",
    keyFeatures: ["Agentic workflows", "Proactive suggestions", "Deep codebase indexing", "Familiar UI"],
    impact: "Pushing the boundaries of what an IDE can do, moving from autocomplete to autonomous, supervised coding.",
    guide: [
      { step: 1, title: "Install Editor", description: "Download Windsurf from the official website and install it." },
      { step: 2, title: "Import Settings", description: "Automatically migrate your VS Code settings, keybindings, and extensions during the initial setup." },
      { step: 3, title: "Collaborate", description: "Open a file and watch as the agent proactively highlights areas for improvement or automatically completes complex refactoring tasks." }
    ]
  },
  {
    id: "tool-14",
    name: "AutoGen",
    slug: "autogen",
    description: "A framework that enables the development of LLM applications using multiple agents that can converse with each other to solve tasks.",
    website: "https://microsoft.github.io/autogen/",
    github: "https://github.com/microsoft/autogen",
    pricing: "Free",
    isOpenSource: true,
    platform: ["Python"],
    categoryId: "cat-4",
    tags: ["python", "rag"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://microsoft.github.io/autogen/"),
    problem: "Single-agent LLM setups struggle with complex, multi-step tasks that require different personas, verification, and code execution.",
    solution: "A framework that allows developers to define multiple specialized agents (e.g., a coder, a reviewer, a manager) that communicate to solve problems collaboratively.",
    challenge: "Handling infinite conversation loops, error recovery during code execution, and managing context limits across multiple agents.",
    techChoices: ["Python", "Docker for sandboxing", "OpenAI API"],
    targetUser: "AI Researchers and Advanced Application Developers.",
    keyFeatures: ["Multi-agent conversations", "Human-in-the-loop support", "Seamless code execution", "Customizable agent personas"],
    impact: "Pioneered the multi-agent design pattern, proving that collaborative AI agents can solve tasks far more complex than single models.",
    guide: [
      { step: 1, title: "Install Package", description: "Run 'pip install pyautogen' in your Python environment." },
      { step: 2, title: "Define Agents", description: "Create an AssistantAgent (the coder) and a UserProxyAgent (the executor/reviewer) in your script." },
      { step: 3, title: "Initiate Chat", description: "Call 'user_proxy.initiate_chat()' with your task description. Watch as the agents converse, write code, and verify it automatically." }
    ]
  },
  {
    id: "tool-15",
    name: "Perplexity",
    slug: "perplexity",
    description: "An AI-powered search engine that provides direct answers with citations instead of a list of links.",
    website: "https://perplexity.ai",
    pricing: "Freemium",
    isOpenSource: false,
    platform: ["Web", "iOS", "Android"],
    categoryId: "cat-19",
    tags: [],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://perplexity.ai"),
    problem: "Traditional search engines force users to click through SEO-optimized articles and ads to find specific information.",
    solution: "A conversational search engine that reads multiple sources in real-time, synthesizes the information, and provides a direct, cited answer.",
    challenge: "Executing rapid concurrent web searches, scraping relevant text, and performing RAG (Retrieval-Augmented Generation) in under 2 seconds.",
    techChoices: ["Custom RAG Pipeline", "Next.js", "Various LLMs (Claude, GPT-4, Sonar)"],
    targetUser: "Researchers, Students, and Knowledge Workers.",
    keyFeatures: ["Real-time web search", "Inline citations", "Pro search mode", "Focus modes (Academic, YouTube, etc.)"],
    impact: "Challenged the traditional Google search monopoly by proving the viability and superior UX of answer-engine mechanics.",
    guide: [
      { step: 1, title: "Search", description: "Visit perplexity.ai and type a complex question instead of just keywords." },
      { step: 2, title: "Review Citations", description: "Read the generated summary and hover over the footnote numbers to verify the source material." },
      { step: 3, title: "Ask Follow-ups", description: "Continue the conversation in the same thread to drill down into specific details without losing context." }
    ]
  },
  {
    id: "tool-16",
    name: "Hugging Face",
    slug: "huggingface",
    description: "The AI community building the future. The GitHub of machine learning, hosting hundreds of thousands of models and datasets.",
    website: "https://huggingface.co",
    github: "https://github.com/huggingface",
    pricing: "Freemium",
    isOpenSource: true,
    platform: ["Web", "Python", "API"],
    categoryId: "cat-10",
    tags: ["python", "open-source"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://huggingface.co"),
    problem: "Machine learning models, datasets, and training code were fragmented across different platforms, making reproducibility and sharing difficult.",
    solution: "A centralized hub (Model Hub) and unified open-source library (`transformers`) that standardize how models are shared, downloaded, and fine-tuned.",
    challenge: "Hosting and serving petabytes of model weights and datasets globally while providing a seamless, Git-based version control experience.",
    techChoices: ["Python", "PyTorch/TensorFlow", "Git LFS", "Inference Endpoints"],
    targetUser: "Machine Learning Engineers, Data Scientists, and AI Researchers.",
    keyFeatures: ["Model Hub", "Dataset Hub", "Spaces (Gradio/Streamlit hosting)", "Transformers library"],
    impact: "Accelerated the open-source AI movement by orders of magnitude, becoming the undeniable central repository for global AI research.",
    guide: [
      { step: 1, title: "Find a Model", description: "Browse the Model Hub to find a pre-trained model for your task (e.g., text classification, image generation)." },
      { step: 2, title: "Install Transformers", description: "Run 'pip install transformers' in your Python environment." },
      { step: 3, title: "Load and Run", description: "Use the 'pipeline' API to download the model weights and run inference in just three lines of Python code." }
    ]
  },
  {
    id: "tool-17",
    name: "Supabase",
    slug: "supabase",
    description: "The open source Firebase alternative. Build production-ready AI apps fast.",
    website: "https://supabase.com",
    github: "https://github.com/supabase/supabase",
    pricing: "Freemium",
    isOpenSource: true,
    platform: ["Web", "API"],
    categoryId: "cat-11",
    tags: ["open-source", "typescript"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://supabase.com"),
    problem: "Setting up a Postgres database with authentication, storage, and real-time capabilities takes weeks of backend boilerplate.",
    solution: "A Backend-as-a-Service that provides a dedicated Postgres database, instant APIs, authentication, and vector storage out of the box.",
    challenge: "Scaling dedicated databases for millions of users while maintaining a developer experience as simple as Firebase.",
    techChoices: ["PostgreSQL", "pgvector", "Elixir", "TypeScript"],
    targetUser: "Full Stack Developers and Startup Founders.",
    keyFeatures: ["Postgres Database", "Authentication", "Edge Functions", "pgvector support"],
    impact: "Became the go-to backend for modern web and AI applications due to its open-source nature and robust SQL foundation.",
    guide: [
      { step: 1, title: "Create Project", description: "Sign in to Supabase and create a new project. You will get an instant Postgres database." },
      { step: 2, title: "Create Tables", description: "Use the Table Editor UI to create tables for your users, or run SQL queries directly via the SQL Editor." },
      { step: 3, title: "Connect Client", description: "Install '@supabase/supabase-js' in your frontend, initialize the client, and query your data directly from the UI safely." }
    ]
  },
  {
    id: "tool-18",
    name: "v0",
    slug: "v0",
    description: "Generative UI by Vercel. Ship beautiful, accessible components in seconds.",
    website: "https://v0.dev",
    pricing: "Freemium",
    isOpenSource: false,
    platform: ["Web"],
    categoryId: "cat-5",
    tags: ["react", "typescript"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://v0.dev"),
    problem: "Writing boilerplate HTML, Tailwind classes, and React state for basic UI components is time-consuming and tedious.",
    solution: "An AI system that translates natural language prompts or uploaded images directly into working, copy-pasteable React code using shadcn/ui.",
    challenge: "Ensuring the generated code is not just visually appealing, but also accessible, responsive, and uses valid React state paradigms.",
    techChoices: ["Next.js", "Tailwind CSS", "shadcn/ui", "Custom LLM Orchestration"],
    targetUser: "Frontend Developers and Designers.",
    keyFeatures: ["Text-to-UI", "Image-to-UI", "Iterative refinement", "One-click copy to codebase"],
    impact: "Changed how developers prototype frontends, shifting the focus from writing markup to defining logic and UX.",
    guide: [
      { step: 1, title: "Prompt", description: "Visit v0.dev and type 'Create a modern pricing table with 3 tiers and a toggle for yearly billing'." },
      { step: 2, title: "Refine", description: "Click on specific parts of the generated UI and prompt v0 to change colors, add icons, or modify the layout." },
      { step: 3, title: "Copy Code", description: "Click the code button to copy the React and Tailwind implementation directly into your project." }
    ]
  },
  {
    id: "tool-19",
    name: "Devin",
    slug: "devin",
    description: "The first fully autonomous AI software engineer.",
    website: "https://cognition.ai",
    pricing: "Paid",
    isOpenSource: false,
    platform: ["Web"],
    categoryId: "cat-4",
    tags: ["editor"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://cognition.ai"),
    problem: "Current AI coding tools act as assistants that require constant supervision and line-by-line prompting.",
    solution: "An autonomous agent equipped with its own shell, code editor, and browser that can take a high-level goal and execute it end-to-end.",
    challenge: "Planning long-horizon tasks, recovering from unexpected terminal errors, and maintaining focus over thousands of steps.",
    techChoices: ["Proprietary LLM", "Sandboxed execution environments"],
    targetUser: "Engineering Teams and Technical Founders.",
    keyFeatures: ["Autonomous execution", "Integrated terminal", "Integrated browser", "End-to-end app deployment"],
    impact: "Sparked the race for autonomous software engineers, proving that AI can resolve real GitHub issues and deploy apps independently.",
    guide: [
      { step: 1, title: "Assign a Task", description: "Give Devin a prompt like 'Build a snake game in React and deploy it to Netlify'." },
      { step: 2, title: "Monitor Progress", description: "Watch in real-time as Devin opens its editor, writes code, runs npm commands, and debugs errors." },
      { step: 3, title: "Review", description: "Check the final output, review the commits Devin made, and provide feedback for adjustments." }
    ]
  },
  {
    id: "tool-20",
    name: "Llama 3",
    slug: "llama-3",
    description: "The most capable openly available LLM to date, built by Meta.",
    website: "https://llama.meta.com",
    github: "https://github.com/meta-llama/llama3",
    pricing: "Free",
    isOpenSource: true,
    platform: ["API", "Local"],
    categoryId: "cat-3",
    tags: ["open-source", "local"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://llama.meta.com"),
    problem: "Proprietary models create vendor lock-in, privacy concerns, and unpredictable pricing for enterprise applications.",
    solution: "A family of state-of-the-art open-weight models (8B, 70B, 400B) that rival proprietary models in reasoning, math, and coding tasks.",
    challenge: "Training massive models efficiently across tens of thousands of GPUs while ensuring post-training alignment produces safe but helpful responses.",
    techChoices: ["PyTorch", "24K GPU Cluster", "Grouped Query Attention"],
    targetUser: "AI Researchers, Developers, and Enterprises.",
    keyFeatures: ["Open weights", "Exceptional reasoning", "High efficiency", "Broad ecosystem support"],
    impact: "Tilted the balance of power back toward open source, allowing startups to build highly capable AI apps without relying on OpenAI APIs.",
    guide: [
      { step: 1, title: "Request Access", description: "Go to Meta's Llama website or Hugging Face to accept the license agreement and download the weights." },
      { step: 2, title: "Run Locally", description: "Use tools like Ollama or LM Studio to load the 8B model natively on your Mac or PC." },
      { step: 3, title: "Fine-tune", description: "Use libraries like Unsloth or Hugging Face PEFT to fine-tune the model on your proprietary company data." }
    ]
  },
  {
    id: "tool-21",
    name: "Supermaven",
    slug: "supermaven",
    description: "The fastest AI copilot with a massive 1-million-token context window.",
    website: "https://supermaven.com",
    pricing: "Freemium",
    isOpenSource: false,
    platform: ["VS Code", "JetBrains", "Neovim"],
    categoryId: "cat-2",
    tags: ["copilot", "editor"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://supermaven.com"),
    problem: "Traditional copilots struggle with latency, making the developer wait for suggestions, which breaks their flow.",
    solution: "A blazingly fast copilot powered by a custom architecture (Babble) that provides instantaneous autocomplete while maintaining awareness of the entire repository.",
    challenge: "Achieving sub-200ms latency on massive context windows without bankrupting the company on inference costs.",
    techChoices: ["Babble Architecture", "Custom Inference Engine"],
    targetUser: "Senior Developers and Codebase Architects.",
    keyFeatures: ["1M token context", "Near-zero latency", "Full codebase awareness", "Free tier available"],
    impact: "Set a new standard for autocomplete speed, forcing competitors to optimize their latency.",
    guide: [
      { step: 1, title: "Install Extension", description: "Search for 'Supermaven' in your IDE marketplace." },
      { step: 2, title: "Authenticate", description: "Sign in to activate the free tier." },
      { step: 3, title: "Code", description: "Just start typing. Supermaven will instantly suggest code blocks based on your entire project's context." }
    ]
  },
  {
    id: "tool-22",
    name: "Aider",
    slug: "aider",
    description: "AI pair programming in your terminal. Let AI write code while you manage the big picture.",
    website: "https://aider.chat",
    github: "https://github.com/paul-gauthier/aider",
    pricing: "Free",
    isOpenSource: true,
    platform: ["Terminal", "Python"],
    categoryId: "cat-2",
    tags: ["terminal", "python", "open-source"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://aider.chat"),
    problem: "IDE-based AI tools are tightly coupled to specific editors and often struggle to execute complex multi-file refactors autonomously.",
    solution: "A command-line chat tool that seamlessly pairs with any Git repository, allowing you to ask an LLM to edit files, which it does by creating clean git commits automatically.",
    challenge: "Parsing LLM diff outputs reliably so that edits are applied cleanly without breaking existing syntax.",
    techChoices: ["Python", "Universal Diff Format", "Git CLI"],
    targetUser: "CLI power users, Vim/Emacs users, and developers who prefer terminal workflows.",
    keyFeatures: ["Automatic git commits", "Works with any LLM (Claude, GPT-4, Local)", "Voice coding support", "Repository mapping"],
    impact: "Proved that AI coding doesn't require a heavy GUI IDE, popularizing the 'chat-to-git' workflow.",
    guide: [
      { step: 1, title: "Install", description: "Run 'pip install aider-chat' in your terminal." },
      { step: 2, title: "Run Aider", description: "Navigate to your git repository and type 'aider'. Ensure your API keys (e.g., ANTHROPIC_API_KEY) are set." },
      { step: 3, title: "Ask for Changes", description: "Type 'Add a new contact form to the homepage'. Aider will read the files, write the code, and commit the changes." }
    ]
  },
  {
    id: "tool-23",
    name: "Codeium",
    slug: "codeium",
    description: "The modern coding superpower. A highly capable, permanently free GitHub Copilot alternative.",
    website: "https://codeium.com",
    pricing: "Freemium",
    isOpenSource: false,
    platform: ["VS Code", "JetBrains", "Visual Studio", "Chrome"],
    categoryId: "cat-2",
    tags: ["copilot"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: false,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://codeium.com"),
    problem: "Most high-quality AI coding assistants charge hefty monthly subscriptions, gating students and open-source developers.",
    solution: "A fully-featured AI assistant offering autocomplete, chat, and search powered by proprietary models, completely free for individual developers.",
    challenge: "Training and serving proprietary coding models that rival OpenAI/Anthropic while maintaining a sustainable business model.",
    techChoices: ["Proprietary LLMs", "Multi-IDE extensions"],
    targetUser: "Students, Indie Hackers, and Enterprise Teams.",
    keyFeatures: ["Permanently free for individuals", "In-editor chat", "Context awareness", "70+ supported languages"],
    impact: "Democratized access to premium AI coding features, capturing a massive user base previously priced out of the market.",
    guide: [
      { step: 1, title: "Install Extension", description: "Find Codeium in your IDE's extension tab." },
      { step: 2, title: "Log In", description: "Create a free Codeium account." },
      { step: 3, title: "Chat and Code", description: "Use the autocomplete or open the Codeium chat panel to ask questions about your repository." }
    ]
  },
  {
    id: "tool-24",
    name: "Sourcegraph Cody",
    slug: "cody",
    description: "An AI coding assistant that lives in your editor and can find, explain, and write code using your entire codebase.",
    website: "https://sourcegraph.com/cody",
    github: "https://github.com/sourcegraph/cody",
    pricing: "Freemium",
    isOpenSource: true,
    platform: ["VS Code", "JetBrains", "Web"],
    categoryId: "cat-2",
    tags: ["copilot", "open-source"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: false,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://sourcegraph.com/cody"),
    problem: "AI tools often hallucinate because they don't have deep, indexed context of a company's massive, multi-repository codebase.",
    solution: "Combines Sourcegraph's enterprise-grade code search engine with modern LLMs to provide highly accurate, codebase-aware answers.",
    challenge: "Generating and updating embeddings for monolithic enterprise repositories in real-time.",
    techChoices: ["Sourcegraph Search Engine", "React", "TypeScript"],
    targetUser: "Enterprise Developers working on large, undocumented codebases.",
    keyFeatures: ["Deep codebase context", "Choose your LLM (Claude, GPT-4)", "Unit test generation", "Code smell detection"],
    impact: "Bridged the gap between AI generation and enterprise code search, making onboarding to new codebases incredibly fast.",
    guide: [
      { step: 1, title: "Install", description: "Install the Cody extension for VS Code or JetBrains." },
      { step: 2, title: "Connect", description: "Sign in with your Sourcegraph account." },
      { step: 3, title: "Ask Cody", description: "Highlight a confusing function and ask 'What does this do and where is it used across the company?'" }
    ]
  },
  {
    id: "tool-25",
    name: "Cline",
    slug: "cline",
    description: "An autonomous AI software engineer that operates directly within VS Code.",
    website: "https://cline.bot",
    github: "https://github.com/cline/cline",
    pricing: "Free",
    isOpenSource: true,
    platform: ["VS Code"],
    categoryId: "cat-4",
    tags: ["editor", "open-source"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://cline.bot"),
    problem: "Developers want autonomous agent capabilities (like Devin) but prefer them deeply integrated into their existing VS Code environment.",
    solution: "A VS Code extension that gives an LLM the ability to read files, write code, run terminal commands, and use the browser, all under user supervision.",
    challenge: "Ensuring the AI agent doesn't execute destructive commands while allowing it enough freedom to actually complete complex tasks.",
    techChoices: ["TypeScript", "VS Code Extension API", "MCP (Model Context Protocol)"],
    targetUser: "Full Stack Developers and Open Source Contributors.",
    keyFeatures: ["Terminal execution", "File editing", "MCP Tool integration", "Human-in-the-loop approval"],
    impact: "Brought autonomous coding directly to the world's most popular editor, accelerating the adoption of agentic workflows.",
    guide: [
      { step: 1, title: "Install Cline", description: "Search for 'Cline' in the VS Code marketplace." },
      { step: 2, title: "Configure Provider", description: "Open the extension settings and input your Anthropic or OpenAI API key." },
      { step: 3, title: "Assign Task", description: "Open the Cline chat and instruct it to 'Setup a new Postgres database connection and write the CRUD endpoints'." }
    ]
  },
  {
    id: "tool-26",
    name: "Tabnine",
    slug: "tabnine",
    description: "The AI coding assistant that you control. Private, secure, and compliant.",
    website: "https://tabnine.com",
    pricing: "Paid",
    isOpenSource: false,
    platform: ["VS Code", "JetBrains", "Visual Studio", "Eclipse"],
    categoryId: "cat-2",
    tags: ["copilot"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: false,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://tabnine.com"),
    problem: "Enterprises in highly regulated industries (finance, healthcare, defense) cannot send their proprietary code to public LLM APIs due to privacy concerns.",
    solution: "An AI coding assistant that offers fully isolated deployments (VPC, on-premises) and trains its models exclusively on permissive open-source code to avoid IP infringement.",
    challenge: "Delivering high-quality code suggestions on highly constrained local or VPC hardware without relying on massive cloud clusters.",
    techChoices: ["Rust", "Custom isolated LLMs"],
    targetUser: "Enterprise Engineering Teams in regulated industries.",
    keyFeatures: ["Zero data retention", "On-premises deployment", "IP indemnification", "Personalized codebase training"],
    impact: "Allowed risk-averse enterprises to adopt AI coding tools without compromising on compliance or security.",
    guide: [
      { step: 1, title: "Enterprise Setup", description: "Work with IT to deploy Tabnine within your company's secure VPC or firewall." },
      { step: 2, title: "Install Plugin", description: "Install the Tabnine plugin in your company-approved IDE." },
      { step: 3, title: "Code Securely", description: "Enjoy AI autocomplete knowing your code never leaves your organization's network." }
    ]
  },
  {
    id: "tool-27",
    name: "Amazon Q Developer",
    slug: "amazon-q",
    description: "Generative AI-powered assistant designed for software development on AWS.",
    website: "https://aws.amazon.com/q/developer/",
    pricing: "Freemium",
    isOpenSource: false,
    platform: ["VS Code", "JetBrains", "AWS Console"],
    categoryId: "cat-2",
    tags: ["copilot"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: false,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://aws.amazon.com/q/developer/"),
    problem: "Developers struggle to navigate complex cloud infrastructure, write IAM policies, and upgrade legacy code efficiently.",
    solution: "An AI assistant deeply integrated with the AWS ecosystem that can not only write code but also answer architectural questions, troubleshoot cloud deployments, and autonomously upgrade Java applications.",
    challenge: "Integrating an AI assistant across the fragmented surfaces of the AWS console, CLI, and local IDEs while maintaining consistent context.",
    techChoices: ["Amazon Bedrock", "Proprietary AWS Models"],
    targetUser: "Cloud Engineers, DevOps, and developers heavily invested in AWS.",
    keyFeatures: ["AWS context awareness", "Legacy code transformation (e.g., Java upgrades)", "Security scanning", "Feature development agent"],
    impact: "Significantly reduced the learning curve for AWS infrastructure, allowing developers to build cloud-native apps faster.",
    guide: [
      { step: 1, title: "Install Toolkit", description: "Install the AWS Toolkit extension in your IDE." },
      { step: 2, title: "Authenticate", description: "Sign in using AWS Builder ID or your company's IAM Identity Center." },
      { step: 3, title: "Upgrade Code", description: "Use the Q Agent to automatically refactor and upgrade a legacy Java 8 application to Java 17." }
    ]
  },
  {
    id: "tool-28",
    name: "9Router",
    slug: "9router",
    description: "An open-source, local proxy tool acting as a centralized routing layer for AI coding assistants.",
    website: "https://github.com/decolua/9router",
    github: "https://github.com/decolua/9router",
    pricing: "Free",
    isOpenSource: true,
    platform: ["Local", "Node.js", "Docker"],
    categoryId: "cat-21",
    tags: ["open-source", "local", "proxy"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://github.com/decolua/9router"),
    problem: "Developers use multiple AI coding tools (Cursor, Cline, Copilot) which require separate configuration of API keys and lack unified cost management or auto-fallback capabilities.",
    solution: "A local OpenAI-compatible proxy (localhost:20128/v1) that routes requests from any AI coding tool to over 40 different API providers, featuring smart fallbacks and cost management.",
    challenge: "Translating and unifying API formats across different providers (OpenAI, Anthropic, Gemini) and compressing massive token usage from verbose tool outputs (like git diffs).",
    techChoices: ["Node.js", "Next.js", "React", "Tailwind CSS"],
    targetUser: "Developers who use multiple AI coding assistants and want to optimize their API costs and workflows.",
    keyFeatures: ["Centralized Routing", "Smart 3-tier auto-fallback", "RTK Token Saver (20-40% compression)", "Local Web Dashboard", "Format Translation"],
    impact: "Provides developers with absolute control over their API usage and costs across all their AI coding tools, preventing vendor lock-in.",
    guide: [
      { step: 1, title: "Install Globally", description: "Run 'npm install -g 9router' in your terminal." },
      { step: 2, title: "Start the Proxy", description: "Run '9router' and access the local web dashboard to configure your API keys." },
      { step: 3, title: "Configure Assistants", description: "Set your AI coding assistants (like Cline or Cursor) to use 'http://localhost:20128/v1' as their OpenAI-compatible endpoint." }
    ]
  },
  {
    id: "tool-29",
    name: "DeepSeek-R1",
    slug: "deepseek-r1",
    description: "State-of-the-art open-weights reasoning model trained via large-scale reinforcement learning. Rivals OpenAI o1 in math, coding, and logical reasoning.",
    website: "https://chat.deepseek.com",
    github: "https://github.com/deepseek-ai/DeepSeek-R1",
    pricing: "Free",
    isOpenSource: true,
    platform: ["Web", "API", "Local"],
    categoryId: "cat-3",
    tags: ["reasoning", "open-source", "local"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://chat.deepseek.com"),
    problem: "Proprietary reasoning models are expensive, closed-source, and introduce vendor lock-in for enterprise chain-of-thought workflows.",
    solution: "An open-weights reasoning LLM that uses pure RL (Reinforcement Learning) without supervised fine-tuning warm-up to achieve remarkable reasoning benchmarks at ultra-low inference cost.",
    challenge: "Managing lengthy chain-of-thought token generation while preventing reasoning drift and maintaining fast throughput.",
    techChoices: ["PyTorch", "Multi-Head Latent Attention", "Reinforcement Learning (GRPO)"],
    targetUser: "AI Researchers, Data Scientists, and Developers needing advanced logical reasoning.",
    keyFeatures: ["Deep reasoning tokens (<think>)", "Open weights with MIT license", "Distilled models (1.5B to 70B)", "Exceptional math and coding score"],
    impact: "Disrupted the global AI industry by providing frontier-class reasoning performance at a fraction of standard proprietary pricing.",
    guide: [
      { step: 1, title: "Try Online", description: "Visit chat.deepseek.com and enable 'DeepThink (R1)' mode for reasoning queries." },
      { step: 2, title: "Run Locally", description: "Run 'ollama run deepseek-r1:8b' or 'ollama run deepseek-r1:14b' on your local machine." },
      { step: 3, title: "Integrate via API", description: "Use the OpenAI-compatible API at 'https://api.deepseek.com' with model 'deepseek-reasoner'." }
    ]
  },
  {
    id: "tool-30",
    name: "DeepSeek-V3",
    slug: "deepseek-v3",
    description: "A 671B parameter Mixture-of-Experts (MoE) model activating 37B per token, delivering frontier-level performance in coding and general knowledge.",
    website: "https://deepseek.com",
    github: "https://github.com/deepseek-ai/DeepSeek-V3",
    pricing: "Freemium",
    isOpenSource: true,
    platform: ["API", "Web", "Local"],
    categoryId: "cat-3",
    tags: ["open-source", "python"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://deepseek.com"),
    problem: "Massive dense LLMs require prohibitive compute clusters to train and serve, leading to high API pricing.",
    solution: "A highly optimized Mixture-of-Experts architecture combined with Multi-head Latent Attention (MLA) that achieves top-tier inference speeds at extremely low cost.",
    challenge: "Load balancing thousands of expert routing paths across massive GPU networks without communication bottlenecks.",
    techChoices: ["Custom MoE Kernel", "Multi-Head Latent Attention", "FP8 Mixed Precision"],
    targetUser: "Developers, Startups, and High-throughput Enterprise Apps.",
    keyFeatures: ["671B total / 37B active parameters", "128K context window", "Ultra-fast generation speeds", "Very low API pricing"],
    impact: "Set a new global benchmark for price-to-performance in large foundational models.",
    guide: [
      { step: 1, title: "Get API Key", description: "Sign up at platform.deepseek.com and generate an API key." },
      { step: 2, title: "Configure Base URL", description: "Set your API base to 'https://api.deepseek.com' in any OpenAI-compatible client." },
      { step: 3, title: "Use Model", description: "Specify 'deepseek-chat' as your model identifier." }
    ]
  },
  {
    id: "tool-31",
    name: "Claude 3.7 Sonnet",
    slug: "claude-3-7-sonnet",
    description: "The first hybrid reasoning model combining instant responses with extended, controllable thinking for coding and complex engineering tasks.",
    website: "https://anthropic.com/claude",
    pricing: "Freemium",
    isOpenSource: false,
    platform: ["Web", "API"],
    categoryId: "cat-3",
    tags: ["reasoning", "copilot"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://anthropic.com/claude"),
    problem: "Developers previously had to choose between fast models (for autocomplete/chat) and slow pure-reasoning models without control over budget.",
    solution: "A hybrid reasoning architecture that allows users and developers to dial in exact thinking token budgets for complex coding and math problems.",
    challenge: "Balancing standard conversational tone with deep architectural problem solving in a single weights checkpoint.",
    techChoices: ["Constitutional AI", "Hybrid Thinking Engine", "React Artifacts"],
    targetUser: "Software Architects, Senior Engineers, and Product Builders.",
    keyFeatures: ["Controllable thinking tokens", "World-class coding benchmarks", "200K context window", "Deep integration with Claude Code CLI"],
    impact: "Established the gold standard for AI coding agents and autonomous problem-solving.",
    guide: [
      { step: 1, title: "Open Claude", description: "Visit claude.ai or use Anthropic's Messages API." },
      { step: 2, title: "Enable Extended Thinking", description: "Toggle Extended Thinking in the web interface or provide the 'thinking' parameter in API calls." },
      { step: 3, title: "Execute Complex Tasks", description: "Paste entire code repositories or complex architecture specs to receive verified solutions." }
    ]
  },
  {
    id: "tool-32",
    name: "Qwen 2.5 Coder",
    slug: "qwen-2-5-coder",
    description: "Alibaba's flagship open-weights coding model series (0.5B to 32B), matching top commercial models in code generation and debugging.",
    website: "https://chat.qwenlm.ai",
    github: "https://github.com/QwenLM/Qwen2.5-Coder",
    pricing: "Free",
    isOpenSource: true,
    platform: ["Local", "API", "Web"],
    categoryId: "cat-3",
    tags: ["open-source", "local", "copilot"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://chat.qwenlm.ai"),
    problem: "Developers needing local, private coding copilots were limited to low-accuracy small models.",
    solution: "Trained on 5.5+ trillion tokens of code, Qwen 2.5 Coder 32B matches proprietary 2024 models in full repo coding, math, and multi-file reasoning.",
    challenge: "Maintaining high comprehension across 92+ programming languages while supporting 128K context lengths locally.",
    techChoices: ["PyTorch", "FlashAttention-2", "RoPE Scaling"],
    targetUser: "Local-first Developers, Privacy-conscious enterprises, and VS Code users.",
    keyFeatures: ["32B flagship and lightweight 7B/14B variants", "128K context support", "92+ programming languages", "Apache 2.0 / Permissive open license"],
    impact: "Empowered millions of developers to run a true state-of-the-art coding copilot entirely on consumer hardware (MacBook / RTX 4090).",
    guide: [
      { step: 1, title: "Install via Ollama", description: "Run 'ollama run qwen2.5-coder:32b' or 'ollama run qwen2.5-coder:7b' in terminal." },
      { step: 2, title: "Connect to Editor", description: "Point Continue.dev, Cline, or Cursor to your local Ollama endpoint." },
      { step: 3, title: "Code Privately", description: "Enjoy zero-latency in-editor code completions with total data privacy." }
    ]
  },
  {
    id: "tool-33",
    name: "Claude Code",
    slug: "claude-code",
    description: "An agentic command-line tool by Anthropic that lives in your terminal, understands your codebase, and helps you code faster through natural language.",
    website: "https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview",
    pricing: "Freemium",
    isOpenSource: false,
    platform: ["Terminal", "macOS", "Linux", "Windows"],
    categoryId: "cat-2",
    tags: ["terminal", "copilot", "claude-code"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://anthropic.com"),
    problem: "IDE extensions can be distracting and struggle with large-scale multi-file terminal operations like git rebasing, build fixing, and package management.",
    solution: "A native CLI agent powered by Claude 3.7 Sonnet that reads your local repo, executes tests, creates commits, and plans architectural refactors directly in the terminal.",
    challenge: "Safely sandboxing terminal command execution and minimizing context window token spend across complex multi-step sessions.",
    techChoices: ["Node.js", "Anthropic Claude 3.7 API", "Terminal UI"],
    targetUser: "Terminal enthusiasts, Senior Engineers, and DevOps developers.",
    keyFeatures: ["Direct terminal integration", "Deep git awareness and automatic commits", "Understands CLAUDE.md guidelines", "Autonomous test and fix loops"],
    impact: "Reinvented the terminal workflow by placing an elite AI pair programmer directly into developer CLI environments.",
    guide: [
      { step: 1, title: "Install Globally", description: "Run 'npm install -g @anthropic-ai/claude-code' in your terminal." },
      { step: 2, title: "Authenticate", description: "Run 'claude' in any project directory and authenticate with your Anthropic account." },
      { step: 3, title: "Command the Agent", description: "Type prompts like 'Fix the failing unit tests and commit the changes' and let Claude Code work." }
    ]
  },
  {
    id: "tool-34",
    name: "Roo Code (Roo-Cline)",
    slug: "roo-code",
    description: "An advanced, community-driven autonomous coding assistant for VS Code with custom modes, MCP server integration, and multi-model support.",
    website: "https://roocode.com",
    github: "https://github.com/RooVetGit/Roo-Cline",
    pricing: "Free",
    isOpenSource: true,
    platform: ["VS Code"],
    categoryId: "cat-4",
    tags: ["editor", "open-source", "mcp"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://roocode.com"),
    problem: "Standard coding assistants lack specialization\u2014they treat architecture, testing, and documentation with the same rigid prompt.",
    solution: "An open-source agent featuring customizable personas (Code, Architect, Ask, Debugger), token cost tracking, and full Model Context Protocol (MCP) tool support.",
    challenge: "Coordinating multi-step file operations and terminal executions without hallucinating dependencies.",
    techChoices: ["TypeScript", "VS Code Extension API", "MCP Standard"],
    targetUser: "Power developers wanting full transparency, customized modes, and MCP tools in VS Code.",
    keyFeatures: ["Custom system modes (.roomodes)", "Full MCP support", "Token cost monitoring", "OpenRouter / DeepSeek / Claude / Local models support"],
    impact: "Became the fastest-growing open-source coding agent extension for VS Code in 2025.",
    guide: [
      { step: 1, title: "Install Extension", description: "Search for 'Roo Code' in the VS Code Marketplace and install." },
      { step: 2, title: "Choose API Provider", description: "Configure your API key (DeepSeek, Claude, OpenRouter, or Ollama)." },
      { step: 3, title: "Switch Modes", description: "Switch between 'Architect' to plan and 'Code' to write features automatically." }
    ]
  },
  {
    id: "tool-35",
    name: "Trae IDE",
    slug: "trae",
    description: "An adaptive AI IDE developed by ByteDance that integrates conversational coding agents and intelligent workspace indexing.",
    website: "https://trae.ai",
    pricing: "Free",
    isOpenSource: false,
    platform: ["macOS", "Windows"],
    categoryId: "cat-1",
    tags: ["editor", "copilot"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://trae.ai"),
    problem: "Most AI IDEs require paid subscriptions or complex multi-plugin configurations.",
    solution: "A polished, dedicated AI editor offering free access to top-tier models (Claude 3.5/3.7, GPT-4o) with native workspace indexing and Builder mode.",
    challenge: "Providing low-latency agentic multi-file generation with rich inline diff visualizers.",
    techChoices: ["VS Code Fork", "Rust indexing engine", "Proprietary Agent Orchestration"],
    targetUser: "Developers seeking a powerful, free, all-in-one AI IDE alternative to Cursor.",
    keyFeatures: ["Builder mode for multi-file creation", "Free access to Claude and GPT-4o", "Deep codebase indexing", "Familiar VS Code keybindings"],
    impact: "Lowered the barrier of entry for next-gen AI-native code editors worldwide.",
    guide: [
      { step: 1, title: "Download", description: "Download Trae from trae.ai and run the installer." },
      { step: 2, title: "Open Project", description: "Import your VS Code extensions and settings in one click." },
      { step: 3, title: "Use Builder Mode", description: "Press Cmd+U or open the chat panel to ask Trae to build full stack features." }
    ]
  },
  {
    id: "tool-36",
    name: "Goose",
    slug: "goose",
    description: "An open-source, extensible AI agent by Block that automates engineering tasks through CLI and tool execution.",
    website: "https://block.github.io/goose",
    github: "https://github.com/block/goose",
    pricing: "Free",
    isOpenSource: true,
    platform: ["macOS", "Linux", "Windows", "Terminal"],
    categoryId: "cat-4",
    tags: ["open-source", "terminal", "autonomous-agent"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: false,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://block.github.io/goose"),
    problem: "Building custom autonomous automation agents often requires writing glue code from scratch for every single workflow.",
    solution: "A modular, plug-and-play desktop and CLI agent that can connect to MCP servers, run commands, and automate developer tasks.",
    challenge: "Ensuring tool-calling reliability and agent loop safety across diverse enterprise environments.",
    techChoices: ["Rust", "Python", "Model Context Protocol"],
    targetUser: "DevOps, Software Engineers, and Automation builders.",
    keyFeatures: ["Extensible MCP plugin architecture", "CLI and GUI interfaces", "Supports any LLM provider", "Open source by Block"],
    impact: "Established a robust open-source foundation for enterprise-ready developer agents.",
    guide: [
      { step: 1, title: "Install", description: "Run 'curl -fsSL https://github.com/block/goose/releases/download/stable/download_cli.sh | bash'." },
      { step: 2, title: "Configure", description: "Run 'goose configure' to set your preferred LLM provider." },
      { step: 3, title: "Automate", description: "Run 'goose session' to start an autonomous problem-solving session." }
    ]
  },
  {
    id: "tool-37",
    name: "OpenHands",
    slug: "openhands",
    description: "The leading open-source platform for software development agents. Formerly OpenDevin.",
    website: "https://all-hands.dev",
    github: "https://github.com/All-Hands-AI/OpenHands",
    pricing: "Free",
    isOpenSource: true,
    platform: ["Docker", "Web", "Local"],
    categoryId: "cat-4",
    tags: ["open-source", "autonomous-agent", "docker"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://all-hands.dev"),
    problem: "Autonomous software engineer tools like Devin are closed-source and expensive for general developer communities.",
    solution: "A fully open-source platform with a web GUI, sandboxed Docker environment, and modular agent architecture capable of solving real GitHub issues.",
    challenge: "Safely sandboxing agent bash commands and browser automation within reliable Docker containers.",
    techChoices: ["Python", "FastAPI", "React", "Docker Sandboxing"],
    targetUser: "AI Researchers, Open Source Maintainers, and Autonomous Agent Builders.",
    keyFeatures: ["Docker execution sandbox", "Interactive Web UI", "Benchmark-tested on SWE-bench", "Supports any LLM provider"],
    impact: "Proved that the open-source community can build autonomous software engineers rivaling proprietary venture-backed startups.",
    guide: [
      { step: 1, title: "Start Container", description: "Run the official OpenHands docker container with Docker Desktop running." },
      { step: 2, title: "Open Web UI", description: "Navigate to 'http://localhost:3000' in your browser." },
      { step: 3, title: "Provide Task", description: "Give OpenHands a GitHub repository link or prompt to build, test, and commit." }
    ]
  },
  {
    id: "tool-38",
    name: "GitHub MCP Server",
    slug: "github-mcp-server",
    description: "Official Model Context Protocol server enabling AI agents to search repos, read pull requests, manage issues, and create commits.",
    website: "https://github.com/modelcontextprotocol/servers/tree/main/src/github",
    github: "https://github.com/modelcontextprotocol/servers",
    pricing: "Free",
    isOpenSource: true,
    platform: ["Node.js", "Docker"],
    categoryId: "cat-5",
    tags: ["mcp", "open-source", "typescript"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://github.com"),
    problem: "AI agents cannot natively interact with GitHub repositories, pull requests, or issue trackers without custom REST wrappers.",
    solution: "A standardized Model Context Protocol server that gives any MCP client (Claude Desktop, Cursor, Roo Code) structured tools for full GitHub operations.",
    challenge: "Handling GitHub rate limits and pagination cleanly across large repositories.",
    techChoices: ["TypeScript", "GitHub Octokit SDK", "MCP SDK"],
    targetUser: "Developers connecting AI assistants directly to GitHub workflows.",
    keyFeatures: ["Search code & repositories", "Create and review pull requests", "Manage issues & discussions", "Push commits directly"],
    impact: "Became the standard integration bridge between LLM agents and GitHub source control.",
    guide: [
      { step: 1, title: "Configure MCP", description: "Add '@modelcontextprotocol/server-github' to your Claude Desktop or Cline MCP settings." },
      { step: 2, title: "Add Personal Token", description: "Set your GITHUB_PERSONAL_ACCESS_TOKEN in the environment configuration." },
      { step: 3, title: "Use in Chat", description: "Ask your AI agent: 'Inspect issue #42 in my repo and create a pull request with a fix'." }
    ]
  },
  {
    id: "tool-39",
    name: "PostgreSQL MCP Server",
    slug: "postgres-mcp-server",
    description: "Model Context Protocol server providing read/write schema inspection and query execution for PostgreSQL databases.",
    website: "https://github.com/modelcontextprotocol/servers/tree/main/src/postgres",
    github: "https://github.com/modelcontextprotocol/servers",
    pricing: "Free",
    isOpenSource: true,
    platform: ["Node.js", "Docker"],
    categoryId: "cat-5",
    tags: ["mcp", "open-source", "database"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://postgresql.org"),
    problem: "AI assistants cannot inspect live database schemas or verify SQL queries without tedious copy-pasting.",
    solution: "A lightweight MCP server exposing PostgreSQL database introspection, schema validation, and SQL querying directly to AI agents.",
    challenge: "Ensuring secure execution and preventing accidental destructive SQL operations.",
    techChoices: ["TypeScript", "pg driver", "MCP SDK"],
    targetUser: "Backend Developers, Data Engineers, and Database Administrators.",
    keyFeatures: ["Live schema discovery", "Read and execute queries", "SQL syntax validation", "Works with Neon, Supabase, and local Postgres"],
    impact: "Eliminated the friction of manual database inspection when building backend applications with AI.",
    guide: [
      { step: 1, title: "Add to MCP Config", description: "Specify 'npx -y @modelcontextprotocol/server-postgres postgresql://user:pass@localhost:5432/mydb'." },
      { step: 2, title: "Connect Client", description: "Open Claude Desktop or Roo Code." },
      { step: 3, title: "Query with AI", description: "Prompt: 'Analyze the users table schema and write an optimized index recommendation'." }
    ]
  },
  {
    id: "tool-40",
    name: "Filesystem MCP Server",
    slug: "filesystem-mcp-server",
    description: "Model Context Protocol server for secure local directory access, file reading, writing, and directory searching.",
    website: "https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem",
    github: "https://github.com/modelcontextprotocol/servers",
    pricing: "Free",
    isOpenSource: true,
    platform: ["Node.js"],
    categoryId: "cat-5",
    tags: ["mcp", "open-source", "local"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: false,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://modelcontextprotocol.io"),
    problem: "Desktop AI clients (like Claude Desktop) cannot natively access local folders without secure directory boundaries.",
    solution: "A sandboxed MCP server granting file manipulation permissions strictly within user-approved directory paths.",
    challenge: "Preventing directory traversal attacks while providing rapid file tree exploration.",
    techChoices: ["Node.js", "MCP TypeScript SDK"],
    targetUser: "Claude Desktop users and local agent developers.",
    keyFeatures: ["Sandboxed directory access", "Read/Write files", "Search directory trees", "File metadata extraction"],
    impact: "Turned Claude Desktop from a pure chat interface into a capable local file assistant.",
    guide: [
      { step: 1, title: "Configure Path", description: "Add '@modelcontextprotocol/server-filesystem' with your chosen allowed directories." },
      { step: 2, title: "Restart Client", description: "Restart Claude Desktop to load the file tools." },
      { step: 3, title: "Manage Files", description: "Ask Claude to read documents or refactor source code in the allowed folder." }
    ]
  },
  {
    id: "tool-41",
    name: "Puppeteer MCP Server",
    slug: "puppeteer-mcp-server",
    description: "Browser automation MCP server enabling AI models to navigate the web, fill forms, click buttons, and capture screenshots.",
    website: "https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer",
    github: "https://github.com/modelcontextprotocol/servers",
    pricing: "Free",
    isOpenSource: true,
    platform: ["Node.js"],
    categoryId: "cat-5",
    tags: ["mcp", "open-source", "automation"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: false,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://pptr.dev"),
    problem: "AI agents often need live web information and UI interaction beyond static HTTP scraping.",
    solution: "A headless Chrome automation server implementing MCP tools for full browser interaction, DOM scraping, and screenshot capture.",
    challenge: "Handling dynamic JavaScript SPAs, bot detection, and screenshot compression efficiently.",
    techChoices: ["Puppeteer", "Chromium", "TypeScript"],
    targetUser: "Automation Engineers and Web Scraper Developers.",
    keyFeatures: ["Headless browser control", "Click and type actions", "Take webpage screenshots", "Execute JavaScript in page context"],
    impact: "Equipped AI agents with real eyes and hands on the live web.",
    guide: [
      { step: 1, title: "Add MCP Server", description: "Add 'npx -y @modelcontextprotocol/server-puppeteer' to your client MCP config." },
      { step: 2, title: "Launch Agent", description: "Ask your agent: 'Visit this URL, fill out the search form, and take a screenshot of the results'." }
    ]
  },
  {
    id: "tool-42",
    name: "Memory MCP Server",
    slug: "memory-mcp-server",
    description: "A graph-based persistent memory server for AI agents to maintain long-term memory across sessions.",
    website: "https://github.com/modelcontextprotocol/servers/tree/main/src/memory",
    github: "https://github.com/modelcontextprotocol/servers",
    pricing: "Free",
    isOpenSource: true,
    platform: ["Node.js"],
    categoryId: "cat-5",
    tags: ["mcp", "open-source"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: false,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://modelcontextprotocol.io"),
    problem: "LLM chats lose memory between sessions, forcing developers to repeat preferences, architectural rules, and project context.",
    solution: "A local knowledge-graph MCP server that automatically stores entities, relations, and observations across conversations.",
    challenge: "Dynamically querying and updating graph relations without polluting the LLM prompt context.",
    techChoices: ["TypeScript", "Knowledge Graph Engine"],
    targetUser: "Anyone using AI assistants across recurring, long-term engineering projects.",
    keyFeatures: ["Entity & Relation graph storage", "Continuous cross-session memory", "Search and retrieve facts", "Local JSON persistence"],
    impact: "Gave AI assistants true continuity and long-term memory across disjoint chat sessions.",
    guide: [
      { step: 1, title: "Install Memory Server", description: "Add '@modelcontextprotocol/server-memory' to your MCP configuration." },
      { step: 2, title: "Tell AI Facts", description: "Say: 'Remember that our project uses Tailwind CSS v4 and PostgreSQL with Drizzle ORM'." },
      { step: 3, title: "Recall in New Chats", description: "In a new session, ask: 'What stack do we use for the database?' and the agent will retrieve it from memory." }
    ]
  },
  {
    id: "tool-43",
    name: "Flux.1",
    slug: "flux-1",
    description: "Next-generation open-weights text-to-image model by Black Forest Labs with unprecedented typography rendering and photorealism.",
    website: "https://blackforestlabs.ai",
    github: "https://github.com/blackforestlabs/flux",
    pricing: "Free",
    isOpenSource: true,
    platform: ["Local", "API", "Web"],
    categoryId: "cat-6",
    tags: ["open-source", "local"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://blackforestlabs.ai"),
    problem: "Open-source diffusion models historically failed at readable text rendering, human hands, and following complex prompts.",
    solution: "A 12B parameter flow transformer model (dev, schnell, pro) capable of flawless typography, photorealism, and prompt adherence.",
    challenge: "Optimizing 12B transformer weights for fast local generation on 16GB consumer GPUs.",
    techChoices: ["Flow Matching", "Rotary Positional Embeddings", "PyTorch"],
    targetUser: "Designers, Creative Developers, and Local AI enthusiasts.",
    keyFeatures: ["Flawless text generation in images", "Schnell (4-step ultra-fast) and Dev variants", "ComfyUI & Diffusers support", "Apache 2.0 (Schnell) license"],
    impact: "Surpassed Midjourney v6 in prompt fidelity and text rendering while remaining openly accessible for local inference.",
    guide: [
      { step: 1, title: "Run in ComfyUI", description: "Download the Flux.1 Schnell or Dev UNet weights and load the default workflow." },
      { step: 2, title: "Prompt with Text", description: `Write prompts containing exact text in quotes (e.g. 'A neon sign saying "Awesome AI"').` },
      { step: 3, title: "Generate", description: "Experience instant high-fidelity image rendering." }
    ]
  },
  {
    id: "tool-44",
    name: "Kling AI",
    slug: "kling-ai",
    description: "A state-of-the-art AI video generation model capable of producing up to 1080p realistic videos with physical simulation and motion dynamics.",
    website: "https://klingai.com",
    pricing: "Freemium",
    isOpenSource: false,
    platform: ["Web"],
    categoryId: "cat-7",
    tags: [],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://klingai.com"),
    problem: "AI video generation often suffers from rubbery motion, physics violations, and short 3-second limits.",
    solution: "A 3D VAE and Spatio-Temporal Diffusion model creating cinematic video clips up to 2 minutes long with realistic real-world physics simulation.",
    challenge: "Rendering high-resolution temporal consistency across long video timelines.",
    techChoices: ["Spatio-Temporal Diffusion", "3D VAE Architecture"],
    targetUser: "Filmmakers, Game Developers, and Video Creators.",
    keyFeatures: ["Up to 2 minutes video duration", "1080p high definition output", "Motion brush & camera trajectory control", "Realistic physics simulation"],
    impact: "Elevated AI video from short experimental snippets into viable footage for production commercials and media.",
    guide: [
      { step: 1, title: "Sign Up", description: "Create an account on klingai.com." },
      { step: 2, title: "Text/Image to Video", description: "Upload a starting keyframe or write a descriptive motion prompt." },
      { step: 3, title: "Export", description: "Render in 1080p and download your video." }
    ]
  },
  {
    id: "tool-45",
    name: "Wan 2.1",
    slug: "wan-2-1",
    description: "Alibaba's open-weights video generation model series (1.3B and 14B) delivering cinematic visual quality and physics simulation locally.",
    website: "https://wan.aliyun.com",
    github: "https://github.com/Wan-Video/Wan2.1",
    pricing: "Free",
    isOpenSource: true,
    platform: ["Local", "API", "Python"],
    categoryId: "cat-7",
    tags: ["open-source", "local"],
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    featured: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    screenshotUrl: getScreenshot("https://wan.aliyun.com"),
    problem: "Leading video models (Sora, Runway Gen-3) are closed proprietary APIs with steep generation fees.",
    solution: "An open-weights video generation model suite capable of text-to-video and image-to-video generation running directly on consumer GPUs.",
    challenge: "Compressing spatio-temporal video tokens to fit within standard 16GB-24GB VRAM budgets.",
    techChoices: ["PyTorch", "Diffusers", "FlashAttention"],
    targetUser: "Open Source AI Creators, Animators, and Video Engineers.",
    keyFeatures: ["Open weights (1.3B and 14B)", "Text-to-Video and Image-to-Video", "Runs locally on consumer hardware", "Commercial-friendly license"],
    impact: "Democratized state-of-the-art generative video for the global open-source community.",
    guide: [
      { step: 1, title: "Clone Repository", description: "Clone 'Wan-Video/Wan2.1' on GitHub and install dependencies." },
      { step: 2, title: "Download Weights", description: "Fetch the 1.3B or 14B model checkpoint from Hugging Face." },
      { step: 3, title: "Generate Video", description: "Run the inference script to generate cinematic MP4 videos from text prompts." }
    ]
  }
];
var AI_SKILLS = [
  {
    id: "skill-1",
    name: "TDD Expert",
    slug: "tdd-expert",
    description: "Forces the agent to strictly follow Test-Driven Development (TDD) by writing tests before implementation.",
    frameworks: ["Cursor", "Copilot", "Claude Code"],
    content: "When writing new features, ALWAYS follow Test-Driven Development (TDD):\n1. Ask me to clarify requirements if ambiguous.\n2. Write the failing tests FIRST.\n3. Wait for me to run the tests and confirm they fail.\n4. Write the minimum code necessary to make the tests pass.\n5. Refactor the code while keeping tests green.",
    author: "VoltAgent",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-2",
    name: "Next.js App Router Master",
    slug: "nextjs-app-router-master",
    description: "Ensures the agent uses correct Next.js App Router conventions instead of legacy Pages Router patterns.",
    frameworks: ["Cursor", "Cline", "Claude Code"],
    content: "You are an expert in Next.js App Router. Follow these rules:\n- Always use 'use client' for components that require interactivity (hooks, event listeners).\n- Keep data fetching in Server Components where possible.\n- Do NOT use 'next/router', use 'next/navigation'.\n- Do NOT use 'getServerSideProps' or 'getStaticProps'. Use native async/await in Server Components.\n- Use `loading.tsx` and `error.tsx` for suspense and error boundaries.",
    author: "Community",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-3",
    name: "Security Auditor",
    slug: "security-auditor",
    description: "Instructs the agent to scan code for common vulnerabilities (OWASP Top 10) before committing.",
    frameworks: ["Copilot", "Claude Code", "GitHub Actions"],
    content: "Before proposing any code changes, perform a security audit:\n1. Check for SQL Injection risks in database queries.\n2. Ensure all user inputs are sanitized and escaped (XSS prevention).\n3. Verify that no hardcoded secrets or API keys are included.\n4. Check for proper authorization checks on protected routes.\n5. If any vulnerabilities are found, explain the risk and provide a secure alternative.",
    author: "VoltAgent",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-4",
    name: "UI/UX Designer",
    slug: "ui-ux-designer",
    description: "Guides the agent to generate beautiful, accessible, and responsive Tailwind UI components.",
    frameworks: ["Cursor", "v0", "Cline"],
    content: "When generating UI components:\n- Use Tailwind CSS for all styling.\n- Prioritize accessibility (use aria-labels, semantic HTML elements, sufficient contrast).\n- Ensure the design is fully responsive using Tailwind breakpoints (sm, md, lg, xl).\n- Use modern aesthetics: subtle shadows, glassmorphism (backdrop-blur), rounded corners, and consistent spacing.\n- Avoid hardcoding colors; use CSS variables (e.g., var(--background), var(--primary)) if a theme system is present.",
    author: "UI Guild",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-5",
    name: "Git Commit Convention",
    slug: "git-commit-convention",
    description: "Forces the agent to write Conventional Commits.",
    frameworks: ["Cursor", "Copilot", "Cline"],
    content: "Always generate commit messages using the Conventional Commits specification:\n- Format: <type>(<scope>): <subject>\n- Types: feat, fix, docs, style, refactor, perf, test, chore.\n- Scope is optional but recommended.\n- Subject must be imperative, present tense (e.g., 'add feature' not 'added feature').\n- Do not capitalize the first letter of the subject.\n- Do not end the subject with a period.",
    author: "Community",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-6",
    name: "Python Data Scientist",
    slug: "python-data-scientist",
    description: "Configures the agent to excel at data analysis, visualization, and machine learning using standard Python libraries.",
    frameworks: ["Cursor", "Jupyter", "Copilot"],
    content: "When writing Python data science code:\n- Always prefer pandas for data manipulation and numpy for numerical operations.\n- Handle missing data explicitly before analysis.\n- Use matplotlib or seaborn for visualizations with proper titles and labels.\n- Vectorize operations instead of using for-loops when iterating over DataFrames.\n- For ML, adhere to the scikit-learn API (fit/predict).",
    author: "DataCommunity",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-7",
    name: "Clean Architecture Planner",
    slug: "clean-architecture-planner",
    description: "Enforces SOLID principles and Clean Architecture structure on newly generated codebase modules.",
    frameworks: ["Cline", "Claude Code", "Cursor"],
    content: "When designing or generating new features, enforce Clean Architecture:\n1. Separate concerns into standard layers: Domain (Entities), Use Cases (Interactors), Interface Adapters (Controllers/Presenters), and Frameworks/Drivers.\n2. Apply SOLID principles, particularly Dependency Inversion (use interfaces/abstract classes for external services).\n3. Never import database or web framework dependencies directly into the Domain layer.",
    author: "UncleBobFans",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-8",
    name: "Accessibility (a11y) Expert",
    slug: "accessibility-a11y-expert",
    description: "Ensures all generated UI components adhere strictly to WCAG 2.1 guidelines.",
    frameworks: ["Cursor", "v0", "Copilot"],
    content: "All UI components must be accessible:\n- Ensure text contrast ratios meet WCAG AA standards (4.5:1 for normal text).\n- Provide `aria-label` or `aria-labelledby` for icon-only buttons.\n- Support full keyboard navigation (focus states, tab order).\n- Use semantic HTML tags (`<nav>`, `<main>`, `<article>`) instead of generic `<div>`s.\n- Never remove focus outlines without providing an accessible custom alternative.",
    author: "A11yProject",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-9",
    name: "Rust Systems Programmer",
    slug: "rust-systems-programmer",
    description: "Guides the agent to write idiomatic, safe Rust code avoiding unnecessary clones or unwraps.",
    frameworks: ["Cursor", "Claude Code"],
    content: "When writing Rust code:\n- Prioritize safe ownership and borrowing over `Clone` or `Rc`/`Arc` unless necessary.\n- Do NOT use `.unwrap()` or `.expect()` in production code; handle errors properly with `Result` and the `?` operator.\n- Utilize the type system to enforce state invariants.\n- Write comprehensive documentation comments (`///`) and inline unit tests for every public function.",
    author: "Rustaceans",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-10",
    name: "GitHub Actions DevOps",
    slug: "github-actions-devops",
    description: "Instructs the agent to write secure and efficient GitHub Actions YAML workflows.",
    frameworks: ["Copilot", "Claude Code"],
    content: "When generating GitHub Actions workflows:\n- Pin all actions to specific commit SHAs instead of mutable tags (e.g., v2).\n- Always use least-privilege for `permissions` (e.g., `contents: read`).\n- Never log secrets or credentials.\n- Use caching strategies (`actions/cache`) to speed up build and dependency installation times.\n- Run tests on multiple OS matrices only when explicitly required.",
    author: "DevOpsGuild",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-11",
    name: "API Documentation Generator",
    slug: "api-documentation-generator",
    description: "Forces the agent to accurately document APIs using OpenAPI/Swagger standards or comprehensive docstrings.",
    frameworks: ["Cursor", "Claude Code"],
    content: "Whenever you create or modify an API endpoint:\n1. Provide comprehensive OpenAPI (Swagger) annotations or equivalent standard docstrings.\n2. Clearly define the request schema (body, parameters, headers) and all possible response schemas (200, 400, 401, 404, 500).\n3. Include a realistic example for both the request payload and the response.\n4. Document authorization requirements clearly.",
    author: "API-First",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-12",
    name: "PostgreSQL DBA",
    slug: "postgresql-dba",
    description: "Guides the agent to write highly optimized, secure, and robust PostgreSQL queries.",
    frameworks: ["Cursor", "Copilot"],
    content: "When writing PostgreSQL queries or schema migrations:\n- Always consider indexing for columns used in WHERE, JOIN, and ORDER BY clauses.\n- Avoid `SELECT *`; explicitly select only the required columns.\n- Use EXPLAIN ANALYZE for query optimization if asked.\n- Prefer Common Table Expressions (CTEs) for complex nested queries to improve readability.\n- Use proper foreign key constraints with ON DELETE actions defined.",
    author: "PostgresCommunity",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-13",
    name: "React Native Expo Expert",
    slug: "react-native-expo-expert",
    description: "Configures the agent to build cross-platform mobile apps using modern Expo and React Native best practices.",
    frameworks: ["Cursor", "Copilot"],
    content: "When writing React Native code:\n- Always prefer Expo APIs (e.g., `expo-router`, `expo-image`) over third-party alternatives when possible.\n- Use `StyleSheet.create` for styling unless a utility library like NativeWind is explicitly configured.\n- Optimize lists using `FlashList` instead of `FlatList` for better performance.\n- Avoid heavy synchronous operations on the JS thread to maintain 60 FPS.",
    author: "ExpoCommunity",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-14",
    name: "SvelteKit & Tailwind Mastery",
    slug: "sveltekit-tailwind-mastery",
    description: "Enforces idiomatic SvelteKit folder structures, reactive declarations, and Tailwind styling.",
    frameworks: ["Cursor", "Cline"],
    content: 'When writing SvelteKit code:\n- Use standard `+page.svelte`, `+page.server.ts`, and `+layout.svelte` routing conventions.\n- Use `$: ` reactive declarations instead of manual state synchronization.\n- Keep logic inside `<script context="module">` or external TS files if it doesn\'t depend on component state.\n- Apply Tailwind classes directly in the template; avoid `<style>` blocks unless absolutely necessary.',
    author: "RichHarrisFans",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-15",
    name: "Go API Developer (Gin/Fiber)",
    slug: "go-api-developer",
    description: "Guides the agent to write idiomatic, high-performance Go web servers.",
    frameworks: ["Cursor", "Claude Code"],
    content: "When writing Go backend code:\n- Adhere to effective Go guidelines (e.g., return early, handle errors explicitly without nesting).\n- Use channels and goroutines responsibly to avoid memory leaks.\n- Prefer the standard library `net/http` or lightweight frameworks like Fiber/Gin.\n- Never ignore errors with `_` unless explicitly documented why it's safe.\n- Use table-driven tests for comprehensive unit testing.",
    author: "Gophers",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-16",
    name: "Vue 3 Composition API",
    slug: "vue-3-composition-api",
    description: "Forces the agent to use Vue 3's `<script setup>` syntax and reactivity APIs exclusively.",
    frameworks: ["Cursor", "Copilot"],
    content: "When writing Vue 3 components:\n- Always use `<script setup>` syntax. Never use the legacy Options API.\n- Use `ref` for primitive values and `reactive` for deeply nested objects.\n- Prefer composables (functions starting with `use`) for reusable state logic instead of mixins.\n- Use `defineProps` and `defineEmits` with TypeScript interfaces for strong typing.\n- Optimize large lists using virtual scroll libraries.",
    author: "VueMastery",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-17",
    name: "Solidity Smart Contract Auditor",
    slug: "solidity-smart-contract-auditor",
    description: "Instructs the agent to prioritize gas optimization and common exploit prevention in EVM contracts.",
    frameworks: ["Cursor", "GitHub Actions"],
    content: "When writing or reviewing Solidity code:\n- Always check for reentrancy vulnerabilities and use the Checks-Effects-Interactions pattern or `ReentrancyGuard`.\n- Ensure exact pragmas are used (e.g., `pragma solidity 0.8.24;`).\n- Optimize gas usage by packing structs tightly and caching storage variables in memory.\n- Explicitly mark variable visibility and restrict function access with `onlyOwner` or similar modifiers.\n- Avoid using `tx.origin` for authorization.",
    author: "Web3Guild",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-18",
    name: "Docker & Kubernetes Architect",
    slug: "docker-kubernetes-architect",
    description: "Guides the creation of minimal, secure Dockerfiles and production-ready K8s manifests.",
    frameworks: ["Cursor", "Cline", "Claude Code"],
    content: "When generating Dockerfiles or K8s manifests:\n- Always use multi-stage builds to keep final image sizes minimal.\n- Never run containers as root; define a non-root `USER`.\n- Base images should use specific tags (e.g., `alpine:3.19`), never `latest`.\n- In Kubernetes deployments, always define `resources.requests` and `resources.limits` to prevent node starvation.\n- Define health checks (`livenessProbe`, `readinessProbe`) for all web services.",
    author: "CloudNative",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-19",
    name: "Laravel PHP Artisan",
    slug: "laravel-php-artisan",
    description: "Enforces Laravel best practices, Eloquent ORM usage, and strict typing in PHP 8+.",
    frameworks: ["Cursor", "Copilot"],
    content: "When writing Laravel code:\n- Use Eloquent ORM and explicit relationships instead of raw DB queries when possible.\n- Prevent N+1 query problems by eagerly loading relationships using `with()`.\n- Always use Form Requests for validation instead of validating in the controller.\n- Take advantage of PHP 8+ features: constructor property promotion, match expressions, and typed properties.\n- Keep controllers thin and move complex business logic into Action or Service classes.",
    author: "Artisans",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-20",
    name: "Godot Game Developer",
    slug: "godot-game-developer",
    description: "Configures the agent to write performant GDScript and structure Godot engine scenes correctly.",
    frameworks: ["Cursor", "Claude Code"],
    content: "When writing Godot code:\n- Prefer static typing in GDScript (e.g., `var health: int = 100`) for performance and autocomplete.\n- Structure scenes hierarchically and favor composition over deep inheritance.\n- Use Signals for decoupling components instead of direct node references where appropriate.\n- Avoid heavy logic in `_process` or `_physics_process`; use timers or event-driven logic if possible.\n- Preload resources (scenes, sounds) at the top of the script using `preload()` to prevent stuttering during gameplay.",
    author: "GodotCommunity",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-21",
    name: "Spec-Driven Development",
    slug: "spec-driven-development",
    description: "Guides agents to create a formal specification and define edge cases before writing code.",
    frameworks: ["Cursor", "Claude Code", "Cline"],
    content: "Before writing any implementation code:\n1. Ask clarifying questions to eliminate ambiguity in the requirements.\n2. Draft a formal specification document detailing the intended behavior and edge cases.\n3. Wait for the user's explicit approval on the specification.\n4. Only proceed with coding once the spec is finalized. Do not make assumptions.",
    author: "AddyOsmani",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-22",
    name: "Test-Driven Development (TDD)",
    slug: "test-driven-development",
    description: "Strictly enforces the RED-GREEN-REFACTOR cycle for all code generation.",
    frameworks: ["Cursor", "Copilot"],
    content: "Enforce strict Test-Driven Development (RED-GREEN-REFACTOR):\n1. Write a failing test for the next piece of functionality.\n2. Run the test and verify it fails (RED).\n3. Write the absolute minimum amount of code required to make the test pass (GREEN).\n4. Refactor the code for quality while keeping tests passing.\n5. Never write implementation code without a failing test first.",
    author: "AddyOsmani",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-23",
    name: "Subagent Task Delegation",
    slug: "subagent-driven-development",
    description: "Breaks complex work into independent subagent tasks with strict compliance reviews.",
    frameworks: ["Antigravity", "Claude Code", "Cursor"],
    content: "When tackling a complex feature:\n1. Break the work down into bite-sized tasks (2-5 minutes each).\n2. Dispatch a separate context or subagent for each task.\n3. Perform a two-stage review on each task's output: first check for spec compliance, then check for code quality.\n4. Do not proceed to the next task until the current one passes review.",
    author: "Obra Superpowers",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-24",
    name: "Scope Creep Detector",
    slug: "scope-creep-detector",
    description: "Analyzes code modifications to prevent accidental feature creep beyond the original intent.",
    frameworks: ["GitHub Copilot", "Cursor"],
    content: "When reviewing a diff or planning changes:\n1. Compare the proposed code changes strictly against the original stated intent or issue description.\n2. Flag any modifications, refactoring, or new features that fall outside this scope.\n3. Recommend splitting out-of-scope changes into a separate PR or branch.\n4. Ask for explicit user justification before proceeding with out-of-scope code.",
    author: "ShubhamSaboo",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-25",
    name: "Project Graveyard Analyzer",
    slug: "project-graveyard",
    description: "Examines abandoned projects to diagnose code rot and create a revival roadmap.",
    frameworks: ["Claude Code", "Cursor"],
    content: "When analyzing an old or abandoned project:\n1. Scan the repository to identify the last active commit and the state of the codebase.\n2. Determine the core blockers or missing features that caused development to stop.\n3. Check for deprecated dependencies or code rot.\n4. Provide a structured roadmap with prioritized steps on how to modernize and finish the project.",
    author: "ShubhamSaboo",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-26",
    name: "Claude Code: Plan Before Execution",
    slug: "claude-code-plan-before-execution",
    description: "Forces Claude Code to generate and agree on a plan.md before making any code changes.",
    frameworks: ["Claude Code"],
    content: "When given a complex task:\n1. Do NOT write any implementation code immediately.\n2. Analyze the requirements and generate a `plan.md` file outlining the architecture, file changes, and edge cases.\n3. Ask the user for explicit approval on the plan.\n4. Only begin execution after the user approves.",
    author: "Claude Experts",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-27",
    name: "Claude Code: Context Compaction",
    slug: "claude-code-context-compaction",
    description: "A workflow for managing Claude Code's context window during long sessions.",
    frameworks: ["Claude Code"],
    content: "When a session becomes long or complex:\n1. Pause and run `/compact` to summarize the current state and discard irrelevant history.\n2. Use `/clear` if moving to a completely unrelated feature.\n3. Always start new major features by running `/init` to refresh codebase understanding and prevent hallucinated dependencies.",
    author: "Claude Experts",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-28",
    name: "Aider: Atomic Git Commits",
    slug: "aider-atomic-git-commits",
    description: "Configures Aider to make small, focused changes per commit to maintain a clean git history.",
    frameworks: ["Aider"],
    content: "When editing code in Aider:\n1. Focus on one specific goal or file change at a time.\n2. Avoid big, sweeping refactors across the entire codebase in a single prompt.\n3. Ensure that every edit results in a working state before moving to the next task.\n4. Use the `/architect` mode for complex, multi-file refactoring before writing code.",
    author: "Aider Community",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-29",
    name: "Aider: Conventions Enforcement",
    slug: "aider-conventions-enforcement",
    description: "Instructs Aider to strictly follow project-specific guidelines defined in CONVENTIONS.md.",
    frameworks: ["Aider"],
    content: "For every code change:\n1. Always read and adhere to the project's `CONVENTIONS.md` file.\n2. Strictly follow the defined Tech Stack, Linting rules, and Testing requirements (e.g., TDD).\n3. If a request contradicts the conventions, notify the user and ask for clarification before proceeding.",
    author: "Aider Community",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-30",
    name: "Autonomous Agent: Error Recovery",
    slug: "autonomous-agent-error-recovery",
    description: "Guides autonomous agents (Devin/AutoGPT) on how to handle terminal errors or build failures.",
    frameworks: ["Devin", "AutoGPT", "Antigravity"],
    content: "If a command or build fails:\n1. Do not panic or ask the user immediately.\n2. Analyze the error output completely.\n3. Check the documentation or source code for the failing component.\n4. Propose a hypothesis for the failure.\n5. Attempt a fix and re-run the command up to 3 times before escalating to the user.",
    author: "Autonomous Guild",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-31",
    name: "Chain of Thought (CoT) Master",
    slug: "chain-of-thought-master",
    description: "Forces any LLM to explicitly write out its reasoning steps before providing an answer.",
    frameworks: ["GPT-4", "Claude 3.5 Sonnet", "Gemini 1.5 Pro"],
    content: "Before providing your final answer or code:\n1. Write a `<thinking>` block.\n2. Break down the problem into logical steps.\n3. Identify constraints, potential pitfalls, and edge cases.\n4. Evaluate alternative approaches and select the optimal one.\n5. Only after closing the `</thinking>` block, provide your final implementation.",
    author: "Prompt Engineers",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-32",
    name: "Security Vulnerability Scanner",
    slug: "security-vulnerability-scanner",
    description: "Configures the LLM to act as a strict AppSec auditor checking against OWASP Top 10.",
    frameworks: ["GPT-4", "Claude 3.5 Sonnet"],
    content: "When reviewing code, act as a strict Application Security Auditor:\n1. Scan for OWASP Top 10 vulnerabilities (e.g., SQLi, XSS, CSRF, IDOR).\n2. Check for hardcoded secrets or credentials.\n3. Validate that all user inputs are sanitized and parameterized.\n4. Report findings categorized by Severity (Critical, High, Medium, Low) with actionable remediation steps.",
    author: "SecOps",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-33",
    name: "SEO & Semantic HTML Optimizer",
    slug: "seo-semantic-html-optimizer",
    description: "Ensures web code is optimized for search engines and screen readers.",
    frameworks: ["Cursor", "Copilot"],
    content: "When generating frontend code:\n1. Always use semantic HTML5 elements (header, main, nav, article).\n2. Ensure a proper heading hierarchy (h1 -> h2 -> h3) without skipping levels.\n3. Include descriptive alt attributes for all images.\n4. Add appropriate meta tags for SEO and social sharing (OpenGraph, Twitter Cards).\n5. Ensure fast load performance by avoiding render-blocking scripts.",
    author: "WebMasters",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-34",
    name: "Regex Ninja",
    slug: "regex-ninja",
    description: "Guides the LLM to write highly optimized, safe, and heavily commented Regular Expressions.",
    frameworks: ["GPT-4", "Claude 3.5 Sonnet"],
    content: "When tasked with writing Regular Expressions:\n1. Avoid catastrophic backtracking by failing fast.\n2. Use non-capturing groups `(?:)` unless extraction is explicitly needed.\n3. Provide a detailed, line-by-line explanation of how the pattern works.\n4. Generate at least 5 positive and 5 negative test cases to prove the regex is robust.",
    author: "RegexMasters",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-35",
    name: "Python Performance Profiler",
    slug: "python-performance-profiler",
    description: "Instructs the agent to optimize Python code for speed and memory efficiency.",
    frameworks: ["Cursor", "Jupyter"],
    content: "When optimizing Python code:\n1. Identify bottlenecks using `cProfile` or line profilers.\n2. Replace nested loops with vectorized NumPy or Pandas operations where applicable.\n3. Use generators (`yield`) instead of lists for large datasets to save memory.\n4. Utilize list comprehensions instead of `for.append()`.\n5. Consider `multiprocessing` or `asyncio` for I/O bound tasks.",
    author: "Pythonistas",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-36",
    name: "Database Schema Architect",
    slug: "database-schema-architect",
    description: "Forces the LLM to design normalized, scalable SQL schemas.",
    frameworks: ["Claude Code", "Cursor"],
    content: "When designing database schemas:\n1. Normalize to at least 3NF (Third Normal Form) to reduce data redundancy.\n2. Define clear Primary Keys and Foreign Keys with appropriate cascading actions.\n3. Recommend indexes for frequently queried or joined columns.\n4. Use appropriate data types (e.g., `TIMESTAMPTZ` instead of `TIMESTAMP`).\n5. Provide the raw SQL DDL script and an Entity-Relationship (ER) explanation.",
    author: "DBAGuild",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-37",
    name: "Next.js App Router Expert",
    slug: "nextjs-app-router-expert",
    description: "Strictly enforces Next.js 14+ App Router conventions and Server Components.",
    frameworks: ["Cursor", "Copilot", "Cline"],
    content: "When building Next.js applications:\n1. Default to React Server Components (RSC). Only use `'use client'` when interactivity (hooks, event listeners) is strictly required.\n2. Use the `app/` directory routing conventions (`page.tsx`, `layout.tsx`, `loading.tsx`).\n3. Implement data fetching at the server component level using `fetch` with appropriate caching strategies.\n4. Use Server Actions for form mutations instead of API routes.",
    author: "VercelFans",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-38",
    name: "Code Review Assistant",
    slug: "code-review-assistant",
    description: "Configures the agent to perform polite but rigorous code reviews.",
    frameworks: ["Claude Code", "GitHub Actions"],
    content: "When reviewing a Pull Request:\n1. Be constructive, polite, and objective.\n2. Focus on logic errors, performance issues, and architectural flaws rather than nitpicking style (assume a linter handles style).\n3. If suggesting a change, provide a concrete code snippet showing the improvement.\n4. Call out missing test coverage for new business logic.",
    author: "QA Guild",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-39",
    name: "Terminal Wizard",
    slug: "terminal-wizard",
    description: "Instructs the agent to write robust, cross-platform bash/shell scripts.",
    frameworks: ["Antigravity", "AutoGPT"],
    content: "When writing shell scripts:\n1. Always start with `set -euo pipefail` to ensure the script exits on errors or unbound variables.\n2. Avoid using `cat` when input redirection (`<`) is sufficient.\n3. Quote all variables to prevent word splitting.\n4. Prefer `awk` or `sed` for text processing instead of complex loops.\n5. Provide a fallback or error message if required dependencies are missing.",
    author: "SysAdmins",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-40",
    name: "Antigravity Meta-Agent",
    slug: "antigravity-meta-agent",
    description: "Advanced instructions for Google Antigravity to manage workspaces and subagents.",
    frameworks: ["Antigravity"],
    content: "As an Antigravity agent:\n1. Always prioritize checking Knowledge Items (KIs) before conducting deep research.\n2. Use the `command_status` tool for background tasks instead of blocking.\n3. When writing markdown artifacts, strictly adhere to GitHub Flavored Markdown and use Alerts for critical info.\n4. Spawn subagents using `browser_subagent` when visual interactions or dynamic web scraping are required.",
    author: "Deepmind Team",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-41",
    name: "UI/UX Pro Max",
    slug: "ui-ux-pro-max",
    description: "Extensive styling and design instructions covering over 50 UI styles and shadcn/ui integration.",
    frameworks: ["Cursor", "v0", "Claude Code"],
    content: "When acting as a UI/UX Designer:\n1. Adhere strictly to the requested aesthetic (e.g., Neumorphism, Glassmorphism, Brutalism).\n2. Automatically configure Tailwind configuration for appropriate color scales.\n3. Integrate headless UI components like shadcn/ui or Radix UI for accessible primitives.\n4. Ensure micro-interactions (hover, focus, active states) are always defined.",
    author: "escapeboy",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-42",
    name: "Senior Product Manager",
    slug: "senior-product-manager",
    description: "Forces the LLM to analyze product requirements, define user flows, and identify edge cases before coding.",
    frameworks: ["Claude Code", "Cursor"],
    content: "Before writing any code, act as a Senior PM:\n1. Define the core user journey and 'Happy Path'.\n2. Outline UI/UX highlights that will delight the user.\n3. Identify at least 3 edge cases or failure modes and how the UI should handle them.\n4. Present a markdown specification for approval.",
    author: "wwwazzz",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-43",
    name: "Vibe Coding Optimizer",
    slug: "vibe-coding-optimizer",
    description: "Workflows for UI/UX improvements, performance optimization, and preparing apps for production.",
    frameworks: ["Cursor", "Windsurf"],
    content: "When refining an application for production:\n1. Perform a 'Vibe Check'\u2014ensure animations are smooth (60fps) and transitions are natural.\n2. Run Lighthouse optimization checks mentally: minimize layout shifts (CLS) and optimize largest contentful paint (LCP).\n3. Clean up console.logs and unused CSS classes.\n4. Verify responsive design on mobile, tablet, and desktop breakpoints.",
    author: "KhazP",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-44",
    name: "Scientific Research Agent",
    slug: "scientific-research-agent",
    description: "Equips the agent with skills to parse scientific papers, query academic databases, and format LaTeX.",
    frameworks: ["AutoGPT", "LangChain"],
    content: "As a Scientific Researcher:\n1. Use PubMed or ArXiv APIs to retrieve peer-reviewed literature.\n2. Summarize abstracts highlighting methodology and limitations.\n3. Format mathematical equations strictly in LaTeX.\n4. Provide inline citations in APA or IEEE format whenever stating a factual claim.",
    author: "K-Dense-AI",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-45",
    name: "Design System Enforcer",
    slug: "design-system-enforcer",
    description: "Strictly enforces existing design tokens, spacing scales, and typography defined in the project.",
    frameworks: ["Cursor", "Copilot"],
    content: "When writing frontend code in this project:\n1. NEVER use arbitrary values in Tailwind (e.g., `w-[324px]`). Always use the defined spacing scale.\n2. Do not introduce new colors; use only the CSS variables defined in `globals.css` or the Tailwind config.\n3. Use predefined typography classes for headings and body text.\n4. If a requested component violates the design system, warn the user and suggest a compliant alternative.",
    author: "spencergoldade",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-46",
    name: "AI Agent Orchestrator",
    slug: "ai-agent-orchestrator",
    description: "Instructions for managing multiple sub-agents in a complex workflow (routing, delegation, aggregation).",
    frameworks: ["AutoGen", "LangGraph"],
    content: "When orchestrating multiple agents:\n1. Define clear boundaries and responsibilities for each agent (e.g., Researcher, Coder, Reviewer).\n2. Ensure the output of one agent is correctly formatted as the input for the next.\n3. Implement a 'Supervisor' node that verifies the final aggregated output meets the original user request before presenting it.\n4. Handle timeouts or infinite loops gracefully by setting a maximum step limit.",
    author: "repowise-dev",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-47",
    name: "Next.js 16 & React 19 Architect",
    slug: "nextjs-16-react-19-architect",
    description: "Enforces cutting-edge Next.js 16 App Router paradigms, React 19 Server Components, Server Actions, and strict async params.",
    frameworks: ["Cursor", "Claude Code", "Windsurf", "Cline"],
    content: "When developing in Next.js 16 & React 19:\n1. Strict Async Params: Always await `params` and `searchParams` in Page and Layout components (e.g. `const { slug } = await params;`).\n2. Server-First: Default to Server Components. Only add 'use client' when using browser hooks (useState, useEffect, event listeners).\n3. Data Mutation: Use React 19 Server Actions and `useActionState` / `useOptimistic` for forms instead of raw useEffect fetchers.\n4. Metadata & SEO: Always export typed `Metadata` objects or `generateMetadata` functions with Open Graph and Twitter cards.",
    author: "dimasrahmanda",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-48",
    name: "DeepSeek R1 Reasoning Prompter",
    slug: "deepseek-r1-reasoning-prompter",
    description: "Optimizes agent queries for deep reasoning models by encouraging zero-shot thinking, step verification, and mathematical rigor.",
    frameworks: ["Cursor", "Claude Code", "Cline"],
    content: "When querying DeepSeek R1 or reasoning LLMs:\n1. Allow natural chain-of-thought exploration without artificial temperature manipulation (keep temp around 0.6).\n2. Format complex algorithmic questions with clear constraints, expected time/space complexity, and edge cases.\n3. Instruct the model to double-check boundary conditions (null, overflow, empty lists) before outputting final code blocks.\n4. Avoid overly verbose meta-prompts; direct problem statements yield the best reasoning traces.",
    author: "dimasrahmanda",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-49",
    name: "MCP Server Builder",
    slug: "mcp-server-builder",
    description: "Guidance and scaffolding rules for building high-performance Model Context Protocol (MCP) servers using TypeScript or Python.",
    frameworks: ["Cursor", "Claude Code", "Roo Code"],
    content: "When authoring an MCP (Model Context Protocol) server:\n1. Use `@modelcontextprotocol/sdk` (TypeScript) or `mcp` (Python).\n2. Define structured JSON Schema for every tool with explicit parameter descriptions.\n3. Include resource templates (URIs) for data exposure and tools for actionable execution.\n4. Ensure error handling returns informative MCP ToolError messages rather than unhandled process crashes.\n5. Provide a stdio transport configuration snippet for Claude Desktop and Cline in the README.",
    author: "dimasrahmanda",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-50",
    name: "Claude Code Project Memory (CLAUDE.md)",
    slug: "claude-code-project-memory",
    description: "Structure and guidelines for maintaining a high-fidelity CLAUDE.md project context file for Anthropic's Claude Code CLI.",
    frameworks: ["Claude Code"],
    content: "# CLAUDE.md Guidelines\nWhen maintaining CLAUDE.md for Claude Code CLI:\n1. Keep it concise and high-signal (< 200 lines).\n2. Document frequent terminal commands (build, test, lint, typecheck).\n3. Explicitly state code conventions, naming rules, and architectural patterns.\n4. Mention sensitive files or patterns the agent should never overwrite.\n5. Include guidelines on how git commits should be formatted.",
    author: "dimasrahmanda",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "skill-51",
    name: "Tailwind CSS v4 Token Architecture",
    slug: "tailwind-v4-token-architecture",
    description: "Enforces modern Tailwind CSS v4 CSS-first configuration using @theme directives and native CSS variables.",
    frameworks: ["Cursor", "Windsurf", "Copilot"],
    content: "When writing styling with Tailwind CSS v4:\n1. Configuration is CSS-first: Define design tokens in `globals.css` using `@theme` rather than a JS config file.\n2. Use CSS variables for semantic colors (`var(--background)`, `var(--primary)`).\n3. Utilize modern container queries and CSS color-mix functions where appropriate.\n4. Avoid legacy `@apply` chains; compose clean utility classes directly in JSX.",
    author: "dimasrahmanda",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  }
];

// src/cli/index.ts
var program = new import_commander.Command();
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
    const response = await (0, import_prompts.default)({
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
    case "cursor-legacy":
      targetPath = import_path.default.join(process.cwd(), ".cursorrules");
      break;
    case "claude":
      targetPath = import_path.default.join(process.cwd(), "CLAUDE.md");
      fileContent = `
## Skill: ${skill.name}
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
      console.error("\n\u274C Error: Unsupported editor type.");
      process.exit(1);
  }
  const relativeTarget = import_path.default.relative(process.cwd(), targetPath) || import_path.default.basename(targetPath);
  try {
    if (import_fs.default.existsSync(targetPath)) {
      if (editor === "cursor") {
        import_fs.default.writeFileSync(targetPath, fileContent, "utf8");
        console.log(`
\u2705 Updated rule file: \x1B[32m${relativeTarget}\x1B[0m
`);
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
\u2705 Overwrote \x1B[32m${relativeTarget}\x1B[0m with '${skill.name}' skill rules.
`);
        } else {
          import_fs.default.appendFileSync(targetPath, "\n\n" + fileContent, "utf8");
          console.log(`
\u2705 Appended '${skill.name}' skill rules to \x1B[32m${relativeTarget}\x1B[0m.
`);
        }
      }
    } else {
      import_fs.default.writeFileSync(targetPath, fileContent, "utf8");
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
//# sourceMappingURL=index.js.map
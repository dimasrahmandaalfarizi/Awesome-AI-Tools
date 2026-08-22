import { z } from 'zod';

// Chat Completion Message Schema
export const ChatMessageSchema = z.object({
  role: z.enum(['system', 'user', 'assistant', 'tool', 'function']),
  content: z.string().max(100000, 'Message content exceeds maximum safe size (100KB)'),
  name: z.string().max(64).optional(),
}).strict();

// OpenAI Chat Completions Request Schema
export const ChatCompletionsRequestSchema = z.object({
  model: z.string().min(1).max(128),
  messages: z.array(ChatMessageSchema).min(1, 'Messages array cannot be empty').max(200, 'Too many messages in history'),
  temperature: z.number().min(0).max(2).optional(),
  top_p: z.number().min(0).max(1).optional(),
  stream: z.boolean().optional(),
  max_tokens: z.number().int().positive().max(128000).optional(),
  webSearch: z.boolean().optional(),
}).passthrough(); // Allow standard provider parameters while strictly validating core

// Proxy Config Schema
export const ProxyConfigSchema = z.object({
  activeProvider: z.enum(['openai', 'groq', 'deepseek', 'openrouter', 'gemini', 'ollama', 'custom']),
  keys: z.object({
    openai: z.string().max(256).optional(),
    groq: z.string().max(256).optional(),
    deepseek: z.string().max(256).optional(),
    openrouter: z.string().max(256).optional(),
    gemini: z.string().max(256).optional(),
    custom: z.string().max(256).optional(),
  }).partial().optional(),
  customBaseUrl: z.string().url('Invalid Custom Base URL format').max(512).optional().or(z.literal('')),
  defaultTargetModel: z.string().max(128).optional(),
  modelMapping: z.record(z.string().max(128), z.string().max(128)).optional(),
}).strict();

// Search Query Schema
export const SearchQuerySchema = z.object({
  q: z.string().min(1, 'Query cannot be empty').max(300, 'Query too long').regex(/^[^\x00-\x08\x0B\x0C\x0E-\x1F\x7F]+$/, 'Control characters are not allowed'),
});

// Semantic Search Request Schema
export const SemanticSearchRequestSchema = z.object({
  query: z.string().min(1, 'Query is required').max(300, 'Query too long'),
  locale: z.enum(['en', 'id']).optional().default('id'),
});

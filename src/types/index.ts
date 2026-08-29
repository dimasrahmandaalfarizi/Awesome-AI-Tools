export interface Category {
  id: string
  name: string
  slug: string
  icon?: string
  description: string
  createdAt: string
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface Tool {
  id: string
  name: string
  slug: string
  description: string
  logo?: string
  website: string
  github?: string
  pricing: "Free" | "Freemium" | "Paid" | "Contact for Pricing"
  isOpenSource: boolean
  platform: string[]
  categoryId: string
  tags: string[]
  lastUpdated: string
  featured: boolean
  createdAt: string
  problem?: string
  solution?: string
  challenge?: string
  techChoices?: string[]
  targetUser?: string
  keyFeatures?: string[]
  impact?: string
  screenshotUrl?: string
  guide?: {
    step: number;
    title: string;
    description: string;
  }[]
}

export interface Collection {
  id: string
  title: string
  slug: string
  description: string
  toolIds: string[]
}

export interface AiSkill {
  id: string
  name: string
  slug: string
  description: string
  frameworks: string[]
  content: string
  author?: string
  createdAt: string
}

export interface AiAgent {
  id: string
  name: string
  slug: string
  role: string
  description: string
  capabilities: string[]
  systemPrompt: string
  recommendedModel?: string
  tools: string[]
  tags: string[]
  author?: string
  createdAt: string
}

export interface PublicApi {
  id: string
  name: string
  slug: string
  description: string
  auth: string // "No" | "apiKey" | "OAuth" | "X-Mashape-Key" | "User-Agent"
  https: boolean
  cors: "yes" | "no" | "unknown"
  link: string
  category: string
}


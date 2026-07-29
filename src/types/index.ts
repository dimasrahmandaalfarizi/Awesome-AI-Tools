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
}

export interface Collection {
  id: string
  title: string
  slug: string
  description: string
  toolIds: string[]
}

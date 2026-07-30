// Export all types
export * from '../types';

// Export all data
export { CATEGORIES, TAGS, TOOLS, COLLECTIONS, AI_SKILLS } from '../data/mock';

// Helper functions (Optional)
import { AI_SKILLS, TOOLS, CATEGORIES } from '../data/mock';
import type { AiSkill, Tool, Category } from '../types';

export function getAllSkills(): AiSkill[] {
  return AI_SKILLS;
}

export function getSkillBySlug(slug: string): AiSkill | undefined {
  return AI_SKILLS.find(skill => skill.slug === slug);
}

export function getAllTools(): Tool[] {
  return TOOLS;
}

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find(tool => tool.slug === slug);
}

export function getAllCategories(): Category[] {
  return CATEGORIES;
}

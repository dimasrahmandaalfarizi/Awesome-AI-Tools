// Export all types
export * from '../types';

// Export all data
export { CATEGORIES, TAGS, TOOLS, COLLECTIONS, AI_SKILLS, AI_AGENTS } from '../data/mock';
export { COMPOSITE_WORKFLOWS } from '../data/workflows';
export { HOOK_SCRIPTS, INSTINCTS_TEMPLATE } from '../data/hooks';
export { scanWorkspace } from './scanner';

// Helper functions
import { AI_SKILLS, AI_AGENTS, TOOLS, CATEGORIES } from '../data/mock';
import { COMPOSITE_WORKFLOWS } from '../data/workflows';
import type { AiSkill, AiAgent, Tool, Category } from '../types';

export function getAllAgents(): AiAgent[] {
  return AI_AGENTS;
}

export function getAgentBySlug(slug: string): AiAgent | undefined {
  return AI_AGENTS.find(agent => agent.slug === slug);
}

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

// Export all types
export * from '../types';

// Export all data
export { CATEGORIES, TAGS, TOOLS, COLLECTIONS, AI_SKILLS, AI_AGENTS } from '../data/mock';
export { PUBLIC_APIS, PUBLIC_API_CATEGORIES, type PublicApiCategory } from '../data/apis';
export { COMPOSITE_WORKFLOWS } from '../data/workflows';
export { HOOK_SCRIPTS, INSTINCTS_TEMPLATE } from '../data/hooks';
export { scanWorkspace } from './scanner';
export { retrieveEnrichedContext, generateDeepContextualAnswer, SYSTEM_PERSONAS } from './ai/copilotContext';

// Helper functions
import { AI_SKILLS, AI_AGENTS, TOOLS, CATEGORIES } from '../data/mock';
import { PUBLIC_APIS, PUBLIC_API_CATEGORIES } from '../data/apis';
import { COMPOSITE_WORKFLOWS } from '../data/workflows';
import type { AiSkill, AiAgent, Tool, Category, PublicApi } from '../types';

export function getAllPublicApis(): PublicApi[] {
  return PUBLIC_APIS;
}

export function getPublicApiBySlug(slug: string): PublicApi | undefined {
  return PUBLIC_APIS.find(api => api.slug === slug);
}

export function getAllPublicApiCategories() {
  return PUBLIC_API_CATEGORIES;
}

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

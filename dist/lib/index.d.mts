interface Category {
    id: string;
    name: string;
    slug: string;
    icon?: string;
    description: string;
    createdAt: string;
}
interface Tag {
    id: string;
    name: string;
    slug: string;
}
interface Tool {
    id: string;
    name: string;
    slug: string;
    description: string;
    logo?: string;
    website: string;
    github?: string;
    pricing: "Free" | "Freemium" | "Paid" | "Contact for Pricing";
    isOpenSource: boolean;
    platform: string[];
    categoryId: string;
    tags: string[];
    lastUpdated: string;
    featured: boolean;
    createdAt: string;
    problem?: string;
    solution?: string;
    challenge?: string;
    techChoices?: string[];
    targetUser?: string;
    keyFeatures?: string[];
    impact?: string;
    screenshotUrl?: string;
    guide?: {
        step: number;
        title: string;
        description: string;
    }[];
}
interface Collection {
    id: string;
    title: string;
    slug: string;
    description: string;
    toolIds: string[];
}
interface AiSkill {
    id: string;
    name: string;
    slug: string;
    description: string;
    frameworks: string[];
    content: string;
    author?: string;
    createdAt: string;
}
interface AiAgent {
    id: string;
    name: string;
    slug: string;
    role: string;
    description: string;
    capabilities: string[];
    systemPrompt: string;
    recommendedModel?: string;
    tools: string[];
    tags: string[];
    author?: string;
    createdAt: string;
}

declare const AI_AGENTS: AiAgent[];

declare const CATEGORIES: Category[];
declare const TAGS: Tag[];
declare const TOOLS: Tool[];
declare const COLLECTIONS: Collection[];
declare const AI_SKILLS: AiSkill[];

interface CompositeWorkflow {
    name: string;
    slug: string;
    command: string;
    description: string;
    steps: {
        step: number;
        subagent: string;
        action: string;
        instructions: string;
    }[];
    content: string;
}
declare const COMPOSITE_WORKFLOWS: CompositeWorkflow[];

declare const HOOK_SCRIPTS: {
    preToolCall: string;
    postToolCall: string;
    onSessionEnd: string;
};
declare const INSTINCTS_TEMPLATE: string;

interface SecurityFinding {
    type: 'secret' | 'injection' | 'hook' | 'permission';
    severity: 'critical' | 'high' | 'medium' | 'low';
    title: string;
    description: string;
    file: string;
    line?: number;
    snippet?: string;
    remediation: string;
}
interface ScanReport {
    score: number;
    grade: 'A+' | 'A' | 'B' | 'C' | 'F';
    totalFilesScanned: number;
    findings: SecurityFinding[];
    timestamp: string;
    summary: {
        critical: number;
        high: number;
        medium: number;
        low: number;
    };
}
declare function scanWorkspace(targetDir?: string): ScanReport;

declare function getAllAgents(): AiAgent[];
declare function getAgentBySlug(slug: string): AiAgent | undefined;
declare function getAllSkills(): AiSkill[];
declare function getSkillBySlug(slug: string): AiSkill | undefined;
declare function getAllTools(): Tool[];
declare function getToolBySlug(slug: string): Tool | undefined;
declare function getAllCategories(): Category[];

export { AI_AGENTS, AI_SKILLS, type AiAgent, type AiSkill, CATEGORIES, COLLECTIONS, COMPOSITE_WORKFLOWS, type Category, type Collection, HOOK_SCRIPTS, INSTINCTS_TEMPLATE, TAGS, TOOLS, type Tag, type Tool, getAgentBySlug, getAllAgents, getAllCategories, getAllSkills, getAllTools, getSkillBySlug, getToolBySlug, scanWorkspace };

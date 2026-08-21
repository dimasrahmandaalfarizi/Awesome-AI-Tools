#!/usr/bin/env node

import { Command } from "commander";
import prompts from "prompts";
import fs from "fs";
import path from "path";
import { AI_SKILLS, AI_AGENTS } from "../data/mock";
import { scanWorkspace } from "../lib/scanner";

const program = new Command();

program
  .name("awesome-ai-tools")
  .description("CLI to manage 400+ AI skills, 68+ AI subagents, and run AgentShield security auditing across AI IDEs and CLI harnesses")
  .version("0.5.0");

function toCommandName(slug: string): string {
  return slug.replace(/^skill-/, "").replace(/[^a-zA-Z0-9_-]/g, "-").toLowerCase();
}

program
  .command("list")
  .description("List all available AI skills and subagents")
  .action(() => {
    console.log("\n🚀 Available AI Agent Skills (413 Skills):\n");
    AI_SKILLS.slice(0, 15).forEach((skill) => {
      const cmd = toCommandName(skill.slug);
      console.log(`- \x1b[36m${skill.name}\x1b[0m (/\x1b[35m${cmd}\x1b[0m | @\x1b[33m${cmd}\x1b[0m)`);
      console.log(`  ${skill.description}\n`);
    });
    console.log(`... and ${AI_SKILLS.length - 15} more skills available.\n`);

    console.log("\n🤖 Available AI Subagents (68+ Personas):\n");
    AI_AGENTS.slice(0, 10).forEach((agent) => {
      console.log(`- \x1b[32m${agent.name}\x1b[0m [Role: ${agent.role}]`);
      console.log(`  Model: ${agent.recommendedModel} | Tools: ${agent.tools.join(", ")}\n`);
    });
    console.log(`... and ${AI_AGENTS.length - 10} more subagents available.\n`);

    console.log("Run 'npx awesome-ai-tools init' to configure your workspace.");
    console.log("Run 'npx awesome-ai-tools scan' to audit security with AgentShield.\n");
  });

program
  .command("scan")
  .description("Run AgentShield security audit on current workspace for secrets, prompt injection, and dangerous hooks")
  .option("-d, --dir <path>", "Target directory to scan", ".")
  .action((options) => {
    const targetDir = path.resolve(process.cwd(), options.dir);
    console.log(`\n🛡️  Running AgentShield Security Scan on [36m${targetDir}[0m...\n`);

    const report = scanWorkspace(targetDir);

    console.log("=================================================");
    console.log(`📊 AgentShield Security Report — Grade: [1m${report.grade}[0m (Score: ${report.score}/100)`);
    console.log(`📁 Total Files Scanned: ${report.totalFilesScanned}`);
    console.log(`🚨 Critical: [31m${report.summary.critical}[0m | High: [33m${report.summary.high}[0m | Medium: [34m${report.summary.medium}[0m | Low: [37m${report.summary.low}[0m`);
    console.log("=================================================\n");

    if (report.findings.length === 0) {
      console.log("\x1b[32m🎉 Clean Workspace! No security risks, prompt injections, or leaked secrets found.\x1b[0m\n");
      return;
    }

    report.findings.forEach((finding, idx) => {
      const color = finding.severity === 'critical' ? '\x1b[31m' : finding.severity === 'high' ? '\x1b[33m' : '\x1b[34m';
      console.log(`[${idx + 1}] ${color}${finding.severity.toUpperCase()}\x1b[0m: [1m${finding.title}[0m`);
      console.log(`    File: [36m${finding.file}[0m${finding.line ? `:${finding.line}` : ''}`);
      if (finding.snippet) {
        console.log(`    Snippet: "[90m${finding.snippet}[0m"`);
      }
      console.log(`    Remediation: [32m${finding.remediation}[0m\n`);
    });

    console.log("💡 Tip: Resolve critical leaks and protect prompt files before deploying autonomous loops.\n");
  });

program
  .command("init")
  .description("Install all AI skills & subagents into your favorite IDE or CLI harness")
  .option("-t, --target <type>", "Target IDE/Platform (all, cursor, antigravity, claude, continue, copilot, windsurf, cline)")
  .action(async (options) => {
    let target = options.target;

    if (!target) {
      const response = await prompts({
        type: "select",
        name: "target",
        message: "Select your AI IDE / CLI environment to configure:",
        choices: [
          { 
            title: "🌟 All-in-One Universal Suite (CLI + Cursor + Antigravity + Copilot + Continue + Windsurf + Subagents)", 
            value: "all", 
            description: "Generates full structure for every AI coding environment" 
          },
          { 
            title: "Cursor IDE (.cursor/rules/*.mdc) [Trigger: @rule]", 
            value: "cursor", 
            description: "Modern multi-file MDC rules for Cursor with auto-triggers" 
          },
          { 
            title: "Google Antigravity & OpenAI Codex (.agents/skills/*/SKILL.md & subagents)", 
            value: "antigravity", 
            description: "Native agent skill & subagent personas" 
          },
          { 
            title: "Claude Code CLI (.claude/commands/*.md) [Trigger: /command]", 
            value: "claude", 
            description: "Full slash command suite in Claude Code terminal" 
          },
          { 
            title: "Continue.dev (.continue/prompts/*.prompt) [Trigger: /command]", 
            value: "continue", 
            description: "Custom slash commands for Continue.dev in VS Code / JetBrains" 
          },
          { 
            title: "GitHub Copilot (.github/prompts/*.prompt.md & instructions)", 
            value: "copilot", 
            description: "Prompt files and instructions for Copilot Chat in VS Code" 
          },
          { 
            title: "Windsurf IDE (.windsurfrules & .windsurf/workflows/)", 
            value: "windsurf", 
            description: "Rules & workflow files for Codeium Windsurf Cascade" 
          },
          { 
            title: "Cline / Roo Code (.clinerules & workflows)", 
            value: "cline", 
            description: "Custom rules and workflow directives for Cline" 
          },
        ],
      });
      target = response.target;
    }

    if (!target) {
      console.log("\nOperation cancelled.\n");
      process.exit(0);
    }

    const cwd = process.cwd();
    let totalGenerated = 0;

    console.log(`\n⚙️  Scaffolding ${AI_SKILLS.length} skills & ${AI_AGENTS.length} subagents for [${target.toUpperCase()}]...\n`);

    // 1. Claude Slash Commands
    if (target === "all" || target === "claude") {
      const claudeCmdDir = path.join(cwd, ".claude", "commands");
      if (!fs.existsSync(claudeCmdDir)) fs.mkdirSync(claudeCmdDir, { recursive: true });

      AI_SKILLS.forEach((skill) => {
        const cmdName = toCommandName(skill.slug);
        const filePath = path.join(claudeCmdDir, `${cmdName}.md`);
        const fileContent = `# /${cmdName} — ${skill.name}

${skill.description}

## Instructions for AI Agent:
When this command is triggered:
1. Apply the **${skill.name}** pattern and guidelines immediately.
2. Adhere to verification rules and prevent hallucinated APIs.

---

${skill.content}
`;
        fs.writeFileSync(filePath, fileContent, "utf8");
      });

      console.log(`✅ Generated \x1b[32m${AI_SKILLS.length} Slash Commands\x1b[0m in \x1b[36m.claude/commands/\x1b[0m (Trigger: /command)`);
      totalGenerated += AI_SKILLS.length;
    }

    // 2. Cursor Rules (.mdc)
    if (target === "all" || target === "cursor") {
      const cursorRulesDir = path.join(cwd, ".cursor", "rules");
      if (!fs.existsSync(cursorRulesDir)) fs.mkdirSync(cursorRulesDir, { recursive: true });

      AI_SKILLS.forEach((skill) => {
        const cmdName = toCommandName(skill.slug);
        const filePath = path.join(cursorRulesDir, `${cmdName}.mdc`);
        const fileContent = `---
description: ${skill.description}
globs: *
alwaysApply: false
---

# ${skill.name}

${skill.content}
`;
        fs.writeFileSync(filePath, fileContent, "utf8");
      });

      console.log(`✅ Generated \x1b[32m${AI_SKILLS.length} MDC Rules\x1b[0m in \x1b[36m.cursor/rules/\x1b[0m (Trigger in Cursor chat: @rule)`);
      totalGenerated += AI_SKILLS.length;
    }

    // 3. Antigravity & Codex (.agents/skills/*/SKILL.md & subagents)
    if (target === "all" || target === "antigravity") {
      const agentsSkillsDir = path.join(cwd, ".agents", "skills");

      AI_SKILLS.forEach((skill) => {
        const skillDir = path.join(agentsSkillsDir, skill.slug);
        if (!fs.existsSync(skillDir)) fs.mkdirSync(skillDir, { recursive: true });
        const filePath = path.join(skillDir, "SKILL.md");
        const fileContent = `---
name: ${skill.name}
description: ${skill.description}
frameworks: [${skill.frameworks.join(", ")}]
---

${skill.content}
`;
        fs.writeFileSync(filePath, fileContent, "utf8");
      });

      // Also create .agents/subagents/
      const subagentsDir = path.join(cwd, ".agents", "subagents");
      if (!fs.existsSync(subagentsDir)) fs.mkdirSync(subagentsDir, { recursive: true });

      AI_AGENTS.forEach((agent) => {
        const filePath = path.join(subagentsDir, `${agent.slug}.md`);
        const fileContent = `# Subagent Persona: ${agent.name}
Role: ${agent.role}
Recommended Model: ${agent.recommendedModel}
Tools: ${agent.tools.join(", ")}

## System Prompt:
${agent.systemPrompt}
`;
        fs.writeFileSync(filePath, fileContent, "utf8");
      });

      console.log(`✅ Generated \x1b[32m${AI_SKILLS.length} Universal Skills\x1b[0m + \x1b[32m${AI_AGENTS.length} Subagent Personas\x1b[0m in \x1b[36m.agents/\x1b[0m`);
      totalGenerated += AI_SKILLS.length + AI_AGENTS.length;
    }

    // 4. Continue.dev Prompts
    if (target === "all" || target === "continue") {
      const continuePromptsDir = path.join(cwd, ".continue", "prompts");
      if (!fs.existsSync(continuePromptsDir)) fs.mkdirSync(continuePromptsDir, { recursive: true });

      AI_SKILLS.forEach((skill) => {
        const cmdName = toCommandName(skill.slug);
        const filePath = path.join(continuePromptsDir, `${cmdName}.prompt`);
        const fileContent = `temperature: 0.2
description: ${skill.description}
---
# ${skill.name} Directive
{{{ input }}}

---
Guidelines:
${skill.content}
`;
        fs.writeFileSync(filePath, fileContent, "utf8");
      });

      console.log(`✅ Generated \x1b[32m${AI_SKILLS.length} Custom Prompts\x1b[0m in \x1b[36m.continue/prompts/\x1b[0m (Trigger: /command)`);
      totalGenerated += AI_SKILLS.length;
    }

    // 5. GitHub Copilot Prompts
    if (target === "all" || target === "copilot") {
      const copilotPromptsDir = path.join(cwd, ".github", "prompts");
      if (!fs.existsSync(copilotPromptsDir)) fs.mkdirSync(copilotPromptsDir, { recursive: true });

      AI_SKILLS.forEach((skill) => {
        const cmdName = toCommandName(skill.slug);
        const filePath = path.join(copilotPromptsDir, `${cmdName}.prompt.md`);
        const fileContent = `---
name: ${cmdName}
description: ${skill.description}
---

Apply the ${skill.name} engineering rules:

${skill.content}
`;
        fs.writeFileSync(filePath, fileContent, "utf8");
      });

      const instructionsPath = path.join(cwd, ".github", "copilot-instructions.md");
      const instructionsContent = `# Copilot Custom Instructions & Skills Suite
Active skills registered: ${AI_SKILLS.length} skills in .github/prompts/
Active subagents: ${AI_AGENTS.length} specialist personas.
`;
      fs.writeFileSync(instructionsPath, instructionsContent, "utf8");

      console.log(`✅ Generated \x1b[32m${AI_SKILLS.length} Copilot Prompts\x1b[0m in \x1b[36m.github/prompts/\x1b[0m (Trigger: /command)`);
      totalGenerated += AI_SKILLS.length;
    }

    // 6. Windsurf Workflows
    if (target === "all" || target === "windsurf") {
      const windsurfDir = path.join(cwd, ".windsurf", "workflows");
      if (!fs.existsSync(windsurfDir)) fs.mkdirSync(windsurfDir, { recursive: true });

      AI_SKILLS.forEach((skill) => {
        const cmdName = toCommandName(skill.slug);
        const filePath = path.join(windsurfDir, `${cmdName}.md`);
        const fileContent = `# Windsurf Workflow: ${skill.name}

${skill.description}

## Rules:
${skill.content}
`;
        fs.writeFileSync(filePath, fileContent, "utf8");
      });

      console.log(`✅ Generated \x1b[32m${AI_SKILLS.length} Workflows\x1b[0m in \x1b[36m.windsurf/workflows/\x1b[0m`);
      totalGenerated += AI_SKILLS.length;
    }

    // 7. Master AGENTS.md Index
    const agentsMdPath = path.join(cwd, "AGENTS.md");
    const agentsMdContent = `# Universal AI Agent Guidelines, Skills & Personas Suite

This repository is equipped with **${AI_SKILLS.length} AI Skills** and **${AI_AGENTS.length} AI Subagents** supporting both **CLI Agents** (Claude Code, Codex) and **AI IDEs** (Cursor, Antigravity, Windsurf, Copilot, Continue).

## Triggering Skills in your AI Environment:
- **Claude Code CLI**: Type \`/<command>\` (e.g. \`/tdd-workflow\`, \`/plan-first\`, \`/security-scan\`)
- **Cursor IDE**: Mention \`@<command>\` or rules apply based on context
- **Continue.dev**: Type \`/<command>\` in the Continue sidebar
- **GitHub Copilot**: Type \`/<command>\` in Copilot Chat
- **Antigravity / Codex**: Automatically read from \`.agents/skills/\` and \`.agents/subagents/\`

## Top Specialized Subagents:
${AI_AGENTS.slice(0, 15).map(a => `- **${a.name}** (${a.role}): Model ${a.recommendedModel}`).join("\n")}

## Security Scanner:
Run \`npx awesome-ai-tools scan\` anytime to audit your workspace with AgentShield.
`;
    fs.writeFileSync(agentsMdPath, agentsMdContent, "utf8");
    console.log(`✅ Generated master \x1b[32mAGENTS.md\x1b[0m index in project root.`);

    console.log(`\n🎉 \x1b[32mSetup Complete!\x1b[0m Total ${totalGenerated} configuration files generated.`);
    console.log("Open your AI IDE or CLI terminal and start coding with instant triggers!\n");
  });

program.parse();

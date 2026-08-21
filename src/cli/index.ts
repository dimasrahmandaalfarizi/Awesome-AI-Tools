#!/usr/bin/env node

import { Command } from "commander";
import prompts from "prompts";
import fs from "fs";
import path from "path";
import { AI_SKILLS } from "../data/mock";

const program = new Command();

program
  .name("awesome-ai-tools")
  .description("CLI to instantly install 200+ cross-platform AI skills & slash commands (ECC-style) to your projects")
  .version("0.3.0");

// Helper to sanitize command name
function toCommandName(slug: string): string {
  return slug.replace(/^skill-/, "").replace(/[^a-zA-Z0-9_-]/g, "-").toLowerCase();
}

program
  .command("list")
  .description("List all available AI skills and their slash command triggers")
  .action(() => {
    console.log("\n🚀 Available AI Agent Skills & Slash Commands:\n");
    AI_SKILLS.forEach((skill) => {
      const cmd = toCommandName(skill.slug);
      console.log(`- \x1b[36m${skill.name}\x1b[0m (\x1b[35m/${cmd}\x1b[0m)`);
      console.log(`  ${skill.description}`);
      console.log(`  Frameworks: ${skill.frameworks.join(", ")}\n`);
    });
    console.log("Run 'npx awesome-ai-tools init' to install ALL slash commands into your project.");
    console.log("Or run 'npx awesome-ai-tools add <slug>' to add a single skill.\n");
  });

program
  .command("init")
  .description("Install all 200+ AI skills and slash commands to your local project (ECC Flow)")
  .option("-t, --target <type>", "Target platforms (all, claude, agents, cursor)")
  .action(async (options) => {
    let target = options.target;

    if (!target) {
      const response = await prompts({
        type: "select",
        name: "target",
        message: "Select which AI Harness formats to generate:",
        choices: [
          { 
            title: "Full Suite: Claude Commands (/.claude/commands) + Universal Agents (.agents/skills) + Cursor Rules", 
            value: "all", 
            description: "Recommended (Works in Claude Code, Codex, Antigravity, Cursor & Zed)" 
          },
          { 
            title: "Claude Code Slash Commands (.claude/commands/*.md)", 
            value: "claude", 
            description: "Enables all /command triggers directly in Claude Code CLI" 
          },
          { 
            title: "Universal Agent Skills (.agents/skills/*/SKILL.md)", 
            value: "agents", 
            description: "Standard for Antigravity, Codex, and OpenAI agents" 
          },
          { 
            title: "Cursor MDC Rules (.cursor/rules/*.mdc)", 
            value: "cursor", 
            description: "Modern rules format for Cursor editor" 
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

    console.log("\n⚙️  Scaffolding AI skills & slash commands...\n");

    // 1. Generate Claude Slash Commands
    if (target === "all" || target === "claude") {
      const claudeCmdDir = path.join(cwd, ".claude", "commands");
      if (!fs.existsSync(claudeCmdDir)) {
        fs.mkdirSync(claudeCmdDir, { recursive: true });
      }

      AI_SKILLS.forEach((skill) => {
        const cmdName = toCommandName(skill.slug);
        const filePath = path.join(claudeCmdDir, `${cmdName}.md`);
        const fileContent = `# /${cmdName} — ${skill.name}

${skill.description}

## Instructions for AI Agent:
When this command is triggered:
1. Apply the **${skill.name}** pattern and guidelines immediately.
2. Ensure all changes adhere strictly to the rules below without hallucination.

---

${skill.content}
`;
        fs.writeFileSync(filePath, fileContent, "utf8");
      });

      console.log(`✅ Generated \x1b[32m${AI_SKILLS.length} Slash Commands\x1b[0m in \x1b[36m.claude/commands/\x1b[0m (access via /<command_name>)`);
      totalGenerated += AI_SKILLS.length;
    }

    // 2. Generate Universal Agent Skills (.agents/skills)
    if (target === "all" || target === "agents") {
      const agentsSkillsDir = path.join(cwd, ".agents", "skills");
      
      AI_SKILLS.forEach((skill) => {
        const skillDir = path.join(agentsSkillsDir, skill.slug);
        if (!fs.existsSync(skillDir)) {
          fs.mkdirSync(skillDir, { recursive: true });
        }
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

      console.log(`✅ Generated \x1b[32m${AI_SKILLS.length} Universal Skills\x1b[0m in \x1b[36m.agents/skills/\x1b[0m (Antigravity & Codex)`);
      totalGenerated += AI_SKILLS.length;
    }

    // 3. Generate Cursor Rules
    if (target === "all" || target === "cursor") {
      const cursorRulesDir = path.join(cwd, ".cursor", "rules");
      if (!fs.existsSync(cursorRulesDir)) {
        fs.mkdirSync(cursorRulesDir, { recursive: true });
      }

      AI_SKILLS.forEach((skill) => {
        const filePath = path.join(cursorRulesDir, `${skill.slug}.mdc`);
        const fileContent = `---
description: ${skill.description}
globs: *
alwaysApply: false
---

${skill.content}
`;
        fs.writeFileSync(filePath, fileContent, "utf8");
      });

      console.log(`✅ Generated \x1b[32m${AI_SKILLS.length} MDC Rules\x1b[0m in \x1b[36m.cursor/rules/\x1b[0m (Cursor)`);
      totalGenerated += AI_SKILLS.length;
    }

    // 4. Generate Root AGENTS.md / CLAUDE.md index
    const agentsMdPath = path.join(cwd, "AGENTS.md");
    const agentsMdContent = `# Project AI Agent Guidelines & Slash Commands

This repository is equipped with **Awesome AI Tools & ECC Skills Suite** (${AI_SKILLS.length} active skills).

## Available Slash Commands in Claude Code:
${AI_SKILLS.map(s => `- \`/${toCommandName(s.slug)}\` : **${s.name}** — ${s.description}`).join("\n")}

## Quick Start
Type any slash command in your AI coding assistant prompt (e.g. \`/tdd-workflow\`, \`/plan-first\`, \`/security-scan\`) to activate specific engineering modes.
`;
    fs.writeFileSync(agentsMdPath, agentsMdContent, "utf8");
    console.log(`✅ Generated master \x1b[32mAGENTS.md\x1b[0m index in project root.`);

    console.log(`\n🎉 \x1b[32mSetup Complete!\x1b[0m Total ${totalGenerated} files generated.`);
    console.log("You can now open Claude Code, Antigravity, or Cursor and type slash commands like \x1b[35m/tdd-workflow\x1b[0m or \x1b[35m/plan-first\x1b[0m!\n");
  });

program
  .command("add")
  .description("Add a specific AI skill / command to your project")
  .argument("<slug>", "The slug of the skill to add (e.g., tdd-workflow)")
  .option("-e, --editor <type>", "Target editor (claude-cmd, cursor, claude, windsurf, cline, copilot)")
  .action(async (slug, options) => {
    const skill = AI_SKILLS.find((s) => s.slug === slug);

    if (!skill) {
      console.error(`\n❌ Error: Skill with slug '${slug}' not found.`);
      console.log("Run 'npx awesome-ai-tools list' to see available skills.\n");
      process.exit(1);
    }

    let editor = options.editor;
    const cmdName = toCommandName(skill.slug);

    if (!editor) {
      const response = await prompts({
        type: "select",
        name: "editor",
        message: "Which format would you like to install?",
        choices: [
          { title: `Claude Slash Command (/.claude/commands/${cmdName}.md) [Recommended]`, value: "claude-cmd", description: `Enables /${cmdName} directly in Claude Code CLI` },
          { title: "Universal Agent Skill (.agents/skills/<slug>/SKILL.md)", value: "agent-skill", description: "Standard for Antigravity, Codex & OpenAI" },
          { title: "Cursor MDC Rule (.cursor/rules/<slug>.mdc)", value: "cursor", description: "Creates modern multi-file MDC rule" },
          { title: "Append to CLAUDE.md", value: "claude", description: "Appends to project CLAUDE.md guidelines" },
          { title: "Windsurf (.windsurfrules)", value: "windsurf", description: "Creates or appends to .windsurfrules" },
          { title: "Cline / Roo Code (.clinerules)", value: "cline", description: "Creates or appends to .clinerules" },
          { title: "GitHub Copilot (.github/copilot-instructions.md)", value: "copilot", description: "Creates repository custom instructions" },
        ],
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
      case "claude-cmd": {
        const cmdDir = path.join(process.cwd(), ".claude", "commands");
        if (!fs.existsSync(cmdDir)) {
          fs.mkdirSync(cmdDir, { recursive: true });
        }
        targetPath = path.join(cmdDir, `${cmdName}.md`);
        fileContent = `# /${cmdName} — ${skill.name}

${skill.description}

## Instructions for AI Agent:
When this command is invoked:
1. Follow the **${skill.name}** pattern and guidelines strictly.
2. Adhere to all verification and quality rules below.

---

${skill.content}
`;
        break;
      }
      case "agent-skill": {
        const skillDir = path.join(process.cwd(), ".agents", "skills", slug);
        if (!fs.existsSync(skillDir)) {
          fs.mkdirSync(skillDir, { recursive: true });
        }
        targetPath = path.join(skillDir, "SKILL.md");
        fileContent = `---
name: ${skill.name}
description: ${skill.description}
frameworks: [${skill.frameworks.join(", ")}]
---

${skill.content}
`;
        break;
      }
      case "cursor": {
        const rulesDir = path.join(process.cwd(), ".cursor", "rules");
        if (!fs.existsSync(rulesDir)) {
          fs.mkdirSync(rulesDir, { recursive: true });
        }
        targetPath = path.join(rulesDir, `${slug}.mdc`);
        fileContent = `---
description: ${skill.description}
globs: *
alwaysApply: true
---

${skill.content}
`;
        break;
      }
      case "claude":
        targetPath = path.join(process.cwd(), "CLAUDE.md");
        fileContent = `\n## Skill: ${skill.name} (Trigger: /${cmdName})\n${skill.content}\n`;
        break;
      case "windsurf":
        targetPath = path.join(process.cwd(), ".windsurfrules");
        break;
      case "cline":
        targetPath = path.join(process.cwd(), ".clinerules");
        break;
      case "copilot": {
        const githubDir = path.join(process.cwd(), ".github");
        if (!fs.existsSync(githubDir)) {
          fs.mkdirSync(githubDir, { recursive: true });
        }
        targetPath = path.join(githubDir, "copilot-instructions.md");
        break;
      }
      default:
        console.error("\n❌ Error: Unsupported format type.");
        process.exit(1);
    }

    const relativeTarget = path.relative(process.cwd(), targetPath) || path.basename(targetPath);

    try {
      if (fs.existsSync(targetPath)) {
        if (editor === "cursor" || editor === "claude-cmd" || editor === "agent-skill") {
          fs.writeFileSync(targetPath, fileContent, "utf8");
          console.log(`\n✅ Updated: \x1b[32m${relativeTarget}\x1b[0m\n`);
          if (editor === "claude-cmd") {
            console.log(`💡 You can now type \x1b[35m/${cmdName}\x1b[0m in Claude Code CLI!\n`);
          }
        } else {
          const { action } = await prompts({
            type: "select",
            name: "action",
            message: `${relativeTarget} already exists. What would you like to do?`,
            choices: [
              { title: "Append skill rules to existing file", value: "append" },
              { title: "Overwrite existing file", value: "overwrite" },
              { title: "Cancel", value: "cancel" },
            ],
            initial: 0,
          });

          if (action === "cancel" || !action) {
            console.log("\nOperation cancelled.\n");
            process.exit(0);
          }

          if (action === "overwrite") {
            fs.writeFileSync(targetPath, fileContent, "utf8");
            console.log(`\n✅ Overwrote \x1b[32m${relativeTarget}\x1b[0m with '${skill.name}' rules.\n`);
          } else {
            fs.appendFileSync(targetPath, "\n\n" + fileContent, "utf8");
            console.log(`\n✅ Appended '${skill.name}' rules to \x1b[32m${relativeTarget}\x1b[0m.\n`);
          }
        }
      } else {
        fs.writeFileSync(targetPath, fileContent, "utf8");
        console.log(`\n✅ Created \x1b[32m${relativeTarget}\x1b[0m\n`);
        if (editor === "claude-cmd") {
          console.log(`💡 You can now type \x1b[35m/${cmdName}\x1b[0m in Claude Code CLI!\n`);
        }
      }
    } catch (error: any) {
      console.error(`\n❌ Failed to write file: ${error.message}\n`);
    }
  });

program.parse();

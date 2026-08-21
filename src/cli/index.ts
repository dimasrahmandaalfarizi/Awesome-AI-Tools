#!/usr/bin/env node

import { Command } from "commander";
import prompts from "prompts";
import fs from "fs";
import path from "path";
import { AI_SKILLS } from "../data/mock";

const program = new Command();

program
  .name("awesome-ai-tools")
  .description("CLI to instantly install 400+ AI skills across all AI IDEs (Cursor, Antigravity, Windsurf, Copilot, Continue) and CLI harnesses (Claude Code, Codex)")
  .version("0.4.0");

// Helper to sanitize command/rule name
function toCommandName(slug: string): string {
  return slug.replace(/^skill-/, "").replace(/[^a-zA-Z0-9_-]/g, "-").toLowerCase();
}

program
  .command("list")
  .description("List all available AI skills and their IDE / CLI triggers")
  .action(() => {
    console.log("\n🚀 Available AI Skills & Triggers (IDE + CLI):\n");
    AI_SKILLS.forEach((skill) => {
      const cmd = toCommandName(skill.slug);
      console.log(`- \x1b[36m${skill.name}\x1b[0m`);
      console.log(`  CLI Trigger: \x1b[35m/${cmd}\x1b[0m | Cursor: \x1b[33m@${cmd}\x1b[0m | Copilot/Continue: \x1b[32m/${cmd}\x1b[0m`);
      console.log(`  ${skill.description}\n`);
    });
    console.log("Run 'npx awesome-ai-tools init' to configure your IDE & CLI automatically.\n");
  });

program
  .command("init")
  .description("Install all AI skills into your favorite IDE or CLI harness")
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
            title: "🌟 All-in-One Universal Suite (CLI + Cursor + Antigravity + Copilot + Continue + Windsurf)", 
            value: "all", 
            description: "Generates full structure for every AI coding environment" 
          },
          { 
            title: "Cursor IDE (.cursor/rules/*.mdc) [Trigger via @rule]", 
            value: "cursor", 
            description: "Modern multi-file MDC rules for Cursor with auto-triggers" 
          },
          { 
            title: "Google Antigravity & OpenAI Codex (.agents/skills/*/SKILL.md)", 
            value: "antigravity", 
            description: "Native agent skill specifications with multi-agent support" 
          },
          { 
            title: "Claude Code CLI (.claude/commands/*.md) [Trigger via /command]", 
            value: "claude", 
            description: "Full slash command suite in Claude Code terminal" 
          },
          { 
            title: "Continue.dev (.continue/prompts/*.prompt) [Trigger via /command]", 
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

    console.log(`\n⚙️  Scaffolding ${AI_SKILLS.length} skills for [${target.toUpperCase()}]...\n`);

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

    // 3. Antigravity & Codex (.agents/skills/*/SKILL.md)
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

      console.log(`✅ Generated \x1b[32m${AI_SKILLS.length} Universal Skills\x1b[0m in \x1b[36m.agents/skills/\x1b[0m (Antigravity & Codex)`);
      totalGenerated += AI_SKILLS.length;
    }

    // 4. Continue.dev Prompts (.continue/prompts/*.prompt)
    if (target === "all" || target === "continue") {
      const continuePromptsDir = path.join(cwd, ".continue", "prompts");
      if (!fs.existsSync(continuePromptsDir)) fs.mkdirSync(continuePromptsDir, { recursive: true });

      AI_SKILLS.forEach((skill) => {
        const cmdName = toCommandName(skill.slug);
        const filePath = path.join(continuePromptsDir, `${cmdName}.prompt`);
        const fileContent = `temperature: 0.2
description: ${skill.description}
---
# ${skill.name} Pattern Directive
{{{ input }}}

---
Guidelines to follow:
${skill.content}
`;
        fs.writeFileSync(filePath, fileContent, "utf8");
      });

      console.log(`✅ Generated \x1b[32m${AI_SKILLS.length} Custom Prompts\x1b[0m in \x1b[36m.continue/prompts/\x1b[0m (Trigger in Continue: /command)`);
      totalGenerated += AI_SKILLS.length;
    }

    // 5. GitHub Copilot Prompts (.github/prompts/*.prompt.md)
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

      // Also create .github/copilot-instructions.md
      const instructionsPath = path.join(cwd, ".github", "copilot-instructions.md");
      const instructionsContent = `# Copilot Custom Instructions & Skills Suite
Active skills registered: ${AI_SKILLS.length} skills in .github/prompts/
Reference prompt files or use slash commands in VS Code Copilot Chat.
`;
      fs.writeFileSync(instructionsPath, instructionsContent, "utf8");

      console.log(`✅ Generated \x1b[32m${AI_SKILLS.length} Copilot Prompts\x1b[0m in \x1b[36m.github/prompts/\x1b[0m (Trigger in Copilot: /command)`);
      totalGenerated += AI_SKILLS.length;
    }

    // 6. Windsurf Workflows (.windsurf/workflows/*.md)
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
    const agentsMdContent = `# Universal AI Agent Guidelines & Skills Suite

This repository is equipped with **${AI_SKILLS.length} AI Skills** supporting both **CLI Agents** (Claude Code, Codex) and **AI IDEs** (Cursor, Antigravity, Windsurf, Copilot, Continue).

## Triggering Skills in your AI Environment:
- **Claude Code CLI**: Type \`/<command>\` (e.g. \`/tdd-workflow\`, \`/plan-first\`, \`/security-scan\`)
- **Cursor IDE**: Mention \`@<command>\` or rules apply based on context
- **Continue.dev**: Type \`/<command>\` in the Continue sidebar
- **GitHub Copilot**: Type \`/<command>\` in Copilot Chat
- **Antigravity / Codex**: Automatically read from \`.agents/skills/\`

## Full Skills Catalog:
${AI_SKILLS.map(s => `- \`/${toCommandName(s.slug)}\` (\`@${toCommandName(s.slug)}\`): **${s.name}** — ${s.description}`).join("\n")}
`;
    fs.writeFileSync(agentsMdPath, agentsMdContent, "utf8");
    console.log(`✅ Generated master \x1b[32mAGENTS.md\x1b[0m index in project root.`);

    console.log(`\n🎉 \x1b[32mSetup Complete!\x1b[0m Total ${totalGenerated} configuration files generated.`);
    console.log("Open your AI IDE or CLI terminal and start coding with instant triggers!\n");
  });

program
  .command("add")
  .description("Add a specific AI skill into your project in any IDE or CLI format")
  .argument("<slug>", "The slug of the skill to add (e.g., tdd-workflow)")
  .option("-e, --editor <type>", "Target format (cursor, claude, antigravity, continue, copilot, windsurf, cline)")
  .action(async (slug, options) => {
    const skill = AI_SKILLS.find((s) => s.slug === slug || toCommandName(s.slug) === toCommandName(slug));

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
        message: "Select which IDE / CLI format to create for this skill:",
        choices: [
          { title: `Cursor IDE Rule (.cursor/rules/${cmdName}.mdc) [Trigger: @${cmdName}]`, value: "cursor" },
          { title: `Claude Code Slash Command (/.claude/commands/${cmdName}.md) [Trigger: /${cmdName}]`, value: "claude" },
          { title: `Google Antigravity & Codex (.agents/skills/${skill.slug}/SKILL.md)`, value: "antigravity" },
          { title: `Continue.dev Prompt (.continue/prompts/${cmdName}.prompt) [Trigger: /${cmdName}]`, value: "continue" },
          { title: `GitHub Copilot Prompt (.github/prompts/${cmdName}.prompt.md) [Trigger: /${cmdName}]`, value: "copilot" },
          { title: `Windsurf IDE Workflow (.windsurf/workflows/${cmdName}.md)`, value: "windsurf" },
          { title: "Append to project CLAUDE.md", value: "claude-append" },
          { title: "Append to .cursorrules", value: "cursor-legacy" },
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
      case "cursor": {
        const rulesDir = path.join(process.cwd(), ".cursor", "rules");
        if (!fs.existsSync(rulesDir)) fs.mkdirSync(rulesDir, { recursive: true });
        targetPath = path.join(rulesDir, `${cmdName}.mdc`);
        fileContent = `---
description: ${skill.description}
globs: *
alwaysApply: true
---

# ${skill.name}

${skill.content}
`;
        break;
      }
      case "claude": {
        const cmdDir = path.join(process.cwd(), ".claude", "commands");
        if (!fs.existsSync(cmdDir)) fs.mkdirSync(cmdDir, { recursive: true });
        targetPath = path.join(cmdDir, `${cmdName}.md`);
        fileContent = `# /${cmdName} — ${skill.name}

${skill.description}

## Instructions for AI Agent:
${skill.content}
`;
        break;
      }
      case "antigravity": {
        const skillDir = path.join(process.cwd(), ".agents", "skills", skill.slug);
        if (!fs.existsSync(skillDir)) fs.mkdirSync(skillDir, { recursive: true });
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
      case "continue": {
        const continueDir = path.join(process.cwd(), ".continue", "prompts");
        if (!fs.existsSync(continueDir)) fs.mkdirSync(continueDir, { recursive: true });
        targetPath = path.join(continueDir, `${cmdName}.prompt`);
        fileContent = `temperature: 0.2
description: ${skill.description}
---
# ${skill.name}
{{{ input }}}

${skill.content}
`;
        break;
      }
      case "copilot": {
        const copilotDir = path.join(process.cwd(), ".github", "prompts");
        if (!fs.existsSync(copilotDir)) fs.mkdirSync(copilotDir, { recursive: true });
        targetPath = path.join(copilotDir, `${cmdName}.prompt.md`);
        fileContent = `---
name: ${cmdName}
description: ${skill.description}
---

${skill.content}
`;
        break;
      }
      case "windsurf": {
        const wsDir = path.join(process.cwd(), ".windsurf", "workflows");
        if (!fs.existsSync(wsDir)) fs.mkdirSync(wsDir, { recursive: true });
        targetPath = path.join(wsDir, `${cmdName}.md`);
        fileContent = `# Windsurf: ${skill.name}

${skill.description}

${skill.content}
`;
        break;
      }
      case "claude-append":
        targetPath = path.join(process.cwd(), "CLAUDE.md");
        fileContent = `\n## Skill: ${skill.name} (Trigger: /${cmdName})\n${skill.content}\n`;
        break;
      case "cursor-legacy":
        targetPath = path.join(process.cwd(), ".cursorrules");
        break;
      default:
        console.error("\n❌ Error: Unsupported format type.");
        process.exit(1);
    }

    const relativeTarget = path.relative(process.cwd(), targetPath) || path.basename(targetPath);

    try {
      fs.writeFileSync(targetPath, fileContent, "utf8");
      console.log(`\n✅ Created / Updated: \x1b[32m${relativeTarget}\x1b[0m`);
      console.log(`💡 Ready to trigger in your IDE or CLI as \x1b[35m/${cmdName}\x1b[0m or \x1b[33m@${cmdName}\x1b[0m!\n`);
    } catch (error: any) {
      console.error(`\n❌ Failed to write file: ${error.message}\n`);
    }
  });

program.parse();

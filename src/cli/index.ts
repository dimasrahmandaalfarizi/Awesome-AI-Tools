#!/usr/bin/env node

import { Command } from "commander";
import prompts from "prompts";
import fs from "fs";
import path from "path";
import { AI_SKILLS } from "../data/mock";

const program = new Command();

program
  .name("awesome-ai-tools")
  .description("CLI to instantly apply AI skills & rules to your local projects")
  .version("0.2.0");

program
  .command("list")
  .description("List all available AI skills")
  .action(() => {
    console.log("\n🚀 Available AI Agent Skills:\n");
    AI_SKILLS.forEach((skill) => {
      console.log(`- \x1b[36m${skill.name}\x1b[0m (\x1b[33m${skill.slug}\x1b[0m)`);
      console.log(`  ${skill.description}`);
      console.log(`  Frameworks: ${skill.frameworks.join(", ")}\n`);
    });
    console.log("Run 'npx awesome-ai-tools add <slug>' to apply a skill to your project.\n");
  });

program
  .command("add")
  .description("Add a specific AI skill to your project")
  .argument("<slug>", "The slug of the skill to add (e.g., nextjs-16-react-19-architect)")
  .option("-e, --editor <type>", "Target editor (cursor, cursor-legacy, claude, windsurf, cline, copilot)")
  .action(async (slug, options) => {
    const skill = AI_SKILLS.find((s) => s.slug === slug);

    if (!skill) {
      console.error(`\n❌ Error: Skill with slug '${slug}' not found.`);
      console.log("Run 'npx awesome-ai-tools list' to see available skills.\n");
      process.exit(1);
    }

    let editor = options.editor;

    if (!editor) {
      const response = await prompts({
        type: "select",
        name: "editor",
        message: "Which AI Editor / Assistant are you using?",
        choices: [
          { title: "Cursor (.cursor/rules/<slug>.mdc) [Recommended]", value: "cursor", description: "Creates modern multi-file MDC rule" },
          { title: "Claude Code (CLAUDE.md)", value: "claude", description: "Appends to project CLAUDE.md guidelines" },
          { title: "Windsurf (.windsurfrules)", value: "windsurf", description: "Creates or appends to .windsurfrules" },
          { title: "Cline / Roo Code (.clinerules)", value: "cline", description: "Creates or appends to .clinerules" },
          { title: "GitHub Copilot (.github/copilot-instructions.md)", value: "copilot", description: "Creates repository custom instructions" },
          { title: "Cursor Legacy (.cursorrules)", value: "cursor-legacy", description: "Single-file legacy .cursorrules" },
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
      case "cursor-legacy":
        targetPath = path.join(process.cwd(), ".cursorrules");
        break;
      case "claude":
        targetPath = path.join(process.cwd(), "CLAUDE.md");
        fileContent = `\n## Skill: ${skill.name}\n${skill.content}\n`;
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
        console.error("\n❌ Error: Unsupported editor type.");
        process.exit(1);
    }

    const relativeTarget = path.relative(process.cwd(), targetPath) || path.basename(targetPath);

    try {
      if (fs.existsSync(targetPath)) {
        if (editor === "cursor") {
          fs.writeFileSync(targetPath, fileContent, "utf8");
          console.log(`\n✅ Updated rule file: \x1b[32m${relativeTarget}\x1b[0m\n`);
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
            console.log(`\n✅ Overwrote \x1b[32m${relativeTarget}\x1b[0m with '${skill.name}' skill rules.\n`);
          } else {
            fs.appendFileSync(targetPath, "\n\n" + fileContent, "utf8");
            console.log(`\n✅ Appended '${skill.name}' skill rules to \x1b[32m${relativeTarget}\x1b[0m.\n`);
          }
        }
      } else {
        fs.writeFileSync(targetPath, fileContent, "utf8");
        console.log(`\n✅ Created \x1b[32m${relativeTarget}\x1b[0m with '${skill.name}' rules.\n`);
      }
    } catch (error: any) {
      console.error(`\n❌ Failed to write file: ${error.message}\n`);
    }
  });

program.parse();

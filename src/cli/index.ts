#!/usr/bin/env node

import { Command } from "commander";
import prompts from "prompts";
import fs from "fs";
import path from "path";
import { AI_SKILLS } from "../data/mock";

const program = new Command();

program
  .name("awesome-ai-tools")
  .description("CLI to instantly apply AI skills to your local projects")
  .version("0.1.0");

program
  .command("list")
  .description("List all available AI skills")
  .action(() => {
    console.log("\n🚀 Available AI Skills:\n");
    AI_SKILLS.forEach((skill) => {
      console.log(`- ${skill.name} (${skill.slug})`);
      console.log(`  ${skill.description}\n`);
    });
    console.log("Run 'npx awesome-ai-tools add <slug>' to apply a skill to your project.\n");
  });

program
  .command("add")
  .description("Add a specific AI skill to your project")
  .argument("<slug>", "The slug of the skill to add (e.g., ui-ux-pro-max)")
  .option("-e, --editor <type>", "Target editor (cursor, windsurf, cline, claude)")
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
        message: "Which AI Editor are you using?",
        choices: [
          { title: "Cursor", value: "cursor", description: "Creates .cursorrules" },
          { title: "Windsurf", value: "windsurf", description: "Creates .windsurfrules" },
          { title: "Cline", value: "cline", description: "Creates .clinerules" },
          { title: "Claude Code", value: "claude", description: "Creates system-prompt.md" },
        ],
      });
      editor = response.editor;
    }

    if (!editor) {
      console.log("\nOperation cancelled.\n");
      process.exit(0);
    }

    let filename = "";
    switch (editor) {
      case "cursor":
        filename = ".cursorrules";
        break;
      case "windsurf":
        filename = ".windsurfrules";
        break;
      case "cline":
        filename = ".clinerules";
        break;
      case "claude":
        filename = `${slug}-system-prompt.md`;
        break;
      default:
        console.error("\n❌ Error: Unsupported editor type.");
        process.exit(1);
    }

    const targetPath = path.join(process.cwd(), filename);

    try {
      // If file exists, we could prompt to overwrite, but for simplicity we append or overwrite.
      // Usually users want to append rules. Let's ask if it exists.
      if (fs.existsSync(targetPath)) {
        const { overwrite } = await prompts({
          type: "confirm",
          name: "overwrite",
          message: `${filename} already exists. Do you want to overwrite it? (No will append)`,
          initial: false,
        });

        if (overwrite) {
          fs.writeFileSync(targetPath, skill.content, "utf8");
          console.log(`\n✅ Overwrote ${filename} with '${skill.name}' skill rules.\n`);
        } else {
          fs.appendFileSync(targetPath, "\n\n" + skill.content, "utf8");
          console.log(`\n✅ Appended '${skill.name}' skill rules to ${filename}.\n`);
        }
      } else {
        fs.writeFileSync(targetPath, skill.content, "utf8");
        console.log(`\n✅ Created ${filename} with '${skill.name}' skill rules.\n`);
      }
    } catch (error: any) {
      console.error(`\n❌ Failed to write file: ${error.message}\n`);
    }
  });

program.parse();

#!/usr/bin/env node

import { Command } from "commander";
import prompts from "prompts";
import fs from "fs";
import path from "path";
import { AI_SKILLS, AI_AGENTS } from "../data/mock";
import { COMPOSITE_WORKFLOWS } from "../data/workflows";
import { HOOK_SCRIPTS, INSTINCTS_TEMPLATE } from "../data/hooks";
import { scanWorkspace } from "../lib/scanner";

const program = new Command();

program
  .name("awesome-ai-tools")
  .description("CLI to manage 400+ AI skills, 68+ subagents, hooks runtime, instincts memory, and AgentShield security")
  .version("0.6.0");

function toCommandName(slug: string): string {
  return slug.replace(/^skill-/, "").replace(/[^a-zA-Z0-9_-]/g, "-").toLowerCase();
}

program
  .command("list")
  .description("List all available AI skills, subagents, and composite workflows")
  .action(() => {
    console.log("\n⚡ Available Composite Workflows:\n");
    COMPOSITE_WORKFLOWS.forEach((wf) => {
      console.log(`- \x1b[35m${wf.command}\x1b[0m — \x1b[1m${wf.name}\x1b[0m`);
      console.log(`  ${wf.description}\n`);
    });

    console.log(`\n🚀 Available AI Agent Skills (${AI_SKILLS.length} Skills):\n`);
    AI_SKILLS.slice(0, 10).forEach((skill) => {
      const cmd = toCommandName(skill.slug);
      console.log(`- \x1b[36m${skill.name}\x1b[0m (/\x1b[35m${cmd}\x1b[0m | @\x1b[33m${cmd}\x1b[0m)`);
    });
    console.log(`... and ${AI_SKILLS.length - 10} more skills available.\n`);

    console.log("\n🤖 Available AI Subagents (68+ Personas):\n");
    AI_AGENTS.slice(0, 10).forEach((agent) => {
      console.log(`- \x1b[32m${agent.name}\x1b[0m [Role: ${agent.role}]`);
    });
    console.log(`... and ${AI_AGENTS.length - 10} more subagents available.\n`);
  });

program
  .command("scan")
  .description("Run AgentShield security audit on current workspace")
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
  });

program
  .command("learn")
  .description("Persist a permanent codebase rule or preference to instincts.md")
  .argument("<rule>", "The rule, architecture decision, or invariant to remember")
  .action((rule) => {
    const cwd = process.cwd();
    const instinctsPath = path.join(cwd, "instincts.md");

    if (!fs.existsSync(instinctsPath)) {
      fs.writeFileSync(instinctsPath, INSTINCTS_TEMPLATE, "utf8");
    }

    const timestamp = new Date().toISOString().split("T")[0];
    const newEntry = `\n- [${timestamp}] ${rule}\n`;
    fs.appendFileSync(instinctsPath, newEntry, "utf8");

    console.log(`\n🧠 \x1b[32mInstinct Saved!\x1b[0m Added to \x1b[36minstincts.md\x1b[0m:`);
    console.log(`   "\x1b[33m${rule}\x1b[0m"\n`);
    console.log("All future AI Agent sessions will strictly adhere to this rule.\n");
  });

program
  .command("init")
  .description("Install all AI skills, subagents, hooks runtime, and instincts into your workspace")
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
            title: "🌟 All-in-One Universal Suite (Skills + Subagents + Hooks + Instincts + Workflows)", 
            value: "all", 
            description: "Generates full structure for every AI coding environment" 
          },
          { 
            title: "Cursor IDE (.cursor/rules/*.mdc & @rules)", 
            value: "cursor", 
            description: "Modern multi-file MDC rules for Cursor with auto-triggers" 
          },
          { 
            title: "Google Antigravity & Codex (.agents/skills/ & .agents/subagents/)", 
            value: "antigravity", 
            description: "Native agent skill & subagent personas" 
          },
          { 
            title: "Claude Code CLI (.claude/commands/*.md & .claude/hooks/)", 
            value: "claude", 
            description: "Full slash commands, workflows, and hook scripts" 
          },
          { 
            title: "Continue.dev (.continue/prompts/*.prompt)", 
            value: "continue", 
            description: "Custom slash commands for Continue.dev" 
          },
          { 
            title: "GitHub Copilot (.github/prompts/*.prompt.md)", 
            value: "copilot", 
            description: "Prompt files for Copilot Chat in VS Code" 
          },
          { 
            title: "Windsurf IDE (.windsurf/workflows/)", 
            value: "windsurf", 
            description: "Rules & workflow files for Codeium Windsurf Cascade" 
          },
          { 
            title: "Cline / Roo Code (.clinerules)", 
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

    console.log(`\n⚙️  Scaffolding ${AI_SKILLS.length} skills, ${AI_AGENTS.length} subagents, hooks & instincts...\n`);

    // 1. Instincts.md (Permanent Memory)
    const instinctsPath = path.join(cwd, "instincts.md");
    if (!fs.existsSync(instinctsPath)) {
      fs.writeFileSync(instinctsPath, INSTINCTS_TEMPLATE, "utf8");
      console.log("✅ Created \x1b[32minstincts.md\x1b[0m (Continuous Learning & Memory)");
      totalGenerated++;
    }

    // 2. Hooks Runtime (.claude/hooks/ and .agents/hooks/)
    if (target === "all" || target === "claude" || target === "antigravity") {
      const claudeHooksDir = path.join(cwd, ".claude", "hooks");
      if (!fs.existsSync(claudeHooksDir)) fs.mkdirSync(claudeHooksDir, { recursive: true });

      fs.writeFileSync(path.join(claudeHooksDir, "pre-tool-call.js"), HOOK_SCRIPTS.preToolCall, "utf8");
      fs.writeFileSync(path.join(claudeHooksDir, "post-tool-call.js"), HOOK_SCRIPTS.postToolCall, "utf8");
      fs.writeFileSync(path.join(claudeHooksDir, "on-session-end.js"), HOOK_SCRIPTS.onSessionEnd, "utf8");

      console.log("✅ Installed \x1b[32mAgent Hooks Runtime\x1b[0m in \x1b[36m.claude/hooks/\x1b[0m (Pre-Tool Safety & Auto-Linter)");
      totalGenerated += 3;
    }

    // 3. Composite Workflows (/review, /tdd, /compact, /council)
    if (target === "all" || target === "claude" || target === "continue") {
      const claudeCmdDir = path.join(cwd, ".claude", "commands");
      if (!fs.existsSync(claudeCmdDir)) fs.mkdirSync(claudeCmdDir, { recursive: true });

      COMPOSITE_WORKFLOWS.forEach((wf) => {
        const filePath = path.join(claudeCmdDir, `${wf.slug}.md`);
        fs.writeFileSync(filePath, wf.content, "utf8");
      });

      console.log(`✅ Generated \x1b[32m${COMPOSITE_WORKFLOWS.length} Composite Workflows\x1b[0m in \x1b[36m.claude/commands/\x1b[0m (/review, /tdd, /compact, /council)`);
      totalGenerated += COMPOSITE_WORKFLOWS.length;
    }

    // 4. Claude Slash Commands
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

      console.log(`✅ Generated \x1b[32m${AI_SKILLS.length} Slash Commands\x1b[0m in \x1b[36m.claude/commands/\x1b[0m`);
      totalGenerated += AI_SKILLS.length;
    }

    // 5. Cursor Rules (.mdc)
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

      console.log(`✅ Generated \x1b[32m${AI_SKILLS.length} MDC Rules\x1b[0m in \x1b[36m.cursor/rules/\x1b[0m`);
      totalGenerated += AI_SKILLS.length;
    }

    // 6. Antigravity & Codex (.agents/skills/ & .agents/subagents/)
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

      console.log(`✅ Generated \x1b[32m${AI_SKILLS.length} Skills\x1b[0m + \x1b[32m${AI_AGENTS.length} Subagents\x1b[0m in \x1b[36m.agents/\x1b[0m`);
      totalGenerated += AI_SKILLS.length + AI_AGENTS.length;
    }

    // 7. Master AGENTS.md Index
    const agentsMdPath = path.join(cwd, "AGENTS.md");
    const agentsMdContent = `# Universal AI Agent Guidelines, Skills & Personas Suite

This repository is equipped with **${AI_SKILLS.length} AI Skills**, **${AI_AGENTS.length} AI Subagents**, and **${COMPOSITE_WORKFLOWS.length} Composite Workflows**.

## Multi-Agent Workflows:
${COMPOSITE_WORKFLOWS.map(w => `- \`${w.command}\`: **${w.name}** — ${w.description}`).join("\n")}

## Triggering Skills:
- **Claude Code CLI / Continue**: Type \`/<command>\` (e.g. \`/tdd\`, \`/review\`, \`/tdd-workflow\`)
- **Cursor IDE**: Mention \`@<command>\` in Chat
- **Antigravity / Codex**: Auto-loaded from \`.agents/skills/\` and \`.agents/subagents/\`

## Continuous Learning:
Memory & rules are stored in \`instincts.md\`. Add new rules via \`npx awesome-ai-tools learn "<rule>"\`.
`;
    fs.writeFileSync(agentsMdPath, agentsMdContent, "utf8");
    console.log(`✅ Generated master \x1b[32mAGENTS.md\x1b[0m index in project root.`);

    console.log(`\n🎉 \x1b[32mSetup Complete!\x1b[0m Total ${totalGenerated} configuration files generated.`);
  });

program.parse();

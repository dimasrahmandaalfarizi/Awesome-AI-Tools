export const HOOK_SCRIPTS = {
  preToolCall: [
    '/**',
    ' * AgentShield Pre-Tool-Call Safety Interceptor',
    ' * Executed before the AI Agent runs any shell command.',
    ' */',
    'const dangerousPatterns = [',
    '  /rm\\s+-rf\\s+([/~]|\\$HOME|\\.\\.)/i,',
    '  /mkfs/i,',
    '  /dd\\s+if=/i',
    '];',
    '',
    'const cmd = process.argv.slice(2).join(" ");',
    'for (const pattern of dangerousPatterns) {',
    '  if (pattern.test(cmd)) {',
    '    console.error("[AgentShield BLOCKED] Dangerous command detected:", cmd);',
    '    process.exit(1);',
    '  }',
    '}'
  ].join('\n'),

  postToolCall: [
    '/**',
    ' * Agent Auto-Formatter & Verification Interceptor',
    ' */',
    'const { execSync } = require("child_process");',
    'const path = require("path");',
    'const fs = require("fs");',
    '',
    'const file = process.argv[2];',
    'if (file && fs.existsSync(file)) {',
    '  const ext = path.extname(file).toLowerCase();',
    '  if ([".js", ".jsx", ".ts", ".tsx", ".json"].includes(ext)) {',
    '    try {',
    '      execSync("npx prettier --write \"" + file + "\"", { stdio: "ignore" });',
    '    } catch {}',
    '  }',
    '}'
  ].join('\n'),

  onSessionEnd: [
    'const fs = require("fs");',
    'const path = require("path");',
    'const logDir = path.join(process.cwd(), ".claude");',
    'if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });',
    'fs.appendFileSync(path.join(logDir, "session_log.md"), "\n- Session completed: " + new Date().toISOString() + "\n");'
  ].join('\n')
};

export const INSTINCTS_TEMPLATE = [
  "# Project Instincts & Persistent Memory (Continuous Learning)",
  "",
  "This file stores permanent codebase instincts, architectural invariants, and developer preferences.",
  "AI Coding Agents (Claude Code, Cursor, Antigravity, Codex) MUST read and follow these rules in every session.",
  "",
  "## 🏛️ Codebase & Architecture Invariants",
  "- **Framework**: Next.js (App Router, Server Components by default, Client Components at leaves).",
  "- **Styling**: Tailwind CSS with clean, minimal zinc/monochrome aesthetics.",
  "- **Verification**: Always run verification builds (npm run build:lib & npm run build) before marking tasks complete.",
  "",
  "## 🚫 Anti-Patterns (Strictly Prohibited)",
  "- **Zero AI Slop**: Do NOT use decorative rainbow gradient overlays or meaningless glow icons.",
  "- **Zero Raw Secrets**: Never hardcode API keys or database connection strings into source code. Always use .env.",
  "- **Zero Premature Merges**: Never mark a task as completed without compiling and testing.",
  "",
  "## 🧠 Learned Lessons & Decisions",
  "- *ECC Integration*: Skills are triggered via /<command> in Claude/Continue, @<rule> in Cursor, and SKILL.md in Antigravity.",
  "- *Subagents*: 68 specialist personas are stored in .agents/subagents/.",
  "- *Security*: Run 'npx awesome-ai-tools scan' regularly to audit repository hygiene."
].join('\n');

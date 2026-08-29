/**
 * AgentShield Pre-Tool-Call Safety Interceptor
 * Executed before the AI Agent runs any shell command.
 */
const dangerousPatterns = [
  /rm\s+-rf\s+([/~]|\$HOME|\.\.)/i,
  /mkfs/i,
  /dd\s+if=/i
];

const cmd = process.argv.slice(2).join(" ");
for (const pattern of dangerousPatterns) {
  if (pattern.test(cmd)) {
    console.error("[AgentShield BLOCKED] Dangerous command detected:", cmd);
    process.exit(1);
  }
}
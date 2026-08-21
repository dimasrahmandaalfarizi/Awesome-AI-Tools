import fs from 'fs';
import path from 'path';

export interface SecurityFinding {
  type: 'secret' | 'injection' | 'hook' | 'permission';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  file: string;
  line?: number;
  snippet?: string;
  remediation: string;
}

export interface ScanReport {
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

// Regex patterns for secret detection
const SECRET_PATTERNS = [
  { name: 'OpenAI API Key', regex: /sk-[a-zA-Z0-9]{20,}|sk-proj-[a-zA-Z0-9_-]{20,}/g, severity: 'critical' as const },
  { name: 'Anthropic API Key', regex: /sk-ant-[a-zA-Z0-9_-]{20,}/g, severity: 'critical' as const },
  { name: 'GitHub Personal Access Token', regex: /ghp_[a-zA-Z0-9]{36}|github_pat_[a-zA-Z0-9_]{82}/g, severity: 'critical' as const },
  { name: 'AWS Access Key ID', regex: /AKIA[0-9A-Z]{16}/g, severity: 'high' as const },
  { name: 'Stripe Live Secret Key', regex: /sk_live_[0-9a-zA-Z]{24}/g, severity: 'critical' as const },
  { name: 'Database Connection String with Password', regex: /(postgres|postgresql|mysql|mongodb|redis):\/\/[^:]+:[^@]+@[^\s'"]+/g, severity: 'critical' as const },
  { name: 'Private Key Header', regex: /-----BEGIN (RSA|OPENSSH|EC|DSA|PGP|PRIVATE) KEY-----/g, severity: 'critical' as const },
];

// Regex patterns for prompt injection & adversarial strings
const INJECTION_PATTERNS = [
  { name: 'Ignore Previous Instructions', regex: /ignore\s+(all\s+)?(previous|prior|above)\s+(instructions|prompts|rules)/gi, severity: 'high' as const },
  { name: 'System Override Directive', regex: /system\s+(prompt\s+)?override|you\s+are\s+now\s+in\s+developer\s+mode/gi, severity: 'high' as const },
  { name: 'Credential Exfiltration Attempt', regex: /send\s+(my|the|all)\s+(api\s+key|password|env|secret|token)/gi, severity: 'critical' as const },
  { name: 'Adversarial Jailbreak Pattern', regex: /DAN\s+mode|jailbreak|unfiltered\s+mode/gi, severity: 'medium' as const },
];

// Regex patterns for dangerous hook commands
const DANGEROUS_HOOKS = [
  { name: 'Destructive File Deletion (rm -rf)', regex: /rm\s+-rf\s+([/~]|\$HOME|\.\.)/gi, severity: 'critical' as const },
  { name: 'Disk Formatting / Direct Drive Write', regex: /mkfs|dd\s+if=/gi, severity: 'critical' as const },
  { name: 'Unvalidated Shell Evaluation', regex: /eval\s+\$\(/gi, severity: 'high' as const },
];

const IGNORED_DIRS = new Set([
  'node_modules',
  '.git',
  '.next',
  'dist',
  'build',
  '.turbo',
  'coverage',
  '.gemini',
  'brain'
]);

const ALLOWED_EXTENSIONS = new Set([
  '.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs',
  '.json', '.yaml', '.yml', '.md', '.mdc', '.prompt',
  '.sh', '.bash', '.env', '.env.local', '.env.production'
]);

function shouldScanFile(filePath: string): boolean {
  const ext = path.extname(filePath).toLowerCase();
  const base = path.basename(filePath);
  if (base.startsWith('.env')) return true;
  return ALLOWED_EXTENSIONS.has(ext);
}

function traverseDirectory(dir: string, fileList: string[] = []): string[] {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (IGNORED_DIRS.has(file)) continue;
      const fullPath = path.join(dir, file);
      try {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          traverseDirectory(fullPath, fileList);
        } else if (stat.isFile() && shouldScanFile(fullPath)) {
          fileList.push(fullPath);
        }
      } catch {
        // Skip permission errors
      }
    }
  } catch {
    // Skip unreadable directories
  }
  return fileList;
}

export function scanWorkspace(targetDir: string = process.cwd()): ScanReport {
  const allFiles = traverseDirectory(targetDir);
  const findings: SecurityFinding[] = [];

  for (const filePath of allFiles) {
    const relPath = path.relative(targetDir, filePath);
    
    // Ignore checking mock.ts or scanner.ts patterns against themselves to avoid self-reporting
    if (relPath.includes('scanner.ts') || relPath.includes('mock.ts') || relPath.includes('agents.ts')) {
      continue;
    }

    let fileContent = '';
    try {
      fileContent = fs.readFileSync(filePath, 'utf8');
    } catch {
      continue;
    }

    const lines = fileContent.split('\n');

    // 1. Secret Key Scan
    for (const pattern of SECRET_PATTERNS) {
      lines.forEach((line, idx) => {
        // Skip comments explaining regex or docs
        if (line.includes('//') && line.includes('regex')) return;

        const matches = line.match(pattern.regex);
        if (matches) {
          findings.push({
            type: 'secret',
            severity: pattern.severity,
            title: `Potential Secret Leak: ${pattern.name}`,
            description: `Detected raw ${pattern.name} hardcoded in source file. Secrets should always be stored in environment variables.`,
            file: relPath,
            line: idx + 1,
            snippet: line.trim().substring(0, 80),
            remediation: 'Move secret value to an untracked .env file and access via process.env.'
          });
        }
      });
    }

    // 2. Prompt Injection Scan (only for .md, .prompt, .json, .txt)
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.md' || ext === '.prompt' || ext === '.txt') {
      for (const pattern of INJECTION_PATTERNS) {
        lines.forEach((line, idx) => {
          if (pattern.regex.test(line)) {
            findings.push({
              type: 'injection',
              severity: pattern.severity,
              title: `Adversarial Prompt Risk: ${pattern.name}`,
              description: `File contains phrases frequently used in prompt injection attacks that could override agent guardrails.`,
              file: relPath,
              line: idx + 1,
              snippet: line.trim().substring(0, 80),
              remediation: 'Sanitize external inputs or wrap system instructions inside XML delimiter tags (e.g. <rules>...</rules>).'
            });
          }
        });
      }
    }

    // 3. Dangerous Hook / Script Execution
    if (ext === '.sh' || relPath.includes('.claude/hooks') || relPath.includes('scripts/')) {
      for (const pattern of DANGEROUS_HOOKS) {
        lines.forEach((line, idx) => {
          if (pattern.regex.test(line)) {
            findings.push({
              type: 'hook',
              severity: pattern.severity,
              title: `High-Risk Command in Hook: ${pattern.name}`,
              description: `Hook or script contains potentially destructive operations without interactive confirmation.`,
              file: relPath,
              line: idx + 1,
              snippet: line.trim().substring(0, 80),
              remediation: 'Add confirmation prompts and dry-run safety checks before executing destructive commands.'
            });
          }
        });
      }
    }
  }

  // 4. MCP Configuration Permission Audit
  const mcpConfigs = [
    path.join(targetDir, '.claude', 'mcp.json'),
    path.join(targetDir, '.cursor', 'mcp.json')
  ];

  for (const mcpPath of mcpConfigs) {
    if (fs.existsSync(mcpPath)) {
      try {
        const mcpJson = JSON.parse(fs.readFileSync(mcpPath, 'utf8'));
        const mcpServers = mcpJson.mcpServers || {};
        for (const [serverName, config] of Object.entries<any>(mcpServers)) {
          if (config.args && config.args.includes('--allow-all')) {
            findings.push({
              type: 'permission',
              severity: 'high',
              title: `Over-Privileged MCP Server: ${serverName}`,
              description: `MCP server '${serverName}' runs with unrestricted permissions (--allow-all).`,
              file: path.relative(targetDir, mcpPath),
              remediation: 'Restrict MCP server arguments to only required directories and capabilities.'
            });
          }
        }
      } catch {
        // Skip malformed json
      }
    }
  }

  // Calculate score and summary
  const summary = {
    critical: findings.filter(f => f.severity === 'critical').length,
    high: findings.filter(f => f.severity === 'high').length,
    medium: findings.filter(f => f.severity === 'medium').length,
    low: findings.filter(f => f.severity === 'low').length,
  };

  let score = 100;
  score -= summary.critical * 25;
  score -= summary.high * 15;
  score -= summary.medium * 5;
  score -= summary.low * 2;
  if (score < 0) score = 0;

  let grade: 'A+' | 'A' | 'B' | 'C' | 'F' = 'A+';
  if (score === 100) grade = 'A+';
  else if (score >= 85) grade = 'A';
  else if (score >= 70) grade = 'B';
  else if (score >= 50) grade = 'C';
  else grade = 'F';

  return {
    score,
    grade,
    totalFilesScanned: allFiles.length,
    findings,
    timestamp: new Date().toISOString(),
    summary
  };
}

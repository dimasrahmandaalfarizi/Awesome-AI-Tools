/**
 * Agent Auto-Formatter & Verification Interceptor
 */
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const file = process.argv[2];
if (file && fs.existsSync(file)) {
  const ext = path.extname(file).toLowerCase();
  if ([".js", ".jsx", ".ts", ".tsx", ".json"].includes(ext)) {
    try {
      execSync("npx prettier --write "" + file + """, { stdio: "ignore" });
    } catch {}
  }
}
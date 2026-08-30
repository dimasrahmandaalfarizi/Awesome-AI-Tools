const fs = require("fs");
const path = require("path");
const logDir = path.join(process.cwd(), ".claude");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
fs.appendFileSync(path.join(logDir, "session_log.md"), "
- Session completed: " + new Date().toISOString() + "
");
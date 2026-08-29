import fs from "node:fs"
import path from "node:path"

const SKILLS_DIR = path.resolve(".agents/skills")
const OUTPUT_DIR = path.resolve("public/data/skills")

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

console.log(">> Scanning .agents/skills for bundling...")

if (!fs.existsSync(SKILLS_DIR)) {
  console.error("Skills directory .agents/skills does not exist!")
  process.exit(1)
}

const skillFolders = fs.readdirSync(SKILLS_DIR).filter((f) => {
  return fs.statSync(path.join(SKILLS_DIR, f)).isDirectory()
})

console.log(`Found ${skillFolders.length} skills. Parsing frontmatter and content...`)

const categories = {
  security: [],
  frontend: [],
  backend: [],
  architecture: [],
  devops: [],
  all: [],
}

for (const folder of skillFolders) {
  const skillPath = path.join(SKILLS_DIR, folder, "SKILL.md")
  let description = "Specialized AI engineering skill"
  let name = folder.replace(/-/g, " ")

  if (fs.existsSync(skillPath)) {
    try {
      const content = fs.readFileSync(skillPath, "utf8").slice(0, 800)
      const descMatch = content.match(/description:\s*["']?([^"'\n\r]+)["']?/)
      if (descMatch && descMatch[1]) {
        description = descMatch[1].trim()
      }
      const nameMatch = content.match(/name:\s*["']?([^"'\n\r]+)["']?/)
      if (nameMatch && nameMatch[1]) {
        name = nameMatch[1].trim()
      }
    } catch {}
  }

  const slug = folder
  const item = { slug, name, description }
  categories.all.push(item)

  const lower = (slug + " " + name + " " + description).toLowerCase()

  if (
    lower.includes("security") ||
    lower.includes("audit") ||
    lower.includes("pentest") ||
    lower.includes("auth") ||
    lower.includes("vulnerability") ||
    lower.includes("shield") ||
    lower.includes("iam")
  ) {
    categories.security.push(item)
  }

  if (
    lower.includes("react") ||
    lower.includes("next") ||
    lower.includes("vue") ||
    lower.includes("angular") ||
    lower.includes("frontend") ||
    lower.includes("ui") ||
    lower.includes("css") ||
    lower.includes("tailwind") ||
    lower.includes("web")
  ) {
    categories.frontend.push(item)
  }

  if (
    lower.includes("node") ||
    lower.includes("backend") ||
    lower.includes("api") ||
    lower.includes("python") ||
    lower.includes("go") ||
    lower.includes("rust") ||
    lower.includes("sql") ||
    lower.includes("database") ||
    lower.includes("postgres")
  ) {
    categories.backend.push(item)
  }

  if (
    lower.includes("architect") ||
    lower.includes("design") ||
    lower.includes("c4") ||
    lower.includes("ddd") ||
    lower.includes("system") ||
    lower.includes("pattern")
  ) {
    categories.architecture.push(item)
  }

  if (
    lower.includes("docker") ||
    lower.includes("kubernetes") ||
    lower.includes("devops") ||
    lower.includes("ci") ||
    lower.includes("git") ||
    lower.includes("terraform") ||
    lower.includes("linux") ||
    lower.includes("cloud")
  ) {
    categories.devops.push(item)
  }
}

// Write bundles
for (const [catName, list] of Object.entries(categories)) {
  const filePath = path.join(OUTPUT_DIR, `${catName}.json`)
  fs.writeFileSync(
    filePath,
    JSON.stringify(
      {
        category: catName,
        total: list.length,
        updatedAt: new Date().toISOString(),
        skills: list,
      },
      null,
      2
    ),
    "utf8"
  )
  console.log(`✓ Generated ${catName}.json (${list.length} skills)`)
}

console.log(">> Skills bundling complete! Files saved in public/data/skills/")

const fs = require('fs');
const path = require('path');

// Read existing mock.ts
const mockPath = path.join(__dirname, '..', 'src', 'data', 'mock.ts');
const existingCode = fs.readFileSync(mockPath, 'utf8');

// Load existing data
const { CATEGORIES, TAGS, TOOLS: existingTools, COLLECTIONS: existingCollections, AI_SKILLS: existingSkills } = require('../dist/lib/index.js');

console.log(`Starting with ${existingTools.length} tools, ${existingSkills.length} skills.`);

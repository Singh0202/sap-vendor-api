import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Configuration
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const REPO_ROOT = process.cwd();
const IGNORE_PATTERNS = [
  "node_modules",
  ".git",
  "dist",
  "build",
  ".env",
  ".env.local",
];

/**
 * Check if path should be ignored
 */
function shouldIgnore(filePath) {
  return IGNORE_PATTERNS.some((pattern) =>
    filePath.toLowerCase().includes(pattern.toLowerCase())
  );
}

/**
 * Recursively read all files from the repository
 */
function readRepoFiles(dir = REPO_ROOT, fileList = {}) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const relativePath = path.relative(REPO_ROOT, filePath);

    if (shouldIgnore(relativePath)) return;

    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      readRepoFiles(filePath, fileList);
    } else {
      try {
        const content = fs.readFileSync(filePath, "utf-8");
        fileList[relativePath] = content;
      } catch (err) {
        console.warn(`⚠️  Could not read file: ${relativePath}`);
      }
    }
  });

  return fileList;
}

/**
 * Format files for API request
 */
function formatFilesForPrompt(fileList) {
  let formattedContent = "# Repository Files\n\n";

  Object.entries(fileList).forEach(([filePath, content]) => {
    formattedContent += `## File: ${filePath}\n\`\`\`\n${content}\n\`\`\`\n\n`;
  });

  return formattedContent;
}

/**
 * Generate documentation using Google Gemini
 */
async function generateDocumentation(fileContent) {
  if (!GOOGLE_API_KEY) {
    throw new Error(
      "❌ GOOGLE_API_KEY environment variable is not set. Please set it before running this script."
    );
  }

  const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `You are an expert technical documentation writer. Analyze the following NestJS repository code and generate a comprehensive README.md file.

Include the following sections:
1. Project Overview - Brief description of what the project does
2. Prerequisites - What needs to be installed
3. Installation - Step-by-step setup instructions
4. Configuration - Environment variables and setup
5. Project Structure - Directory structure and file organization
6. API Endpoints - List all available routes with descriptions
7. Authentication - Explain the authentication mechanism
8. Database - Database configuration and entities
9. Running the Application - Start/development/production commands
10. Testing - How to run tests
11. Deployment - Deployment instructions if applicable
12. Contributing - Guidelines for contributors
13. License - License information

Make it professional, well-formatted, and suitable for GitHub. Use proper Markdown syntax.

Repository Code:
${fileContent}`;

  console.log("🚀 Sending request to Google Gemini API...");

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text;
}

/**
 * Main function
 */
async function main() {
  try {
    console.log("📂 Reading repository files...");
    const fileList = readRepoFiles();
    const fileCount = Object.keys(fileList).length;

    if (fileCount === 0) {
      console.warn("⚠️  No files found in repository!");
      return;
    }

    console.log(`✅ Found ${fileCount} files to process`);

    console.log("📝 Formatting files for API request...");
    const formattedContent = formatFilesForPrompt(fileList);

    console.log("🤖 Generating documentation with Google Gemini...");
    const documentation = await generateDocumentation(formattedContent);

    const readmePath = path.join(REPO_ROOT, "README.md");
    console.log(`💾 Writing documentation to ${readmePath}...`);
    fs.writeFileSync(readmePath, documentation, "utf-8");

    console.log("✅ README.md generated successfully!");
    console.log(
      `📄 Documentation saved to: ${readmePath}\n${fileCount} repository files were analyzed.`
    );
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

main();

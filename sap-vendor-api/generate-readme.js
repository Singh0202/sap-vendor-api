// generate-readme.js
import { execSync } from "child_process";
import fs from "fs";

try {
  console.log("🧠 Using Copilot CLI to generate README...");
  
  // Example: Ask Copilot to describe the project (you can adjust the prompt)
  const prompt = `
  Analyze this NestJS project and generate or update a README.md 
  summarizing the modules, controllers, and services.
  Keep the existing sections intact and update the API routes if found.
  `;

  // Call Copilot CLI
  const output = execSync(`echo "${prompt}" | github-copilot-cli suggest`, {
    encoding: "utf-8",
  });

  fs.writeFileSync("README.md", output);
  console.log("✅ README.md updated successfully!");
} catch (err) {
  console.error("❌ Failed to generate README:", err);
  process.exit(1);
}

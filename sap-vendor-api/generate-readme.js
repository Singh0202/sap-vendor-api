// generate-readme.js
import { execSync } from "child_process";
import fs from "fs";

try {
  console.log("🧠 Using GitHub Copilot to generate README...");

  const prompt = `
  Analyze this NestJS project and update or generate a README.md file.
  Include a project overview, setup instructions, and a list of controllers and modules.
  Keep the tone concise and developer-friendly.
  `;

  const output = execSync(`echo "${prompt}" | github-copilot-cli suggest`, {
    encoding: "utf-8",
  });

  fs.writeFileSync("README.md", output);
  console.log("✅ README.md generated/updated successfully!");
} catch (err) {
  console.error("❌ Failed to generate README:", err);
  process.exit(1);
}

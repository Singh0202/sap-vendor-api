#!/usr/bin/env node

/**
 * Git Hook Setup Script
 * Installs post-push git hooks for automatic README generation
 * Run with: node scripts/setup-git-hooks.js
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const REPO_ROOT = execSync("git rev-parse --show-toplevel", {
  encoding: "utf-8",
}).trim();

const GIT_HOOKS_DIR = path.join(REPO_ROOT, ".git", "hooks");
const POST_PUSH_HOOK_PATH = path.join(GIT_HOOKS_DIR, "post-push");

// Detect OS
const isWindows = process.platform === "win32";
const scriptName = isWindows ? "post-push-hook.bat" : "post-push-hook.sh";
const sourceScript = path.join(REPO_ROOT, "scripts", scriptName);

console.log("🔧 Setting up Git Hooks...\n");

try {
  // Check if git hooks directory exists
  if (!fs.existsSync(GIT_HOOKS_DIR)) {
    console.error(`❌ Git hooks directory not found: ${GIT_HOOKS_DIR}`);
    console.error("Make sure you're in a git repository.");
    process.exit(1);
  }

  // Check if source script exists
  if (!fs.existsSync(sourceScript)) {
    console.error(`❌ Source script not found: ${sourceScript}`);
    process.exit(1);
  }

  // Read the hook script content
  const hookContent = fs.readFileSync(sourceScript, "utf-8");

  // Write the post-push hook
  fs.writeFileSync(POST_PUSH_HOOK_PATH, hookContent, { mode: 0o755 });

  console.log(`✅ Git post-push hook installed at: ${POST_PUSH_HOOK_PATH}`);
  console.log("\n📋 What this hook does:");
  console.log("   - Runs after each push to remote");
  console.log("   - Generates/updates README.md using Google Gemini");
  console.log("   - Requires GOOGLE_API_KEY environment variable");
  console.log("   - Non-blocking if API key is not set\n");

  console.log("🚀 To enable the hook:");
  console.log("   1. Set your Google API Key:");

  if (isWindows) {
    console.log('      $env:GOOGLE_API_KEY = "your-api-key"');
  } else {
    console.log('      export GOOGLE_API_KEY="your-api-key"');
  }

  console.log("\n   2. Make your changes and push:");
  console.log("      git push");
  console.log("\n   3. The hook will automatically run and generate README.md\n");

  console.log("ℹ️  The hook will:");
  console.log("   ✓ Check for GOOGLE_API_KEY");
  console.log("   ✓ Install npm dependencies if needed");
  console.log("   ✓ Run generate-readme.js");
  console.log("   ✓ Display generation status\n");

  console.log("💡 To disable the hook temporarily:");
  console.log("   Set SKIP_HOOK=true before pushing");
  console.log("      $env:SKIP_HOOK = 'true'; git push");

  console.log("\n✨ Git hooks setup complete!");
} catch (error) {
  console.error("❌ Error setting up git hooks:", error.message);
  process.exit(1);
}

# 📋 Scripts Folder - Complete Usage Guide

## Overview

The `scripts/` folder contains **3 critical automation files** that work together to enable automated README generation on every git push.

---

## 🗂️ Scripts in the Folder

```
scripts/
├── setup-git-hooks.js          ← Installer (runs once)
├── post-push-hook.sh           ← macOS/Linux automation (auto-runs)
└── post-push-hook.bat          ← Windows automation (auto-runs)
```

---

## 📌 Script 1: `setup-git-hooks.js`

### Purpose
**One-time installer** that sets up git hooks for your local development machine.

### Type
- **Language**: Node.js (JavaScript)
- **Shebang**: `#!/usr/bin/env node` (can run directly)
- **Requires**: Node.js installed

### What It Does
1. Detects your operating system (Windows vs macOS/Linux)
2. Locates your git repository root
3. Finds the appropriate hook script (`post-push-hook.bat` or `post-push-hook.sh`)
4. Copies the hook script to `.git/hooks/post-push`
5. Sets executable permissions (Unix systems)
6. Displays setup instructions

### How to Use
```bash
# From repository root
npm run setup-hooks

# Or directly
node scripts/setup-git-hooks.js
```

### When to Use
- **First time setup**: After cloning the repository
- **Optional**: Only if you want local git hooks (GitHub Actions works without this)
- **One-time only**: Install once, then forget about it

### Key Code Flow
```javascript
// 1. Detect OS
const isWindows = process.platform === "win32";
const scriptName = isWindows ? "post-push-hook.bat" : "post-push-hook.sh";

// 2. Find hook file
const sourceScript = path.join(REPO_ROOT, "scripts", scriptName);

// 3. Copy to git hooks directory
const POST_PUSH_HOOK_PATH = path.join(GIT_HOOKS_DIR, ".git/hooks/post-push");
fs.writeFileSync(POST_PUSH_HOOK_PATH, hookContent, { mode: 0o755 });

// 4. Display instructions
console.log("✅ Git post-push hook installed");
```

### Output Example
```
🔧 Setting up Git Hooks...

✅ Git post-push hook installed at: /path/to/.git/hooks/post-push

📋 What this hook does:
   - Runs after each push to remote
   - Generates/updates README.md using Google Gemini
   - Requires GOOGLE_API_KEY environment variable
   - Non-blocking if API key is not set

🚀 To enable the hook:
   1. Set your Google API Key:
      $env:GOOGLE_API_KEY = "your-api-key"
   
   2. Make your changes and push:
      git push
   
   3. The hook will automatically run and generate README.md
```

---

## 📌 Script 2: `post-push-hook.sh`

### Purpose
**Automatic automation hook** for macOS and Linux systems that runs AFTER each `git push`.

### Type
- **Language**: Bash shell script
- **Platform**: macOS, Linux, WSL
- **Extension**: `.sh`

### What It Does (Auto-runs after `git push`)
1. Checks if `GOOGLE_API_KEY` environment variable is set
2. Navigates to repository root
3. Checks if `node_modules` exists; installs if missing
4. Runs `generate-readme.js` to generate documentation
5. Reports status (success/failure)
6. Shows whether `README.md` was updated

### Where It Lives
After `npm run setup-hooks`:
```
.git/hooks/post-push  ← Copied here (auto-executes)
```

### When It Runs
```
git commit → git push → [Upload to remote] → post-push hook triggers
```

### Trigger Sequence
```bash
# You run this:
git push

# Automatically:
→ Git uploads changes to remote
→ post-push hook fires automatically
→ Reads scripts/post-push-hook.sh
→ Runs: GOOGLE_API_KEY check
→ Runs: npm install (if needed)
→ Runs: node generate-readme.js
→ Updates: README.md locally
→ Shows: Status messages
```

### Key Features
```bash
# Feature 1: Safe operation (non-blocking)
if [ -z "$GOOGLE_API_KEY" ]; then
  echo "⚠️  GOOGLE_API_KEY not set. Skipping..."
  exit 0  # ← Doesn't break the push
fi

# Feature 2: Installs dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Feature 3: Runs the generator
node generate-readme.js

# Feature 4: Reports results
if [ $? -eq 0 ]; then
  echo "✅ Documentation generated successfully!"
else
  echo "❌ Documentation generation failed"
  exit 1
fi
```

### Example Execution
```bash
$ git push
[Your changes uploaded...]
🚀 Post-push hook triggered...
📂 Repository root: /home/user/sap-vendor-api
🤖 Generating documentation...
✅ Documentation generated successfully!
📝 README.md has been updated
💾 To commit changes, run: git add README.md && git commit -m 'docs: update README'
```

---

## 📌 Script 3: `post-push-hook.bat`

### Purpose
**Automatic automation hook** for Windows systems that runs AFTER each `git push`.

### Type
- **Language**: Batch script (Windows Command)
- **Platform**: Windows (PowerShell, CMD)
- **Extension**: `.bat`

### What It Does (Same as `.sh` but Windows syntax)
1. Checks if `GOOGLE_API_KEY` environment variable is set
2. Gets repository root using git command
3. Checks if `node_modules` exists; installs if missing
4. Runs `generate-readme.js` to generate documentation
5. Reports status and next steps

### Where It Lives
After `npm run setup-hooks`:
```
.git\hooks\post-push  ← Copied here (auto-executes)
```

### When It Runs
```
git commit → git push → [Upload to remote] → post-push hook triggers
```

### Key Features (Windows Batch)
```batch
REM Feature 1: Safe operation (non-blocking)
if "%GOOGLE_API_KEY%"=="" (
  echo ⚠️  GOOGLE_API_KEY not set. Skipping...
  exit /b 0  ← Doesn't break the push
)

REM Feature 2: Get repo root
for /f "delims=" %%i in ('git rev-parse --show-toplevel') do set REPO_ROOT=%%i

REM Feature 3: Install dependencies if needed
if not exist "node_modules" (
  echo 📦 Installing dependencies...
  call npm install
)

REM Feature 4: Run the generator
call node generate-readme.js

REM Feature 5: Check result
if errorlevel 1 (
  echo ❌ Documentation generation failed
  exit /b 1
)
```

### Example Execution (Windows)
```
PS C:\sap-vendor-api> git push

🚀 Post-push hook triggered...

📂 Repository root: C:\Users\Jay\sap-vendor-api
🤖 Generating documentation...
✅ Documentation generated successfully!

📝 README.md has been updated
💾 To commit changes, run: git add README.md && git commit -m "docs: update README"
```

---

## 🔄 Complete Usage Flow

### Scenario: You Make Code Changes and Push

```
Step 1: Make code changes
        ├─ git add .
        ├─ git commit -m "feature: add new endpoint"
        └─ git push
                ↓
Step 2: Git processes push
        ├─ Uploads to GitHub
        └─ Looks for: .git/hooks/post-push
                ↓
Step 3: Post-push hook runs (auto)
        ├─ Checks: Is GOOGLE_API_KEY set?
        ├─ Installs: npm dependencies (if needed)
        ├─ Runs: node generate-readme.js
        ├─ Calls: Google Gemini API
        ├─ Generates: README.md
        └─ Shows: Status messages
                ↓
Step 4: You see results
        ├─ Terminal shows: ✅ Documentation generated
        ├─ README.md created/updated locally
        └─ Message: To commit changes, run: git add README.md && git commit...
```

---

## 📊 Which Script to Use When

### First-Time Setup
```bash
npm run setup-hooks
# ↓ Uses: setup-git-hooks.js
# ↓ Installs: post-push hook
# ✅ One time only
```

### Every Time You Push (Automatic)
```bash
git push
# ↓ Automatically runs: post-push-hook.sh (macOS/Linux)
#   OR post-push-hook.bat (Windows)
# ✅ No manual action needed
```

### Disable Hook Temporarily
```bash
$env:SKIP_HOOK = 'true'; git push  # Windows
SKIP_HOOK=true git push              # macOS/Linux
```

---

## 🎯 Pre-requisites for Hooks to Work

```
✅ Git installed
✅ Node.js installed (v16+)
✅ npm installed
✅ GOOGLE_API_KEY environment variable set
✅ Generated .git/hooks/post-push file exists
✅ Internet connection (for Google Gemini API)
```

### Verify Setup
```bash
# Check if hook was installed
ls -la .git/hooks/post-push  # macOS/Linux
dir .git\hooks\post-push     # Windows

# Check if API key is set
echo $GOOGLE_API_KEY          # macOS/Linux
echo %GOOGLE_API_KEY%         # Windows CMD
$env:GOOGLE_API_KEY           # Windows PowerShell
```

---

## 🚀 Optional vs Required

### GitHub Actions (Recommended - Required for Automation)
```
Setup: Add GOOGLE_API_KEY to GitHub Secrets
Runs: Automatically on every push (cloud)
Requires: setup-git-hooks.js? NO
Uses: workflows/update-readme.yml
```

### Local Git Hooks (Optional - Better Feedback)
```
Setup: npm run setup-hooks
Runs: Automatically after local push
Requires: setup-git-hooks.js? YES
Uses: post-push-hook.sh or .bat
```

---

## 🔐 Security Considerations

### API Key Storage
```
✅ GitHub Actions: Stored in GitHub Secrets (encrypted)
✅ Local Hook: Environment variable (unencrypted in memory)
❌ Scripts: Never hardcoded in files
❌ Git: Never committed to repository
```

### Best Practice
```bash
# Set temporarily in current terminal session only
$env:GOOGLE_API_KEY = "your-key"  # Windows
export GOOGLE_API_KEY="your-key"  # macOS/Linux

# Not in system-wide environment
# Not in .bashrc or .zshrc (unless you know it's safe)
# Not in .env file tracked by git
```

---

## 📈 Script Dependencies

```
setup-git-hooks.js
    ├─ Requires: Node.js built-in modules
    │   ├─ fs (file system)
    │   ├─ path (path manipulation)
    │   └─ child_process (run git command)
    │
    └─ Uses: post-push-hook.sh or .bat
            (reads and copies to .git/hooks)

post-push-hook.sh / .bat
    ├─ Requires: Git installed
    ├─ Requires: Node.js installed
    ├─ Requires: npm installed
    └─ Calls: node generate-readme.js
            (runs documentation generator)
```

---

## 🐛 Troubleshooting

### Hook Won't Run
```bash
# Verify it exists
ls -la .git/hooks/post-push

# Verify it's executable
chmod +x .git/hooks/post-push  # macOS/Linux

# Re-install
npm run setup-hooks
```

### "GOOGLE_API_KEY not set"
```bash
# Set it in current terminal before pushing
export GOOGLE_API_KEY="your-key"  # macOS/Linux
$env:GOOGLE_API_KEY = "your-key"  # Windows PowerShell

# Verify it's set
echo $GOOGLE_API_KEY
```

### Hook runs but README not generated
```bash
# Manually test the generator
node generate-readme.js

# Check npm dependencies installed
npm install

# Verify API key validity
# Visit: https://aistudio.google.com/app/apikey
```

---

## 📝 Summary Table

| Script | Type | When | Runs | Platform | Required |
|--------|------|------|------|----------|----------|
| `setup-git-hooks.js` | Installer | Once at setup | Manually | All | No* |
| `post-push-hook.sh` | Automation | After every push | Auto | macOS/Linux | No* |
| `post-push-hook.bat` | Automation | After every push | Auto | Windows | No* |

*Not required if using GitHub Actions (recommended)

---

## 🎯 Quick Reference

### Setup
```bash
npm run setup-hooks
```

### Enable Local Hook
```bash
# Windows PowerShell
$env:GOOGLE_API_KEY = "your-key"

# macOS/Linux
export GOOGLE_API_KEY="your-key"
```

### Test
```bash
git push  # Hook runs automatically
```

### Disable Temporarily
```bash
$env:SKIP_HOOK = 'true'; git push
```

### Remove Hook
```bash
rm .git/hooks/post-push  # macOS/Linux
del .git\hooks\post-push # Windows
```

---

This is the complete ecosystem for local automation. Combined with GitHub Actions (workflows/update-readme.yml), you get both local and cloud-based documentation generation!

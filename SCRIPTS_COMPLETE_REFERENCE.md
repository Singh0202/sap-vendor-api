# 🎯 SCRIPTS FOLDER - COMPLETE REFERENCE

## Table of Contents
1. [Overview](#overview)
2. [Each Script Explained](#each-script)
3. [Where Scripts Are Used](#where-used)
4. [How They Work Together](#how-together)
5. [Setup vs Runtime](#setup-runtime)
6. [Platform Compatibility](#platform)
7. [Common Questions](#faq)

---

## Overview {#overview}

Your `scripts/` folder contains **3 automation files** that form a complete local documentation generation system:

```
scripts/
├── setup-git-hooks.js    ← Installer (runs once)
├── post-push-hook.sh     ← Auto-hook for macOS/Linux  
└── post-push-hook.bat    ← Auto-hook for Windows
```

**Purpose**: Automate README.md generation after every local `git push`

**Status**: Optional (GitHub Actions is the primary method)

---

## Each Script Explained {#each-script}

### 1. setup-git-hooks.js

**What is it?**
- Installer script written in Node.js
- Sets up local git automation
- Runs on YOUR machine (not automatically)

**What does it do?**
```
Execution: npm run setup-hooks
           ↓
1. Detects your operating system
   ├─ Windows? → Select post-push-hook.bat
   └─ macOS/Linux? → Select post-push-hook.sh
   
2. Validates environment
   ├─ Check .git folder exists
   ├─ Check scripts exist
   └─ Check permissions
   
3. Installs the hook
   ├─ Read source hook file
   ├─ Copy to .git/hooks/post-push
   ├─ Set execute permissions (Unix)
   └─ Ready for auto-execution
   
4. Display instructions
   └─ Shows setup complete message
```

**Where it runs?**
- On YOUR machine (you execute it)
- Requires: Node.js installed
- Location: `scripts/setup-git-hooks.js`

**When to use?**
- First time setup (optional)
- To install local git hooks
- Once per developer machine

**Command**
```bash
npm run setup-hooks
# or
node scripts/setup-git-hooks.js
```

**Expected output**
```
🔧 Setting up Git Hooks...

✅ Git post-push hook installed at: /path/to/.git/hooks/post-push

📋 What this hook does:
   - Runs after each push to remote
   - Generates/updates README.md using Google Gemini
   - Requires GOOGLE_API_KEY environment variable
   - Non-blocking if API key is not set
```

---

### 2. post-push-hook.sh

**What is it?**
- Git hook for macOS and Linux
- Auto-executes AFTER `git push`
- Written in Bash shell script

**What does it do?**
```
Trigger: git push (automatic after you push)
         ↓
1. Check environment
   └─ Is GOOGLE_API_KEY set?
      ├─ NO → Show warning, exit gracefully
      └─ YES → Continue
      
2. Setup
   ├─ Find repository root
   ├─ Change to repo directory
   └─ Check npm dependencies
      ├─ NO → npm install
      └─ YES → Continue
      
3. Generate documentation
   ├─ Run: node generate-readme.js
   ├─ Script reads all source files
   ├─ Calls Google Gemini API
   └─ Creates/updates README.md
   
4. Report results
   ├─ Success? → Show "✅ Generated"
   └─ Failure? → Show "❌ Failed"
```

**Where it runs?**
- Automatically by Git (you don't run it directly)
- On YOUR machine (after you push locally)
- Located at: `.git/hooks/post-push` (after setup)

**When does it run?**
```bash
You:  git push
      ↓
Git:  Uploads to remote
      ↓
Git:  Automatically executes .git/hooks/post-push
      ↓
Hook: post-push-hook.sh (on macOS/Linux)
      ↓
You:  See results in terminal
```

**Platform**
- macOS ✅
- Linux ✅
- WSL (Windows Subsystem for Linux) ✅
- Windows Command Prompt ❌
- Windows PowerShell ❌

**Example execution**
```bash
$ git push
🚀 Post-push hook triggered...
📂 Repository root: /home/user/sap-vendor-api
🤖 Generating documentation...
✅ Documentation generated successfully!
📝 README.md has been updated
```

---

### 3. post-push-hook.bat

**What is it?**
- Git hook for Windows
- Auto-executes AFTER `git push`
- Written in Windows Batch script

**What does it do?**
```
Trigger: git push (automatic after you push)
         ↓
1. Check environment
   └─ Is GOOGLE_API_KEY set?
      ├─ NO → Show warning, exit gracefully
      └─ YES → Continue
      
2. Setup
   ├─ Get repository root
   ├─ Change to repo directory
   └─ Check npm dependencies
      ├─ NO → npm install
      └─ YES → Continue
      
3. Generate documentation
   ├─ Run: node generate-readme.js
   ├─ Script reads all source files
   ├─ Calls Google Gemini API
   └─ Creates/updates README.md
   
4. Report results
   ├─ Success? → Show "✅ Generated"
   └─ Failure? → Show "❌ Failed"
```

**Where it runs?**
- Automatically by Git (you don't run it directly)
- On YOUR machine (after you push locally)
- Located at: `.git\hooks\post-push` (after setup)

**When does it run?**
```
You:  git push
      ↓
Git:  Uploads to remote
      ↓
Git:  Automatically executes .git\hooks\post-push
      ↓
Hook: post-push-hook.bat (on Windows)
      ↓
You:  See results in terminal
```

**Platform**
- Windows Command Prompt (cmd.exe) ✅
- Windows PowerShell ✅
- Git Bash ✅

**Example execution**
```
PS C:\sap-vendor-api> git push

🚀 Post-push hook triggered...

📂 Repository root: C:\Users\Jay\sap-vendor-api
🤖 Generating documentation...
✅ Documentation generated successfully!

📝 README.md has been updated
```

---

## Where Scripts Are Used {#where-used}

### Location Timeline

```
BEFORE SETUP:
scripts/
├── setup-git-hooks.js       ← Here
├── post-push-hook.sh        ← Here
└── post-push-hook.bat       ← Here

AFTER SETUP (npm run setup-hooks):
scripts/
├── setup-git-hooks.js       ← Original (unchanged)
├── post-push-hook.sh        ← Original (unchanged)
└── post-push-hook.bat       ← Original (unchanged)

.git/
└── hooks/
    └── post-push            ← Copied here (exact copy)
                             ← Auto-executes on push
```

### Git Hook Locations

**macOS/Linux**
```
.git/hooks/post-push         ← Bash script version
```

**Windows**
```
.git\hooks\post-push         ← Batch script version
```

---

## How They Work Together {#how-together}

### Complete Flow

```
┌─ FIRST TIME SETUP
│
├─ You decide: Do you want local hooks?
│  ├─ YES → Continue
│  └─ NO  → Skip to "Every Push"
│
├─ You run: npm run setup-hooks
│
├─ setup-git-hooks.js executes:
│  ├─ Detects your OS
│  ├─ Finds correct hook (sh or bat)
│  ├─ Copies to .git/hooks/post-push
│  └─ Sets permissions
│
├─ Script displays:
│  └─ "✅ Git post-push hook installed"
│
├─ You set: GOOGLE_API_KEY environment variable
│  └─ $env:GOOGLE_API_KEY = "your-key"
│
├─ You test: git push
│
└─ Result: README.md generated ✅


┌─ EVERY PUSH (Automatic)
│
├─ You run: git push
│
├─ Git processes:
│  ├─ Uploads your code
│  ├─ Looks for: .git/hooks/post-push
│  └─ Finds it (because setup installed it)
│
├─ Git automatically runs: post-push hook
│  ├─ Windows? → Runs post-push-hook.bat
│  └─ macOS/Linux? → Runs post-push-hook.sh
│
├─ Hook checks: GOOGLE_API_KEY
│  ├─ Set? → Continue
│  └─ Not set? → Show warning, exit gracefully
│
├─ Hook runs: node generate-readme.js
│  ├─ Reads all source files
│  ├─ Calls Google Gemini API
│  ├─ Generates documentation
│  └─ Updates README.md
│
├─ Hook displays: Results in terminal
│  ├─ Success message
│  └─ Next steps to commit
│
└─ Result: README.md generated locally ✅
```

---

## Setup vs Runtime {#setup-runtime}

### Setup Phase (One Time)

| Aspect | Detail |
|--------|--------|
| **What** | Install git hooks |
| **How** | `npm run setup-hooks` |
| **Script** | setup-git-hooks.js |
| **When** | Once per developer |
| **Duration** | ~1 minute |
| **Result** | `.git/hooks/post-push` created |

### Runtime Phase (Every Push)

| Aspect | Detail |
|--------|--------|
| **What** | Auto-generate README |
| **How** | `git push` (automatic) |
| **Script** | post-push-hook.sh or .bat |
| **When** | After every push |
| **Duration** | ~3-5 seconds |
| **Result** | README.md generated/updated |

---

## Platform Compatibility {#platform}

### Windows
```
✅ setup-git-hooks.js
   └─ Works (Node.js)

✅ post-push-hook.bat
   └─ Auto-runs on git push

❌ post-push-hook.sh
   └─ Won't run (shell syntax)
```

### macOS
```
✅ setup-git-hooks.js
   └─ Works (Node.js)

✅ post-push-hook.sh
   └─ Auto-runs on git push

❌ post-push-hook.bat
   └─ Won't run (batch syntax)
```

### Linux
```
✅ setup-git-hooks.js
   └─ Works (Node.js)

✅ post-push-hook.sh
   └─ Auto-runs on git push

❌ post-push-hook.bat
   └─ Won't run (batch syntax)
```

### Automatic Selection
```
setup-git-hooks.js automatically:
├─ Detects OS
└─ Copies the right hook file
   ├─ Windows → post-push-hook.bat
   └─ Other → post-push-hook.sh
```

---

## Common Questions {#faq}

### Q: Do I need these scripts?
**A:** No. GitHub Actions (workflows/update-readme.yml) is the main automation. These scripts are optional for local development.

### Q: When should I use them?
**A:** Use if you want instant feedback while developing locally:
- Immediate README generation after push
- Verify documentation before pushing to GitHub
- Local testing of documentation generation

### Q: How long does setup take?
**A:** ~1 minute:
- `npm run setup-hooks` → 30 seconds
- Set GOOGLE_API_KEY → 30 seconds
- Done!

### Q: Will the hook break my push?
**A:** No. The hook is non-blocking. If it fails:
- Your push still succeeds
- You see an error message
- README.md isn't updated

### Q: What if GOOGLE_API_KEY isn't set?
**A:** The hook gracefully skips:
- Shows warning message
- Doesn't generate README
- Push completes normally

### Q: Can I disable the hook temporarily?
**A:** Yes, set SKIP_HOOK before pushing:
```bash
$env:SKIP_HOOK = 'true'; git push    # Windows
SKIP_HOOK=true git push               # macOS/Linux
```

### Q: How do I remove the hook?
**A:** Delete the hook file:
```bash
rm .git/hooks/post-push               # macOS/Linux
del .git\hooks\post-push              # Windows
```

### Q: Where should I put my API key?
**A:** Environment variable (not in files):
```bash
# Windows PowerShell
$env:GOOGLE_API_KEY = "your-key"

# macOS/Linux
export GOOGLE_API_KEY="your-key"

# NOT in any files (won't be committed)
```

### Q: Why two versions (.sh and .bat)?
**A:** Different operating systems:
- `.sh` = Unix syntax (macOS, Linux)
- `.bat` = Windows syntax
- Setup automatically selects the right one

### Q: What does the hook call?
**A:** The hook calls `node generate-readme.js`:
- Reads all source files
- Calls Google Gemini API
- Generates documentation
- Creates/updates README.md

---

## Quick Reference

| File | Purpose | Runs | When |
|------|---------|------|------|
| `setup-git-hooks.js` | Installer | Manually | Once |
| `post-push-hook.sh` | Auto-hook (Unix) | Auto | After push |
| `post-push-hook.bat` | Auto-hook (Win) | Auto | After push |

---

## Summary

✅ **setup-git-hooks.js**: One-time installer  
✅ **post-push-hook.sh**: Auto-hook for macOS/Linux  
✅ **post-push-hook.bat**: Auto-hook for Windows  
✅ **Together**: Provide local automated documentation generation  
✅ **Optional**: Not required if using GitHub Actions  
✅ **Non-blocking**: Won't break your workflow if it fails  

**Result**: Every `git push` can optionally generate fresh README.md locally!

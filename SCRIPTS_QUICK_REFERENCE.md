# 📋 Scripts Quick Reference Card

## 3 Scripts, 3 Jobs

```
┌─────────────────────────────────────────────────────────────┐
│ SCRIPT 1: setup-git-hooks.js                               │
├─────────────────────────────────────────────────────────────┤
│ Purpose:    Install local git hooks (one-time setup)      │
│ Language:   Node.js / JavaScript                           │
│ Runs:       Manually by you                                │
│ When:       First time setup (optional)                    │
│ Command:    npm run setup-hooks                            │
│             or: node scripts/setup-git-hooks.js            │
│                                                             │
│ What it does:                                              │
│  1. Detects your OS (Windows vs macOS/Linux)              │
│  2. Finds the right hook file                              │
│  3. Copies to .git/hooks/post-push                         │
│  4. Makes it executable                                    │
│  5. Shows next steps                                       │
│                                                             │
│ Output: ✅ Git post-push hook installed                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SCRIPT 2: post-push-hook.sh (macOS/Linux)                 │
├─────────────────────────────────────────────────────────────┤
│ Purpose:    Auto-run after git push (local)               │
│ Language:   Bash shell script                              │
│ Runs:       Automatically by Git                           │
│ When:       After every local git push                     │
│ Location:   .git/hooks/post-push (after setup)             │
│ Trigger:    git push → hook runs                           │
│                                                             │
│ What it does:                                              │
│  1. Checks: Is GOOGLE_API_KEY set? (if not, skip)         │
│  2. Gets: Repository root directory                        │
│  3. Installs: npm packages (if needed)                     │
│  4. Runs: node generate-readme.js                          │
│  5. Shows: Status (success/failure)                        │
│                                                             │
│ Platform: macOS, Linux, WSL                                │
│ Output: [Status messages in terminal]                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SCRIPT 3: post-push-hook.bat (Windows)                    │
├─────────────────────────────────────────────────────────────┤
│ Purpose:    Auto-run after git push (local)               │
│ Language:   Windows Batch script                           │
│ Runs:       Automatically by Git                           │
│ When:       After every local git push                     │
│ Location:   .git\hooks\post-push (after setup)             │
│ Trigger:    git push → hook runs                           │
│                                                             │
│ What it does:                                              │
│  1. Checks: Is GOOGLE_API_KEY set? (if not, skip)         │
│  2. Gets: Repository root directory                        │
│  3. Installs: npm packages (if needed)                     │
│  4. Runs: node generate-readme.js                          │
│  5. Shows: Status (success/failure)                        │
│                                                             │
│ Platform: Windows (PowerShell, CMD)                        │
│ Output: [Status messages in terminal]                      │
└─────────────────────────────────────────────────────────────┘
```

---

## Setup vs Runtime

```
SETUP PHASE (One-Time)
========================

What: npm run setup-hooks
Why:  To install the local git hooks
How:
  1. Run: npm run setup-hooks
  2. Setup-git-hooks.js detects OS
  3. Copies correct hook file to .git/hooks/post-push
  4. Sets executable permissions
  5. Done ✅

When: Only once, at the beginning
Result: .git/hooks/post-push is now ready


RUNTIME PHASE (Every Push)
===========================

What: git push (as normal)
Why:  Git automatically triggers post-push hook
How:
  1. You run: git push
  2. Git uploads to remote
  3. Git automatically runs: .git/hooks/post-push
  4. Hook runs correct script (batch/bash)
  5. Script generates README.md
  6. Shows results in terminal
  7. Done ✅

When: Every time you push
Result: README.md is generated/updated
```

---

## Which Script Does What

```
SETUP-GIT-HOOKS.JS
├─ Inputs:  Operating system detection
├─ Process: File copy + permissions
└─ Output:  Installed hook at .git/hooks/post-push
            (Ready to be auto-executed)

POST-PUSH-HOOK.SH / .BAT
├─ Trigger: Automatic (by Git after push)
├─ Inputs:  GOOGLE_API_KEY environment variable
├─ Process: Checks, installs, runs generator
├─ Calls:   node generate-readme.js
└─ Output:  README.md generated/updated
            (Terminal status messages)

GENERATE-README.JS
├─ Trigger: Called by post-push hook
├─ Inputs:  All source files + Google API Key
├─ Process: Reads code, calls Gemini API
├─ Outputs: Professional README.md
└─ Called by: post-push-hook scripts
```

---

## Execution Timeline

```
TIMELINE OF EVENTS
===================

T=0 min   npm run setup-hooks
          ↓
          setup-git-hooks.js runs
          ├─ Detects OS
          ├─ Copies hook
          └─ Completes ✅
          
          [Developer works...]
          
T=X min   git push
          ↓
          Git processes push
          ├─ Uploads to remote
          └─ Completes ✅
          
T=X+2s   Post-push hook auto-triggers
          ├─ Detects OS (remembers from setup)
          ├─ Runs post-push-hook.sh (macOS/Linux)
          │  or post-push-hook.bat (Windows)
          └─ Hook now executing
          
T=X+3s   Hook running:
          ├─ Checks GOOGLE_API_KEY
          ├─ Installs npm packages
          └─ Calls generate-readme.js
          
T=X+5s   generate-readme.js:
          ├─ Reads source files
          ├─ Calls Gemini API
          └─ Waits for response
          
T=X+7s   README.md generated ✅
          ├─ Hook displays results
          └─ Completes
```

---

## Where Scripts Go

```
FOLDER STRUCTURE
================

Repository Root/
├── scripts/ ⭐ SCRIPTS LIVE HERE (BEFORE SETUP)
│   ├── setup-git-hooks.js       ← Installer
│   ├── post-push-hook.sh        ← Unix version
│   └── post-push-hook.bat       ← Windows version
│
└── .git/
    └── hooks/
        └── post-push            ⭐ COPIED HERE (AFTER SETUP)
            (exact copy of .sh or .bat)
            (auto-executed by Git)
```

---

## How to Use Each Script

### setup-git-hooks.js

```bash
# Step 1: Navigate to repo root
cd /path/to/sap-vendor-api

# Step 2: Run the setup
npm run setup-hooks

# Step 3: See output
# ✅ Git post-push hook installed at: /path/to/.git/hooks/post-push

# Step 4: Done ✅
# (Next: Set GOOGLE_API_KEY environment variable)
```

### post-push-hook.sh / .bat

```bash
# This runs automatically - you don't call it directly!

# Example: When you push code
git push

# AUTOMATICALLY:
# → Git looks for .git/hooks/post-push
# → Finds it (because you ran setup)
# → Runs it automatically
# → You see output in terminal
# → README.md is updated ✅
```

---

## Key Environment Variables

```
GOOGLE_API_KEY
├─ Where set: Environment (terminal)
├─ Why needed: To call Google Gemini API
├─ Where checked: post-push-hook.sh / .bat
├─ If not set: Hook gracefully skips (no error)
└─ Example: $env:GOOGLE_API_KEY = "abc123..."

SKIP_HOOK (Optional)
├─ Where set: Environment (before git push)
├─ Why needed: To skip hook for one push
├─ How: Set before pushing
├─ Example: $env:SKIP_HOOK = 'true'; git push
└─ Effect: Hook won't run this time only
```

---

## Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Hook not running | Run: `npm run setup-hooks` |
| "GOOGLE_API_KEY not set" | Set: `$env:GOOGLE_API_KEY = "key"` |
| README not updating | Check: API key valid at aistudio.google.com |
| Can't find scripts | Verify: In scripts/ folder |
| Permission denied (Unix) | Run: `chmod +x .git/hooks/post-push` |
| Batch file errors (Windows) | Re-run: `npm run setup-hooks` |

---

## Summary Table

| Aspect | setup-git-hooks.js | post-push-hook |
|--------|---|---|
| **Purpose** | Install hook | Auto-run hook |
| **Language** | Node.js | Bash / Batch |
| **Runs** | Manually once | Auto on push |
| **Platform** | All | Windows/Unix (auto-detected) |
| **Input** | OS detection | GOOGLE_API_KEY |
| **Output** | Hook installed | README.md generated |
| **File location** | scripts/ | .git/hooks/ |
| **Required** | Optional* | Optional* |

*Not required if using GitHub Actions

---

## One-Line Summary

```
SETUP:  npm run setup-hooks   → Installs local automation
USE:    git push              → Automatically generates README.md
```

---

## Next Steps

1. ✅ Understand: What each script does (you are here!)
2. ⏭️ Setup: Run `npm run setup-hooks`
3. ⏭️ Configure: Set `GOOGLE_API_KEY` environment variable
4. ⏭️ Test: Push code and watch automation work

**Estimated setup time: 5 minutes** ⏱️

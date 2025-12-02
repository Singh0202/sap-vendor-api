# 🔄 Scripts Execution Flow & Architecture

## Overview Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    SCRIPTS ECOSYSTEM                            │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                    FIRST-TIME SETUP                              │
│                                                                  │
│  You Run:  npm run setup-hooks                                  │
│                     ↓                                            │
│  Executes: setup-git-hooks.js                                   │
│            ├─ Detect OS (Windows vs macOS/Linux)               │
│            ├─ Find correct hook file                            │
│            ├─ Copy to .git/hooks/post-push                      │
│            ├─ Set execute permissions                           │
│            └─ Show instructions                                 │
│                     ↓                                            │
│  Result: .git/hooks/post-push installed ✅                      │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                  EVERY TIME YOU PUSH                             │
│                                                                  │
│  You Run: git push                                              │
│               ↓                                                  │
│  Git Processing:                                                │
│  ├─ Compress changes                                            │
│  ├─ Upload to GitHub                                           │
│  └─ Acknowledge remote push                                    │
│               ↓                                                  │
│  Git Hooks:                                                     │
│  └─ Looks in: .git/hooks/post-push                              │
│       ↓                                                          │
│  Selects Correct Script:                                        │
│  ├─ Windows? → Runs: post-push-hook.bat                        │
│  └─ Unix?    → Runs: post-push-hook.sh                         │
│       ↓                                                          │
│  Hook Execution:                                                │
│  ├─ Check: Is GOOGLE_API_KEY set?                              │
│  │   ├─ NO  → Show message, skip gracefully                   │
│  │   └─ YES → Continue                                        │
│  │       ↓                                                      │
│  │   ├─ Check: Is node_modules installed?                     │
│  │   │   ├─ NO  → Run: npm install                            │
│  │   │   └─ YES → Skip                                        │
│  │   │       ↓                                                 │
│  │   │   Execute: node generate-readme.js                     │
│  │   │       ├─ Reads all source files                        │
│  │   │       ├─ Calls Google Gemini API                       │
│  │   │       ├─ Generates documentation                       │
│  │   │       └─ Creates README.md                             │
│  │   │       ↓                                                 │
│  │   │   Show: Success/Failure message                        │
│  │   │   Show: README.md status                               │
│  │   └─ Return: Exit code 0 (success)                         │
│  │       or Exit code 1 (failure)                             │
│  └─ End: Hook completes                                        │
│                                                                  │
│  Result: README.md generated locally ✅                         │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Setup Phase (One-Time)

```javascript
// setup-git-hooks.js Execution

1. START
   ↓
2. Detect Operating System
   ├─ window.platform === "win32"?
   │  ├─ YES → scriptName = "post-push-hook.bat"
   │  └─ NO  → scriptName = "post-push-hook.sh"
   ↓
3. Validate Environment
   ├─ Git repo exists?
   ├─ .git/hooks directory exists?
   └─ Source script file exists?
   ↓
4. Read Source Script
   ├─ Read: scripts/post-push-hook.bat or .sh
   └─ Load into memory
   ↓
5. Install Hook
   ├─ Write to: .git/hooks/post-push
   └─ Set permissions: 0o755 (executable)
   ↓
6. Display Instructions
   ├─ Show: API key setup instructions
   ├─ Show: How to set environment variable
   └─ Show: Next steps
   ↓
7. EXIT Successfully ✅
```

---

## Automation Phase (Every Push)

### Windows Batch Flow

```batch
@echo off
REM post-push-hook.bat

1. Display: "🚀 Post-push hook triggered..."
   ↓
2. Check: GOOGLE_API_KEY environment variable
   ├─ NOT SET? 
   │  ├─ Show: "⚠️  GOOGLE_API_KEY not set"
   │  ├─ Show: "Set GOOGLE_API_KEY environment variable"
   │  └─ EXIT: 0 (graceful exit, don't break)
   │
   └─ IS SET? Continue...
       ↓
3. Get Repository Root
   ├─ Run: git rev-parse --show-toplevel
   └─ Store: REPO_ROOT variable
       ↓
4. Change Directory
   ├─ cd /d "%REPO_ROOT%"
   └─ Now in repository root
       ↓
5. Check Dependencies
   ├─ Does "node_modules" exist?
   │  ├─ NO  → Run: npm install
   │  └─ YES → Skip
       ↓
6. Generate Documentation
   ├─ Run: node generate-readme.js
   └─ Wait for completion
       ↓
7. Check Result
   ├─ Success?
   │  ├─ YES → Show: "✅ Documentation generated successfully!"
   │  │   ├─ Check: Was README.md modified?
   │  │   ├─ YES → Show: "📝 README.md has been updated"
   │  │   └─ Show: Instructions to commit
   │  │
   │  └─ NO  → Show: "❌ Documentation generation failed"
   │      └─ EXIT: 1 (error)
       ↓
8. EXIT: 0 (success)
```

### Unix/macOS Bash Flow

```bash
#!/bin/bash
# post-push-hook.sh

1. Display: "🚀 Post-push hook triggered..."
   ↓
2. Check: GOOGLE_API_KEY environment variable
   ├─ NOT SET? 
   │  ├─ Show: "⚠️  GOOGLE_API_KEY not set"
   │  ├─ Show: "Set GOOGLE_API_KEY environment variable"
   │  └─ exit 0 (graceful exit, don't break)
   │
   └─ IS SET? Continue...
       ↓
3. Get Repository Root
   ├─ Run: git rev-parse --show-toplevel
   └─ Store: REPO_ROOT variable
       ↓
4. Change Directory
   ├─ cd "$REPO_ROOT"
   └─ Now in repository root
       ↓
5. Check Dependencies
   ├─ Is "node_modules" directory present?
   │  ├─ NO  → Run: npm install
   │  └─ YES → Skip
       ↓
6. Generate Documentation
   ├─ Run: node generate-readme.js
   └─ Wait for completion
       ↓
7. Check Result ($? is exit code)
   ├─ [ $? -eq 0 ]? (Success)
   │  ├─ YES → Show: "✅ Documentation generated successfully!"
   │  │   ├─ Check: Has README.md changed?
   │  │   ├─ YES → Show: "📝 README.md has been updated"
   │  │   └─ Show: Instructions to commit
   │  │
   │  └─ NO  → Show: "❌ Documentation generation failed"
   │      └─ exit 1 (error)
       ↓
8. exit 0 (success)
```

---

## Complete Execution Timeline

```
TIME │  ACTION
─────┼──────────────────────────────────────────────────────
0s   │ User runs: npm run setup-hooks
     │
1s   │ → setup-git-hooks.js starts
     │ → Detects OS
     │ → Validates environment
     │ → Copies hook script
     │ → Sets permissions
2s   │ ✅ Hook installed
     │
     │ ─────────────────────────────────────────────────
     │ [TIME PASSES - Developer makes code changes]
     │ ─────────────────────────────────────────────────
     │
T+1h │ User runs: git commit -m "feature: X"
T+1h │         then: git push
     │
T+1h │ → Git processes push
T+1h │ → Uploads to GitHub
T+1h │ → GitHub acknowledges
T+1h │ → Git hook triggers
     │
T+1h │ → post-push hook starts
+2s  │ → Checks GOOGLE_API_KEY
     │ → Checks node_modules
     │ → Runs generate-readme.js
     │
T+1h │ → generate-readme.js:
+3s  │   ├─ Reads all source files
     │   ├─ Calls Google Gemini API
     │   ├─ Waits for response
     │
T+1h │ → Google Gemini processes
+5s  │ → Generates documentation
     │
T+1h │ → Hook completes
+6s  │ ✅ README.md generated/updated
     │
T+1h │ → Terminal shows results
+6s  │ "✅ Documentation generated successfully!"
     │
USER │ Can now commit and push README.md
```

---

## Error Handling Flow

```
┌─ GOOGLE_API_KEY Check
│
├─ NOT SET
│  ├─ Show: ⚠️  Warning message
│  └─ EXIT: 0 (Non-blocking)
│
└─ IS SET
   │
   ├─ npm install fails?
   │  ├─ Show: Error message
   │  └─ Continue anyway
   │
   ├─ generate-readme.js fails?
   │  ├─ Show: ❌ Failure message
   │  └─ EXIT: 1 (Error)
   │
   ├─ API call fails?
   │  ├─ Show: API error
   │  └─ EXIT: 1 (Error)
   │
   └─ Success
      ├─ Show: ✅ Success message
      └─ EXIT: 0 (Success)
```

---

## Script Communication Chain

```
┌────────────────────────────────────────────────────────┐
│     COMMUNICATION BETWEEN SCRIPTS                      │
└────────────────────────────────────────────────────────┘

setup-git-hooks.js
        │
        ├─ Reads: scripts/post-push-hook.sh or .bat
        │  (Gets the script content as string)
        │
        └─ Writes to: .git/hooks/post-push
                 │
                 ├─ Makes exact copy
                 └─ Adds execute permissions

.git/hooks/post-push (Auto-executed by Git)
        │
        ├─ [Windows] → Runs via Windows shell
        │  (batch interpreter)
        │
        ├─ [Unix] → Runs via bash
        │  (bash interpreter)
        │
        └─ Calls: node generate-readme.js
                 │
                 ├─ Reads: All .ts, .js, .json files
                 ├─ Reads: API key from environment
                 ├─ Calls: Google Gemini API
                 └─ Writes: README.md
```

---

## Platform Detection Logic

```javascript
// From setup-git-hooks.js

if (process.platform === "win32") {
  // Windows detected
  scriptName = "post-push-hook.bat"
  // Uses Windows batch syntax
  // Variables: %VAR%
  // Commands: @echo, call, set, if errorlevel
  
} else {
  // macOS or Linux detected
  scriptName = "post-push-hook.sh"
  // Uses bash/sh syntax
  // Variables: $VAR
  // Commands: echo, cd, if [ ], [ -z "", [ $? -eq
}
```

---

## Environment Variable Handling

```
┌─ Local Git Hook Flow
│
├─ Windows PowerShell:
│  ├─ SET: $env:GOOGLE_API_KEY = "key"
│  └─ ACCESSED IN: post-push-hook.bat → %GOOGLE_API_KEY%
│
├─ Windows CMD:
│  ├─ SET: set GOOGLE_API_KEY=key
│  └─ ACCESSED IN: post-push-hook.bat → %GOOGLE_API_KEY%
│
├─ macOS/Linux:
│  ├─ SET: export GOOGLE_API_KEY="key"
│  └─ ACCESSED IN: post-push-hook.sh → $GOOGLE_API_KEY
│
└─ GitHub Actions:
   ├─ SET: GitHub Secrets interface
   ├─ STORED: Encrypted in GitHub
   └─ USED IN: workflows/update-readme.yml
```

---

## Dependency Chain

```
generate-readme.js
    ↓ requires
node generate-readme.js
    ↓ needs
@google/generative-ai (npm package)
    ↓ uses
Google Gemini API
    ↓ returns
Generated documentation
    ↓ creates
README.md

post-push-hook (bash/batch)
    ↓ executes
node generate-readme.js
    ↓ uses
Environment variables
    ↓ reads
GOOGLE_API_KEY
    ↓ status codes
exit 0 (success) or exit 1 (failure)

setup-git-hooks.js
    ↓ copies
post-push-hook.sh or .bat
    ↓ to
.git/hooks/post-push
    ↓ makes
executable and ready
```

---

## Summary

| Phase | Script | Runs | Frequency | Manual | Auto |
|-------|--------|------|-----------|--------|------|
| Setup | setup-git-hooks.js | Once | Once per dev | ✅ | - |
| Execute | post-push-hook.sh or .bat | After push | Every push | - | ✅ |
| Generate | generate-readme.js | In hook | Every push | - | ✅ |

**Total Setup**: ~5 minutes  
**Ongoing**: Fully automatic, zero maintenance

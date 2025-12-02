# 🔧 Troubleshooting Flowchart

## Problem: GitHub Actions Workflow Not Running

```
Does workflow appear in Actions tab?
│
├─ NO → Is your repo public?
│       ├─ YES → Check branch protection rules
│       └─ NO → GitHub Actions might be disabled
│               Go to: Settings → Actions → Runners
│
└─ YES → Did workflow run?
         ├─ NO → Check workflow file exists
         │       at: .github/workflows/update-readme.yml
         │       
         └─ YES → Did it fail?
                  ├─ YES → See "Workflow Failure" section
                  └─ NO → README.md should be updated
```

---

## Problem: Workflow Fails with API Error

```
Error: "GOOGLE_API_KEY is not set"
│
└─ Solution:
   1. Go to: GitHub Settings → Secrets and variables → Actions
   2. Verify GOOGLE_API_KEY exists
   3. Check name is EXACTLY: GOOGLE_API_KEY
   4. Try: Delete and re-add the secret
   5. Make a new push to test

Error: "Invalid API key"
│
└─ Solution:
   1. Visit: https://aistudio.google.com/app/apikey
   2. Verify your key is listed as ACTIVE
   3. Copy the FULL key (no extra spaces)
   4. Update GitHub Secret with new key
   5. Make a new push to test

Error: "API quota exceeded"
│
└─ Solution:
   1. Check: Google Cloud Console → API quota
   2. Wait for quota reset (usually hourly)
   3. Or upgrade your Google Cloud plan
   4. Try again after quota resets
```

---

## Problem: README.md Not Updating

```
Step 1: Check workflow logs
└─ GitHub repo → Actions tab → Click workflow → See details
   ├─ Look for error messages
   ├─ Check if it says "No changes to commit"
   └─ Note error details for next step

Step 2: Fix based on error
├─ If API error → See "Workflow Fails" above
├─ If permission error → Workflow needs write access
├─ If file error → Source files might have issues
└─ If unclear → Read full log line by line

Step 3: Test again
└─ Make a small change
    ├─ git add .
    ├─ git commit -m "test"
    └─ git push
    
Step 4: Verify
└─ GitHub → Actions → Latest workflow
   └─ Check if README.md updated
```

---

## Problem: Local Git Hook Not Working

```
Did you run npm run setup-hooks?
│
├─ NO → Run: npm run setup-hooks
│       └─ Should see: ✅ Git post-push hook installed
│
└─ YES → Is GOOGLE_API_KEY set?
         │
         ├─ NO → Set environment variable:
         │       $env:GOOGLE_API_KEY = "your-key"  (Windows)
         │       export GOOGLE_API_KEY="your-key"  (macOS/Linux)
         │
         └─ YES → Does .git/hooks/post-push exist?
                  │
                  ├─ NO → Reinstall: npm run setup-hooks
                  │
                  └─ YES → Push and check terminal output
                          ├─ See hook messages?
                          │  ├─ NO → Check terminal logs
                          │  └─ YES → Check README.md updated
                          │
                          └─ Still not working?
                             └─ See "Advanced Troubleshooting"
```

---

## Problem: "GOOGLE_API_KEY not found" (Local Hook)

```
Step 1: Verify you set it correctly
└─ Check command used:
   ├─ Windows PowerShell: $env:GOOGLE_API_KEY
   ├─ Windows CMD: set GOOGLE_API_KEY
   └─ macOS/Linux: export GOOGLE_API_KEY

Step 2: Verify it was set
└─ Check if set:
   ├─ Windows PowerShell: echo $env:GOOGLE_API_KEY
   ├─ Windows CMD: echo %GOOGLE_API_KEY%
   └─ macOS/Linux: echo $GOOGLE_API_KEY
   
   Should show your API key, not blank

Step 3: Set it again if needed
└─ Use correct format:
   ├─ $env:GOOGLE_API_KEY = "sk-..."  (Windows PowerShell)
   └─ export GOOGLE_API_KEY="sk-..."  (macOS/Linux)

Step 4: Make sure to push in same terminal window
└─ Set variable in Terminal A
   Then push in same Terminal A
   (Environment variables don't transfer between windows)
```

---

## Problem: "node command not found"

```
Step 1: Verify Node.js is installed
└─ Run: node --version
   ├─ Shows version? → Problem is path-related
   └─ Command not found? → Node.js not installed

Step 2: If not installed
└─ Download from: https://nodejs.org/
   ├─ Install LTS version
   └─ Restart terminal after install

Step 3: Verify npm works
└─ Run: npm --version
   ├─ Shows version? → Good!
   └─ Not found? → Node.js install failed

Step 4: Try again
└─ npm run setup-hooks
```

---

## Problem: Permission Denied (Git Hook)

```
On macOS/Linux:

Error: "permission denied: ./.git/hooks/post-push"

Step 1: Make it executable
└─ Run: chmod +x .git/hooks/post-push

Step 2: Verify permissions
└─ Run: ls -la .git/hooks/post-push
   └─ Should show: -rwxr-xr-x (executable)

Step 3: Try again
└─ git push

---

On Windows:

This error is rare on Windows. If it happens:

Step 1: Reinstall hook
└─ Run: npm run setup-hooks

Step 2: Verify file exists
└─ Check: .git/hooks/post-push

Step 3: Try again
└─ git push
```

---

## Problem: Infinite Push Loop

```
Symptoms:
├─ Workflow runs
├─ Commits and pushes README.md
├─ Triggers workflow again
└─ Loop keeps going...

Solution:

Step 1: Disable auto-push in workflow
└─ Edit: workflows/update-readme.yml
   └─ Comment out: git push section
   └─ Or add: [skip ci] to commit message

Step 2: Stop current workflows
└─ GitHub Actions → Cancel running workflows

Step 3: Fix the issue
└─ Either:
   ├─ Don't auto-commit
   ├─ Use [skip ci] tag
   └─ Only run on certain branches

Step 4: Push fix
└─ git push
```

---

## Problem: Memory/Timeout Issues

```
Error: "Process timed out"
or "Out of memory"

Step 1: For GitHub Actions (cloud)
└─ Usually temporary
   └─ Run workflow again (retry button)

Step 2: For Local Hook
└─ Repository might be very large
   └─ Solution options:
      ├─ Add more ignore patterns (modify generate-readme.js)
      ├─ Run on smaller subset of files
      └─ Or use GitHub Actions (more resources)

Step 3: Check repository size
└─ Run: du -sh .  (macOS/Linux)
   or: (Get-ChildItem . -Recurse | Measure-Object -Sum).Sum  (Windows)
   
Step 4: If very large (>1GB)
└─ May need to:
   ├─ Add ignore patterns
   ├─ Clean git history (git gc)
   └─ Or use GitHub Actions (has more resources)
```

---

## Problem: "npm install" Fails

```
Error: "node_modules not found" during hook

Solution:

Step 1: Check Node/npm installed correctly
└─ node --version
└─ npm --version

Step 2: Clear npm cache
└─ npm cache clean --force

Step 3: Reinstall dependencies
└─ npm install

Step 4: Verify modules exist
└─ ls node_modules (macOS/Linux)
   or: dir node_modules (Windows)

Step 5: Try hook again
└─ git push
```

---

## Problem: "Cannot find module @google/generative-ai"

```
Error during script execution

Solution:

Step 1: Install the package
└─ npm install @google/generative-ai

Step 2: Verify installation
└─ npm list @google/generative-ai
   └─ Should show version number

Step 3: Clear cache and reinstall
└─ npm cache clean --force
└─ npm install

Step 4: Try again
└─ npm run generate-readme
```

---

## Problem: "Cannot read property 'text' of undefined"

```
Error from Google Gemini API

Solution:

Step 1: Check API key validity
└─ Visit: https://aistudio.google.com/app/apikey
   └─ Verify key is active

Step 2: Check API quotas
└─ Google Cloud Console
   └─ Check if quota exceeded

Step 3: Wait and retry
└─ API might be temporarily down
   └─ Try again in 5 minutes

Step 4: Check network
└─ Ensure internet connection is stable
└─ Try with different network

Step 5: If still failing
└─ Check Google Gemini status page
   └─ File issue on GitHub
```

---

## Advanced Troubleshooting

### Enable Debug Mode

**GitHub Actions:**
```yaml
# In workflows/update-readme.yml, add:
env:
  DEBUG: 'true'
  
# This will show more detailed logs
```

**Local Hook:**
```bash
# In scripts/post-push-hook.bat, add:
echo [DEBUG] Variable values
echo GOOGLE_API_KEY=%GOOGLE_API_KEY%
```

### Check File Permissions

```bash
# macOS/Linux
ls -la generate-readme.js
ls -la scripts/post-push-hook.sh
ls -la .git/hooks/post-push

# Windows PowerShell
Get-Item scripts/post-push-hook.bat | Select-Object Mode
```

### Validate Script Manually

```bash
# Test generate-readme.js manually
node generate-readme.js

# If it works manually, issue is with automation trigger
# If it fails, issue is with script itself
```

### Check Environment Variables

```bash
# Windows PowerShell
Get-ChildItem env: | grep GOOGLE_API_KEY

# macOS/Linux
env | grep GOOGLE_API_KEY
```

---

## When All Else Fails

1. **Read the error message carefully**
   - Google: The exact error text
   - Check solutions above

2. **Review relevant documentation**
   - `AUTOMATION_SETUP.md` - Full troubleshooting
   - `GITHUB_SECRETS_SETUP.md` - Secret setup
   - `SETUP_GUIDE.md` - General setup

3. **Check GitHub/Google status**
   - GitHub Status: https://www.githubstatus.com/
   - Google Cloud: https://status.cloud.google.com/

4. **Start from scratch**
   - Delete hook: `rm .git/hooks/post-push`
   - Remove secret from GitHub
   - Delete local env variable
   - Follow setup guides again from beginning

5. **Seek help**
   - Create GitHub issue
   - Check GitHub Discussions
   - Ask on Stack Overflow

---

## Common Error Messages Reference

| Error Message | Likely Cause | Solution |
|---|---|---|
| "GOOGLE_API_KEY not set" | Missing env variable | Set environment variable |
| "API key invalid" | Wrong/expired key | Update key in GitHub Secrets |
| "API quota exceeded" | Too many requests | Wait or upgrade quota |
| "Cannot find module" | npm dependency missing | npm install |
| "Permission denied" | File permissions | chmod +x on macOS/Linux |
| "Process timeout" | Large repository | Use GitHub Actions |
| "Cannot read property 'text'" | API error | Check key/quota/network |
| "hook not found" | Setup not run | npm run setup-hooks |

---

## Quick Reference Commands

```bash
# Setup
npm install
npm run setup-hooks
npm run generate-readme

# Environment (Windows PowerShell)
$env:GOOGLE_API_KEY = "your-key"
echo $env:GOOGLE_API_KEY

# Environment (macOS/Linux)
export GOOGLE_API_KEY="your-key"
echo $GOOGLE_API_KEY

# Git
git push
git log --oneline README.md

# Verify
node --version
npm --version
cat .git/hooks/post-push
```

---

## Still Need Help?

**See these documentation files:**
1. `README_INDEX.md` - Overview and guide selection
2. `AUTOMATION_SETUP.md` - Full detailed guide
3. `GITHUB_SECRETS_SETUP.md` - GitHub specific
4. `QUICK_START.md` - Quick reference

---

*This troubleshooting guide covers 90% of common issues. If your problem isn't listed, check the detailed documentation or the project's GitHub issues.*

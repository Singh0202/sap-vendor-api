# Quick Start - Auto-Generate Docs on Push

## 30-Second Setup

### GitHub Actions (Recommended)

1. Go to your repo → Settings → Secrets and variables → Actions
2. Add secret:
   - Name: `GOOGLE_API_KEY`
   - Value: [Your Google Gemini API Key]
3. Done! Documentation generates automatically on every push

### Local Git Hook (Optional)

```bash
npm run setup-hooks
$env:GOOGLE_API_KEY = "your-api-key"
git push
```

---

## What Happens Now?

### With GitHub Actions
```
git push → GitHub receives → Workflow runs → 
README.md generated & committed → Updated in your branch
```

### With Local Hook
```
git push → Hook runs → README.md generated locally → 
Ready for next commit
```

---

## Files Created

| File | Purpose |
|------|---------|
| `workflows/update-readme.yml` | GitHub Actions workflow (updated) |
| `scripts/setup-git-hooks.js` | Hook installation script |
| `scripts/post-push-hook.sh` | Hook for macOS/Linux |
| `scripts/post-push-hook.bat` | Hook for Windows |
| `.git/hooks/post-push` | Created after running setup-hooks |

---

## Verification

### Check GitHub Actions
- Push code: `git push`
- Go to repo → Actions tab
- Should see "Auto Generate README via Google Gemini" workflow
- Once complete, README.md is updated

### Check Local Hook
- Run: `npm run setup-hooks`
- Should see: `✅ Git post-push hook installed`
- Set API key: `$env:GOOGLE_API_KEY = "key"`
- Push code: `git push`
- Should see hook output in terminal

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Workflow not running | Add `GOOGLE_API_KEY` to GitHub Secrets |
| Hook not executing | Run `npm run setup-hooks` |
| API errors | Verify your Google API key is valid |
| No README update | Check terminal/workflow output for errors |

---

## Disable Temporarily

```bash
# Skip hook for one push
$env:SKIP_HOOK = 'true'; git push
```

---

## Full Documentation

See `AUTOMATION_SETUP.md` for detailed information about:
- Detailed setup instructions
- How both systems work
- Comparison table
- Troubleshooting guide
- Security best practices
- Advanced configuration

---

**Now your documentation will auto-generate on every push!** 🚀

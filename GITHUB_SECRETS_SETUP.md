# GitHub Secrets Setup - Complete Instructions

## What is a GitHub Secret?

A GitHub Secret is a secure way to store sensitive information (like API keys) in your repository settings. The secret is encrypted and only used during GitHub Actions workflows.

## Step-by-Step Setup

### Step 1: Navigate to Repository Secrets

1. Go to your GitHub repository: `https://github.com/Singh0202/sap-vendor-api`
2. Click the **Settings** tab (top right area)
3. In the left sidebar, click **Secrets and variables** → **Actions**

You'll see a page titled "Actions secrets and variables"

### Step 2: Create New Secret

1. Click the green **"New repository secret"** button
2. A form appears with two fields

### Step 3: Enter Secret Information

**Name field:**
```
GOOGLE_API_KEY
```
(Exactly as shown - this is the name the workflow uses)

**Value field:**
```
[Your Google Gemini API Key]
```
(Paste your actual API key from Google AI Studio)

### Step 4: Save the Secret

1. Click **"Add secret"** button
2. You'll see `GOOGLE_API_KEY` appear in the list with a green checkmark

✅ **Secret is now saved!**

---

## Verify Setup

1. You should see in the "Repository secrets" list:
   - `GOOGLE_API_KEY` with a timestamp showing when it was created

2. Click the **Actions** tab to verify the workflow file exists:
   - You should see `update-readme.yml` listed

---

## Security Notes

- The secret value is **not shown** after creation (for security)
- You can update it anytime by clicking the pencil icon
- You can delete it by clicking the delete icon
- Only GitHub Actions workflows can access this secret

---

## Test the Setup

After adding the secret:

1. Make a small change to your repository
   ```bash
   echo "# Test" >> test.txt
   git add test.txt
   git commit -m "test: verify automation"
   git push
   ```

2. Go to the **Actions** tab on GitHub

3. You should see the workflow **"Auto Generate README via Google Gemini"** running

4. Click on it to see the execution logs

5. Once complete, you should see:
   - ✅ All workflow steps passed
   - 📄 README.md was committed

---

## If Something Goes Wrong

### "Workflow doesn't appear"

1. Make sure you pushed to a branch (not just locally)
2. Check the **Actions** tab - it should show recent workflows
3. If no workflow, verify the YAML file exists in `.github/workflows/`

### "Workflow fails with API error"

1. Check your Google API key is valid:
   - Go to https://aistudio.google.com/app/apikey
   - Your key should be listed as "Active"

2. Verify secret was added correctly:
   - Go to Settings → Secrets and variables → Actions
   - `GOOGLE_API_KEY` should be listed

3. Check API usage:
   - Go to Google Cloud Console
   - Check if you've exceeded quota limits

### "README.md doesn't update"

1. Check the workflow logs:
   - Actions tab → Recent workflow run → Click to expand
   - Look for error messages in the logs

2. Verify the workflow can write to your repo:
   - The workflow needs "write" permissions
   - This is already set in the YAML file

---

## Advanced: Multiple API Keys

If you need different API keys for different branches:

1. Create multiple secrets:
   - `GOOGLE_API_KEY` (main branch)
   - `GOOGLE_API_KEY_DEV` (develop branch)
   - `GOOGLE_API_KEY_STAGING` (staging branch)

2. Update the workflow YAML to use conditional logic

---

## Update or Rotate Secret

To update your API key:

1. Go to Settings → Secrets and variables → Actions
2. Find `GOOGLE_API_KEY`
3. Click the **pencil (edit) icon**
4. Paste the new API key value
5. Click **"Update secret"**

⚠️ **The next workflow run will use the new key**

---

## Delete Secret

To remove a secret:

1. Go to Settings → Secrets and variables → Actions
2. Find `GOOGLE_API_KEY`
3. Click the **trash (delete) icon**
4. Confirm deletion

⚠️ **After deletion, workflows won't run (no API key)**

---

## Workflow Execution

### How it works:

1. You push code: `git push`
2. GitHub detects the push
3. GitHub Actions looks for workflows in `.github/workflows/`
4. Found: `update-readme.yml`
5. Workflow starts running
6. Workflow retrieves `GOOGLE_API_KEY` secret from GitHub
7. Workflow sets it as `GOOGLE_API_KEY` environment variable
8. `generate-readme.js` script runs with access to the key
9. Gemini API generates documentation
10. README.md is updated
11. Workflow commits changes and pushes

---

## Environment Variable Access

In your workflow (YAML):

```yaml
env:
  GOOGLE_API_KEY: ${{ secrets.GOOGLE_API_KEY }}
run: node generate-readme.js
```

In your script (Node.js):

```javascript
const apiKey = process.env.GOOGLE_API_KEY;
```

---

## Visibility & Access

### Who can see secrets:

- ✅ Workflow can access during execution
- ✅ Repository administrators
- ✅ You (the owner)
- ❌ Collaborators cannot see the value
- ❌ Not visible in logs or output

### Who can access secrets:

- ✅ GitHub Actions workflows only
- ✅ In public and private repositories
- ✅ On all branches (if workflow triggers)

---

## Best Practices

1. **Rotate regularly** - Change API keys periodically
2. **Scope to specific workflows** - Only give access where needed
3. **Use different keys** - Separate keys for dev/staging/prod
4. **Monitor usage** - Check API quota in Google Cloud
5. **Document rotation** - Keep track of when keys were rotated

---

## Troubleshooting Checklist

- [ ] Secret name is exactly `GOOGLE_API_KEY`
- [ ] Secret value is your valid Google Gemini API key
- [ ] Secret is added to the correct repository
- [ ] Workflow YAML uses `${{ secrets.GOOGLE_API_KEY }}`
- [ ] You pushed code to GitHub (not just locally)
- [ ] Actions tab shows the workflow running
- [ ] Google API key is active (not revoked/expired)

---

## Need Help?

- **GitHub Docs**: https://docs.github.com/en/actions/security-guides/encrypted-secrets
- **Google AI**: https://ai.google.dev/
- **Repository Issues**: Create an issue in the GitHub repo

---

**Once set up, GitHub will automatically generate documentation on every push!** 🚀

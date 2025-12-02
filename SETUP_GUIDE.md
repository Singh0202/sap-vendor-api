# Setup Guide for Documentation Generation Script

This guide explains how to use the `generate-readme.js` script to automatically generate comprehensive documentation for your NestJS project using Google Gemini AI.

## Prerequisites

1. **Node.js** - Version 16 or higher
2. **Google Cloud Account** - With Gemini API access
3. **Google API Key** - For Gemini API authentication

## Step 1: Get Google Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the generated API key
4. Keep it safe - you'll need it in the next step

## Step 2: Install Dependencies

Navigate to the project root directory and install required packages:

```bash
cd sap-vendor-api
npm install
```

Or if you're running the script from the root:

```bash
npm install @google/generative-ai
```

## Step 3: Set Environment Variable

Before running the script, set your Google API key as an environment variable.

### On Windows (PowerShell):

```powershell
$env:GOOGLE_API_KEY = "your-api-key-here"
```

### On Windows (Command Prompt):

```cmd
set GOOGLE_API_KEY=your-api-key-here
```

### On macOS/Linux:

```bash
export GOOGLE_API_KEY="your-api-key-here"
```

## Step 4: Run the Script

From the project root directory, run:

```bash
npm run generate-readme
```

Or directly with Node:

```bash
node generate-readme.js
```

## Step 5: Setup Automatic Generation on Push (Optional)

To automatically generate documentation whenever you push to GitHub, set up the git hooks:

### Windows (PowerShell):

```powershell
# First, set your API key
$env:GOOGLE_API_KEY = "your-api-key-here"

# Install the git hook
npm run setup-hooks

# Now every push will trigger documentation generation
git push
```

### macOS/Linux:

```bash
# First, set your API key
export GOOGLE_API_KEY="your-api-key-here"

# Install the git hook
npm run setup-hooks

# Now every push will trigger documentation generation
git push
```

**What happens automatically:**
- After each `git push`, the post-push hook runs
- It calls the documentation generation script
- README.md is generated/updated with your latest code
- Changes are ready to be committed and pushed again

## What the Script Does

1. **Scans Repository** - Reads all source files in your git repository
2. **Filters Content** - Excludes node_modules, .git, dist, and other unnecessary directories
3. **Formats Files** - Organizes file contents for API processing
4. **Calls Gemini API** - Sends code to Google Gemini with detailed documentation prompt
5. **Generates README** - Creates a comprehensive README.md file with:
   - Project Overview
   - Prerequisites
   - Installation Instructions
   - Configuration Guide
   - Project Structure
   - API Endpoints Documentation
   - Authentication Details
   - Database Information
   - Running Instructions
   - Testing Guide
   - Deployment Info
   - Contributing Guidelines
   - License Information

## Output

The script generates a `README.md` file in your project root with professional, GitHub-ready documentation.

## Troubleshooting

### Error: "GOOGLE_API_KEY environment variable is not set"

**Solution:** Make sure you've set the environment variable before running the script. See Step 3 above.

### Error: "API request failed"

**Possible causes:**
- Invalid API key
- API quota exceeded
- Network connectivity issues

**Solution:**
- Verify your API key at [Google AI Studio](https://aistudio.google.com/app/apikey)
- Check your API usage and quota
- Ensure you have internet connectivity

### Script processes but creates empty README

**Possible causes:**
- No source files found
- File reading permissions issue

**Solution:**
- Run the script from the correct directory
- Check file permissions
- Ensure the repository structure is intact

## Advanced Usage

### Custom Ignore Patterns

To add more directories to ignore, edit the `IGNORE_PATTERNS` array in `generate-readme.js`:

```javascript
const IGNORE_PATTERNS = [
  "node_modules",
  ".git",
  "dist",
  "build",
  ".env",
  ".env.local",
  // Add more patterns here
];
```

### Manual Configuration

You can also create a `.env` file in your project root:

```
GOOGLE_API_KEY=your-api-key-here
```

Then load it with dotenv:

```bash
npm install dotenv
```

And modify the script to load it automatically.

## Best Practices

1. **Keep API Key Secure** - Never commit your API key to version control
2. **Use .env Files** - Store sensitive data in .env (add to .gitignore)
3. **GitHub Secrets** - Add GOOGLE_API_KEY to GitHub repository secrets for CI/CD:
   - Go to your GitHub repo → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `GOOGLE_API_KEY`
   - Value: Your Google Gemini API key
   - Save the secret
4. **Regular Updates** - Run the script periodically as your project evolves
5. **Review Output** - Always review the generated README for accuracy
6. **Customize if Needed** - Edit the README to add project-specific information

## Automation Setup

### GitHub Actions (CI/CD)

The workflow file at `workflows/update-readme.yml` automatically:
- Triggers on every push to any branch
- Runs the documentation generator on GitHub's servers
- Commits and pushes the generated README.md back to your repository

**Requirements:**
1. Add `GOOGLE_API_KEY` as a GitHub repository secret (see step 3 above)
2. No additional setup needed - the workflow runs automatically

### Local Git Hooks

For local development, install the post-push hook:

```bash
npm run setup-hooks
```

This creates a local hook that:
- Runs after each `git push`
- Generates documentation on your machine
- Requires `GOOGLE_API_KEY` environment variable
- Non-blocking if API key is not set

**To disable temporarily:**
```powershell
$env:SKIP_HOOK = 'true'; git push
```

## Support

For issues with:
- **Google Gemini API** - Visit [Google AI Help](https://support.google.com/cloud)
- **Script Issues** - Check the error messages and troubleshooting section above
- **NestJS Documentation** - See [NestJS Docs](https://docs.nestjs.com)

---

Generated README.md will be created in your project root on successful script execution.

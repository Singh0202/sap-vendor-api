#!/bin/bash

# Git Post-Push Hook for README Generation
# This script runs automatically after pushing to remote
# Copy this file to .git/hooks/post-push and make it executable

echo "🚀 Post-push hook triggered..."

# Check if GOOGLE_API_KEY is set
if [ -z "$GOOGLE_API_KEY" ]; then
  echo "⚠️  GOOGLE_API_KEY not set. Skipping README generation."
  echo "💡 Tip: Set GOOGLE_API_KEY environment variable to enable auto-documentation"
  exit 0
fi

# Navigate to repo root
REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT" || exit 1

echo "📂 Repository root: $REPO_ROOT"

# Check if node_modules exists, install if not
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Run documentation generator
echo "🤖 Generating documentation..."
node generate-readme.js

if [ $? -eq 0 ]; then
  echo "✅ Documentation generated successfully!"
  
  # Check if README.md was modified
  if git diff --quiet README.md; then
    echo "ℹ️  No changes to README.md"
  else
    echo "📝 README.md has been updated"
    echo "💾 To commit changes, run: git add README.md && git commit -m 'docs: update README'"
  fi
else
  echo "❌ Documentation generation failed"
  exit 1
fi

exit 0

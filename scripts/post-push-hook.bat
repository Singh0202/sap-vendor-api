@echo off
REM Git Post-Push Hook for README Generation (Windows)
REM This script runs automatically after pushing to remote
REM Copy this file to .git\hooks\post-push and make it executable

echo.
echo 🚀 Post-push hook triggered...
echo.

REM Check if GOOGLE_API_KEY is set
if "%GOOGLE_API_KEY%"=="" (
  echo ⚠️  GOOGLE_API_KEY not set. Skipping README generation.
  echo 💡 Tip: Set GOOGLE_API_KEY environment variable to enable auto-documentation
  exit /b 0
)

REM Get repository root
for /f "delims=" %%i in ('git rev-parse --show-toplevel') do set REPO_ROOT=%%i

echo 📂 Repository root: %REPO_ROOT%
cd /d "%REPO_ROOT%"

REM Check if node_modules exists, install if not
if not exist "node_modules" (
  echo 📦 Installing dependencies...
  call npm install
)

REM Run documentation generator
echo 🤖 Generating documentation...
call node generate-readme.js

if errorlevel 1 (
  echo ❌ Documentation generation failed
  exit /b 1
) else (
  echo ✅ Documentation generated successfully!
  
  REM Check if README.md exists
  if exist "README.md" (
    echo 📝 README.md has been updated
    echo 💾 To commit changes, run: git add README.md ^&^& git commit -m "docs: update README"
  ) else (
    echo ℹ️  README.md created
  )
)

exit /b 0

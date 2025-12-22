@echo off
echo ========================================
echo Pushing Eat Right Live Bright to GitHub
echo ========================================
echo.

cd /d "%~dp0"

echo [1/6] Initializing Git repository...
git init
if errorlevel 1 (
    echo ERROR: Git initialization failed
    pause
    exit /b 1
)

echo.
echo [2/6] Adding all files to Git...
git add .
if errorlevel 1 (
    echo ERROR: Failed to add files
    pause
    exit /b 1
)

echo.
echo [3/6] Checking what files will be committed...
git status --short

echo.
echo [4/6] Creating commit...
git commit -m "Initial commit: Complete Eat Right Live Bright project with all files"
if errorlevel 1 (
    echo ERROR: Commit failed
    pause
    exit /b 1
)

echo.
echo [5/6] Setting branch to main and configuring remote...
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/Hari-1718/Eat-Right-Live-Bright.git

echo.
echo [6/6] Pushing to GitHub...
echo NOTE: You may be prompted for GitHub credentials
git push -u origin main --force

if errorlevel 1 (
    echo.
    echo ========================================
    echo ERROR: Push failed!
    echo ========================================
    echo.
    echo Possible reasons:
    echo 1. Repository doesn't exist on GitHub - create it first
    echo 2. Authentication required - use Personal Access Token
    echo 3. Network issues
    echo.
    echo Repository URL: https://github.com/Hari-1718/Eat-Right-Live-Bright.git
    pause
    exit /b 1
) else (
    echo.
    echo ========================================
    echo SUCCESS! All files pushed to GitHub
    echo ========================================
    echo.
    echo View your repository at:
    echo https://github.com/Hari-1718/Eat-Right-Live-Bright
    echo.
)

pause

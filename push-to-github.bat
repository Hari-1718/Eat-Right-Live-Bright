@echo off
cd /d "%~dp0"
echo ========================================
echo Pushing Eat Right Live Bright to GitHub
echo ========================================
echo.

echo Step 1: Creating README.md...
echo # Eat-Right-Live-Bright > README.md
echo.

echo Step 2: Initializing git repository...
git init
echo.

echo Step 3: Adding all files...
git add .
echo.

echo Step 4: Showing files to be committed...
git status
echo.

echo Step 5: Committing files...
git commit -m "first commit"
echo.

echo Step 6: Setting branch to main...
git branch -M main
echo.

echo Step 7: Adding remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/Hari-1718/Eat-Right-Live-Bright.git
echo.

echo Step 8: Showing remote configuration...
git remote -v
echo.

echo Step 9: Pushing to GitHub...
echo Please enter your GitHub credentials when prompted...
git push -u origin main
echo.

echo ========================================
echo Done! Check your repository at:
echo https://github.com/Hari-1718/Eat-Right-Live-Bright
echo ========================================
pause

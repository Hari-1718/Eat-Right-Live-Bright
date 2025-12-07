@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ========================================
echo PUSHING PROJECT TO GITHUB
echo ========================================
echo.

echo [1/8] Removing old git if exists...
if exist .git (
    rmdir /s /q .git
    echo    Old git removed
)

echo [2/8] Creating README.md...
echo # Eat-Right-Live-Bright > README.md
echo    README.md created
echo.

echo [3/8] Initializing git repository...
call git init
echo    Git initialized
echo.

echo [4/8] Adding ALL files to git...
call git add .
echo    Files added
echo.

echo [5/8] Showing files that will be committed:
call git status --short
echo.

echo [6/8] Committing files...
call git commit -m "first commit"
echo    Files committed
echo.

echo [7/8] Setting up branch and remote...
call git branch -M main
call git remote remove origin 2>nul
call git remote add origin https://github.com/Hari-1718/Eat-Right-Live-Bright.git
echo    Branch: main
echo    Remote: https://github.com/Hari-1718/Eat-Right-Live-Bright.git
echo.

echo [8/8] Pushing to GitHub...
echo    NOTE: You may need to enter GitHub credentials
call git push -u origin main
echo.

echo ========================================
echo COMPLETE!
echo ========================================
echo.
echo Repository: https://github.com/Hari-1718/Eat-Right-Live-Bright
echo.
echo Press any key to exit...
pause >nul

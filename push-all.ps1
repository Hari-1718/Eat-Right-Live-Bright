# PowerShell script to push all files to GitHub
cd "c:\Users\harip\Desktop\Eat Right Live Bright"

Write-Host "=== Checking Git Status ===" -ForegroundColor Cyan
git status

Write-Host "`n=== Files to be committed ===" -ForegroundColor Cyan
git ls-files | Measure-Object -Line

Write-Host "`n=== Committing all files ===" -ForegroundColor Cyan
git add .
git commit -m "Initial commit: Complete Eat Right Live Bright project with all files"

Write-Host "`n=== Setting branch to main ===" -ForegroundColor Cyan
git branch -M main

Write-Host "`n=== Adding remote ===" -ForegroundColor Cyan
git remote remove origin 2>$null
git remote add origin https://github.com/Hari-1718/Eat-Right-Live-Bright.git
git remote -v

Write-Host "`n=== Pushing to GitHub ===" -ForegroundColor Cyan
git push -u origin main --force

Write-Host "`n=== Push Complete! ===" -ForegroundColor Green
Write-Host "Check your repository at: https://github.com/Hari-1718/Eat-Right-Live-Bright" -ForegroundColor Yellow

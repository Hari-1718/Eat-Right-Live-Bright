# PowerShell script to push project to GitHub
$ErrorActionPreference = "Stop"
Set-Location "c:\Users\harip\Desktop\Eat Right Live Bright"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Pushing Eat Right Live Bright to GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Create README
Write-Host "Step 1: Creating README.md..." -ForegroundColor Yellow
"# Eat-Right-Live-Bright" | Out-File -FilePath "README.md" -Encoding UTF8
Write-Host "✓ README.md created" -ForegroundColor Green
Write-Host ""

# Step 2: Initialize git
Write-Host "Step 2: Initializing git repository..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Remove-Item -Recurse -Force ".git"
    Write-Host "✓ Removed existing .git folder" -ForegroundColor Green
}
git init
Write-Host "✓ Git initialized" -ForegroundColor Green
Write-Host ""

# Step 3: Add all files
Write-Host "Step 3: Adding all files..." -ForegroundColor Yellow
git add .
$files = git ls-files
Write-Host "✓ Added files:" -ForegroundColor Green
$files | ForEach-Object { Write-Host "  - $_" }
Write-Host ""

# Step 4: Commit
Write-Host "Step 4: Committing files..." -ForegroundColor Yellow
git commit -m "first commit"
Write-Host "✓ Files committed" -ForegroundColor Green
Write-Host ""

# Step 5: Set branch to main
Write-Host "Step 5: Setting branch to main..." -ForegroundColor Yellow
git branch -M main
Write-Host "✓ Branch set to main" -ForegroundColor Green
Write-Host ""

# Step 6: Add remote
Write-Host "Step 6: Adding remote origin..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin https://github.com/Hari-1718/Eat-Right-Live-Bright.git
git remote -v
Write-Host "✓ Remote added" -ForegroundColor Green
Write-Host ""

# Step 7: Push
Write-Host "Step 7: Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "Please enter your GitHub credentials when prompted..." -ForegroundColor Yellow
git push -u origin main
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Done! Check your repository at:" -ForegroundColor Green
Write-Host "https://github.com/Hari-1718/Eat-Right-Live-Bright" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

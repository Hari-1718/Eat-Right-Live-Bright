# Verify all files are ready for push
Write-Host "=== Project Files Verification ===" -ForegroundColor Cyan
Write-Host ""

$files = @(
    "public/index.html",
    "public/pages/campaign.html", 
    "public/pages/foods.html",
    "public/pages/issues.html",
    "public/pages/diet-checker.html",
    "public/pages/eat-right-live-bright.html",
    "public/assets/css/styles.css",
    "public/assets/js/app.js",
    "public/assets/images/logo.svg",
    "public/assets/images/icon-food.svg",
    "public/assets/images/icon-people.svg",
    "public/assets/images/icon-health.svg",
    "package.json",
    "vercel.json",
    ".vercelignore",
    ".gitignore",
    "docs/README.md"
)

$missing = @()
foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "✓ $file" -ForegroundColor Green
    } else {
        Write-Host "✗ $file - MISSING" -ForegroundColor Red
        $missing += $file
    }
}

Write-Host ""
if (Test-Path "public/assets/images") {
    $imgCount = (Get-ChildItem -Path "public/assets/images" -File).Count
    Write-Host "✓ public/assets/images/ folder with $imgCount files" -ForegroundColor Green
} else {
    Write-Host "✗ public/assets/images/ folder - MISSING" -ForegroundColor Red
}

Write-Host ""
if ($missing.Count -eq 0) {
    Write-Host "All files present! Ready to push." -ForegroundColor Green
} else {
    Write-Host "Missing files: $($missing -join ', ')" -ForegroundColor Red
}

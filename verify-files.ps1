# Verify all files are ready for push
Write-Host "=== Project Files Verification ===" -ForegroundColor Cyan
Write-Host ""

$files = @(
    "index.html",
    "campaign.html", 
    "foods.html",
    "issues.html",
    "diet-checker.html",
    "eat-right-live-bright.html",
    "styles.css",
    "app.js",
    "package.json",
    "vercel.json",
    ".vercelignore",
    ".gitignore",
    "README.md",
    "image.png",
    "500_Person_Gender_Height_Weight_Index.csv"
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
if (Test-Path "images") {
    $imgCount = (Get-ChildItem -Path "images" -File).Count
    Write-Host "✓ images/ folder with $imgCount files" -ForegroundColor Green
} else {
    Write-Host "✗ images/ folder - MISSING" -ForegroundColor Red
}

Write-Host ""
if ($missing.Count -eq 0) {
    Write-Host "All files present! Ready to push." -ForegroundColor Green
} else {
    Write-Host "Missing files: $($missing -join ', ')" -ForegroundColor Red
}

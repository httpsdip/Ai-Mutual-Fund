# Push selected file types to GitHub from the repository root.
# Run this from PowerShell in the repository root folder.

$repo = "C:\Users\DIPAYAN\OneDrive\Desktop\InternshipProject"
$git = "C:\Program Files\Git\cmd\git.exe"

if (-not (Test-Path $git)) {
    Write-Error "Git executable not found at $git. Please install Git or update the path."
    exit 1
}

Set-Location $repo
& $git status --short
& $git add -- *.py *.html *.css *.txt
& $git status --short

$commitMessage = "Upload Python, HTML, CSS, and TXT files"
$diff = & $git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
    & $git commit -m $commitMessage
} else {
    Write-Host "No staged changes to commit."
}

& $git push origin main

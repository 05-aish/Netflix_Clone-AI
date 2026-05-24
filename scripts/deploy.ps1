param(
    [Parameter(Mandatory = $true)]
    [string]$Message
)

$ErrorActionPreference = "Stop"

$branch = git branch --show-current
if (-not $branch) {
    throw "Could not detect the current Git branch."
}

git status --short
git add -A
git commit -m $Message
git push origin $branch

Write-Host "Pushed $branch. Vercel and Railway will deploy automatically if their GitHub integrations are enabled."

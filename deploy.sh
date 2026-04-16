#!/bin/bash
set -e
cd "$(dirname "$0")"
echo "Building..."
npm run build
echo "Deploying to gh-pages..."
cd dist
touch .nojekyll
if [ ! -d .git ]; then
  git init
  git checkout -b gh-pages
fi
git add -A
git commit -m "deploy $(date '+%Y-%m-%d %H:%M:%S')"
originUrl=$(git -C .. remote get-url origin)
git remote add origin "$originUrl" 2>/dev/null || true
git remote set-url origin "$originUrl"
git push -f origin gh-pages
echo "Done!"

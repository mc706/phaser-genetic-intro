#!bin/bash
git push origin --delete gh-pages
echo "!dist/" >> .gitignore
npm run build
git add dist/
git commit -m "Deploy Gitlab Pages"
git subtree push --prefix dist origin gh-pages
git reset HEAD~
git checkout -- .gitignore

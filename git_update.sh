# Filename: git_update.sh
# This file should be sourced

#! usr/bin/bash
echo "update to git"

chmod u+x git_update.sh

#cd idea-IU-231.8109.175/bin

git add .
git commit -m "Update on Java2/Spring Security"
#git push Security
git push --set-upstream Security master


pwd
echo $$

#cd



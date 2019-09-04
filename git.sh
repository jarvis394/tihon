#/bin/sh

# Fetch the newest code
git fetch origin master

# Hard reset
git reset --hard origin/master

# Pull the code
git pull origin master --force -X theirs

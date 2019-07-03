#/bin/sh

# Fetch the newest code
git fetch origin master

# Pull
git pull origin master --force -X theirs

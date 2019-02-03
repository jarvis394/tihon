#/bin/sh

# Fetch the newest code
git fetch origin master

# Delete all files which are being added,
# so there are no conflicts with untracked files
for file in `git diff HEAD..origin/master --name-status | awk '/^A/ {print $2}'`
do
    echo "Deleting untracked file $file..."
    rm -vf "$file"
done

# Checkout all files which have been locally modified
for file in `git diff HEAD..origin/master --name-status | awk '/^M/ {print $2}'`
do
    echo "Checking out modified file $file..."
    git checkout $file
done

# Finally merge all the changes
git pull origin master -f
# Execute this file after commiting everything to develop
# This script will commit to master branch so be careful
# You need to be on the project root

API_PROD="\"https:\/\/aesculapius.pythonanywhere.com\/api\/\""

# TODO: Add option for $API_DEV = "https://aesculapiusdev.pythonanywhere.com/api/"
# TODO: Add an option for custom commit message directly from deploy.sh

echo "1/8 building aesculapius-front"
grunt build

echo "2/8 checkout to master"
git checkout master

echo "3/8 changing api url"
sed -i "s/\"http:\/\/[^;]*/$API_PROD/" dist/scripts/scripts.*

echo "4/8 deleting old master files"
rm -rf images/ scripts/ styles/ favicon.ico index.html

echo "5/8 placing new master files"
cp -r dist/* .

echo "6/8 commiting..."
git add --all
git commit

echo "7/8 pushing..."
git push origin master

echo "8/8 back to develop"
git checkout develop

echo "Finished."

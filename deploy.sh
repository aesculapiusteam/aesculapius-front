# Execute this file after commiting everything to develop
# This script will commit to master branch so be careful
# You need to be on the project root

API_PROD="\"https:\/\/aesculapius.pythonanywhere.com\/api\/\""
# TODO: Add option for $API_DEV = "https://aesculapiusdev.pythonanywhere.com/api/"
# TODO: Add an option for custom commit message directly from deploy.sh

echo "1/7 building aesculapius-front"
grunt build

echo "2/7 checkout to master"
git checkout master

echo "3/7 changing api url"
sed -i "s/\"http:\/\/[^;]*/$API_PROD/" dist/scripts/scripts.*

echo "4/7 deleting old master files"
rm -rf images/ scripts/ styles/ favicon.ico index.html manifest.json

echo "5/7 placing new master files"
cp -r dist/* .

echo "6/7 commiting..."
git add --all
git commit

echo "7/7 pushing..."
git push origin master

echo "Finished."


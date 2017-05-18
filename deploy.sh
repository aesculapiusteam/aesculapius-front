# Execute this file after commiting everything to develop
# This script will commit to master branch so be careful
# You need to be on the project root

API_PROD="\"https:\/\/aesculapius.pythonanywhere.com\/api\/\""

# TODO: Add option for $API_DEV = "https://aesculapiusdev.pythonanywhere.com/api/"
# TODO: Add an option for custom commit message directly from deploy.sh

echo "1/9 building aesculapius-front"
grunt build

echo "2/9 checkout to master"
git checkout master

echo "3/9 changing api url"
sed -i "s/\"http:\/\/[^;]*/$API_PROD/" dist/scripts/scripts.*

echo "4/9 changing manifest logo url"
dist_icon=$(ls dist/images/logo_square_shadow.*.png | sed "s/.*images/images/" | sed 's/\//\\\//')
sed -i "s/images\/logo_square_shadow.png/$dist_icon/" dist/manifest.json

echo "5/9 deleting old master files"
rm -rf images/ scripts/ styles/ favicon.ico index.html manifest.json

echo "6/9 placing new master files"
cp -r dist/* .

echo "7/9 commiting..."
git add --all
git commit

echo "8/9 pushing..."
git push origin master

echo "9/9 back to develop"
git checkout develop

echo "Finished."

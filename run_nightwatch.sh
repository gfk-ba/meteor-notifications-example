#!/bin//bash
echo "installing nightwatch in .meteor/local/build"
  mkdir -p .meteor/local/build
  cd .meteor/local/build
  npm install nightwatch@0.5.3
  cd ../../../

sed -i.bak "s/#USERNAME#/${BROWSERSTACK_USERNAME}/g" nightwatch.json
sed -i.bak "s/#KEY#/${BROWSERSTACK_KEY}/g" nightwatch.json

echo "running nightwatch from app root"
   .meteor/local/build/node_modules/nightwatch/bin/nightwatch -c nightwatch.json $1 $2
#!/bin/bash
npm install

sed -i.bak "s/#USERNAME#/${BROWSERSTACK_USERNAME}/g" nightwatch.json
sed -i.bak "s/#KEY#/${BROWSERSTACK_KEY}/g" nightwatch.json

sed -i.bak "s/#EMAIL#/${METEOR_EMAIL}/g" deploy.exp
sed -i.bak "s/#PASSWORD#/${METEOR_PASSWORD}/g" deploy.exp
sed -i.bak "s/#SITENAME#/${METEOR_DEPLOY_URL}/g" deploy.exp
cd app
expect ../deploy.exp
cd ..
echo "Waiting 10 seconds for meteor to finish deploying"
sleep 10

echo "running nightwatch from node_modules"
   node_modules/nightwatch/bin/nightwatch -c nightwatch.json $1 $2
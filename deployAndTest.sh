#!/bin/bash
cd app
expect ../deploy.exp
cd ..

echo "Waiting 10 seconds for meteor to finish deploying"
sleep 10

echo "running nightwatch from node_modules"
   node_modules/nightwatch/bin/nightwatch -c nightwatch.json $1 $2
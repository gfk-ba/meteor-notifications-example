#!/bin/bash
echo "running nightwatch from node_modules"
   node_modules/nightwatch/bin/nightwatch -c nightwatch.json $1 $2
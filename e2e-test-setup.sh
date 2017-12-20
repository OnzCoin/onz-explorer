#!/bin/bash  
# Purpose of this script is to clean onz database and load a snapshot to it

if [ -z "$1" ]
  then
    echo "One required argument missing: path to folder with onz core app.js"
    exit 1
fi

if [ ! -f blockchain_explorer.db.gz ]; then
  wget https://downloads.onzcoin.com/onz-explorer/dev/blockchain_explorer.db.gz
fi

pwd=`pwd`
cp test/config_onz.json $1/config.json
cd $1
pm2 stop app.js
dropdb onz_test
createdb onz_test
gunzip -fcq "$pwd/blockchain_explorer.db.gz" | psql -d onz_test
cp test/genesisBlock.json ./
pm2 start app.js
sleep 5
cd -


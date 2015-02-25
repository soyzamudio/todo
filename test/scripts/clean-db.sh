#!/bin/bash

if [ -z "$1" ] ; then
  echo "Enter a database name"
  exit 1
fi

mongoimport --drop --db $1 --collection users --file ../../db/users.json
mongoimport --drop --db $1 --collection items --file ../../db/items.json

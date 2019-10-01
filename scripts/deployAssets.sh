#!/bin/bash

NAME=$(jq -r .name < package.json)
VERSION=$(jq -r .version < package.json)

yarn lint:client
yarn version 
del dist .bucket
webpack --mode production --config ./webpack/client.config.js
yarn i18next
cpr public dist/$NAME
cpr dist/$NAME .bucket/$NAME/$VERSION
sls client deploy --no-confirm --no-delete-contents --no-policy-change
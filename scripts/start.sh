#!/bin/bash

NAME=$(jq -r .name < package.json)

del dist .bucket
cpr public dist/$NAME
yarn i18next
NODE_TLS_REJECT_UNAUTHORIZED=0 tsnd --respawn devServer.ts --watch lib,public,dist,handlers

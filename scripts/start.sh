#!/bin/bash

NAME=$(grep -m1 name package.json | awk -F: '{ print $2 }' | sed 's/[ ",]//g')

del dist .bucket
find . -type f -maxdepth 4 -name "translation.json" | while read FNAME; do cp "$FNAME" "${FNAME//translation/translation-old}"; done
yarn babel -f babel.config.js 'src/**/*.{ts,tsx}'
# yarn json-autotranslate -d -i public/locales -t keybased -m i18next -s google-translate -c service-account.json
cpr public dist/$NAME
NODE_TLS_REJECT_UNAUTHORIZED=0 tsnd --respawn devServer.ts --watch lib,public,dist,handlers

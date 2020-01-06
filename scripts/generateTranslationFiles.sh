#!/bin/bash

echo 'Beginning translation file compilation! 🚀'

find . -type f -maxdepth 4 -name "translation.json" | while read FNAME; do cp "$FNAME" "${FNAME//translation/translation-old}"; done
yarn babel -f babel.config.js 'src/**/*.{ts,tsx}'

echo
read -p 'Would you like to auto translate copy? (y/n) ' answer
case ${answer:0:1} in
    y|Y )
        echo 'Beginning auto translation'
        del 'public/locales/**/translation.json' '!public/locales/en/translation.json'
        yarn json-autotranslate -d -i public/locales -t keybased -m i18next -s google-translate -c service-account.json
    ;;
    * )
        echo 'Skipping auto translation'
    ;;
esac
echo
echo "Translation complete"

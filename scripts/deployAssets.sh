#!/bin/sh

echo 'Beginning asset deployment! 🚀'

NAME=$(grep -m1 name package.json | awk -F: '{ print $2 }' | sed 's/[ ",]//g')
VERSION=$(grep -m1 version package.json | awk -F: '{ print $2 }' | sed 's/[ ",]//g')

echo "Deploying $NAME@$VERSION"

cpr public dist/$NAME
cpr dist/$NAME .bucket/$NAME/$VERSION
sls config credentials --provider aws --key ${AWS_ACCESS_KEY_ID} --secret ${AWS_SECRET_ACCESS_KEY}
sls client deploy --no-confirm --no-delete-contents --no-policy-change --stage=${STAGE}
echo
echo "Deployment complete"
#!/bin/bash

echo 'Beggining app deployment! 🚀'
echo
read -p 'Would you like to deploy to production? (y/n) ' answer
case ${answer:0:1} in
    y|Y )
        STAGE=production
    ;;
    * )
        STAGE=experimental
    ;;
esac
echo
yarn lint:infrastructure
sls deploy --aws-s3-accelerate --stage=$STAGE
echo
echo "Deployment complete"
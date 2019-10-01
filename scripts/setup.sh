#!/bin/bash

echo 'You are about to setup an application stage! 🚀'
echo
read -p 'Name: ' NAME
read -p 'Domain: ' DOMAIN
read -p 'Version: ' VERSION
read -p 'Config: ' CONFIG
read -p 'Experimental? (y/n) ' answer
case ${answer:0:1} in
    y|Y )
        STAGE=experimental
    ;;
    * )
        STAGE=production
    ;;
esac
echo
echo 'Setting parameters in AWS SSM....'
echo
aws ssm put-parameter --type "String"  --name "/app/$NAME/$STAGE/appDomain" --value "$DOMAIN" --region "us-east-1"
aws ssm put-parameter --type "String"  --name "/app/$NAME/$STAGE/appVersion" --value "$VERSION" --region "us-east-1"
aws ssm put-parameter --type "String"  --name "/app/$NAME/$STAGE/appConfig" --value "$CONFIG" --region "us-east-1"
echo
echo 'All done! 🍻'
# Immutable web app boilerplate
This project is based on the principles and architecture of [Immutable Web Apps](https://immutablewebapps.org/).

## Local Developement
Run development environment for the client application:
```bash
$ yarn start
```

## Application Stages
This architecture uses only two stages, `experimental` and `production`.

The experimental stage is completely isolated from the production stage, and should only be used for testing changes to the infrastructure or integrating with APIs that are not yet live before deploying to production. 

Otherwise, all application versions may be tested directly on the live stage (see below).

Make sure you have [jq](https://stedolan.github.io/jq/) installed:
```bash
$ brew install jq
```

## Initial Setup
Ensure you have the AWS CLI installed and configured:

```bash
$ brew install awscli

$ aws configure
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: eu-west-1
Default output format [None]: json
``` 
To establish an application stage several values must be created in the SSM Parameter store in AWS.

### Example values:

**appDomain**  
```
experimental-webapp.headbox.com
```

**appVersion**
```
0.0.0-alpha
```
**appConfig**
```
{"services": {"someApi": "https://httpbin.org/get"}}
```

Run `$ yarn setup` and you will be guided through this process

## Deployment Process
> The intention is to move deployments to a Drone CI/CD pipeline.

### Asset deployment
Assets are  versioned, tagged and then deployed to S3

```bash
$ yarn deploy:assets
```

### App deployment
The App only needs to be deployed when there are either:

1.  Infrastructural changes.
2.  Updates to `index.html.mustache` which require new data to be passed into the template.

```bash
$ yarn deploy:app
```

### Testing
Rather than a dedicacted UAT environemnt we can test our immutable applications in production. This has the advantage of giving us the most realistic testing conditions possible, although it is still possible to test on the experimental stage for riskier features.

Testing a build can be done by simply adding a browser cookie called `appVersion` with the build version you want to test.

The easiest way to manage this is with an extension called [EditThisCookie](http://www.editthiscookie.com/).

### Release
Once you are ready to release a new applcation deployment all you need to do is change the `appVersion` parameter in SSM. 

```bash
aws ssm put-parameter --type "String"  --name "/app/{{ name of project }}/{{ stage }}/appVersion" --value "{{ version }}" --region "us-east-1" --overwrite
```

## Content Security Policy
To improve the overall security of our interfaces a strict [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) has been implemented. This means that any external or inline resources must be whitelisted before they can be loaded by the user agent. 

To add a new external source (e.g. trusted 3rd party script or css) you must configure it in the [cspSources constant](lib/constants.ts) within `/lib`.

To add an inline script tag it must be added to [inlineScripts](lib/inlineScripts.ts) and included in [createContent](lib/content.ts); and then applied as a variable in `index.html.mustache`.

```html
<script>{{{ myInlineScript }}}</script>
```

Due the the needs of Ant Design System we are currently allowing any inline `<style>` tags, so these do not need to be configured.

## Infrastructure

![Front End Infrastructure](docs/infrastructure.png)
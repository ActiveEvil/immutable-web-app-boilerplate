#!/bin/bash

yarn lint:infrastructure
sls deploy --aws-s3-accelerate
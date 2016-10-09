#!/usr/bin/env bash

export TAG=$(echo $TRAVIS_BRANCH | grep "^[0-9].[0-9].[0-9]-\?[a-zA-Z]*\.\?[0-9]*$")
export SEMVER=$(echo $TAG | cut -d - -f 1)
export ENV_TAG=$(if [ ${#TAG} -gt 0 -a $TAG = $SEMVER ]; then echo prod; else echo $TAG | cut -d - -f 2 | cut -d . -f 1 | grep "qa"; fi)
export DEPLOY_DIR="raging-goblin-"$ENV_TAG"/"$TAG

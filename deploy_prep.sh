#!/usr/bin/env bash

export TAG
export SEMVER
export ENV_TAG

TAG=$(echo "$TRAVIS_BRANCH" | grep "^[0-9]\.[0-9]\.[0-9]-\?[a-zA-Z]*\.\?.*$")
SEMVER=$(echo "$TAG" | cut -d - -f 1)
ENV_TAG=$(if [ ${#TAG} -gt 0 ] && [ "$TAG" = "$SEMVER" ]; then echo prod; else echo "$TAG" | cut -d - -f 2 | cut -d . -f 1 | grep "qa"; fi)
if [ "$ENV_TAG" ]; then
    echo "Deploying $TAG"
    webpack -p --env "$ENV_TAG"
    tar -czvf ./"$TAG".tar.gz ./public
    rm -rf ./public/*
    mv ./"$TAG".tar.gz ./public
fi

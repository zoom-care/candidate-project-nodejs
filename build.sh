#!/usr/bin/env bash

tsc 

for d in bin views data; do
    cp -R $d dist/.
done

mkdir -p dist/public

cp -R assets/stylesheets dist/public/.
cp -R assets/favicon.ico dist/public/.

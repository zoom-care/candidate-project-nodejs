#!/usr/bin/env bash

tsc 

for d in bin views data; do
    cp -R $d dist/.
done

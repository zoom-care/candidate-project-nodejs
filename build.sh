#!/usr/bin/env bash

tsc 

for d in bin views config data; do
    cp -R $d dist/.
done

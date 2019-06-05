#!/usr/bin/env bash

cat sample.json

curl -H "Content-Type: application/json" \
    -H "authorization:ABC123" \
    -d @sample.json \
    -X POST \
    http://localhost:3001/user

FROM node:10.15-alpine as base

# Create a builder image which has GCC and dev libraries. These are needed 
# to compile modules that don't have binaries, but also take up a lot of space.
# So to keep overall image size down, we will compile all modules in a
# "builder" image, and then copy them over to a "final" image.

# inspired from
# https://github.com/mhart/alpine-node/issues/27#issuecomment-298395675

RUN apk update && \
    apk add build-base && \
    apk add --no-cache make gcc g++ python && \
    apk add git

RUN npm install -g npm

COPY . /app
WORKDIR /app

RUN npm install
ENTRYPOINT [ "npm", "start"]

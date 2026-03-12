FROM node:22-alpine

RUN apk add --no-cache git bash openssh-client

WORKDIR /usr/src/app
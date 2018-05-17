FROM node:9.11.1

WORKDIR /usr/src/app

COPY src/package.json package.json

RUN npm install
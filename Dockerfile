# Stage 1
FROM node:14-buster-slim as builder

LABEL maintainer "Yefta Sutanto <yeftasutanto@gmail.com>"
LABEL org.opencontainers.image.source https://github.com/sportivapp/frontend-core

ARG node_env=development

RUN apt-get update && apt-get -qq -y install --no-install-recommends make g++ python

COPY package.json /app/sportivapp/frontend-core/package.json
COPY package-lock.json /app/sportivapp/frontend-core/package-lock.json

WORKDIR /app/sportivapp/frontend-core

RUN npm ci

COPY .eslintrc.js /app/sportivapp/frontend-core/.eslintrc.js
COPY nuxt.config.js /app/sportivapp/frontend-core/nuxt.config.js

COPY . /app/sportivapp/frontend-core

ENV NODE_ENV=$node_env

RUN npm run generate

# Stage 2
FROM nginx:alpine

LABEL maintainer "Yefta Sutanto <yeftasutanto@gmail.com>"
LABEL org.opencontainers.image.source https://github.com/sportivapp/frontend-core

COPY --from=builder /app/sportivapp/frontend-core/dist /usr/share/nginx/html

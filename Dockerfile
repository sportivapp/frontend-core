# Stage 1
FROM node:14-buster-slim as builder

LABEL maintainer "Yefta Sutanto <yeftasutanto@gmail.com>"
LABEL org.opencontainers.image.source https://github.com/sportivapp/consumer-webapp-nuxt

ARG node_env=development

RUN apt-get update && apt-get -qq -y install --no-install-recommends make g++ python

COPY package.json /app/sportivapp/consumer-webapp-nuxt/package.json
COPY package-lock.json /app/sportivapp/consumer-webapp-nuxt/package-lock.json

WORKDIR /app/sportivapp/consumer-webapp-nuxt

RUN npm ci

COPY .eslintrc.js /app/sportivapp/consumer-webapp-nuxt/.eslintrc.js
COPY nuxt.config.js /app/sportivapp/consumer-webapp-nuxt/nuxt.config.js

COPY . /app/sportivapp/consumer-webapp-nuxt

ENV NODE_ENV=$node_env

RUN npm run generate

# Stage 2
FROM nginx:alpine

LABEL maintainer "Yefta Sutanto <yeftasutanto@gmail.com>"
LABEL org.opencontainers.image.source https://github.com/sportivapp/consumer-webapp-nuxt

COPY --from=builder /app/sportivapp/consumer-webapp-nuxt/dist /usr/share/nginx/html

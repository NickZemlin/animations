FROM node:16.14.2-alpine AS base

WORKDIR /var/www/client

FROM base AS local

CMD ["sh", "-c", "yarn install \
                && yarn serve"]

# Build stage
FROM base AS builder

COPY client/package*.json .

RUN yarn install
# Build Vue project
COPY client .
RUN yarn build

# Deploy to server
FROM nginx:1.21.4-alpine as server
# Add Nginx config
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
# Copy SPA
COPY --from=builder /var/www/client/dist /var/www/dist
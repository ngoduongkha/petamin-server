FROM node:16-alpine AS builder
RUN apk add g++ make python3
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . ./
RUN yarn build

FROM node:16-alpine as runner
WORKDIR /app
ENV NODE_ENV=production
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY --from=builder /app/dist ./dist
ENTRYPOINT [ "node", "dist/src/main.js" ]
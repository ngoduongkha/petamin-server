FROM node:16-alpine AS builder
RUN apk add g++ make python3
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . ./
RUN yarn build && npm prune --production

FROM node:16-alpine as runner
WORKDIR /app
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package.json
RUN rm -rf /app/dist/**/migrations/*.d.ts /app/dist/**/migrations/*.map
ENTRYPOINT [ "node", "dist/main.js" ]
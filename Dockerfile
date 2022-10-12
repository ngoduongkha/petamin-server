FROM node:16 AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . ./
RUN yarn build && npm prune --production

FROM node:16 as runner
WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
RUN rm -rf /app/dist/**/migrations/*.d.ts /app/dist/**/migrations/*.map
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x wait-for-it.sh
FROM node:14 as builder

ENV NODE_ENV build

# Create app directory
WORKDIR /usr/src/app

RUN apt-get update

RUN apt-get install python3 -y

# Bundle app source
COPY . .

RUN npm install --force \
    && npm run build-api \
    && npm run build \
    && npm prune --production

# ---

FROM node:14-slim as production

LABEL "nick"="fnf"

ENV NODE_ENV production

WORKDIR /usr/src/app

RUN apt-get update

RUN apt-get install rsync -y

COPY package*.json ./

RUN npm install --only=production --force

COPY --chown=node:node . .

COPY --chown=node:node --from=builder /usr/src/app/dist ./dist

# friends don’t let friends run containers as root!
USER node

EXPOSE 3333 3334

CMD ["node", "dist/apps/api/main.js"]

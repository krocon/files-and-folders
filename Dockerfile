
# PRODUCTION DOCKERFILE
# ---------------------
# . The multi-stage mechanism allows to build
# the application in a "builder" stage and then create a lightweight production
# image containing the required dependencies and the JS build files.
#
# Dockerfile best practices
# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
# Dockerized NodeJS best practices
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
# https://www.bretfisher.com/node-docker-good-defaults/
# http://goldbergyoni.com/checklist-best-practice-of-node-js-in-production/

FROM node:14 as builder

ENV NODE_ENV build

# Create app directory
WORKDIR /usr/src/app

RUN apt-get update

RUN apt-get install python3 -y

# Bundle app source
COPY . .

RUN npm ci \
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

COPY . .

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3333 3334

CMD ["node", "dist/apps/api/main.js"]

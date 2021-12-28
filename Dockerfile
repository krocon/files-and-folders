FROM node:14-slim as production

# Optimise for production
ENV NODE_ENV production

LABEL "nick"="fnf"

WORKDIR /usr/src/app

RUN apt-get update

RUN apt-get install rsync -y

COPY --chown=node:node . .

RUN npm install --force

RUN npm run build

RUN npm run build:api

# friends don’t let friends run containers as root!
USER node

EXPOSE 3333 3334

CMD ["node", "dist/apps/api/main.js"]

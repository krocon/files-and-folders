FROM node:14-slim as production

# Optimise for production
ENV NODE_ENV production

LABEL "nick"="fnf"

ENV NODE_ENV production

WORKDIR /usr/src/app

RUN apt-get update

RUN apt-get install rsync -y

COPY --chown=node:node . /usr/src/app

RUN npm install --production --force

# friends don’t let friends run containers as root!
USER node

EXPOSE 3333 3334

CMD ["node", "dist/apps/api/main.js"]

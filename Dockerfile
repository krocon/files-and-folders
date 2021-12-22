FROM node:14-slim as production

LABEL "nick"="fnf"

ENV NODE_ENV production

WORKDIR /usr/src/app

RUN apt-get update

RUN apt-get install rsync -y

COPY package*.json ./

RUN npm install --only=production --force

COPY . .

EXPOSE 3333 3334

CMD ["node", "apps/api/main.js"]

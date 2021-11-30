FROM node:lts-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache git make gcc g++ python3 libc-dev

RUN \
  git config --global url."https://github.com:".insteadOf git@github.com/ && \
  git config --global url."https://".insteadOf ssh://

WORKDIR /usr/src/app/backend

COPY backend/package* ./

RUN npm i

RUN apk del git make gcc g++ python3 libc-dev

WORKDIR /usr/src/app

COPY . .

RUN rm -rf dashboard/

WORKDIR /usr/src/app/backend

RUN npm run build

CMD ["npm", "run", "start-api-prod"]

FROM node:18
USER node

# COPY --chown=node:node . /zeppelin

COPY --chown=node:node \
  ./package.json \
  ./package-lock.json \
  ./backend/package.json \
  ./backend/package-lock.json \
  /zeppelin/

WORKDIR /zeppelin/backend
RUN npm ci

WORKDIR /zeppelin
COPY --chown=node:node . .
WORKDIR /zeppelin/backend
RUN npm run build

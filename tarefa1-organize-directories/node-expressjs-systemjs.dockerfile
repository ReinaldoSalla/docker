FROM node:12.16.1

WORKDIR /usr/src/tarefa1

COPY ./docker-compose.yml ./

COPY ./node-expressjs-systemjs.dockerfile ./

COPY ./.dockerignore ./

WORKDIR /usr/src/tarefa1/client

COPY ./client/package*.json ./

RUN npm install

COPY ./client  ./

WORKDIR /usr/src/tarefa1/server

COPY ./server/package*.json ./

RUN npm install

COPY ./server/src  ./src

COPY ./server/nodemon.json ./

COPY ./server/tsconfig.json ./

EXPOSE 3000

CMD ["npm", "start"]
FROM node:12.16.1

WORKDIR /usr/src/app/client

COPY client/package*.json ./

RUN npm install

COPY client  ./

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./src  ./src

COPY .dockerignore ./

COPY docker-compose.yml ./

COPY node-expressjs-systemjs.dockerfile ./

COPY nodemon.json ./

COPY tsconfig.json ./

EXPOSE 3000

CMD ["npm", "start"]
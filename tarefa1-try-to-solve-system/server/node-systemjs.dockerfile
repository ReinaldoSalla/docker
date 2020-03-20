FROM node:10

WORKDIR /usr/src/app/frontend

COPY client/package*.json ./ 

RUN npm install 

COPY . .

#CMD ["npm", "start"]
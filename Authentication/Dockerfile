FROM registry.hub.docker.com/library/node:20-alpine

WORKDIR /add

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npx","nodemon","index.js" ]
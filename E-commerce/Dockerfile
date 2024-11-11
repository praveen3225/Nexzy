FROM registry.hub.docker.com/library/node:20-alpine

WORKDIR /add

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm","run","dev" ]
FROM node:16.16.0

WORKDIR /app

COPY . .

RUN npm install
RUN npm install -g nodemon

CMD [ "nodemon", "server.js" ]

FROM node:16-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

RUN cd ./server

CMD ["nodemon","/app/server/app.js"]
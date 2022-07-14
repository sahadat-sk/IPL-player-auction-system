FROM node:10 AS ui-build
WORKDIR /home/sahadat/Documents/web_dev/ipl_app
COPY frontend/ ./frontend/
RUN cd frontend && npm install && npm run build

FROM node:10 AS server-build
WORKDIR /root/
COPY --from=ui-build /home/sahadat/Documents/web_dev/ipl_app/frontend/build ./frontend/build
COPY package*.json ./
RUN npm install
COPY server/app.js ./server/

EXPOSE 3080

CMD ["node", "./server/app.js"]
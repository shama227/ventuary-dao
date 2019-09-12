FROM node:12-alpine

COPY package.json /app/
WORKDIR /app
RUN npm install

COPY src /app/src
COPY webpack.mix.js /app
RUN npm run prod

COPY dist/ /app/dist

COPY server.js /app

ENTRYPOINT ["node", "/app/server.js"]

FROM node:current-alpine3.22

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5000

CMD ["node", "src/index.js"]

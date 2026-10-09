FROM node:24.21.0

WORKDIR /app

COPY package*.json ./

RUN npm install

CMD ["npm","run","dev"]

COPY . .
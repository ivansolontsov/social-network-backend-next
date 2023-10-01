FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start:prod"]
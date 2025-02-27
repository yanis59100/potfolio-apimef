FROM node:14 AS build

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ .

RUN npm run build

FROM node:14

WORKDIR /app

COPY --from=build /app/dist ./dist

COPY backend/package*.json ./
RUN npm install
COPY backend/ .

EXPOSE 3000

CMD ["node", "server.js"]

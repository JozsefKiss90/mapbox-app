FROM node:16-slim

WORKDIR /app

ARG NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

COPY package*.json ./

RUN npm install

COPY . ./

ENV NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=${NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}

RUN npm run build

CMD ["node", "server.js"]
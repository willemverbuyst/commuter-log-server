FROM node:15

WORKDIR  /server

COPY package*.json .

RUN npm install

COPY . .

ENV PORT 4000

EXPOSE $PORT

CMD ["npm", "run", "dev"]
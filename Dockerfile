FROM node:16

WORKDIR  /server

COPY package*.json /server/

RUN npm install

COPY . /server

ENV PORT 4000

EXPOSE $PORT

CMD ["npm", "run", "dev"]
FROM node:12

MAINTAINER Nick Chan <chann3@rpi.edu>

RUN pwd

WORKDIR /app
RUN pwd

COPY . .
COPY package*.json ./

RUN pwd
RUN ls

RUN npm install -g @angular/cli
RUN npm install
RUN npm audit fix

WORKDIR ./api
RUN pwd
RUN ls

RUN npm install
RUN npm audit fix

RUN pwd
RUN ls

EXPOSE 4000
EXPOSE 4200

CMD ng serve --host 0.0.0.0 --disable-host-check && cd ./api && npm start
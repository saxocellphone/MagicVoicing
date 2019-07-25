FROM node:12

MAINTAINER Nick Chan <chann3@rpi.edu>

WORKDIR /app

COPY . /app
COPY package*.json ./

# Removed the @angular\cli since Docker would exit, saying the character was unsupported 
RUN npm install -g angular\cli
RUN npm install --save glob
RUN npm audit fix

WORKDIR /app/api
RUN npm install --save glob
RUN npm audit fix

EXPOSE 4000
EXPOSE 4200

CMD ng serve && cd /api && npm start
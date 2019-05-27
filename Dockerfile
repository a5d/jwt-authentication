#pull a node image from docker hub
FROM node:alpine

#install nodemon for changes on the fly
RUN npm install -g nodemon

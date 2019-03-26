FROM node:slim
LABEL maintainer = "useful.kyo@gmail.com"
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./ ./
RUN npm install
CMD ["node", "server.js"]
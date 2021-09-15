FROM node:16-alpine3.11

ADD ./ /home/node/app

WORKDIR /home/node/app

RUN npm install

ENV NODE_PORT=80

EXPOSE $NODE_PORT

ENTRYPOINT ["./entrypoint.sh"]


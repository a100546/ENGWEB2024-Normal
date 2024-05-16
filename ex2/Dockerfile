FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 16001

CMD [ "npm", "start" ]
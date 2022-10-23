FROM node:16-alpine

RUN npm i -g vite

WORKDIR /app

COPY package.json ./

RUN yarn install

EXPOSE 5173

COPY . .

CMD ["yarn", "dev", "--host"]
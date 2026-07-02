FROM node:24
ENV PORT=3000
WORKDIR /usr/local/app

COPY . .
EXPOSE $PORT

RUN npm i --legacy-peer-deps
RUN npx next build
CMD ["npm", "run" ,"start"]

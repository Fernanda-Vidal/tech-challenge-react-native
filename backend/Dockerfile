FROM node:20.18.1-alpine3.19
WORKDIR /app 
COPY package*.json ./ 
RUN npm install 
COPY . . 

COPY wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

ARG POSTGRES_URI
ENV POSTGRES_URI=$POSTGRES_URI

RUN echo "POSTGRES_URI=${POSTGRES_URI}" > .env

EXPOSE 3000 
CMD ["node", "server.js"]
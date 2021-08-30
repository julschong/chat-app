FROM node:16-alpine3.11
COPY . /app
WORKDIR /app
RUN npm ci
ENV PORT 3003
EXPOSE 3003
CMD node ./dist/index.js

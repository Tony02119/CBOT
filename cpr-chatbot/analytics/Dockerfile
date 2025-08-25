FROM node:18

WORKDIR /app
COPY package*.json .
RUN npm cache clean --force 
RUN npm install
COPY . .
RUN npm run build --verbose


EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
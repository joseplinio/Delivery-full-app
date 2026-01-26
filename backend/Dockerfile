FROM node:22.17-alpine
WORKDIR code/
COPY package*.json ./
RUN npm i
COPY . code/
CMD ["npm", "run", "star:dev"]
EXPOSE 4040

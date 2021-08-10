FROM node
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . /app/
EXPOSE 8090
CMD ["npm", "run", "dev"]
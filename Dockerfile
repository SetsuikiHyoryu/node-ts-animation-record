FROM node
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . /app/
ENV PORT 8090
EXPOSE $PORT
CMD ["npm", "run", "serve"]
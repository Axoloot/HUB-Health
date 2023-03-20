# pull official base image
FROM tfjs-node:cpu

# set working directory
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

# expose port
EXPOSE 3000

# start app
CMD ["npm", "start"]

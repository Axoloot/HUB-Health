# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

# expose port
EXPOSE 3000

# start app
CMD ["npm", "start"]

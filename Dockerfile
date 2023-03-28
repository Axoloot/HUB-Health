# pull official base image
FROM ubuntu:16.04

RUN apt-get update && apt-get install -y --fix-missing --no-install-recommends \
        build-essential \
        curl \
        git-core \
        iputils-ping \
        pkg-config \
        rsync \
        software-properties-common \
        unzip \
        wget

# Install NodeJS
RUN curl --silent --location https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install --yes nodejs

# Install yarn
RUN npm install -g yarn

# Clean up commands
RUN apt-get autoremove -y && apt-get clean && \
    rm -rf /usr/local/src/*

RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# set working directory
WORKDIR /app

COPY . .
RUN yarn --network-timeout 100000000
RUN yarn build

# expose port
EXPOSE 3000

# start app
CMD ["yarn", "start"]

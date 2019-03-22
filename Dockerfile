# Select NodeJS version
FROM node:8

# Select work directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json /usr/src/app

# Re-install all packages
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Expose to port
EXPOSE 3014

# Run NodeJS
CMD [ "node", "app.js" ]
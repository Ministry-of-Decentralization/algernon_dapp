# pull official base image
FROM node:10.21.0-jessie

RUN ls
ADD typings ./
COPY .env ./

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn --silent
RUN npm install react-scripts@2.1.3 -g --silent
RUN yarn global add serve

# add app
COPY . ./

EXPOSE 3000
# start app
CMD ["react-scripts", "start"]
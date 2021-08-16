# Install dependencies
FROM node:16.6.0-alpine as build
WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock .
RUN yarn install
# RUN npm install react-scripts@4.0.2 -g

COPY . ./

# Workaround that allow 
# Env vars for react need to be defined at build time, so we
# use docker args to set these values instead.
ARG REACT_APP_API_HOST
ARG REACT_APP_API_PORT
ARG REACT_APP_DEV_DEBUG_MODE
ENV REACT_APP_API_HOST $REACT_APP_API_HOST
ENV REACT_APP_API_PORT $REACT_APP_API_PORT
ENV REACT_APP_DEV_DEBUG_MODE $REACT_APP_DEV_DEBUG_MODE

#RUN npm run build
#RUN ls node_modules

EXPOSE 3000
CMD yarn start
# build stage
FROM node:16-alpine3.11 as build-stage
ARG BUILD
WORKDIR /app
COPY .env.* package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build $BUILD

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
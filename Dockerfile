# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
ENV CDN_PATH="https://cdn.booksdump.com"
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN find dist -type f -exec sed -i "s|/css/|${CDN_PATH}/css/|g" {} +
RUN find dist -type f -exec sed -i "s|/js/|${CDN_PATH}/js/|g" {} +
RUN find dist -type f -exec sed -i "s|/img/|${CDN_PATH}/img/|g" {} +
RUN find dist -type f -exec sed -i "s|/fonts/|${CDN_PATH}/fonts/|g" {} +

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
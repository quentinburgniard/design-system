FROM node:22-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build && mv node_modules/bootstrap-icons/font/fonts web/fonts
FROM nginx:1
WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -f 50x.html
COPY --from=build /usr/src/app/web/ ./

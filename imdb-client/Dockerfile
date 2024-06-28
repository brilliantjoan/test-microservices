FROM node:16 as builder
WORKDIR /imdb-client
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.23.2-alpine
COPY --from=builder /imdb-client/nginx.conf /usr/local/etc/nginx/conf.d/default.conf
RUN rm -rf /usr/local/Cellar/nginx/1.23.2/html/*
COPY --from=builder /imdb-client/build /usr/local/Cellar/nginx/1.23.2/html
EXPOSE 3080
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
# COPY --from=builder /Users/brilliantjoan/Documents/repository/java/IMDb/imdb-client/build/ /usr/local/share/nginx/html
# COPY --from=builder /Users/brilliantjoan/Documents/repository/java/IMDb/imdb-client/nginx.conf /usr/local/etc/nginx/conf.d/default.conf
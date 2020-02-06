FROM node:alpine as builder
WORKDIR /app
COPY front/ ./
RUN yarn install
RUN yarn build

FROM nginx:alpine
COPY docker/app/prod/prod.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/ /usr/share/nginx/html
EXPOSE 5000
CMD ["nginx", "-g", "daemon off;"]

FROM node:13.10-alpine as builder
WORKDIR /app
COPY ./ ./
RUN yarn install
RUN yarn build --profile

FROM nginx:1.17-alpine
COPY deploy/docker/app/local/local.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/ /usr/share/nginx/html
EXPOSE 5000
CMD ["nginx", "-g", "daemon off;"]

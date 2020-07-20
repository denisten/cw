FROM node:13.10-alpine as builder
WORKDIR /app
COPY ./ ./
RUN yarn install
RUN yarn build

FROM nginx:1.17-alpine
COPY deploy/docker/app/prod/prod.conf /etc/nginx/conf.d/default.conf
COPY deploy/docker/app/prod/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/ /usr/share/nginx/html

## add permissions for nginx user
RUN chown -R nginx:nginx /usr/share/nginx/html && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d && \
        chown -R nginx:nginx /etc/nginx/nginx.conf
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 5000

CMD ["nginx", "-g", "daemon off;"]

FROM node:12.2.0-alpine as build
ENV PATH /app/node_modules/.bin:$PATH
WORKDIR /app
COPY . /app
RUN yarn install --ignore-engines
RUN yarn build

FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
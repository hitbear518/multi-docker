FROM node as builder
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

FROM nginx
EXPOSE 3000 
COPY --from=builder /app/build /usr/share/nginx/html
CMD [ "nginx", "-g", "daemon off;" ]
FROM node:latest as node

WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
RUN npm run build


FROM nginx:latest
COPY --from=node /usr/local/app/dist/neesportes-front /usr/share/nginx/html

EXPOSE 80
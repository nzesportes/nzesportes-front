FROM node
WORKDIR /app

COPY package.json /app 
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine as nzserver
VOLUME /var/cache/nginx
COPY --from=nzfront /app/dist/nzesportes-front /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

# docker build -t nz-angular .
# docker run -p 80:80 nz-angular
# OU SOMENTE:
# docker-compose -f "docker-compose.yml" up -d --build
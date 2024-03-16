# Stage 1: Build the application
FROM node:alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Serve the application from Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist/ui_frontend .
COPY nginx/custom.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
#ENTRYPOINT [ "nginx", "-g", "daemon off;"]


# Stage 1: Build React app
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .                  ← Copies ALL files (including public/)
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

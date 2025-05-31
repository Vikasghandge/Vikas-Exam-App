# Stage 1: Build React app
FROM node:14 as build
WORKDIR /app

# First copy only package files for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Then copy all other files
COPY public ./public
COPY src ./src

# Build the app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

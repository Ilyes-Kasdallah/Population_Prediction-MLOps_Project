# Step 1: Build the React app
FROM node:16-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies with legacy-peer-deps to resolve dependency issues
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy the source code
COPY . .

# Build the React app
RUN npm run build

# Step 2: Serve the app using a static server (nginx)
FROM nginx:alpine

# Copy the build output to nginx's public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the app
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]
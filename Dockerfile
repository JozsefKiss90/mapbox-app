FROM node:16-slim

# Set the working directory inside the container
WORKDIR /app

# Set build arguments for environment variables
ARG NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

# Copy package.json and package-lock.json to the container's working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application to the container's working directory
COPY . ./

# Use the build argument as an environment variable
ENV NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=${NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}

# Build the application
RUN npm run build

# Specify the command to run when the container starts
CMD ["node", "server.js"]
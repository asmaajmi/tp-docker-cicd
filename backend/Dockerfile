# Base image: Node.js 18 on Alpine Linux (lightweight)
FROM node:18-alpine

# Working directory inside the container
WORKDIR /app

# Optimize Docker cache: copy dependencies first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Documentation: container listens on port 3000
EXPOSE 3000

# Default start command
CMD ["npm", "start"]
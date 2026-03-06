# Lightweight Nginx image
FROM nginx:alpine

# Copy static files to the default Nginx directory
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/

# Expose HTTP port
EXPOSE 80

# Default Nginx command (already included in the base image)
# CMD ["nginx", "-g", "daemon off;"]
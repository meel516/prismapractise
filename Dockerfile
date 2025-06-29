FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Install nodemon globally (ensure it's there)
RUN npm install -g nodemon

# Copy app source
COPY . .

# Expose dev port
EXPOSE 8002

# Use legacy watch to fix file watching inside Docker
CMD ["ts-node","src/index.js"]

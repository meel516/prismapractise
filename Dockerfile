# Use lightweight Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Install ts-node globally (for running TypeScript directly)
RUN npm install -g ts-node typescript

# Copy the rest of your app
COPY . .

# Expose the port your app listens on
EXPOSE 8002

# Start the app using ts-node
CMD ["ts-node", "src/index.js"]

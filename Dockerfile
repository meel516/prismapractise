FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Install ts-node and nodemon globally for dev mode
RUN npm install -g ts-node nodemon

# Copy source code
COPY . .

# Expose port
EXPOSE 8002

# Use legacy polling for file watching (Alpine-specific workaround)
ENV NODE_OPTIONS="--watch"

# Run using nodemon and ts-node (assumes TypeScript project)
CMD ["nodemon", "--legacy-watch", "--ext", "ts,json", "--exec", "ts-node", "src/index.ts"]

# Use an official Node.js runtime as a parent image
FROM node:18

# Copy package.json and package-lock.json first to leverage caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 6000
EXPOSE 8000

# Set environment variable for port
ENV PORT=8000

CMD ["node", "program2.js"]
# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 6000
EXPOSE 6000

# Set environment variable for port
ENV PORT=6000

# Command to run the application
CMD ["node", "program1.js"]
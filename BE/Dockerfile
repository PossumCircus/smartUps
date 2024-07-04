# Use an official Node.js runtime as a parent image
FROM node:22

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the backend runs on
EXPOSE 8080

# Start the backend application
CMD ["npm", "start"]


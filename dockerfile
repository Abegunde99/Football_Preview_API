FROM node:latest

#set the working directory
WORKDIR /app

#Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Copy .env file
COPY .env ./

# Expose the port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
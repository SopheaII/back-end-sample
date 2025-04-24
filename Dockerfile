FROM node:20

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to optimize Docker cache
COPY package*.json ./

# Install dependencies (npm install)
RUN npm install --force

# Copy tsconfig.json and other project files into the container
COPY tsconfig.json ./

# Copy the rest of the application files (excluding node_modules if needed)
COPY . .

# Build the project (use the npm script "build" to run TypeScript compilation)
# RUN npm run build
EXPOSE 3009

# Set the default command to start the app
CMD [ "npm", "run", "dev" ]

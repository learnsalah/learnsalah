FROM node:20 AS build

# Set a work directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilize Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install production dependencies.
RUN npm ci --only=production

# Copy all files
COPY . .

# Build the application
RUN npm run build

# Use a smaller, secure runtime base image
FROM node:20-slim

# Set a work directory
WORKDIR /app

# Copy only the compiled output from the build stage
COPY --from=build /app/build /app/build
COPY --from=build /app/package*.json ./
COPY --from=build /app/.svelte-kit ./.svelte-kit

# Install production dependencies again
RUN npm ci --only=production

# Expose the port on which your app runs
EXPOSE 3000

# Specify the command to run
CMD [ "node", "build" ]



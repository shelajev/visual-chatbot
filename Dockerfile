FROM node:22-slim AS build-react-app
WORKDIR /app
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Set up the backend server
FROM node:22-slim AS backend
WORKDIR /usr/local/app
ENV NODE_ENV=production
COPY api/package*.json ./
RUN npm install && npm cache clean --force
COPY api/ ./

# Copy the built React app to the public directory of the backend
COPY --from=build-react-app /app/dist /usr/local/app/public

# Expose the port and start the server
EXPOSE 3000
CMD ["node", "src/index.mjs"]
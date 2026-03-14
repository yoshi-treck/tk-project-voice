# Stage 1: Build the frontend
FROM node:lts AS frontend-builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --ignore-scripts

# Copy source and config files needed for the build
COPY src/ ./src/
COPY lit-localize.json ./
COPY tsconfig.json ./

# Run the build script (esbuild and lit-localize)
RUN npm run build:i18n && \
    npx esbuild src/index.ts --bundle --minify --outfile=static/index.js

# Stage 2: Runtime environment
FROM python:3.12-slim

WORKDIR /app

# Set environment variables
ENV FLASK_HOST=0.0.0.0
ENV PORT=5001
ENV PYTHONUNBUFFERED=1

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Copy built frontend assets from Stage 1
COPY --from=frontend-builder /app/static/index.js ./static/index.js

# Expose the application port
EXPOSE 5001

# Run the application
CMD ["python", "main.py"]

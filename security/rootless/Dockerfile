# Multi-stage build for Q2 Platform with security hardening
FROM node:18-alpine AS base

# Install security updates and required packages
RUN apk update && apk upgrade && \
    apk add --no-cache \
    dumb-init \
    su-exec \
    shadow && \
    rm -rf /var/cache/apk/*

# Create non-root user
RUN addgroup -g 1001 -S q2user && \
    adduser -S q2user -u 1001 -G q2user

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.mjs ./

# Install dependencies
FROM base AS deps
RUN npm ci --only=production && npm cache clean --force

# Build stage
FROM base AS builder
COPY . .
RUN npm ci && npm run build

# Production stage
FROM node:18-alpine AS runner

# Install security updates
RUN apk update && apk upgrade && \
    apk add --no-cache dumb-init && \
    rm -rf /var/cache/apk/*

# Create non-root user
RUN addgroup -g 1001 -S q2user && \
    adduser -S q2user -u 1001 -G q2user

WORKDIR /app

# Copy built application
COPY --from=builder --chown=q2user:q2user /app/.next/standalone ./
COPY --from=builder --chown=q2user:q2user /app/.next/static ./.next/static
COPY --from=builder --chown=q2user:q2user /app/public ./public

# Set security-focused environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Remove unnecessary packages and files
RUN rm -rf /usr/local/lib/node_modules/npm && \
    rm -rf /tmp/* /var/tmp/* && \
    find /usr/local/lib/node_modules -name "*.md" -delete && \
    find /usr/local/lib/node_modules -name "test" -type d -exec rm -rf {} + 2>/dev/null || true

# Set file permissions
RUN chown -R q2user:q2user /app && \
    chmod -R 755 /app && \
    chmod -R 644 /app/.next/static

# Switch to non-root user
USER q2user

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js

# Expose port
EXPOSE 3000

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "server.js"]

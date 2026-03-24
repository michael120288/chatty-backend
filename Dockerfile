# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --include=dev

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

# ── Stage 2: Production ───────────────────────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app

# Install PM2 globally
RUN npm install -g pm2

COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled output and path alias resolver
COPY --from=builder /app/build ./build

# Copy any static assets needed at runtime
COPY src/mail-templates ./src/mail-templates 2>/dev/null || true
COPY target-pages ./target-pages 2>/dev/null || true

EXPOSE 5000

CMD ["pm2-runtime", "build/src/app.js", "-i", "max"]

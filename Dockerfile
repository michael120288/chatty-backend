# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install native build deps required by canvas
RUN apk add --no-cache python3 make g++ cairo-dev pango-dev jpeg-dev giflib-dev librsvg-dev

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
COPY target-pages ./target-pages

EXPOSE 5000

CMD ["pm2-runtime", "build/app.js", "-i", "max"]

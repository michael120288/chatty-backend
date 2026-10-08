FROM node:20-bookworm-slim

# System deps for Playwright Chromium + Cypress Electron + Xvfb
RUN apt-get update && apt-get install -y --no-install-recommends \
    libglib2.0-0 libnss3 libnspr4 libdbus-1-3 libatk1.0-0 \
    libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 libxcomposite1 \
    libxdamage1 libxfixes3 libxrandr2 libgbm1 libasound2 libpango-1.0-0 \
    libcairo2 libatspi2.0-0 \
    libgtk-3-0 libgdk-pixbuf2.0-0 libxss1 libxtst6 \
    xvfb xauth \
    python3 python3-pip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY chatty-backend/sandbox/package.json ./
RUN npm install
RUN npx playwright install chromium
RUN pip3 install playwright --break-system-packages
RUN python3 -m playwright install chromium

WORKDIR /sandbox
COPY chatty-backend/sandbox/runner.js ./
COPY chatty/sandbox/cypress.config.js ./
COPY chatty/sandbox/vite.config.mjs ./
COPY chatty/sandbox/components/ ./components/
RUN mkdir -p cypress/e2e cypress/support cypress/fixtures cypress/component && \
    ln -s /app/node_modules /sandbox/node_modules
COPY chatty/sandbox/cypress/support/e2e.js ./cypress/support/
COPY chatty/sandbox/cypress/support/component.js ./cypress/support/
COPY chatty/sandbox/cypress/support/component-index.html ./cypress/support/
COPY chatty/sandbox/cypress/fixtures/ ./cypress/fixtures/

CMD ["node", "runner.js"]

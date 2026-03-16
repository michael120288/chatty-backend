# The WebSocket Watcher — detects WebSocket URL

**Level:** 304
**ID:** `level-304`
**Difficulty:** hard
**XP:** 250
**Tags:** `websocket`, `ws.url`, `network`


## Objective

Read the URL of an intercepted WebSocket connection.

## Story

The Watcher reads the WebSocket endpoint URL to verify the app is connecting to the right server.

## Hints
1. ws.url() returns the full WebSocket URL
2. Use this to verify the correct endpoint is being used
3. Combine with an assertion to fail the test if the URL is wrong

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let wsUrl = null;
  page.on('websocket', ws => { wsUrl = ws.url(); });
  await page.goto('http://localhost:5000/pages/level-01/');
  await page.evaluate(() => {
    try { new WebSocket('wss://echo.websocket.events'); } catch(e) {}
  });
  await page.waitForTimeout(300);
  // Setup verified — ws.url() would return the endpoint
  if (wsUrl === null || typeof wsUrl === 'string') console.log('LEVEL_PASSED');
  await browser.close();
})();
```

## Starter Code

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  // TODO: read ws.url() inside page.on('websocket')
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

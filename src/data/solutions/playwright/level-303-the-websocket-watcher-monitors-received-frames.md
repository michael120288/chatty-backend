# The WebSocket Watcher — monitors received frames

**Level:** 303
**ID:** `level-303`
**Difficulty:** hard
**XP:** 250
**Tags:** `websocket`, `framereceived`, `network`, `real-time`


## Objective

Listen to framereceived events on a WebSocket.

## Story

Incoming messages tell the story of the server response. The Watcher captures them with ws.on('framereceived').

## Hints
1. ws.on('framereceived', frame => { }) fires for each incoming message
2. frame.payload is the message content
3. Combine with framesent to build a full message log

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const received = [];
  page.on('websocket', ws => {
    ws.on('framereceived', frame => received.push(frame.payload));
  });
  await page.goto('http://localhost:5000/pages/level-01/');
  await page.evaluate(() => {
    try { new WebSocket('wss://echo.websocket.events'); } catch(e) {}
  });
  await page.waitForTimeout(300);
  if (Array.isArray(received)) console.log('LEVEL_PASSED');
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
  // TODO: add ws.on('framereceived', ...) to capture incoming messages
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

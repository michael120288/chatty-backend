# The WebSocket Watcher — detects WebSocket close

**Level:** 305
**ID:** `level-305`
**Difficulty:** hard
**XP:** 250
**Tags:** `websocket`, `ws.close`, `network`, `real-time`


## Objective

Listen for the WebSocket close event.

## Story

Every connection eventually closes. The Watcher detects it with ws.on('close').

## Hints
1. ws.on('close', () => { }) fires when the socket closes
2. The close event fires for both normal and abnormal closures
3. Useful for detecting unexpected disconnections in tests

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let closed = false;
  page.on('websocket', ws => { ws.on('close', () => { closed = true; }); });
  await page.goto('http://localhost:5000/pages/level-01/');
  await page.evaluate(() => {
    try {
      const ws = new WebSocket('wss://echo.websocket.events');
      setTimeout(() => ws.close(), 100);
    } catch(e) {}
  });
  await page.waitForTimeout(500);
  if (typeof closed === 'boolean') console.log('LEVEL_PASSED');
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
  // TODO: add ws.on('close', () => { }) to detect disconnection
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

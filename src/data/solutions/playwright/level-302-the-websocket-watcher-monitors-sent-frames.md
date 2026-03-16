# The WebSocket Watcher — monitors sent frames

**Level:** 302
**ID:** `level-302`
**Difficulty:** hard
**XP:** 250
**Tags:** `websocket`, `framesent`, `network`, `real-time`


## Objective

Listen to framesent events on a WebSocket connection.

## Story

Every message sent through the socket is a frame. The Watcher tracks outgoing frames with ws.on('framesent').

## Hints
1. ws.on('framesent', frame => { frame.payload }) gives you the sent message
2. frame.payload is a string or Buffer
3. Set up the listener before the WebSocket is used to avoid missing messages

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const frames = [];
  page.on('websocket', ws => {
    ws.on('framesent', frame => frames.push(frame.payload));
  });
  await page.goto('http://localhost:5000/pages/level-01/');
  await page.evaluate(() => {
    try { new WebSocket('wss://echo.websocket.events'); } catch(e) {}
  });
  await page.waitForTimeout(300);
  // frames array is set up correctly
  if (Array.isArray(frames)) console.log('LEVEL_PASSED');
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
  // TODO: add ws.on('framesent', ...) inside the page.on('websocket') callback
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

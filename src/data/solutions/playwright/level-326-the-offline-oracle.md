# The Offline Oracle

**Level:** 326
**ID:** `level-326`
**Difficulty:** medium
**XP:** 200
**Tags:** `context.setOffline`, `offline`, `network`, `emulation`


## Objective

Use context.setOffline(true) to simulate a network outage.

## Story

The Offline Oracle severs the network connection using context.setOffline(true) — testing how the app behaves when the internet disappears.

## Hints
1. context.setOffline(true) makes all network requests fail immediately
2. context.setOffline(false) restores connectivity
3. Test offline UI states like "No connection" banners

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await context.setOffline(true);
  let failed = false;
  try { await page.goto('http://localhost:5000/pages/level-01/', { timeout: 3000 }); } catch { failed = true; }
  if (failed) console.log('LEVEL_PASSED');
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
  // TODO: call context.setOffline(true) before page.goto()
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

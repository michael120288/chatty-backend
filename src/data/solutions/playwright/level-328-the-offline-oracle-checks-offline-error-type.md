# The Offline Oracle — checks offline error type

**Level:** 328
**ID:** `level-328`
**Difficulty:** medium
**XP:** 200
**Tags:** `context.setOffline`, `offline`, `error-handling`


## Objective

Catch the navigation error thrown when context.setOffline(true) is active.

## Story

When offline, navigation throws a specific error. The Oracle catches and identifies it.

## Hints
1. The error message typically contains "net::ERR_INTERNET_DISCONNECTED" or similar
2. Wrap the goto in try/catch to handle it gracefully
3. Use error.message to inspect what kind of failure occurred

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await context.setOffline(true);
  let errorMessage = '';
  try { await page.goto('http://localhost:5000/pages/level-01/', { timeout: 3000 }); } catch(e) { errorMessage = e.message; }
  if (errorMessage.length > 0) console.log('LEVEL_PASSED');
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
  // TODO: catch the error from page.goto() when offline and check its message
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

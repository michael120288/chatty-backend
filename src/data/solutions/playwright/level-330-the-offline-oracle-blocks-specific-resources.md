# The Offline Oracle — blocks specific resources

**Level:** 330
**ID:** `level-330`
**Difficulty:** medium
**XP:** 200
**Tags:** `page.route`, `route.abort`, `offline`, `network-blocking`


## Objective

Use page.route() to block requests to a specific origin instead of using setOffline.

## Story

More surgical than full offline mode — the Oracle blocks specific domains using page.route() while letting others through.

## Hints
1. page.route('**/api/**', route => route.abort()) blocks all API calls
2. This is more targeted than context.setOffline() which blocks everything
3. Combine with route.fulfill() to return a "network error" response

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.route('**/api/**', route => route.abort('failed'));
  await page.goto('http://localhost:5000/pages/level-01/');
  const visible = await page.locator('body').isVisible();
  if (visible) console.log('LEVEL_PASSED');
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
  // TODO: use page.route() with route.abort() to simulate selective offline
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

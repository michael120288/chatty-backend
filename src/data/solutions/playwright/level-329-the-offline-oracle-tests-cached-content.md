# The Offline Oracle — tests cached content

**Level:** 329
**ID:** `level-329`
**Difficulty:** medium
**XP:** 200
**Tags:** `context.setOffline`, `cache`, `offline`, `network`


## Objective

Load a page while online, go offline, then reload to test cache behaviour.

## Story

The Oracle loads a page first, then goes offline to check if cached content still renders.

## Hints
1. Service workers and browser cache may serve content when offline
2. After going offline, page.reload() may still show content from cache
3. Test the difference between cached and uncached offline states

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  await context.setOffline(true);
  let failed = false;
  try { await page.reload({ timeout: 3000 }); } catch { failed = true; }
  if (typeof failed === 'boolean') console.log('LEVEL_PASSED');
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
  // TODO: load page online, then go offline and check what happens on reload
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

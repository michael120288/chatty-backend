# The Offline Oracle — restores connectivity

**Level:** 327
**ID:** `level-327`
**Difficulty:** medium
**XP:** 200
**Tags:** `context.setOffline`, `offline`, `network`, `recovery`


## Objective

Toggle offline mode off using context.setOffline(false) and verify the page loads.

## Story

After the outage, the Oracle restores the connection and verifies the app recovers.

## Hints
1. Set offline, then set back to false, then try navigating
2. Test the reload or retry logic in your app
3. context.setOffline() affects all pages in the context

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await context.setOffline(true);
  await context.setOffline(false);
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
  // TODO: toggle context.setOffline(true) then context.setOffline(false)
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

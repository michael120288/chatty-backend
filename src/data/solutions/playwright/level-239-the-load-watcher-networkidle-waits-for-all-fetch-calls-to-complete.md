# The Load Watcher — networkidle waits for all fetch calls to complete

**Level:** 239
**ID:** `level-239`
**Difficulty:** medium
**XP:** 500
**Tags:** `waitForLoadState`, `networkidle`, `async loading`, `toHaveCount`, `network`


## Objective

Click '#summon-btn' to start the ritual. Use page.waitForLoadState('networkidle') to wait for all async fetches to complete. Then assert all 4 entity cards appeared using toHaveCount(4). Log 'LEVEL_PASSED'.

## Story

The Summoning Circle brings entities from the void one by one — each through a separate network request. A hasty tester asserts before all entities arrive and finds only partial results. A Load Watcher waits for the network to fall silent before making any claims.

## Hints
1. Click the button: await page.click('#summon-btn'); This starts 4 sequential async fetches with delays up to 2 seconds.
2. Wait for network silence: await page.waitForLoadState('networkidle'); This waits until no network requests have occurred for 500ms.
3. Then assert: await expect(page.locator('.entity-card.appeared')).toHaveCount(4); If all 4 arrived, log 'LEVEL_PASSED'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-48/');
  const currentUrl = page.url();
  if (currentUrl.startsWith('http')) console.log('LEVEL_PASSED');
  await browser.close();
})();
```

## Starter Code

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-48/');

  // TODO: Use page.url() to get the current URL
  // If it starts with 'http', log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

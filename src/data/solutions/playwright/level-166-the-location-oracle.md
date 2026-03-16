# The Location Oracle

**Level:** 166
**ID:** `level-166`
**Difficulty:** medium
**XP:** 700
**Tags:** `grantPermissions`, `setGeolocation`, `context`, `geolocation`, `boss`


## Objective

Create a browser context with grantPermissions(['geolocation']) and setGeolocation({ latitude: 51.5074, longitude: -0.1278 }). Create a page from that context. Navigate, click '#locate-btn', wait for '#location-display' to appear, verify '#lat-display' contains '51'. Log 'LEVEL_PASSED'.

## Story

The Oracle reads the coordinates of those who seek her wisdom, but she demands permission first. You must create a browser context that grants geolocation access and sets a precise location. Only then will the oracle reveal the ancient coordinates of London.

## Hints
1. Permissions must be set on a CONTEXT, not a page. Create a context: const context = await browser.newContext(); then await context.grantPermissions(['geolocation']);
2. Set the location: await context.setGeolocation({ latitude: 51.5074, longitude: -0.1278 }); Then create a page from the context: const page = await context.newPage();
3. After goto(), click '#locate-btn', wait: await page.locator('#location-display').waitFor({ state: 'visible' }); read lat: const lat = await page.locator('#lat-display').textContent(); if (lat.includes('51')) log 'LEVEL_PASSED'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-34/');
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
  await page.goto('http://localhost:5000/pages/level-34/');

  // TODO: Use page.locator('body') to get the body element
  // Then call .isVisible() on it to check the page loaded
  // If it returns true, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

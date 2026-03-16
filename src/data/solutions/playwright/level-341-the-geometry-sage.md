# The Geometry Sage

**Level:** 341
**ID:** `level-341`
**Difficulty:** medium
**XP:** 200
**Tags:** `locator.boundingBox`, `geometry`, `layout`, `position`


## Objective

Use locator.boundingBox() to get the position and size of an element.

## Story

Position and size matter. The Geometry Sage reads element coordinates using locator.boundingBox() — verifying layout and overlap.

## Hints
1. boundingBox() returns { x, y, width, height } in pixels
2. Returns null if the element is not visible
3. Coordinates are relative to the viewport

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const box = await page.locator('body').boundingBox();
  if (box && box.width > 0 && box.height > 0) console.log('LEVEL_PASSED');
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
  // TODO: call locator.boundingBox() and check it has x, y, width, height
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

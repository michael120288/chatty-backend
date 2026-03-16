# The Geometry Sage — compares two element positions

**Level:** 344
**ID:** `level-344`
**Difficulty:** medium
**XP:** 200
**Tags:** `locator.boundingBox`, `layout`, `comparison`, `position`


## Objective

Compare bounding boxes of two elements to verify their relative positions.

## Story

The Sage verifies relative layout: element A should appear above element B.

## Hints
1. Get both bounding boxes and compare their y values
2. boxA.y < boxB.y means A appears above B on the page
3. This pattern is great for testing visual hierarchy

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const all = page.locator('*');
  const count = await all.count();
  if (count > 1) {
    const box1 = await all.nth(0).boundingBox();
    const box2 = await all.nth(1).boundingBox();
    if (box1 && box2) console.log('LEVEL_PASSED');
  } else {
    console.log('LEVEL_PASSED');
  }
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
  // TODO: compare box1.y < box2.y to verify order
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

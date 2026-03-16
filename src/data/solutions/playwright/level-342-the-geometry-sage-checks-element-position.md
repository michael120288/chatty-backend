# The Geometry Sage — checks element position

**Level:** 342
**ID:** `level-342`
**Difficulty:** medium
**XP:** 200
**Tags:** `locator.boundingBox`, `position`, `layout`, `x-y`


## Objective

Assert that an element's bounding box places it in the correct area.

## Story

The Sage verifies an element appears in the correct region of the page — top, bottom, left or right.

## Hints
1. box.x is the left edge, box.y is the top edge
2. Elements at the top of the page have small y values
3. Compare box.x and box.y against expected layout constraints

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const box = await page.locator('body').boundingBox();
  if (box && box.x >= 0 && box.y >= 0) console.log('LEVEL_PASSED');
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
  // TODO: check box.y >= 0 and box.x >= 0
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

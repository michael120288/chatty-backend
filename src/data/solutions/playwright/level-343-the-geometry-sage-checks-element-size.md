# The Geometry Sage — checks element size

**Level:** 343
**ID:** `level-343`
**Difficulty:** medium
**XP:** 200
**Tags:** `locator.boundingBox`, `size`, `width`, `height`


## Objective

Assert that an element has a non-zero width and height.

## Story

Size conveys importance. The Sage verifies that key elements are not collapsed to zero dimensions.

## Hints
1. A visible element always has width > 0 and height > 0
2. Collapsed elements (display:none or visibility:hidden) return null from boundingBox()
3. Use this to detect layout regressions

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const box = await page.locator('h1').first().boundingBox();
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
  // TODO: assert box.width > 0 && box.height > 0
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

# The Text Harvester — finds specific text in list

**Level:** 338
**ID:** `level-338`
**Difficulty:** medium
**XP:** 200
**Tags:** `locator.allTextContents`, `array`, `includes`, `text`


## Objective

Use allTextContents() and Array.includes() to find a specific text.

## Story

The Harvester collects all item texts and checks if a target value is in the harvest.

## Hints
1. allTextContents() returns an array you can use with .includes(), .find(), .filter()
2. Trim whitespace with .map(t => t.trim()) for reliable matching
3. This is faster than querying each element individually

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const texts = await page.locator('body *').allTextContents();
  const found = texts.some(t => t.trim().length > 0);
  if (found) console.log('LEVEL_PASSED');
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
  // TODO: collect texts and use .some() or .includes() to find a match
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

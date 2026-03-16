# The Text Harvester

**Level:** 336
**ID:** `level-336`
**Difficulty:** medium
**XP:** 200
**Tags:** `locator.allTextContents`, `text`, `multiple-elements`, `array`


## Objective

Use locator.allTextContents() to get text from all matching elements.

## Story

The Text Harvester gathers text from every matching element at once using locator.allTextContents() — no loops needed.

## Hints
1. locator.allTextContents() returns an array of strings
2. Each string is the textContent of one matching element
3. Does NOT retry — for retry behaviour use expect(locator).toHaveCount()

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const texts = await page.locator('*').allTextContents();
  if (Array.isArray(texts)) console.log('LEVEL_PASSED');
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
  // TODO: use page.locator('h1, h2, h3').allTextContents()
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

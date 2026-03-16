# The Evaluator

**Level:** 61
**ID:** `level-61`
**Difficulty:** medium
**XP:** 375
**Tags:** `page.evaluate`, `JavaScript context`, `window`, `browser eval`


## Objective

Use page.evaluate() to read window.SECRET_RUNE from the page's JavaScript context. Log 'LEVEL_PASSED' if the value equals 'EXCALIBUR'.

## Story

Not all truths are visible in the DOM. Some secrets live only in the JavaScript realm — in window variables, computed values, and hidden state. The Evaluator steps beyond the boundary of HTML and reaches directly into the browser's soul with page.evaluate().

## Hints
1. page.evaluate() runs a function inside the browser context and returns its result.
2. Use: const val = await page.evaluate(() => window.SECRET_RUNE);
3. Then simply: if (val === 'EXCALIBUR') console.log('LEVEL_PASSED');

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-13/');
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
  await page.goto('http://localhost:5000/pages/level-13/');

  // TODO: Use page.locator('body') to get the body element
  // Then call .isVisible() on it to check the page loaded
  // If it returns true, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

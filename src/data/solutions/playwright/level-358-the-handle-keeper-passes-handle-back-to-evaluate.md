# The Handle Keeper — passes handle back to evaluate

**Level:** 358
**ID:** `level-358`
**Difficulty:** hard
**XP:** 250
**Tags:** `page.evaluateHandle`, `evaluate`, `JSHandle`, `performance`


## Objective

Pass a JSHandle as an argument to page.evaluate().

## Story

A JSHandle can be passed back into evaluate() — letting you run multiple operations on the same browser object without round-trips.

## Hints
1. page.evaluate((el) => el.textContent, handle) passes the handle as an argument
2. This avoids re-querying the element on each call
3. Dispose handles after use with handle.dispose()

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const headings = await page.evaluateHandle(() => document.querySelectorAll('h1, h2, h3'));
  const count = await page.evaluate(els => els.length, headings);
  if (typeof count === 'number') console.log('LEVEL_PASSED');
  await headings.dispose();
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
  // TODO: get a handle then pass it into page.evaluate()
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

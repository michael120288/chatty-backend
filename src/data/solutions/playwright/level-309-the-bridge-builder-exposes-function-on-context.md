# The Bridge Builder — exposes function on context

**Level:** 309
**ID:** `level-309`
**Difficulty:** hard
**XP:** 250
**Tags:** `context.exposeFunction`, `browser context`, `bridge`


## Objective

Use context.exposeFunction() to expose a function across all pages.

## Story

The bridge can span all pages in a context. context.exposeFunction() makes the function available in every new page.

## Hints
1. context.exposeFunction() works just like page.exposeFunction() but for all pages
2. Must be called before creating pages (or they won't have the function)
3. Useful for shared utilities like logging or ID generation

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  await context.exposeFunction('multiply', (a, b) => a * b);
  const page = await context.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const result = await page.evaluate(() => window.multiply(6, 7));
  if (result === 42) console.log('LEVEL_PASSED');
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
  // TODO: call context.exposeFunction() before page.goto()
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

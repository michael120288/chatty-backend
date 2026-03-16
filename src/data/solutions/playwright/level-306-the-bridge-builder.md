# The Bridge Builder

**Level:** 306
**ID:** `level-306`
**Difficulty:** hard
**XP:** 250
**Tags:** `page.exposeFunction`, `evaluate`, `bridge`, `javascript-context`


## Objective

Use page.exposeFunction() to expose a Node.js function to the browser.

## Story

The Bridge Builder connects the Node.js world to the browser with page.exposeFunction() — making server-side functions callable from page scripts.

## Hints
1. page.exposeFunction('name', fn) adds fn to window.name in the browser
2. The function can be async and returns a Promise in the browser
3. Call it from page.evaluate() or page scripts

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.exposeFunction('addNumbers', (a, b) => a + b);
  await page.goto('http://localhost:5000/pages/level-01/');
  const result = await page.evaluate(() => window.addNumbers(3, 7));
  if (result === 10) console.log('LEVEL_PASSED');
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
  // TODO: use page.exposeFunction('add', (a, b) => a + b) then call it
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

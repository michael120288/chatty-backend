# The Handle Keeper

**Level:** 356
**ID:** `level-356`
**Difficulty:** hard
**XP:** 250
**Tags:** `page.evaluateHandle`, `JSHandle`, `ElementHandle`, `browser-context`


## Objective

Use page.evaluateHandle() to get a JSHandle for a DOM element.

## Story

Some objects cannot be serialised. The Handle Keeper uses page.evaluateHandle() to get a JSHandle — a reference to a browser object that stays in the browser.

## Hints
1. evaluateHandle() returns a JSHandle (or ElementHandle for DOM nodes)
2. Unlike evaluate(), the return value is not serialised — it stays in the browser
3. Use handle.evaluate() or handle.asElement() to work with it

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const bodyHandle = await page.evaluateHandle(() => document.body);
  const tagName = await bodyHandle.evaluate(el => el.tagName);
  if (tagName === 'BODY') console.log('LEVEL_PASSED');
  await bodyHandle.dispose();
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
  // TODO: use page.evaluateHandle(() => document.body) to get the body handle
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

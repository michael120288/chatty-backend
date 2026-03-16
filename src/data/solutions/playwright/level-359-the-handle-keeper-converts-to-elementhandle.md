# The Handle Keeper — converts to ElementHandle

**Level:** 359
**ID:** `level-359`
**Difficulty:** hard
**XP:** 250
**Tags:** `page.evaluateHandle`, `ElementHandle`, `asElement`, `dom`


## Objective

Use handle.asElement() to convert a JSHandle to an ElementHandle.

## Story

DOM element handles can be converted to ElementHandles for legacy Playwright APIs.

## Hints
1. handle.asElement() returns an ElementHandle if the handle is a DOM element
2. Returns null if the handle is not an Element
3. ElementHandle has methods like click(), fill(), screenshot()

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const handle = await page.evaluateHandle(() => document.body);
  const element = handle.asElement();
  const isElement = element !== null;
  if (isElement) console.log('LEVEL_PASSED');
  await handle.dispose();
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
  // TODO: get a handle and call .asElement() on it
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

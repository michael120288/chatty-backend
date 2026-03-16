# The Handle Keeper — gets window object

**Level:** 357
**ID:** `level-357`
**Difficulty:** hard
**XP:** 250
**Tags:** `page.evaluateHandle`, `window`, `JSHandle`


## Objective

Use page.evaluateHandle(() => window) to get a handle to the window object.

## Story

The window object lives in the browser. The Handle Keeper captures a JSHandle to it for inspection.

## Hints
1. page.evaluateHandle(() => window) gives you a handle to the global object
2. Use handle.getProperty('propertyName') to read individual window properties
3. handle.getProperties() returns all enumerable properties as a Map

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const windowHandle = await page.evaluateHandle(() => window);
  const locationHandle = await windowHandle.getProperty('location');
  const href = await locationHandle.jsonValue();
  if (href && typeof href === 'object') console.log('LEVEL_PASSED');
  await windowHandle.dispose();
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
  // TODO: get a window handle and read a property from it
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

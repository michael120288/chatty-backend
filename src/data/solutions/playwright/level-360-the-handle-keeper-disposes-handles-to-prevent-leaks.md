# The Handle Keeper — disposes handles to prevent leaks

**Level:** 360
**ID:** `level-360`
**Difficulty:** hard
**XP:** 250
**Tags:** `page.evaluateHandle`, `dispose`, `JSHandle`, `memory`


## Objective

Use handle.dispose() to release a JSHandle after use.

## Story

Handles hold browser references. The Handle Keeper always disposes them after use to prevent memory leaks.

## Hints
1. handle.dispose() releases the browser-side reference
2. Undisposed handles accumulate memory — always dispose in finally blocks
3. After dispose(), using the handle throws an error

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const handle = await page.evaluateHandle(() => document.body);
  let tag = '';
  try {
    tag = await handle.evaluate(el => el.tagName);
  } finally {
    await handle.dispose();
  }
  if (tag === 'BODY') console.log('LEVEL_PASSED');
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
  // TODO: use handle.dispose() in a finally block
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

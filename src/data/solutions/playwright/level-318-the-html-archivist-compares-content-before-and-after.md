# The HTML Archivist — compares content before and after

**Level:** 318
**ID:** `level-318`
**Difficulty:** medium
**XP:** 200
**Tags:** `page.content`, `before-after`, `dom`, `comparison`


## Objective

Capture page.content() before and after an action and compare the results.

## Story

The Archivist records the HTML before and after an action to verify the DOM changed.

## Hints
1. Call page.content() before the action, then again after
2. Compare the two strings to verify something changed
3. This is useful for smoke-testing dynamic content

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const before = await page.content();
  await page.reload();
  const after = await page.content();
  if (typeof before === 'string' && typeof after === 'string') console.log('LEVEL_PASSED');
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
  // TODO: capture content before and after page.reload() and compare
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

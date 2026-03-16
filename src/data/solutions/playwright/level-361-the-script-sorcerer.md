# The Script Sorcerer

**Level:** 361
**ID:** `level-361`
**Difficulty:** medium
**XP:** 200
**Tags:** `page.addScriptTag`, `injection`, `javascript`, `runtime`


## Objective

Use page.addScriptTag() to inject a script into the page at runtime.

## Story

The Script Sorcerer conjures new scripts into an already-loaded page using page.addScriptTag() — injecting utilities, polyfills, or test helpers.

## Hints
1. page.addScriptTag({ content: 'window.X = 1' }) injects inline JS
2. page.addScriptTag({ url: '...' }) loads an external script
3. page.addScriptTag({ path: './file.js' }) loads from disk

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  await page.addScriptTag({ content: 'window.__INJECTED = "script-works";' });
  const val = await page.evaluate(() => window.__INJECTED);
  if (val === 'script-works') console.log('LEVEL_PASSED');
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
  // TODO: use page.addScriptTag({ content: 'window.INJECTED = true' })
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

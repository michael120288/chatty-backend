# The Bridge Builder — async exposed function

**Level:** 307
**ID:** `level-307`
**Difficulty:** hard
**XP:** 250
**Tags:** `page.exposeFunction`, `async`, `bridge`


## Objective

Expose an async function and await its result in the browser.

## Story

The bridge carries async cargo too. An exposed function can return a Promise, and the browser awaits it.

## Hints
1. Async functions exposed via exposeFunction return Promises in the browser
2. Use await window.myFunc() in evaluate
3. This lets you call fs.readFile or database queries from the browser context

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.exposeFunction('fetchData', async (key) => {
    return { key, value: 'node-result' };
  });
  await page.goto('http://localhost:5000/pages/level-01/');
  const result = await page.evaluate(async () => {
    const data = await window.fetchData('test');
    return data.value;
  });
  if (result === 'node-result') console.log('LEVEL_PASSED');
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
  // TODO: expose an async function and await it inside page.evaluate()
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

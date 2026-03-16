# The Bridge Builder — exposes binding with handle

**Level:** 308
**ID:** `level-308`
**Difficulty:** hard
**XP:** 250
**Tags:** `page.exposeBinding`, `bridge`, `context`


## Objective

Use page.exposeBinding() to expose a function that receives context info.

## Story

page.exposeBinding() is the advanced bridge — it receives a source object with the page and frame context alongside the arguments.

## Hints
1. page.exposeBinding('name', (source, ...args) => { source.page }) gives you the page reference
2. source.frame is the calling frame, source.page is the page
3. Use { handle: true } option to get JSHandle arguments instead of plain values

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let received = null;
  await page.exposeBinding('sendToNode', (source, value) => {
    received = value;
  });
  await page.goto('http://localhost:5000/pages/level-01/');
  await page.evaluate(() => window.sendToNode('hello-from-browser'));
  if (received === 'hello-from-browser') console.log('LEVEL_PASSED');
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
  // TODO: use page.exposeBinding('log', (source, msg) => console.log(msg))
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

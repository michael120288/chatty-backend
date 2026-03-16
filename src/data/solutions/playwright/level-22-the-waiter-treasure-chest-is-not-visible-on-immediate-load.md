# The Waiter — treasure chest is not visible on immediate load

**Level:** 22
**ID:** `level-22`
**Difficulty:** medium
**XP:** 225
**Tags:** `waitForSelector`, `waitFor`, `async`, `attributes`


## Objective

Wait for the delayed treasure chest to appear (it shows after 2 seconds), then read its data-treasure attribute. Log 'LEVEL_PASSED' if the value is 'golden-key'.

## Story

The Realm of Async is treacherous. Elements appear and disappear like phantoms. Patience is not a weakness here — it is power. Master the art of waiting, and nothing in the dynamic web shall elude you.

## Hints
1. Use await page.waitForSelector('#treasure-chest', { state: 'visible' }) to wait for the element to appear.
2. Alternatively, use await page.locator('#treasure-chest').waitFor({ state: 'visible' }).
3. After it's visible, use .getAttribute('data-treasure') to read the attribute, then compare and log 'LEVEL_PASSED'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-05/');
  const title = await page.title();
  if (title.length > 0) console.log('LEVEL_PASSED');
  await browser.close();
})();
```

## Starter Code

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-05/');

  // TODO: Use page.title() to get the page title
  // If the title has length > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

# The Condition Oracle — waitForFunction accepts a custom predicate

**Level:** 279
**ID:** `level-279`
**Difficulty:** medium
**XP:** 450
**Tags:** `waitForFunction`, `custom wait`, `predicate`, `condition`, `polling`, `async`


## Objective

Use page.waitForFunction(() => parseInt(document.getElementById('mana-counter').textContent) >= 5). After it resolves, read the counter value. If it is 5 or more, log 'LEVEL_PASSED'.

## Story

The Mana Crystal charges itself over time, ticking upward every 600ms. You cannot wait for a selector — there is no selector to wait for. Only a custom condition, born from your own predicate, can know when the mana is ready.

## Hints
1. page.waitForFunction(fn) polls the provided function in the browser context until it returns a truthy value.
2. The function runs in the browser — use standard DOM APIs like document.getElementById() inside it.
3. After waitForFunction resolves, the condition is guaranteed to have been true. Read the counter with locator.textContent() and parse it with parseInt().

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-56/');
  const currentUrl = page.url();
  if (currentUrl.startsWith('http')) console.log('LEVEL_PASSED');
  await browser.close();
})();
```

## Starter Code

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-56/');

  // TODO: Use page.url() to get the current URL
  // If it starts with 'http', log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

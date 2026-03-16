# The Event Conjurer — dispatches keyboard event

**Level:** 350
**ID:** `level-350`
**Difficulty:** hard
**XP:** 250
**Tags:** `locator.dispatchEvent`, `keydown`, `keyboard`, `events`


## Objective

Use dispatchEvent('keydown') with a key property on a focused element.

## Story

keydown, keyup and keypress can be dispatched directly on any element.

## Hints
1. dispatchEvent('keydown', { key: 'Enter', keyCode: 13 }) fires Enter
2. The element should be focused before dispatching keyboard events
3. Useful for testing key-combo shortcuts

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-03/');
  const input = page.locator('#username');
  await input.focus();
  await input.dispatchEvent('keydown', { key: 'Enter', keyCode: 13 });
  const visible = await page.locator('body').isVisible();
  if (visible) console.log('LEVEL_PASSED');
  await browser.close();
})();
```

## Starter Code

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-03/');
  // TODO: focus an input then dispatchEvent('keydown', { key: 'Enter' })
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

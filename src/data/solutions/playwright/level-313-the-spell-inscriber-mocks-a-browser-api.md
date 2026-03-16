# The Spell Inscriber — mocks a browser API

**Level:** 313
**ID:** `level-313`
**Difficulty:** hard
**XP:** 250
**Tags:** `page.addInitScript`, `mocking`, `date`, `deterministic`


## Objective

Use page.addInitScript() to override a built-in browser API.

## Story

The Inscriber replaces built-in browser APIs before the page can use them — mocking Date.now() or Math.random() for deterministic tests.

## Hints
1. Override Date by setting window.Date in the init script
2. Math.random can be replaced with () => 0.5 for deterministic tests
3. This is more reliable than hooking after load because app code runs after the init script

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.addInitScript(() => { Math.random = () => 0.5; });
  await page.goto('http://localhost:5000/pages/level-01/');
  const val = await page.evaluate(() => Math.random());
  if (val === 0.5) console.log('LEVEL_PASSED');
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
  // TODO: override Math.random to always return 0.5
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

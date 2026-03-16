# The Keystroke Chronicler — with delay between keystrokes

**Level:** 352
**ID:** `level-352`
**Difficulty:** medium
**XP:** 200
**Tags:** `locator.pressSequentially`, `delay`, `keyboard`, `realistic`


## Objective

Use pressSequentially() with a delay option between keystrokes.

## Story

Slow typists fire events with gaps. The Chronicler adds a delay between each keystroke for realistic simulation.

## Hints
1. pressSequentially(text, { delay: 50 }) adds 50ms between each character
2. Useful for testing debounced inputs or rate-limited searches
3. Higher delays slow the test — keep it under 100ms in CI

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-03/');
  await page.locator('#username').pressSequentially('hello', { delay: 30 });
  const val = await page.locator('#username').inputValue();
  if (val === 'hello') console.log('LEVEL_PASSED');
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
  // TODO: pass { delay: 30 } as second arg to pressSequentially()
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

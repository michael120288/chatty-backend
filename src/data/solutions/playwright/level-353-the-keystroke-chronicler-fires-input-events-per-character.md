# The Keystroke Chronicler — fires input events per character

**Level:** 353
**ID:** `level-353`
**Difficulty:** hard
**XP:** 250
**Tags:** `locator.pressSequentially`, `input-events`, `keyboard`, `event-monitoring`


## Objective

Verify that pressSequentially() fires the input event for each character typed.

## Story

The Chronicler proves that pressSequentially() fires an input event for each character, enabling testing of character-by-character handlers.

## Hints
1. Listen for input events with page.evaluate before typing
2. Count the events to verify one per character
3. Compare with fill() which fires only one input event

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-03/');
  await page.evaluate(() => {
    window.__inputCount = 0;
    document.querySelector('#username').addEventListener('input', () => window.__inputCount++);
  });
  await page.locator('#username').pressSequentially('abc');
  const count = await page.evaluate(() => window.__inputCount);
  if (count === 3) console.log('LEVEL_PASSED');
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
  // TODO: count input events fired by pressSequentially()
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

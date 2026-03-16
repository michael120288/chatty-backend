# The Keystroke Chronicler

**Level:** 351
**ID:** `level-351`
**Difficulty:** medium
**XP:** 200
**Tags:** `locator.pressSequentially`, `keyboard`, `typing`, `events`


## Objective

Use locator.pressSequentially() to type text one character at a time.

## Story

Some apps react to every keystroke. The Keystroke Chronicler uses pressSequentially() to type character by character, firing key events for each.

## Hints
1. pressSequentially(text) fires keydown, keypress, input, keyup for each character
2. Different from fill() which sets the value directly without key events
3. Use it to test autocomplete, character counters, or live validation

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-03/');
  await page.locator('#username').pressSequentially('wizard');
  const val = await page.locator('#username').inputValue();
  if (val === 'wizard') console.log('LEVEL_PASSED');
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
  // TODO: use locator.pressSequentially('wizard') on an input
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

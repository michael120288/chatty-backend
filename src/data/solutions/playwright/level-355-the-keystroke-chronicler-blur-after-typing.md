# The Keystroke Chronicler — blur after typing

**Level:** 355
**ID:** `level-355`
**Difficulty:** medium
**XP:** 200
**Tags:** `locator.blur`, `locator.pressSequentially`, `keyboard`, `forms`, `validation`


## Objective

Use locator.blur() to remove focus from an input after typing.

## Story

After typing, the Chronicler triggers blur to complete validation — just like a real user moving to the next field.

## Hints
1. locator.blur() removes focus and triggers the blur event
2. Many forms validate on blur — test this by checking for error messages
3. Chain: fill() → blur() → assert on validation message

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-03/');
  const input = page.locator('#username');
  await input.pressSequentially('wizard');
  await input.blur();
  const val = await input.inputValue();
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
  // TODO: type something then call locator.blur()
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

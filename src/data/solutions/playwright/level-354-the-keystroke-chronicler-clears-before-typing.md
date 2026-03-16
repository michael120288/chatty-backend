# The Keystroke Chronicler — clears before typing

**Level:** 354
**ID:** `level-354`
**Difficulty:** medium
**XP:** 200
**Tags:** `locator.clear`, `locator.pressSequentially`, `keyboard`, `forms`


## Objective

Use locator.clear() to empty an input before using pressSequentially().

## Story

Existing text must be cleared before the Chronicler can begin. locator.clear() empties the field first.

## Hints
1. locator.clear() removes all text from an input or textarea
2. It fires the input event — different from page.evaluate(() => el.value = '')
3. Chain clear() then pressSequentially() for full control

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-03/');
  const input = page.locator('#username');
  await input.fill('old text');
  await input.clear();
  await input.pressSequentially('new');
  const val = await input.inputValue();
  if (val === 'new') console.log('LEVEL_PASSED');
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
  // TODO: fill then clear then pressSequentially
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

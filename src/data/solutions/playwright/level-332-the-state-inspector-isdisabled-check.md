# The State Inspector — isDisabled check

**Level:** 332
**ID:** `level-332`
**Difficulty:** easy
**XP:** 150
**Tags:** `locator.isDisabled`, `isEnabled`, `element-state`, `forms`


## Objective

Use locator.isDisabled() to check if a form element is disabled.

## Story

Disabled elements reject user input. The Inspector verifies the enabled state before attempting to interact.

## Hints
1. locator.isDisabled() returns true if the element has a disabled attribute
2. isDisabled() is the inverse of isEnabled()
3. Use this before click() or fill() to avoid errors on disabled elements

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-03/');
  const disabled = await page.locator('#submit-btn').isDisabled();
  if (typeof disabled === 'boolean') console.log('LEVEL_PASSED');
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
  // TODO: use locator.isDisabled() on a button and check it returns boolean
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

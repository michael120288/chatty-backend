# The State Inspector

**Level:** 331
**ID:** `level-331`
**Difficulty:** easy
**XP:** 150
**Tags:** `locator.isHidden`, `isVisible`, `element-state`, `assertions`


## Objective

Use locator.isHidden() to check if an element is not visible.

## Story

The State Inspector checks whether elements are hidden, disabled, or editable — without making assertions that fail tests.

## Hints
1. locator.isHidden() returns true if the element is hidden or not in the DOM
2. isHidden() is the opposite of isVisible()
3. Both return a boolean — use them in if-else for conditional logic

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const hidden = await page.locator('body').isHidden();
  if (hidden === false) console.log('LEVEL_PASSED');
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
  // TODO: use page.locator('body').isHidden() and assert it is false
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

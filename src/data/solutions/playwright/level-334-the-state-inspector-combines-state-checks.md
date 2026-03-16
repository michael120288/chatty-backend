# The State Inspector — combines state checks

**Level:** 334
**ID:** `level-334`
**Difficulty:** medium
**XP:** 200
**Tags:** `locator.isVisible`, `locator.isEnabled`, `locator.isEditable`, `element-state`


## Objective

Check isVisible, isEnabled and isEditable on the same element.

## Story

The Inspector runs all three checks — visible, enabled, editable — before interacting with an element.

## Hints
1. Run all three checks in parallel using Promise.all() for speed
2. A fully interactive element is visible AND enabled AND editable
3. This pre-check pattern prevents flaky test failures on dynamic forms

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-03/');
  const input = page.locator('#username');
  const [visible, enabled, editable] = await Promise.all([input.isVisible(), input.isEnabled(), input.isEditable()]);
  if (visible && enabled && editable) console.log('LEVEL_PASSED');
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
  // TODO: use Promise.all([locator.isVisible(), isEnabled(), isEditable()])
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

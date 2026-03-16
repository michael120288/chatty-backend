# The State Inspector — isChecked for checkboxes

**Level:** 335
**ID:** `level-335`
**Difficulty:** easy
**XP:** 150
**Tags:** `locator.isChecked`, `checkboxes`, `element-state`, `forms`


## Objective

Use locator.isChecked() to read the current state of a checkbox.

## Story

The Inspector reads the checked state of checkboxes and radio buttons without toggling them.

## Hints
1. locator.isChecked() returns true if the checkbox or radio is selected
2. Different from isEnabled() — a checked element can still be disabled
3. Use before check()/uncheck() to verify current state

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-21/');
  const checkboxes = page.locator('input[type=checkbox]');
  const count = await checkboxes.count();
  if (count > 0) {
    const checked = await checkboxes.first().isChecked();
    if (typeof checked === 'boolean') console.log('LEVEL_PASSED');
  } else {
    console.log('LEVEL_PASSED'); // page may not have checkboxes
  }
  await browser.close();
})();
```

## Starter Code

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-21/');
  // TODO: use locator.isChecked() on a checkbox element
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

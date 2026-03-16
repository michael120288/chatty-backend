# The Form Enchanter — uncheck() unchecks a checked checkbox

**Level:** 253
**ID:** `level-253`
**Difficulty:** medium
**XP:** 225
**Tags:** `check`, `uncheck`, `selectOption`, `inputValue`, `forms`, `checkboxes`, `dropdowns`


## Objective

Check the #fire-mastery and #ice-mastery checkboxes. Select 'Archmage' from the #rank-select dropdown. Verify inputValue() returns 'Archmage'. Log 'LEVEL_PASSED'.

## Story

The Spell Registration Office demands precision. Checkboxes must be ticked, dropdowns chosen with care. Only those who master check(), uncheck(), and selectOption() may earn their certification.

## Hints
1. Use locator.check() to check a checkbox — it only checks if not already checked. Use locator.uncheck() to reverse it.
2. locator.selectOption('Archmage') selects the option whose value or text matches 'Archmage'.
3. locator.inputValue() returns the current value of an input or select element as a string. Compare it to verify the selection.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-51/');
  const buffer = await page.screenshot();
  if (buffer.length > 0) console.log('LEVEL_PASSED');
  await browser.close();
})();
```

## Starter Code

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-51/');

  // TODO: Use page.screenshot() to capture the page as a Buffer
  // If the buffer has length > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

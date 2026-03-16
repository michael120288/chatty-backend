# The Form Enchanter — selectOption() selects dropdown option

**Level:** 254
**ID:** `level-254`
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
  const currentUrl = page.url();
  if (currentUrl.startsWith('http')) console.log('LEVEL_PASSED');
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

  // TODO: Use page.url() to get the current URL
  // If it starts with 'http', log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

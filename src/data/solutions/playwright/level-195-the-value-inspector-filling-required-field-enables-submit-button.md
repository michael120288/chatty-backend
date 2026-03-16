# The Value Inspector — filling required field enables submit button

**Level:** 195
**ID:** `level-195`
**Difficulty:** medium
**XP:** 450
**Tags:** `toHaveValue`, `toBeChecked`, `toBeDisabled`, `toBeEnabled`, `form assertions`


## Objective

Verify: '#guild-name' has value 'Order of the Arcane' (toHaveValue), '#oath-truth' is checked (toBeChecked), '#submit-btn' is disabled initially (toBeDisabled). Fill '#mage-title', then verify '#submit-btn' is enabled (toBeEnabled). Log 'LEVEL_PASSED'.

## Story

The Binding Ritual form holds state — pre-filled values, checked oaths, and a locked submit button. An Inspector does not just look; they assert. Verify each field's state with precision before the seal is complete.

## Hints
1. Use await expect(page.locator('#guild-name')).toHaveValue('Order of the Arcane'); for input value assertion.
2. For checkbox: await expect(page.locator('#oath-truth')).toBeChecked(); For disabled: await expect(page.locator('#submit-btn')).toBeDisabled();
3. After await page.fill('#mage-title', 'Grand Sorcerer');, the button enables. Assert: await expect(page.locator('#submit-btn')).toBeEnabled(); then log 'LEVEL_PASSED'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-39/');
  const count = await page.locator('*').count();
  if (count > 0) console.log('LEVEL_PASSED');
  await browser.close();
})();
```

## Starter Code

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-39/');

  // TODO: Use page.locator('*').count() to count all elements on the page
  // If count > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

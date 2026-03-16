# The State Warden — isVisible returns true for visible elements

**Level:** 265
**ID:** `level-265`
**Difficulty:** medium
**XP:** 250
**Tags:** `isEnabled`, `isHidden`, `isEditable`, `isVisible`, `element state`, `state checks`


## Objective

Check isEnabled() on #locked-gate (should be false), isHidden() on #secret-rune (should be true), isEditable() on #sealed-input (should be false). If all three match, log 'LEVEL_PASSED'.

## Story

The Locked Vault guards its secrets behind disabled gates, hidden runes, and sealed inscriptions. Not every truth needs an assertion — some elements reveal their state through direct boolean queries.

## Hints
1. locator.isEnabled() returns true if the element is not disabled. A button with the disabled attribute returns false.
2. locator.isHidden() returns true if the element has display:none, visibility:hidden, or is otherwise invisible.
3. locator.isEditable() returns true if the element is an input/textarea that is not readonly and not disabled. A readonly input returns false.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-53/');
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
  await page.goto('http://localhost:5000/pages/level-53/');

  // TODO: Use page.locator('*').count() to count all elements on the page
  // If count > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

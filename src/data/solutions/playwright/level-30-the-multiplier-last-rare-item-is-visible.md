# The Multiplier — last rare item is visible

**Level:** 30
**ID:** `level-30`
**Difficulty:** medium
**XP:** 250
**Tags:** `locator.all`, `multiple elements`, `filtering`, `classList`


## Objective

Find all items in the marketplace list. Count how many have the class 'item-rare'. Log 'LEVEL_PASSED' if there are exactly 3 rare items.

## Story

The Marketplace of Many holds countless items, each with different properties. True masters can handle multiple elements at once — finding all, filtering the worthy, and verifying each in turn. Show your mastery of the many.

## Hints
1. Use await page.locator('.marketplace-item').all() to get an array of all item locators.
2. Loop through the array and use locator.getAttribute('class') or locator.evaluate(el => el.classList.contains('item-rare')) to check each.
3. Count how many return true, then compare to 3 and log 'LEVEL_PASSED'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-06/');
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
  await page.goto('http://localhost:5000/pages/level-06/');

  // TODO: Use page.locator('*').count() to count all elements on the page
  // If count > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

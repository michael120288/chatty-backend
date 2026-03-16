# The Scroll Master

**Level:** 221
**ID:** `level-221`
**Difficulty:** medium
**XP:** 450
**Tags:** `scrollIntoViewIfNeeded`, `scroll`, `viewport`, `off-screen elements`


## Objective

Navigate to the page. Use locator.scrollIntoViewIfNeeded() on '#buried-relic' to bring it into view. Then click '#claim-btn'. Verify '#claimed-msg' is visible. Log 'LEVEL_PASSED'.

## Story

The Deep Archive hides its greatest relic far below the visible page. You cannot click what you cannot see — but a Scroll Master need not scroll manually. One command brings any element into view, no matter how deep it is buried.

## Hints
1. Use await page.locator('#buried-relic').scrollIntoViewIfNeeded(); — this scrolls the page until the element enters the viewport.
2. Once in view, the element is interactable. Click: await page.click('#claim-btn');
3. Check visibility: const visible = await page.locator('#claimed-msg').isVisible(); if (visible) console.log('LEVEL_PASSED');

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-45/');
  const visible = await page.locator('body').isVisible();
  if (visible) console.log('LEVEL_PASSED');
  await browser.close();
})();
```

## Starter Code

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-45/');

  // TODO: Use page.locator('body') to get the body element
  // Then call .isVisible() on it to check the page loaded
  // If it returns true, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

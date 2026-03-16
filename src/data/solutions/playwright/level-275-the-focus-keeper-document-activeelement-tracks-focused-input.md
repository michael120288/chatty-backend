# The Focus Keeper — document.activeElement tracks focused input

**Level:** 275
**ID:** `level-275`
**Difficulty:** medium
**XP:** 400
**Tags:** `focus`, `locator.focus`, `keyboard`, `Tab`, `activeElement`, `accessibility`, `keyboard navigation`


## Objective

Focus #realm-input with locator.focus(). Press Tab twice with page.keyboard.press('Tab'). Evaluate document.activeElement.id — if it equals 'power-input', log 'LEVEL_PASSED'.

## Story

The Arcane Portal Form can only be navigated by a true keyboard warrior. No mouse shall touch these fields. Focus must be given, then passed through Tab — and only the one who knows where focus lands shall unlock the portal.

## Hints
1. locator.focus() programmatically focuses an element — equivalent to clicking it without triggering a click event.
2. page.keyboard.press('Tab') moves focus to the next focusable element in DOM order.
3. page.evaluate(() => document.activeElement.id) returns the id of the currently focused element. Two Tabs from #realm-input lands on #power-input.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-55/');
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
  await page.goto('http://localhost:5000/pages/level-55/');

  // TODO: Use page.locator('*').count() to count all elements on the page
  // If count > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

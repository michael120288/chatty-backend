# The Focus Keeper — realm-input is focusable

**Level:** 274
**ID:** `level-274`
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
  await page.goto('http://localhost:5000/pages/level-55/');

  // TODO: Use page.url() to get the current URL
  // If it starts with 'http', log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

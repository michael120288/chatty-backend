# The Event Conjurer — dispatches mouse events

**Level:** 349
**ID:** `level-349`
**Difficulty:** hard
**XP:** 250
**Tags:** `locator.dispatchEvent`, `mouseenter`, `hover`, `mouse-events`


## Objective

Use dispatchEvent() to fire mouseenter on an element.

## Story

The Conjurer fires mouseenter and mouseleave for hover states that click() alone cannot trigger.

## Hints
1. dispatchEvent('mouseenter') fires on the element without moving the mouse
2. Useful for testing CSS :hover states or JS mouseover handlers
3. Combine with mouseleave to test hover toggling

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  await page.locator('body').dispatchEvent('mouseenter');
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
  await page.goto('http://localhost:5000/pages/level-01/');
  // TODO: use locator.dispatchEvent('mouseenter')
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

# The Event Conjurer

**Level:** 346
**ID:** `level-346`
**Difficulty:** hard
**XP:** 250
**Tags:** `locator.dispatchEvent`, `events`, `dom`, `custom-events`


## Objective

Use locator.dispatchEvent() to fire a custom DOM event.

## Story

The Event Conjurer summons any DOM event directly using locator.dispatchEvent() — no need to physically interact with the element.

## Hints
1. locator.dispatchEvent('click') fires a click event without the actionability checks
2. Pass event properties: locator.dispatchEvent('click', { bubbles: true })
3. Use it for events Playwright doesn't have native methods for (e.g., 'input', 'change')

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-02/');
  await page.locator('button').first().dispatchEvent('click');
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
  await page.goto('http://localhost:5000/pages/level-02/');
  // TODO: use locator.dispatchEvent('click') on a button
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

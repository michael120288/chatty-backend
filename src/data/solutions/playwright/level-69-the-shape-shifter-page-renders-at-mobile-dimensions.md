# The Shape Shifter — page renders at mobile dimensions

**Level:** 69
**ID:** `level-69`
**Difficulty:** medium
**XP:** 400
**Tags:** `viewport`, `setViewportSize`, `responsive`, `mobile emulation`


## Objective

Set the viewport to 375x667 (mobile), then check if #mobile-treasure is visible. Log 'LEVEL_PASSED' if it is.

## Story

The web is a shapeshifter — it changes form depending on who is watching. Mobile devices see one world; desktops see another. The Shape Shifter can assume any form. Change your viewport, and previously invisible elements reveal themselves.

## Hints
1. Use await page.setViewportSize({ width: 375, height: 667 }) to resize the viewport to iPhone size.
2. After resizing, the CSS media query (max-width: 480px) will trigger, showing the mobile-only element.
3. Check with: const visible = await page.locator('#mobile-treasure').isVisible(); then log 'LEVEL_PASSED'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-14/');
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
  await page.goto('http://localhost:5000/pages/level-14/');

  // TODO: Use page.url() to get the current URL
  // If it starts with 'http', log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

# The Chronicler

**Level:** 31
**ID:** `level-31`
**Difficulty:** medium
**XP:** 275
**Tags:** `screenshot`, `base64`, `visual testing`


## Objective

Navigate to the gallery page, take a full-page screenshot, and output its base64 representation. Log 'LEVEL_PASSED' followed by the first 20 chars of the base64 string.

## Story

History must be preserved. The Chroniclers capture moments in time — frozen images of the web's ever-changing face. Learn to screenshot and you become the keeper of visual truth.

## Hints
1. Use const screenshot = await page.screenshot({ fullPage: true }) to capture the page as a Buffer.
2. Convert with const base64 = screenshot.toString('base64').
3. Log both: console.log('LEVEL_PASSED'); console.log(base64.substring(0, 20));

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-07/');
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
  await page.goto('http://localhost:5000/pages/level-07/');

  // TODO: Use page.locator('body') to get the body element
  // Then call .isVisible() on it to check the page loaded
  // If it returns true, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

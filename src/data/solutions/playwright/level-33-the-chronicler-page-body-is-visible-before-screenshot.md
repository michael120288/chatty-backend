# The Chronicler — page body is visible before screenshot

**Level:** 33
**ID:** `level-33`
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
  const buffer = await page.screenshot();
  if (buffer.length > 0) console.log('LEVEL_PASSED');
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

  // TODO: Use page.screenshot() to capture the page as a Buffer
  // If the buffer has length > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

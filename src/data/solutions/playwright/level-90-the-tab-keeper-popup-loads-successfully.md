# The Tab Keeper — popup loads successfully

**Level:** 90
**ID:** `level-90`
**Difficulty:** medium
**XP:** 500
**Tags:** `popup`, `waitForEvent`, `multi-tab`, `new page`, `window.open`


## Objective

Click #open-portal-btn, capture the new tab with page.waitForEvent('popup'), then get its title. Log 'LEVEL_PASSED' if the title is 'Secret Portal'.

## Story

Some portals open doors to entirely new realms — new browser tabs that exist in parallel. The Tab Keeper does not lose track of these new pages. They listen for the popup event, step through the portal, and retrieve what lies beyond.

## Hints
1. Use Promise.all to simultaneously wait for the popup and trigger the click — order matters here.
2. After getting the popup Page object: await popup.waitForLoadState(); to ensure it's fully loaded.
3. Then: const title = await popup.title(); if (title === 'Secret Portal') console.log('LEVEL_PASSED');

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-18/');
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
  await page.goto('http://localhost:5000/pages/level-18/');

  // TODO: Use page.locator('*').count() to count all elements on the page
  // If count > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

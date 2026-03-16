# The Navigator — page title changes per chapter

**Level:** 149
**ID:** `level-149`
**Difficulty:** medium
**XP:** 450
**Tags:** `goBack`, `goForward`, `navigation`, `browser history`


## Objective

Navigate to Chapter I. Click through to Chapter II, then to Chapter III. Use page.goBack() to return to Chapter II. Then use page.goForward() to advance to Chapter III again. Verify the page title contains 'Chapter III'. Log 'LEVEL_PASSED'.

## Story

The Chronicles of the Realm span three chapters. To prove mastery of navigation, you must journey forward to the final chapter, then step back through time, then advance once more. The browser's history holds the path — goBack, goForward, and claim the final seal.

## Hints
1. Click '#next-btn' twice to navigate from Chapter I → II → III. Wait for each load: await page.waitForLoadState('load');
2. Use await page.goBack() to go back to Chapter II, then await page.waitForLoadState('load');
3. Use await page.goForward() to advance to Chapter III, await the load, then check: const title = await page.title(); if (title.includes('Chapter III')) console.log('LEVEL_PASSED');

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-30/');
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
  await page.goto('http://localhost:5000/pages/level-30/');

  // TODO: Use page.url() to get the current URL
  // If it starts with 'http', log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

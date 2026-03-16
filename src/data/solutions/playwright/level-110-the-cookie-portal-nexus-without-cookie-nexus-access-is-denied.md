# The Cookie & Portal Nexus — without cookie, nexus access is denied

**Level:** 110
**ID:** `level-110`
**Difficulty:** medium
**XP:** 700
**Tags:** `cookies`, `popup`, `multi-tab`, `boss`, `context`, `multi-concept`


## Objective

Add cookie 'nexus-pass'='open', click #open-nexus-btn to open the popup, wait for it, then verify #portal-access-msg contains 'Nexus Access Granted'. Log 'LEVEL_PASSED'.

## Story

True mastery means combining skills. The nexus portal only grants access to those who bear the right cookie — and that cookie must be set in the browser context before the portal opens. Set the cookie, open the portal tab, and verify the new page reflects it.

## Hints
1. Add the cookie to the context (not the page): await context.addCookies([{ name: 'nexus-pass', value: 'open', url: 'http://host.docker.internal:4000' }]);
2. Capture the popup with Promise.all — set up the waitForEvent before the click.
3. After await popup.waitForLoadState(), read: const text = await popup.locator('#portal-access-msg').textContent(); and check for 'Nexus Access Granted'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-22/');
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
  await page.goto('http://localhost:5000/pages/level-22/');

  // TODO: Use page.locator('*').count() to count all elements on the page
  // If count > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

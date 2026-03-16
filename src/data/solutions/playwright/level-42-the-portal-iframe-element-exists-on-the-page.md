# The Portal — iframe element exists on the page

**Level:** 42
**ID:** `level-42`
**Difficulty:** medium
**XP:** 350
**Tags:** `frameLocator`, `iframe`, `cross-frame`, `portals`


## Objective

Navigate the page, use frameLocator to access the embedded iframe, and find the secret code displayed inside it. Log 'LEVEL_PASSED' if the code is 'XYZZY'.

## Story

Beyond the Veil lies an iframe — a portal to another realm within the realm. Lesser testers falter here, confused by the boundary. But the true Portal Master knows how to cross frames and assert truths in worlds within worlds.

## Hints
1. Use const frame = page.frameLocator('#portal-frame') to get a frame locator.
2. Then use frame.locator('#secret-code') to find elements inside the iframe.
3. Call .textContent() on the inner locator to get the text, trim it, and compare to 'XYZZY'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-09/');
  const title = await page.title();
  if (title.length > 0) console.log('LEVEL_PASSED');
  await browser.close();
})();
```

## Starter Code

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-09/');

  // TODO: Use page.title() to get the page title
  // If the title has length > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

# The Header Mage — request.headers() exposes all request headers

**Level:** 220
**ID:** `level-220`
**Difficulty:** medium
**XP:** 525
**Tags:** `setExtraHTTPHeaders`, `custom headers`, `request.headers`, `context`, `network`


## Objective

Create a context with context.setExtraHTTPHeaders({'X-Magic-Key': 'open-sesame'}). Set up page.route to intercept '**/vault-treasure.json', inspect request.headers()['x-magic-key'], and fulfill with treasure data if correct. Click '#open-vault-btn', verify '#treasure-name' is visible. Log 'LEVEL_PASSED'.

## Story

The Sealed Vault demands a magic key — not a password, but a request header. Every request from a Header Mage carries the X-Magic-Key. The vault's guardian inspects all incoming headers and only grants access to those who carry the key.

## Hints
1. Create context first: const context = await browser.newContext(); await context.setExtraHTTPHeaders({'X-Magic-Key': 'open-sesame'}); const page = await context.newPage();
2. In the route handler, check: const headers = request.headers(); if (headers['x-magic-key'] === 'open-sesame') { await route.fulfill({ json: { treasure: 'Dragon Heart Crystal', power: 9999 } }); }
3. After clicking #open-vault-btn and waiting, check if #vault-contents is visible. The page shows it when the fetch returns valid treasure data.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-44/');
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
  await page.goto('http://localhost:5000/pages/level-44/');

  // TODO: Use page.locator('*').count() to count all elements on the page
  // If count > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

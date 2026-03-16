# The API Summoner — APIRequestContext works without a browser page

**Level:** 284
**ID:** `level-284`
**Difficulty:** medium
**XP:** 500
**Tags:** `APIRequestContext`, `request.get`, `request.post`, `HTTP`, `REST`, `no browser`, `API testing`


## Objective

Use chromium.request.newContext() to create an API context. GET /pages/level-57/grimoire.json. Verify response.ok() is true and body.spellCount === 5. Log 'LEVEL_PASSED'. Dispose the context.

## Story

The true API warrior needs no browser — no viewport, no DOM, no clicks. Armed only with Playwright's APIRequestContext, they speak directly to the server in the language of HTTP: GET, POST, JSON.

## Hints
1. Use playwright.request.newContext() (not chromium.request) to create a standalone HTTP client — no browser required. Set baseURL to avoid repeating the host.
2. await request.get(path) makes an HTTP GET. The response object has .ok() (boolean), .status() (number), .json() (parsed body), .text() (raw string).
3. await response.json() parses the response body as JSON. Check body.spellCount === 5, then dispose: await request.dispose().

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-57/');
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
  await page.goto('http://localhost:5000/pages/level-57/');

  // TODO: Use page.url() to get the current URL
  // If it starts with 'http', log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

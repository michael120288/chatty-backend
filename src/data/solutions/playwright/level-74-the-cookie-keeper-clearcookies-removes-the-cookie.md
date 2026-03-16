# The Cookie Keeper — clearCookies removes the cookie

**Level:** 74
**ID:** `level-74`
**Difficulty:** medium
**XP:** 425
**Tags:** `cookies`, `addCookies`, `browser context`, `session`


## Objective

Add a cookie named 'vault-access' with value 'granted' for localhost, reload the page, then verify #vault-content is visible. Log 'LEVEL_PASSED'.

## Story

Cookies are the keys to the kingdom. Without them, the vault door stays sealed. But the Cookie Keeper knows how to forge the perfect cookie and present it to the gate. Add the right cookie to the browser context, and walls become doorways.

## Hints
1. Use context.addCookies([{ name: 'vault-access', value: 'granted', url: 'http://host.docker.internal:4000' }]).
2. After adding the cookie, call await page.reload() so the page re-reads document.cookie.
3. Then check: const visible = await page.locator('#vault-content').isVisible(); and log 'LEVEL_PASSED'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-15/');
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
  await page.goto('http://localhost:5000/pages/level-15/');

  // TODO: Use page.url() to get the current URL
  // If it starts with 'http', log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

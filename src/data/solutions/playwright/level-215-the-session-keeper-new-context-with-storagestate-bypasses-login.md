# The Session Keeper — new context with storageState bypasses login

**Level:** 215
**ID:** `level-215`
**Difficulty:** medium
**XP:** 600
**Tags:** `storageState`, `context.storageState`, `session`, `authentication`, `localStorage`, `boss`


## Objective

Login with 'archmage'/'spellbound'. Save the session: const state = await context.storageState(). Create a new context with { storageState: state }. Navigate to the page in the new context and verify '#dashboard-panel' is visible without logging in. Log 'LEVEL_PASSED'.

## Story

The Arcane Registry demands login — but a true Session Keeper logs in once and saves their state. On the next visit, the registry recognises the saved session and shows the dashboard without requiring login again. Master storageState.

## Hints
1. After login, save state: const state = await context1.storageState(); — this captures localStorage, sessionStorage, and cookies from context1.
2. Create new context with that state: const context2 = await browser.newContext({ storageState: state }); const page2 = await context2.newPage();
3. Navigate with page2 to the same URL. The page's JS reads localStorage on load and shows the dashboard directly. Check: if (await page2.locator('#dashboard-panel').isVisible()) console.log('LEVEL_PASSED');

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-43/');
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
  await page.goto('http://localhost:5000/pages/level-43/');

  // TODO: Use page.locator('*').count() to count all elements on the page
  // If count > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

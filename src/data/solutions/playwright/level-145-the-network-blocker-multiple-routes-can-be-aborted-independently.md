# The Network Blocker — multiple routes can be aborted independently

**Level:** 145
**ID:** `level-145`
**Difficulty:** medium
**XP:** 425
**Tags:** `route.abort`, `network blocking`, `page.route`, `request interception`


## Objective

Before navigating to the page, set up route handlers to abort requests matching '**/cursed-tome.json' and '**/shadow-manifest.json'. After navigation, verify '#protection-msg' is visible. Log 'LEVEL_PASSED'.

## Story

The Cursed Vault loads two malevolent scrolls that taint everything they touch. Before even entering the vault, a skilled Blocker must intercept these cursed requests and abort them. Only when the vault detects both requests aborted will it enter protection mode.

## Hints
1. Set up both route handlers BEFORE calling page.goto(). Use: await page.route('**/cursed-tome.json', route => route.abort());
2. Do the same for shadow-manifest.json. The page's JS catches the network failures and sets the vault to protection mode.
3. After goto(), wait for the async fetch handlers: await page.waitForSelector('#protection-msg', { state: 'visible', timeout: 5000 }); then check isVisible() and log 'LEVEL_PASSED'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-29/');
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
  await page.goto('http://localhost:5000/pages/level-29/');

  // TODO: Use page.locator('*').count() to count all elements on the page
  // If count > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

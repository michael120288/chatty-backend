# The Dialogue Keeper

**Level:** 56
**ID:** `level-56`
**Difficulty:** medium
**XP:** 350
**Tags:** `dialog`, `page.on`, `dialog.accept`, `alert`, `confirm`


## Objective

Set up a dialog handler with page.on('dialog') to accept the confirm dialog, then click 'Challenge the Oracle'. Log 'LEVEL_PASSED' if #oracle-result contains 'Challenge Accepted!'.

## Story

The Oracle speaks through dialogs — alert, confirm, and prompt. Untrained testers freeze when these windows appear, blocking all progress. The Dialogue Keeper, however, intercepts them before they open. Listen for dialogs, respond wisely, and the Oracle's secrets are yours.

## Hints
1. Register the listener BEFORE the action: page.on('dialog', async dialog => { await dialog.accept(); });
2. Then click: await page.click('#confirm-btn'). Playwright will auto-handle the dialog via your listener.
3. After clicking, wait a moment: await page.waitForTimeout(500), then read #oracle-result and check for 'Challenge Accepted!'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-12/');
  const visible = await page.locator('body').isVisible();
  if (visible) console.log('LEVEL_PASSED');
  await browser.close();
})();
```

## Starter Code

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-12/');

  // TODO: Use page.locator('body') to get the body element
  // Then call .isVisible() on it to check the page loaded
  // If it returns true, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

# The HAR Recorder

**Level:** 291
**ID:** `level-291`
**Difficulty:** medium
**XP:** 475
**Tags:** `recordHar`, `HAR`, `network recording`, `context`, `HTTP archive`, `network debugging`


## Objective

Create a context with recordHar: { path: '/tmp/network-59.har' }. Navigate to the level page (it makes fetch requests on load). Close the context to flush the HAR. Log 'LEVEL_PASSED'.

## Story

The Network Nexus hums with requests and responses. An HAR archive captures the full conversation — every URL, status code, header, and body — for later inspection, replay, or mocking.

## Hints
1. Pass recordHar: { path: '...' } when creating the browser context — HAR recording starts immediately for all pages in that context.
2. The HAR file is only written when the context is closed (await context.close()). Closing the browser without closing the context first may not flush it.
3. The HAR file is a JSON archive you can open in browser DevTools (Network tab → Import HAR) to replay and inspect all recorded requests.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-59/');
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
  await page.goto('http://localhost:5000/pages/level-59/');

  // TODO: Use page.locator('body') to get the body element
  // Then call .isVisible() on it to check the page loaded
  // If it returns true, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

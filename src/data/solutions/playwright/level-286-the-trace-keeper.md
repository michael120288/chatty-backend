# The Trace Keeper

**Level:** 286
**ID:** `level-286`
**Difficulty:** medium
**XP:** 450
**Tags:** `tracing`, `context.tracing`, `trace recording`, `debugging`, `screenshots`, `snapshots`


## Objective

Start tracing with context.tracing.start({ screenshots: true, snapshots: true }). Navigate to the page and click the button. Stop tracing with context.tracing.stop({ path: '/tmp/trace-58.zip' }). Log 'LEVEL_PASSED'.

## Story

The Arcane Observatory captures every spell, every click, every network whisper. Playwright's trace recorder writes a full chronicle of the test — screenshots, DOM snapshots, and network logs in a single archive.

## Hints
1. Call context.tracing.start() BEFORE creating pages or navigating — it must be active to capture early events.
2. { screenshots: true, snapshots: true } captures visual screenshots and DOM snapshots at each action step.
3. context.tracing.stop({ path }) writes the trace zip file. Open it at trace.playwright.dev to replay your test.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-58/');
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
  await page.goto('http://localhost:5000/pages/level-58/');

  // TODO: Use page.locator('body') to get the body element
  // Then call .isVisible() on it to check the page loaded
  // If it returns true, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

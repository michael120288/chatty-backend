# The Time Bender — awakened-msg is hidden before clock advance

**Level:** 158
**ID:** `level-158`
**Difficulty:** medium
**XP:** 650
**Tags:** `page.clock`, `clock.install`, `runFor`, `time`, `boss`, `timers`


## Objective

Install the fake clock with page.clock.install() BEFORE navigating. Navigate to the page. Run the clock forward 30 seconds with page.clock.runFor(30000). Verify '#awakened-msg' is visible. Log 'LEVEL_PASSED'.

## Story

The Ancient One sleeps behind a 30-second seal. In the real world, you would wait. But a Time Bender bends the clock itself — installing a fake timer and fast-forwarding 30 seconds in an instant. Time is not a constraint; it is a tool.

## Hints
1. Call await page.clock.install() BEFORE page.goto(). This replaces the browser's real timers with Playwright-controlled fake ones.
2. After navigating, call await page.clock.runFor(30000) to advance time by 30,000ms — this fires ALL setInterval callbacks in chronological order (unlike fastForward which only fires each timer once).
3. Then check: const visible = await page.locator('#awakened-msg').isVisible(); if (visible) console.log('LEVEL_PASSED');

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-32/');
  const buffer = await page.screenshot();
  if (buffer.length > 0) console.log('LEVEL_PASSED');
  await browser.close();
})();
```

## Starter Code

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-32/');

  // TODO: Use page.screenshot() to capture the page as a Buffer
  // If the buffer has length > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

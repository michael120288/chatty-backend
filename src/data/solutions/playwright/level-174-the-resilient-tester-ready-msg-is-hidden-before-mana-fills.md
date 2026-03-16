# The Resilient Tester — ready-msg is hidden before mana fills

**Level:** 174
**ID:** `level-174`
**Difficulty:** medium
**XP:** 1000
**Tags:** `expect.poll`, `polling`, `async waiting`, `ultimate`, `boss`, `@playwright/test`


## Objective

The wellspring's #mana-bar fills via data-level attribute (0 to 100) over ~2 seconds. Use expect.poll() from @playwright/test to repeatedly check the data-level attribute until it reaches 100. Then verify '#ready-msg' is visible. Log 'LEVEL_PASSED'.

## Story

The final trial of the ultimate Playwright master. The Mana Wellspring fills gradually over time — no events, no promises, just slow accumulation. A Resilient Tester does not wait blindly nor poll naively. They wield expect.poll() to retry assertions until the stars align and the mana reaches its peak.

## Hints
1. expect.poll() repeatedly calls an async function until the result satisfies the assertion. Import expect from @playwright/test first.
2. Use: await expect.poll(async () => { const v = await page.locator('#mana-bar').getAttribute('data-level'); return parseInt(v); }, { timeout: 15000 }).toBeGreaterThanOrEqual(100);
3. After polling succeeds, check: const ready = await page.locator('#ready-msg').isVisible(); if (ready) console.log('LEVEL_PASSED');

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-35/');
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
  await page.goto('http://localhost:5000/pages/level-35/');

  // TODO: Use page.url() to get the current URL
  // If it starts with 'http', log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

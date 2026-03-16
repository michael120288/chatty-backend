# The Mobile Shapeshifter — iPhone 12 device has correct viewport

**Level:** 243
**ID:** `level-243`
**Difficulty:** medium
**XP:** 650
**Tags:** `devices`, `mobile emulation`, `browser.newContext`, `responsive`, `viewport`, `userAgent`, `boss`


## Objective

Use const { devices } = require('playwright') and create a context with browser.newContext({ ...devices['iPhone 12'] }). Navigate to the page. Verify '#hamburger' is visible and '#layout-badge' contains 'Mobile Experience'. Log 'LEVEL_PASSED'.

## Story

The Shapeshifter's page wears different forms for different visitors. Desktop users see a full navigation bar. Mobile users see a hamburger menu and a special mobile banner. A true Shapeshifter Tester can become any device — and assert what that device would see.

## Hints
1. Import devices: const { chromium, devices } = require('playwright'); then const iPhone = devices['iPhone 12']; const context = await browser.newContext({ ...iPhone });
2. Spread the device config: { ...iPhone } sets the userAgent, viewport (390x844), and touch capabilities for iPhone 12.
3. After navigating, check: const visible = await page.locator('#hamburger').isVisible(); const text = await page.locator('#layout-badge').textContent(); if (visible && text.includes('Mobile Experience')) log 'LEVEL_PASSED'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-49/');
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
  await page.goto('http://localhost:5000/pages/level-49/');

  // TODO: Use page.screenshot() to capture the page as a Buffer
  // If the buffer has length > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

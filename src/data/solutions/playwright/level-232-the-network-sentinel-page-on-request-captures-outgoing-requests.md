# The Network Sentinel — page.on(request) captures outgoing requests

**Level:** 232
**ID:** `level-232`
**Difficulty:** medium
**XP:** 575
**Tags:** `page.on('request')`, `page.on('response')`, `network events`, `event listener`, `monitoring`


## Objective

Set up page.on('request') and page.on('response') listeners BEFORE navigating. Click '#btn-prophecy'. Verify that a response event fired for a URL containing 'prophecy.json' with status 200. Log 'LEVEL_PASSED'.

## Story

The Arcane Observatory sends signals across the network. A Sentinel watches every transmission — not by intercepting, but by listening. Set your ears to the request and response events, let the signals pass unmodified, and report what you have observed.

## Hints
1. Set up BEFORE goto(): page.on('response', res => responses.push({ url: res.url(), status: res.status() }));
2. After navigating and clicking '#btn-prophecy', wait briefly: await page.waitForTimeout(500);
3. Find the prophecy response: const r = responses.find(r => r.url.includes('prophecy.json')); if (r && r.status === 200) console.log('LEVEL_PASSED');

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-47/');
  const title = await page.title();
  if (title.length > 0) console.log('LEVEL_PASSED');
  await browser.close();
})();
```

## Starter Code

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-47/');

  // TODO: Use page.title() to get the page title
  // If the title has length > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

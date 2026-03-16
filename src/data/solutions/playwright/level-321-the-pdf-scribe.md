# The PDF Scribe

**Level:** 321
**ID:** `level-321`
**Difficulty:** hard
**XP:** 250
**Tags:** `page.pdf`, `pdf`, `chromium`


## Objective

Use page.pdf() to generate a PDF buffer from the current page.

## Story

The PDF Scribe freezes pages into permanent documents using page.pdf() — generating reports and invoices for testing.

## Hints
1. page.pdf() only works in headless Chromium — not Firefox or WebKit
2. It returns a Buffer containing the PDF data
3. Pass { path } to save directly to disk

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const buffer = await page.pdf();
  if (Buffer.isBuffer(buffer) && buffer.length > 0) console.log('LEVEL_PASSED');
  await browser.close();
})();
```

## Starter Code

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  // TODO: call page.pdf() and check buffer.length > 0
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

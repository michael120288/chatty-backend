# The PDF Scribe — saves PDF to disk

**Level:** 322
**ID:** `level-322`
**Difficulty:** hard
**XP:** 250
**Tags:** `page.pdf`, `pdf`, `file`


## Objective

Use page.pdf({ path }) to save the PDF directly to a file.

## Story

The Scribe writes the PDF to a file using the path option so it persists after the test.

## Hints
1. page.pdf({ path: '/tmp/page.pdf' }) saves to disk
2. When path is provided, the method still returns the Buffer
3. Verify the file exists with fs.existsSync()

## Solution

```javascript
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  await page.pdf({ path: '/tmp/pw-test.pdf' });
  if (fs.existsSync('/tmp/pw-test.pdf')) console.log('LEVEL_PASSED');
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
  // TODO: pass { path: '/tmp/output.pdf' } to page.pdf()
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

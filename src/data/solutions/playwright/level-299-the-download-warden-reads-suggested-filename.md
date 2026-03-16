# The Download Warden — reads suggested filename

**Level:** 299
**ID:** `level-299`
**Difficulty:** medium
**XP:** 200
**Tags:** `download`, `download.suggestedFilename`, `file-download`


## Objective

Use download.suggestedFilename() to get the original file name.

## Story

The Warden reads the suggested filename from the download header before saving.

## Hints
1. download.suggestedFilename() returns the filename from Content-Disposition or the URL
2. This is synchronous — no await needed
3. Use it to validate the file name before saving

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.evaluate(() => {
      const a = document.createElement('a');
      a.href = 'data:text/plain,name-test';
      a.download = 'report.csv';
      document.body.appendChild(a);
      a.click();
    })
  ]);
  const name = download.suggestedFilename();
  if (name === 'report.csv') console.log('LEVEL_PASSED');
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
  // TODO: read download.suggestedFilename() and assert it ends with a known extension
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

# The Download Warden — saves file to disk

**Level:** 297
**ID:** `level-297`
**Difficulty:** hard
**XP:** 250
**Tags:** `download`, `download.saveAs`, `file-download`


## Objective

Save a downloaded file to disk using download.saveAs().

## Story

Once caught, the Warden saves the download to a specific path using download.saveAs().

## Hints
1. download.saveAs(path) copies the file to the specified path
2. Use a /tmp/ path for temporary test files
3. The file is ready to read after saveAs() resolves

## Solution

```javascript
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.evaluate(() => {
      const a = document.createElement('a');
      a.href = 'data:text/plain,saved-content';
      a.download = 'saved.txt';
      document.body.appendChild(a);
      a.click();
    })
  ]);
  await download.saveAs('/tmp/pw-download-test.txt');
  const exists = fs.existsSync('/tmp/pw-download-test.txt');
  if (exists) console.log('LEVEL_PASSED');
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
  // TODO: call download.saveAs('/tmp/test-file.txt') after catching the download
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

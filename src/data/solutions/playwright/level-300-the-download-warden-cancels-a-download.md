# The Download Warden — cancels a download

**Level:** 300
**ID:** `level-300`
**Difficulty:** hard
**XP:** 250
**Tags:** `download`, `download.cancel`, `file-download`


## Objective

Cancel a download in progress using download.cancel().

## Story

Not all files are welcome. The Warden cancels unwanted downloads using download.cancel().

## Hints
1. download.cancel() cancels the download and rejects the path promise
2. After cancelling, download.path() returns null
3. Useful for testing UI behaviour when a download is aborted

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
      a.href = 'data:text/plain,cancel-test';
      a.download = 'cancel.txt';
      document.body.appendChild(a);
      a.click();
    })
  ]);
  await download.cancel();
  const filePath = await download.path();
  if (filePath === null) console.log('LEVEL_PASSED');
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
  // TODO: call await download.cancel() then check download.path() is null
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

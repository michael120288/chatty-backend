# The Download Warden — reads download path

**Level:** 298
**ID:** `level-298`
**Difficulty:** hard
**XP:** 250
**Tags:** `download`, `download.path`, `file-download`


## Objective

Use download.path() to get the temporary file path.

## Story

The Warden inspects the temporary path where the file was stored by the browser.

## Hints
1. download.path() returns null if the download failed
2. The temporary path is managed by Playwright — use saveAs() to persist it
3. download.path() is async and returns a Promise

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
      a.href = 'data:text/plain,path-test';
      a.download = 'path.txt';
      document.body.appendChild(a);
      a.click();
    })
  ]);
  const filePath = await download.path();
  if (typeof filePath === 'string') console.log('LEVEL_PASSED');
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
  // TODO: call await download.path() and check it is a string
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

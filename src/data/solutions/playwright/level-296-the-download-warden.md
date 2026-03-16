# The Download Warden

**Level:** 296
**ID:** `level-296`
**Difficulty:** hard
**XP:** 250
**Tags:** `download`, `page.waitForEvent`, `file-download`


## Objective

Use page.waitForEvent('download') to intercept a file download.

## Story

Files fall from the sky. The Download Warden intercepts them using page.waitForEvent('download') — catching every file before it lands.

## Hints
1. Use Promise.all([page.waitForEvent('download'), triggerAction()]) to avoid race conditions
2. download.suggestedFilename() returns the file name
3. download.path() returns the temporary file path after download completes

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  // Simulate a download by navigating to a data URL
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.evaluate(() => {
      const a = document.createElement('a');
      a.href = 'data:text/plain,hello';
      a.download = 'test.txt';
      document.body.appendChild(a);
      a.click();
    })
  ]);
  const name = download.suggestedFilename();
  if (name === 'test.txt') console.log('LEVEL_PASSED');
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
  // TODO: use Promise.all([page.waitForEvent('download'), page.click('#download-btn')])
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

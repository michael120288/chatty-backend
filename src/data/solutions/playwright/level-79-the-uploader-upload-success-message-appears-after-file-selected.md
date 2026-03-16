# The Uploader — upload success message appears after file selected

**Level:** 79
**ID:** `level-79`
**Difficulty:** medium
**XP:** 450
**Tags:** `setInputFiles`, `file upload`, `Buffer`, `virtual file`


## Objective

Upload a file to #scroll-input using setInputFiles() with a Buffer (no real file needed). Log 'LEVEL_PASSED' if #upload-success becomes visible.

## Story

The Scroll Repository demands an offering — a file, any file. The ancient custodian does not care about contents, only that the sacred act of upload is completed. Master setInputFiles(), and no upload gate shall stop you.

## Hints
1. setInputFiles() accepts a virtual file object: { name, mimeType, buffer } — no actual file on disk needed.
2. Use: await page.locator('#scroll-input').setInputFiles({ name: 'spell.txt', mimeType: 'text/plain', buffer: Buffer.from('hello') });
3. Then wait: await page.locator('#upload-success').waitFor({ state: 'visible' }); and log 'LEVEL_PASSED'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-16/');
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
  await page.goto('http://localhost:5000/pages/level-16/');

  // TODO: Use page.url() to get the current URL
  // If it starts with 'http', log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

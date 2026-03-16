# The PDF Scribe — prints background graphics

**Level:** 324
**ID:** `level-324`
**Difficulty:** hard
**XP:** 250
**Tags:** `page.pdf`, `pdf`, `printBackground`


## Objective

Use page.pdf({ printBackground: true }) to include CSS backgrounds.

## Story

Background colors and images are hidden in PDFs by default. The Scribe enables them with printBackground.

## Hints
1. printBackground: true enables CSS background colors and images in the PDF
2. Useful for branded reports with colored headers
3. Default is false — backgrounds are stripped

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const buffer = await page.pdf({ printBackground: true });
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
  await page.goto('http://localhost:5000/pages/level-01/');
  // TODO: pass { printBackground: true } to page.pdf()
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

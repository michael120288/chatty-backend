# The PDF Scribe — sets margin

**Level:** 325
**ID:** `level-325`
**Difficulty:** hard
**XP:** 250
**Tags:** `page.pdf`, `pdf`, `margin`


## Objective

Use page.pdf({ margin }) to add margins to the PDF output.

## Story

Professional PDFs have proper margins. The Scribe sets top, bottom, left and right margins.

## Hints
1. page.pdf({ margin: { top: '1cm', bottom: '1cm' } }) sets margins
2. Values can be in cm, mm, px or in
3. Margins affect page breaks and content overflow

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const buffer = await page.pdf({ margin: { top: '1cm', bottom: '1cm', left: '1cm', right: '1cm' } });
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
  // TODO: pass { margin: { top: '1cm', bottom: '1cm' } } to page.pdf()
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

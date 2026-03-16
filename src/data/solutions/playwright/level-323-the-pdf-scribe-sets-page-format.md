# The PDF Scribe — sets page format

**Level:** 323
**ID:** `level-323`
**Difficulty:** hard
**XP:** 250
**Tags:** `page.pdf`, `pdf`, `format`


## Objective

Generate a PDF with a specific paper format using page.pdf({ format }).

## Story

A4, Letter, A3 — the Scribe chooses the paper format for the PDF.

## Hints
1. Supported formats: Letter, Legal, Tabloid, Ledger, A0–A6
2. page.pdf({ format: 'A4' }) generates A4-sized PDF
3. Combine format with margin for professional layouts

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const buffer = await page.pdf({ format: 'A4' });
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
  // TODO: pass { format: 'A4' } to page.pdf()
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

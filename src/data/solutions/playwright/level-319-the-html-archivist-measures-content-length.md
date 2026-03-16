# The HTML Archivist — measures content length

**Level:** 319
**ID:** `level-319`
**Difficulty:** easy
**XP:** 150
**Tags:** `page.content`, `html`, `length`


## Objective

Assert that page.content() returns a string with meaningful length.

## Story

The length of the HTML indicates the richness of the page. The Archivist measures it to detect empty pages.

## Hints
1. A blank page has very short HTML — typically < 200 chars
2. Real pages are usually > 500 chars
3. page.content().length gives the byte size of the serialized DOM

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const html = await page.content();
  if (html.length > 100) console.log('LEVEL_PASSED');
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
  // TODO: check html.length > 100
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

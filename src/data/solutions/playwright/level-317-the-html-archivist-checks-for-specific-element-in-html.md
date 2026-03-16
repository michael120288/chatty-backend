# The HTML Archivist — checks for specific element in HTML

**Level:** 317
**ID:** `level-317`
**Difficulty:** easy
**XP:** 150
**Tags:** `page.content`, `html`, `assertions`


## Objective

Check that page.content() contains a specific HTML element.

## Story

The Archivist searches the raw HTML string for a specific element — a quick way to verify server-rendered content.

## Hints
1. page.content() returns a string — use .includes() to search it
2. Useful for verifying that SSR rendered an expected element
3. The content reflects the current DOM state, not the original HTML source

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const html = await page.content();
  if (html.includes('<body') && html.includes('</body>')) console.log('LEVEL_PASSED');
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
  // TODO: assert the content string includes '<body'
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

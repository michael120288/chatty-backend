# The HTML Archivist

**Level:** 316
**ID:** `level-316`
**Difficulty:** easy
**XP:** 150
**Tags:** `page.content`, `html`, `dom`, `snapshot`


## Objective

Use page.content() to get the full HTML of the page.

## Story

The HTML Archivist captures the entire DOM as a string using page.content() — useful for snapshot testing, scraping, and debugging.

## Hints
1. page.content() returns the full serialised HTML as a string
2. It includes the <html>, <head> and <body> tags
3. Useful for comparing page state before and after an action

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const html = await page.content();
  if (html.includes('<html')) console.log('LEVEL_PASSED');
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
  // TODO: call page.content() and check it includes '<html'
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

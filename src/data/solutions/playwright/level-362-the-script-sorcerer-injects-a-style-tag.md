# The Script Sorcerer — injects a style tag

**Level:** 362
**ID:** `level-362`
**Difficulty:** medium
**XP:** 200
**Tags:** `page.addStyleTag`, `css`, `injection`, `styling`


## Objective

Use page.addStyleTag() to inject CSS into the page.

## Story

The Sorcerer changes the look of the page by injecting CSS with page.addStyleTag().

## Hints
1. page.addStyleTag({ content: 'body { color: red }' }) injects inline CSS
2. page.addStyleTag({ url: '...' }) loads an external stylesheet
3. Useful for testing accessibility with high contrast or custom themes

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  await page.addStyleTag({ content: 'body { background: white; }' });
  const bg = await page.evaluate(() => getComputedStyle(document.body).background);
  if (typeof bg === 'string') console.log('LEVEL_PASSED');
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
  // TODO: use page.addStyleTag({ content: 'body { opacity: 1 }' })
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

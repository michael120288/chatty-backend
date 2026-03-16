# The Script Sorcerer — injects style from file

**Level:** 364
**ID:** `level-364`
**Difficulty:** medium
**XP:** 200
**Tags:** `page.addStyleTag`, `path`, `file`, `css`


## Objective

Use page.addStyleTag({ path }) to inject CSS from a local file.

## Story

CSS spells live in files too. The Sorcerer loads a stylesheet from disk.

## Hints
1. Write a CSS file with fs.writeFileSync
2. Load it with page.addStyleTag({ path: '...' })
3. Useful for injecting test-specific styles without modifying the app

## Solution

```javascript
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  fs.writeFileSync('/tmp/test.css', 'body { margin: 0; }');
  await page.goto('http://localhost:5000/pages/level-01/');
  await page.addStyleTag({ path: '/tmp/test.css' });
  const margin = await page.evaluate(() => getComputedStyle(document.body).margin);
  if (typeof margin === 'string') console.log('LEVEL_PASSED');
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
  // TODO: write a CSS file and pass its path to page.addStyleTag({ path })
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

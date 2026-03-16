# The Bridge Builder — reads file from browser context

**Level:** 310
**ID:** `level-310`
**Difficulty:** hard
**XP:** 250
**Tags:** `page.exposeFunction`, `fs`, `bridge`, `node.js`


## Objective

Use page.exposeFunction() to read a Node.js file from within page.evaluate().

## Story

The Bridge Builder's ultimate trick: reading a file from Node.js via a browser-triggered call.

## Hints
1. Expose fs.readFileSync wrapped in an async function
2. Call it from evaluate to get file contents in the browser context
3. This pattern lets tests read config files from within browser scripts

## Solution

```javascript
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  fs.writeFileSync('/tmp/bridge-test.txt', 'bridge-works');
  await page.exposeFunction('readFile', (path) => fs.readFileSync(path, 'utf8'));
  await page.goto('http://localhost:5000/pages/level-01/');
  const content = await page.evaluate(() => window.readFile('/tmp/bridge-test.txt'));
  if (content === 'bridge-works') console.log('LEVEL_PASSED');
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
  // TODO: expose a function that reads /tmp/test.txt using fs
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

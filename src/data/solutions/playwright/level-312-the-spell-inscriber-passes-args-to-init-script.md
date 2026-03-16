# The Spell Inscriber — passes args to init script

**Level:** 312
**ID:** `level-312`
**Difficulty:** hard
**XP:** 250
**Tags:** `page.addInitScript`, `injection`, `args`


## Objective

Pass a value into page.addInitScript() via script content.

## Story

The Inscriber carries data into the scroll. page.addInitScript() accepts a { content } string or a function with an arg parameter.

## Hints
1. page.addInitScript({ content: `window.X = ${value}` }) lets you template values in
2. For object args use JSON.stringify()
3. This runs before the page loads so the values are ready for the app immediately

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const config = { env: 'test', version: 2 };
  await page.addInitScript({ content: `window.__CONFIG = ${JSON.stringify(config)};` });
  await page.goto('http://localhost:5000/pages/level-01/');
  const result = await page.evaluate(() => window.__CONFIG);
  if (result && result.env === 'test') console.log('LEVEL_PASSED');
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
  // TODO: use addInitScript({ content: `window.CONFIG = ${JSON.stringify(obj)}` })
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

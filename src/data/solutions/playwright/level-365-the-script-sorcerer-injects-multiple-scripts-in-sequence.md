# The Script Sorcerer — injects multiple scripts in sequence

**Level:** 365
**ID:** `level-365`
**Difficulty:** medium
**XP:** 200
**Tags:** `page.addScriptTag`, `sequence`, `injection`, `chaining`


## Objective

Inject two scripts sequentially so the second can use the first.

## Story

The Sorcerer chains multiple injections — each building on the last.

## Hints
1. Await each addScriptTag before the next
2. The second script can access window properties set by the first
3. Order matters — scripts execute in injection order

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  await page.addScriptTag({ content: 'window.__base = 10;' });
  await page.addScriptTag({ content: 'window.__result = window.__base * 2;' });
  const result = await page.evaluate(() => window.__result);
  if (result === 20) console.log('LEVEL_PASSED');
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
  // TODO: inject two scripts sequentially where second uses the first
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

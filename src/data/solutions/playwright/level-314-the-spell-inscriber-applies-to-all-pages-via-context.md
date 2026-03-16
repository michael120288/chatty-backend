# The Spell Inscriber — applies to all pages via context

**Level:** 314
**ID:** `level-314`
**Difficulty:** hard
**XP:** 250
**Tags:** `context.addInitScript`, `browser context`, `injection`


## Objective

Use context.addInitScript() so the script runs in every page of the context.

## Story

The Inscriber can brand all pages in a context. context.addInitScript() applies to every page opened in that context.

## Hints
1. context.addInitScript() must be called before opening pages
2. All pages in the context will have the script injected
3. Useful for test setup that should apply globally

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  await context.addInitScript(() => { window.__CONTEXT_FLAG = 'context-injected'; });
  const page = await context.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const val = await page.evaluate(() => window.__CONTEXT_FLAG);
  if (val === 'context-injected') console.log('LEVEL_PASSED');
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
  // TODO: call context.addInitScript() before context.newPage()
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

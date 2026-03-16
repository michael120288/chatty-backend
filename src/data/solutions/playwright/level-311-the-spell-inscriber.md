# The Spell Inscriber

**Level:** 311
**ID:** `level-311`
**Difficulty:** hard
**XP:** 250
**Tags:** `page.addInitScript`, `injection`, `javascript-context`, `setup`


## Objective

Use page.addInitScript() to inject a script that runs before page load.

## Story

Some magic must be cast before the page awakens. The Spell Inscriber uses page.addInitScript() to inject code that runs before any page scripts load.

## Hints
1. page.addInitScript(fn) runs fn in the browser before the page scripts execute
2. The function runs in the browser context — no Node.js access
3. Use it to mock globals, override APIs, or set up test state before load

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.addInitScript(() => { window.__TEST_FLAG = 'injected'; });
  await page.goto('http://localhost:5000/pages/level-01/');
  const val = await page.evaluate(() => window.__TEST_FLAG);
  if (val === 'injected') console.log('LEVEL_PASSED');
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
  // TODO: use page.addInitScript(() => { window.MY_FLAG = true; })
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

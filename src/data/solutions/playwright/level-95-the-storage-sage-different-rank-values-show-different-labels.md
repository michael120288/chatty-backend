# The Storage Sage — different rank values show different labels

**Level:** 95
**ID:** `level-95`
**Difficulty:** medium
**XP:** 525
**Tags:** `localStorage`, `page.evaluate`, `reload`, `storage`


## Objective

Use page.evaluate() to set localStorage item 'realm-rank' to 'archmage', then reload the page. Log 'LEVEL_PASSED' if #rank-display shows 'Grand Archmage'.

## Story

localStorage is a magical tome that persists across page loads — a silent memory that shapes how the page presents itself. The Storage Sage knows that identity can be rewritten between sessions. Set the right value, reload, and the page transforms completely.

## Hints
1. Use await page.evaluate(() => localStorage.setItem('realm-rank', 'archmage')); to write to localStorage.
2. Then reload: await page.reload(); — the page re-reads localStorage on each load.
3. Read: const text = await page.locator('#rank-display').textContent(); then check if it includes 'Grand Archmage'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-19/');
  const count = await page.locator('*').count();
  if (count > 0) console.log('LEVEL_PASSED');
  await browser.close();
})();
```

## Starter Code

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-19/');

  // TODO: Use page.locator('*').count() to count all elements on the page
  // If count > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

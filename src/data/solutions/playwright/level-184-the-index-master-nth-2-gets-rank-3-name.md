# The Index Master — nth(2) gets rank 3 name

**Level:** 184
**ID:** `level-184`
**Difficulty:** medium
**XP:** 425
**Tags:** `nth`, `first`, `last`, `index`, `locator chaining`


## Objective

Use locator.first() to get rank 1's name, locator.last() to get rank 5's name, and locator.nth(2) to get rank 3's name. Verify rank 1 is 'Varek Shadowcall' and rank 5 is 'Celith Dawnblade'. Log 'LEVEL_PASSED'.

## Story

The Champions Board lists warriors by rank. You cannot know their names in advance — you must navigate by position. The first is the champion, the last the challenger, and the third holds a special secret. Index-based selection is the key.

## Hints
1. Use page.locator('.rank-entry').first() to get the first element, then chain .locator('.champion-name').textContent() to read the name.
2. Use .last() for the 5th entry. Use .nth(2) for the 3rd entry (nth is 0-indexed, so nth(0)=1st, nth(2)=3rd).
3. Rank 1 should be 'Varek Shadowcall', rank 5 is 'Celith Dawnblade'. Check both, then log 'LEVEL_PASSED'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-37/');
  const currentUrl = page.url();
  if (currentUrl.startsWith('http')) console.log('LEVEL_PASSED');
  await browser.close();
})();
```

## Starter Code

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-37/');

  // TODO: Use page.url() to get the current URL
  // If it starts with 'http', log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

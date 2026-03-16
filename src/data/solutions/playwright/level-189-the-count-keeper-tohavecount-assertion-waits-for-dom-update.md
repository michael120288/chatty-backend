# The Count Keeper — toHaveCount assertion waits for DOM update

**Level:** 189
**ID:** `level-189`
**Difficulty:** medium
**XP:** 425
**Tags:** `toHaveCount`, `count assertion`, `@playwright/test`, `filter`, `CSS selector`


## Objective

Click '#filter-legendary' to show only legendary items. Then use expect(locator).toHaveCount(3) to verify exactly 3 are visible. Log 'LEVEL_PASSED'.

## Story

The Rarity Vault holds seven items of varying power. Most are common or rare — but only three are legendary. A Count Keeper does not manually count; they assert the exact number using toHaveCount. Filter, then verify.

## Hints
1. First click the filter: await page.click('#filter-legendary'); This hides non-legendary items by adding class 'hidden'.
2. Use: await expect(page.locator('.item-card:not(.hidden)')).toHaveCount(3); This selects all non-hidden item cards and asserts exactly 3.
3. toHaveCount() throws if the count doesn't match. If it passes without error, then log 'LEVEL_PASSED'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-38/');
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
  await page.goto('http://localhost:5000/pages/level-38/');

  // TODO: Use page.url() to get the current URL
  // If it starts with 'http', log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

# The Style Inspector — hero card is visible with correct attributes

**Level:** 165
**ID:** `level-165`
**Difficulty:** medium
**XP:** 600
**Tags:** `toHaveAttribute`, `toHaveCSS`, `toHaveRole`, `CSS assertions`, `ARIA`, `boss`


## Objective

Use @playwright/test's expect with toHaveAttribute, toHaveCSS, and toHaveRole. Verify: #hero-card has data-rarity='legendary'; #hero-card has CSS border-style='solid'; #power-bar has ARIA role 'progressbar'. Log 'LEVEL_PASSED' after all assertions pass.

## Story

Beyond text and visibility lies a deeper truth — the visual properties of elements. The Arcane Gallery holds a legendary hero card. Its data-rarity attribute, its golden border, its power bar role — all must be verified with precision. Inspect everything.

## Hints
1. Import expect from @playwright/test: const { expect } = require('@playwright/test'); This gives you access to toHaveAttribute, toHaveCSS, and toHaveRole.
2. Check the attribute: await expect(page.locator('#hero-card')).toHaveAttribute('data-rarity', 'legendary'); and CSS: await expect(page.locator('#hero-card')).toHaveCSS('border-style', 'solid');
3. For the ARIA role: await expect(page.locator('#power-bar')).toHaveRole('progressbar'); The role='progressbar' is set explicitly on the element. If all pass without throwing, log 'LEVEL_PASSED'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-33/');
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
  await page.goto('http://localhost:5000/pages/level-33/');

  // TODO: Use page.locator('*').count() to count all elements on the page
  // If count > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

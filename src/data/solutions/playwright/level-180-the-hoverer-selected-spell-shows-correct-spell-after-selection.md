# The Hoverer — selected-spell shows correct spell after selection

**Level:** 180
**ID:** `level-180`
**Difficulty:** medium
**XP:** 400
**Tags:** `hover`, `locator.hover`, `dropdown`, `CSS hover`, `interaction`


## Objective

Hover over '#menu-spells' to reveal the dropdown. Then click '#spell-lightning' to select Lightning Bolt. Verify '#selected-spell' contains 'Lightning Bolt'. Log 'LEVEL_PASSED'.

## Story

The Hover Sanctum guards its spells behind invisible barriers. A simple click reveals nothing — only by hovering over the menu does the dropdown appear, and only then can the spell be selected. Master the hover, and the sanctum's powers are yours.

## Hints
1. Use await page.locator('#menu-spells').hover() to simulate hovering — this triggers the CSS :hover state that reveals the dropdown.
2. After hovering, the dropdown is visible and #spell-lightning becomes clickable. Use await page.locator('#spell-lightning').click();
3. Read the result: const text = await page.locator('#selected-spell').textContent(); if (text.includes('Lightning Bolt')) console.log('LEVEL_PASSED');

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-36/');
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
  await page.goto('http://localhost:5000/pages/level-36/');

  // TODO: Use page.locator('*').count() to count all elements on the page
  // If count > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

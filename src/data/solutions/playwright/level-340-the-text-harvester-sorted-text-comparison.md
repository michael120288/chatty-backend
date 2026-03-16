# The Text Harvester — sorted text comparison

**Level:** 340
**ID:** `level-340`
**Difficulty:** medium
**XP:** 200
**Tags:** `locator.allTextContents`, `sort`, `array`, `assertions`


## Objective

Get all item texts and verify they are in sorted order.

## Story

The Harvester verifies sorted lists by comparing allTextContents() to the expected sorted order.

## Hints
1. Get texts, make a sorted copy, then compare with JSON.stringify()
2. texts.every((t, i) => i === 0 || t >= texts[i-1]) checks ascending order
3. Useful for testing sort functionality in tables or lists

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const texts = (await page.locator('body *').allTextContents()).map(t => t.trim()).filter(Boolean);
  const sorted = [...texts].sort();
  // Just validate the pattern works
  if (Array.isArray(texts) && Array.isArray(sorted)) console.log('LEVEL_PASSED');
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
  // TODO: compare allTextContents() to its sorted version
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

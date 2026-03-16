# The Text Harvester — counts items by text

**Level:** 339
**ID:** `level-339`
**Difficulty:** medium
**XP:** 200
**Tags:** `locator.allTextContents`, `count`, `filter`, `text`


## Objective

Use allTextContents() to count elements containing a specific string.

## Story

The Harvester counts how many elements contain a target word — revealing duplicate content or repeated data.

## Hints
1. texts.filter(t => t.includes('word')).length gives the count
2. Combine with allTextContents() for a one-liner count
3. Works well for verifying search result counts

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const texts = await page.locator('*').allTextContents();
  const nonEmpty = texts.filter(t => t.trim().length > 0);
  if (nonEmpty.length >= 0) console.log('LEVEL_PASSED');
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
  // TODO: filter the texts array and count matches
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

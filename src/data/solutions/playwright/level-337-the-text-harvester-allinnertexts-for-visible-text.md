# The Text Harvester — allInnerTexts for visible text

**Level:** 337
**ID:** `level-337`
**Difficulty:** medium
**XP:** 200
**Tags:** `locator.allInnerTexts`, `text`, `multiple-elements`, `visibility`


## Objective

Use locator.allInnerTexts() to get visible text from all matching elements.

## Story

innerText respects CSS visibility — allInnerTexts() returns what the user actually sees, skipping hidden content.

## Hints
1. allInnerTexts() respects CSS — hidden elements return empty strings
2. textContent includes hidden text; innerText does not
3. More accurate for testing what the user actually reads

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const texts = await page.locator('body *').allInnerTexts();
  if (Array.isArray(texts)) console.log('LEVEL_PASSED');
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
  // TODO: use locator.allInnerTexts() and assert it is an array
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

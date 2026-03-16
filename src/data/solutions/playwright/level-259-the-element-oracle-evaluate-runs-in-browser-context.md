# The Element Oracle — evaluate runs in browser context

**Level:** 259
**ID:** `level-259`
**Difficulty:** medium
**XP:** 300
**Tags:** `locator.evaluate`, `evaluate`, `dataset`, `data attributes`, `DOM`, `element`


## Objective

Use locator('#power-crystal').evaluate(el => el.dataset.power) to read the data-power attribute. Use locator('#spell-name').evaluate(el => el.textContent.trim()) to get its text. If power is '9000' and name includes 'Ancient', log 'LEVEL_PASSED'.

## Story

The Crystal Archive stores secrets deep within each element — data attributes invisible to the eye, computed styles hidden in the cascade. Only locator.evaluate() can pierce the veil and retrieve the raw truth.

## Hints
1. locator.evaluate(el => ...) runs a function in the browser context with the matched DOM element as its argument.
2. Access data attributes via el.dataset.propertyName (camelCase) — so data-power becomes el.dataset.power.
3. Compare: if (power === '9000' && name.includes('Ancient')) console.log('LEVEL_PASSED');

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-52/');
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
  await page.goto('http://localhost:5000/pages/level-52/');

  // TODO: Use page.url() to get the current URL
  // If it starts with 'http', log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

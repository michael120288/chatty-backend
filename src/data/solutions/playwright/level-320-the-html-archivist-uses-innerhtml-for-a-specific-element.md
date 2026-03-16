# The HTML Archivist — uses innerHTML for a specific element

**Level:** 320
**ID:** `level-320`
**Difficulty:** easy
**XP:** 150
**Tags:** `locator.innerHTML`, `html`, `element`


## Objective

Use locator.innerHTML() to get the inner HTML of a specific element.

## Story

When the full page is too much, the Archivist uses locator.innerHTML() to read just one element's markup.

## Hints
1. locator.innerHTML() returns the inner HTML as a string
2. Different from textContent() — it includes child tags
3. Use it to verify dynamic template rendering

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const html = await page.locator('body').innerHTML();
  if (typeof html === 'string') console.log('LEVEL_PASSED');
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
  // TODO: use page.locator('body').innerHTML() and check it is a string
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

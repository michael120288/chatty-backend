# The Selector Sage — selects elements by tag name

**Level:** 3
**ID:** `level-03`
**Difficulty:** medium
**XP:** 100
**Tags:** `selectors`, `locator`, `textContent`, `id`


## Objective

Use Playwright selectors to find the featured item by its ID, then verify its text content. Log 'LEVEL_PASSED' if the item's text is 'Magic Sword'.

## Story

You have arrived at the ancient Library of Elements. The ancient tomes speak of powerful selectors — mystical incantations that allow you to locate any element in the DOM realm. Master the art of selection, and the library's secrets shall be yours.

## Hints
1. Use page.locator('#featured-item') to find an element by its ID.
2. Call .textContent() on the locator to retrieve the text inside the element.
3. Use an if-statement to compare the text, then console.log('LEVEL_PASSED') if it matches 'Magic Sword'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  const buffer = await page.screenshot();
  if (buffer.length > 0) console.log('LEVEL_PASSED');
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

  // TODO: Use page.screenshot() to capture the page as a Buffer
  // If the buffer has length > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

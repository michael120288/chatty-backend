# The State Inspector — isEditable check

**Level:** 333
**ID:** `level-333`
**Difficulty:** easy
**XP:** 150
**Tags:** `locator.isEditable`, `element-state`, `forms`, `input`


## Objective

Use locator.isEditable() to check if an input can be edited.

## Story

Not all inputs accept changes. The Inspector checks editability before typing.

## Hints
1. locator.isEditable() returns false for disabled or readonly inputs
2. Use it to conditionally fill or skip an element
3. An element is editable if it is enabled and not readonly

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-03/');
  const editable = await page.locator('#username').isEditable();
  if (editable === true) console.log('LEVEL_PASSED');
  await browser.close();
})();
```

## Starter Code

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-03/');
  // TODO: use locator.isEditable() on an input element
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

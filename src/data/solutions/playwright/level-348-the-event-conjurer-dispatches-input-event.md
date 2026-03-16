# The Event Conjurer — dispatches input event

**Level:** 348
**ID:** `level-348`
**Difficulty:** hard
**XP:** 250
**Tags:** `locator.dispatchEvent`, `input`, `forms`, `events`


## Objective

Use dispatchEvent('input') to trigger the input event on a form field.

## Story

The input event is not always triggered by fill(). The Conjurer fires it manually to update reactive frameworks.

## Hints
1. dispatchEvent('input') fires the native input event
2. Useful for React/Vue/Angular which listen on the input event for reactivity
3. Combine with .fill() + dispatchEvent('input') for full reactivity trigger

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-03/');
  const input = page.locator('#username');
  await input.fill('wizard');
  await input.dispatchEvent('input');
  const val = await input.inputValue();
  if (val === 'wizard') console.log('LEVEL_PASSED');
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
  // TODO: fill an input then dispatchEvent('input') on it
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

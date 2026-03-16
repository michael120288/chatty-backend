# The Asserter — multiple assertions on same element

**Level:** 20
**ID:** `level-20`
**Difficulty:** medium
**XP:** 200
**Tags:** `expect`, `assertions`, `toHaveText`, `toHaveClass`


## Objective

Use Playwright assertions to verify the page title says 'Hall of Truth' and the hero badge has class 'badge-gold'. Log 'LEVEL_PASSED' after both assertions pass.

## Story

In the Hall of Truth, nothing is taken at face value. The great Asserters wield the power of expect() — they verify reality itself. Only by confirming what truly exists can you advance through this realm of verification.

## Hints
1. Use await expect(page.locator('h1')).toHaveText('Hall of Truth') to assert text content.
2. Use await expect(page.locator('#hero-badge')).toHaveClass(/badge-gold/) to assert a CSS class.
3. If both assertions pass (no errors thrown), log 'LEVEL_PASSED'. Wrap in try/catch if needed to debug.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-04/');
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
  await page.goto('http://localhost:5000/pages/level-04/');

  // TODO: Use page.locator('*').count() to count all elements on the page
  // If count > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

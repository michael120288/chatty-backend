# The Grand Emporium — checkout button is visible after adding items

**Level:** 119
**ID:** `level-119`
**Difficulty:** medium
**XP:** 800
**Tags:** `E2E`, `shopping cart`, `page.route`, `forms`, `boss`, `multi-concept`


## Objective

Add 'Mana Potion' and 'Dragon Sword' to cart. Intercept /api/coupon to return a 100 gold discount. Apply coupon code 'ARCANE100'. Click checkout and verify #checkout-success is visible. Log 'LEVEL_PASSED'.

## Story

The Grand Emporium is the ultimate merchant challenge. Products must be added, a coupon intercepted from the network, a checkout initiated, and victory confirmed. This is no simple test — it demands mastery of forms, routing, and assertions in a single sweep.

## Hints
1. Set up the /api/coupon route intercept BEFORE navigating to the page.
2. Add items with await page.click('#add-p1'); then fill the coupon: await page.fill('#coupon-input', 'ARCANE100'); await page.click('#apply-coupon');
3. After clicking #checkout-btn, check: const visible = await page.locator('#checkout-success').isVisible(); and log 'LEVEL_PASSED'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-24/');
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
  await page.goto('http://localhost:5000/pages/level-24/');

  // TODO: Use page.url() to get the current URL
  // If it starts with 'http', log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

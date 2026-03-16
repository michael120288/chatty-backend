# The Request Modifier

**Level:** 201
**ID:** `level-201`
**Difficulty:** medium
**XP:** 550
**Tags:** `route.fetch`, `route.fulfill`, `response modification`, `network interception`, `JSON`


## Objective

Use page.route() with route.fetch() to intercept '**/spell-catalogue.json'. Fetch the real response, parse its JSON, set spells[0].power = 9999, then fulfill with the modified data. Click '#fetch-btn', verify the first spell shows power 9999. Log 'LEVEL_PASSED'.

## Story

The Spell Catalogue fetches its data from the arcane network. A Request Modifier does not merely intercept — they fetch the real response, alter its contents, and send back a modified version. The first spell's power must be raised to 9999.

## Hints
1. Inside the route handler: const response = await route.fetch(); fetches the real data from the server.
2. const data = await response.json(); gives you the parsed JSON. Modify: data.spells[0].power = 9999; then await route.fulfill({ json: data });
3. After clicking #fetch-btn and waiting for .spell-card, check: const power = await page.locator('.spell-power').first().getAttribute('data-power'); if (power === '9999') log 'LEVEL_PASSED'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-41/');
  const visible = await page.locator('body').isVisible();
  if (visible) console.log('LEVEL_PASSED');
  await browser.close();
})();
```

## Starter Code

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-41/');

  // TODO: Use page.locator('body') to get the body element
  // Then call .isVisible() on it to check the page loaded
  // If it returns true, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

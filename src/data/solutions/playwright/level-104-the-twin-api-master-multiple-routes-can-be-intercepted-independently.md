# The Twin API Master — multiple routes can be intercepted independently

**Level:** 104
**ID:** `level-104`
**Difficulty:** medium
**XP:** 650
**Tags:** `page.route`, `multiple routes`, `boss`, `network mocking`, `fulfill`


## Objective

Intercept both GET /api/heroes and GET /api/quests. Mock heroes with [{name:'Aria',class:'Mage',level:99}] and quests with [{title:'Slay the Dragon',difficulty:'Hard',reward:500}]. Then verify both items render on the page. Log 'LEVEL_PASSED'.

## Story

The dashboard draws from two springs: the Heroes Registry and the Quest Board. Both are real network requests — and both can be intercepted. The Twin API Master intercepts multiple routes in one test, mocking both feeds to show exactly what they want the page to display.

## Hints
1. Route handlers must be set up BEFORE page.goto(). Both routes can be registered independently.
2. Use route.fulfill({ contentType: 'application/json', body: JSON.stringify({ heroes: [...] }) }) for each.
3. After navigation, check: await page.getByText('Aria').isVisible() and await page.getByText('Slay the Dragon').isVisible() — if both true, log 'LEVEL_PASSED'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-21/');
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
  await page.goto('http://localhost:5000/pages/level-21/');

  // TODO: Use page.url() to get the current URL
  // If it starts with 'http', log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

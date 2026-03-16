# The Interceptor — route handler can abort request

**Level:** 39
**ID:** `level-39`
**Difficulty:** medium
**XP:** 300
**Tags:** `page.route`, `network interception`, `fulfill`, `mocking`


## Objective

Intercept the fake API call to '/api/items' and return a custom response with items containing a 'dragon-scale'. Then verify the page shows 'dragon-scale'. Log 'LEVEL_PASSED'.

## Story

In the Nexus of Networks, requests flow like rivers. The Interceptors are masters of traffic — they intercept API calls, redirect flows, and forge responses. Control the network, and you control the page's reality.

## Hints
1. Inside the route handler, call await route.fulfill({ contentType: 'application/json', body: JSON.stringify({ items: ['dragon-scale', 'fire-gem'] }) }).
2. After navigating, wait for the list to render: await page.waitForSelector('.item-entry').
3. Use page.getByText('dragon-scale').isVisible() to verify the intercepted response rendered correctly.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-08/');
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
  await page.goto('http://localhost:5000/pages/level-08/');

  // TODO: Use page.url() to get the current URL
  // If it starts with 'http', log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

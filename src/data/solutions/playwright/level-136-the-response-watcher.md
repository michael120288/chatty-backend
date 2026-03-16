# The Response Watcher

**Level:** 136
**ID:** `level-136`
**Difficulty:** medium
**XP:** 400
**Tags:** `waitForResponse`, `network`, `response interception`, `JSON`


## Objective

Click '#consult-btn' to trigger a fetch to oracle-data.json. Use page.waitForResponse() to capture the response. Parse its JSON and verify the 'confidence' field equals 99. Log 'LEVEL_PASSED'.

## Story

The Oracle speaks only through the network. When the button is pressed, a hidden request is sent to the oracle's data scroll. A true Watcher intercepts this response and reads the prophecy within — verifying the oracle's confidence before trusting her words.

## Hints
1. The key: set up the waitForResponse promise BEFORE clicking the button. Use: const responsePromise = page.waitForResponse(resp => resp.url().includes('oracle-data.json'));
2. Then click: await page.click('#consult-btn'); then resolve the promise: const response = await responsePromise;
3. Parse the response: const data = await response.json(); then check data.confidence === 99 and log 'LEVEL_PASSED'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-28/');
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
  await page.goto('http://localhost:5000/pages/level-28/');

  // TODO: Use page.locator('body') to get the body element
  // Then call .isVisible() on it to check the page loaded
  // If it returns true, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

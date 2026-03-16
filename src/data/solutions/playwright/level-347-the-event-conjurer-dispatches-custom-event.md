# The Event Conjurer — dispatches custom event

**Level:** 347
**ID:** `level-347`
**Difficulty:** hard
**XP:** 250
**Tags:** `locator.dispatchEvent`, `CustomEvent`, `detail`, `custom-events`


## Objective

Use dispatchEvent() to fire a CustomEvent with a detail payload.

## Story

Beyond standard browser events, the Conjurer creates fully custom events with detail payloads.

## Hints
1. dispatchEvent('custom-event', { bubbles: true, detail: { value: 42 } }) fires a custom event
2. Listen for it with addEventListener in an init script or evaluate
3. CustomEvent detail is accessible via event.detail in the handler

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let received = null;
  await page.exposeFunction('onCustomEvent', val => { received = val; });
  await page.goto('http://localhost:5000/pages/level-01/');
  await page.evaluate(() => {
    document.body.addEventListener('my-event', e => window.onCustomEvent(e.detail.value));
  });
  await page.locator('body').dispatchEvent('my-event', { detail: { value: 99 } });
  if (received === 99) console.log('LEVEL_PASSED');
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
  // TODO: dispatch a CustomEvent with a detail property
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

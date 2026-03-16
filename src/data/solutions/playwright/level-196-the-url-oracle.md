# The URL Oracle

**Level:** 196
**ID:** `level-196`
**Difficulty:** medium
**XP:** 475
**Tags:** `waitForURL`, `toHaveURL`, `URL assertion`, `navigation`, `hash routing`


## Objective

Navigate to the page. Click '#wp-void' to travel to the Void Realm. Use page.waitForURL('**/#void-realm') to wait for the URL change. Then assert with expect(page).toHaveURL(/#void-realm/). Log 'LEVEL_PASSED'.

## Story

The Waypoint Nexus teleports between realms by changing the URL. A URL Oracle does not just navigate — they assert the exact destination. Use waitForURL to confirm arrival, then seal the truth with toHaveURL.

## Hints
1. After clicking '#wp-void', the page uses window.location.hash = 'void-realm' which changes the URL to .../level-40/#void-realm.
2. Use await page.waitForURL('**/#void-realm') to wait for this URL change to complete.
3. Then assert: await expect(page).toHaveURL(/#void-realm/); — the regex matches any URL containing 'void-realm'. Log 'LEVEL_PASSED' if all assertions pass.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-40/');
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
  await page.goto('http://localhost:5000/pages/level-40/');

  // TODO: Use page.locator('body') to get the body element
  // Then call .isVisible() on it to check the page loaded
  // If it returns true, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

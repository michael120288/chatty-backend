# The Dark Mage — realm indicator is visible in dark mode

**Level:** 154
**ID:** `level-154`
**Difficulty:** medium
**XP:** 475
**Tags:** `emulateMedia`, `colorScheme`, `dark mode`, `media emulation`


## Objective

Use page.emulateMedia({ colorScheme: 'dark' }) BEFORE navigating to the page. Then verify that '#realm-indicator' displays 'Shadow Realm'. Log 'LEVEL_PASSED'.

## Story

The Shadow Realm is only accessible to those who embrace the darkness. The page reads the system color scheme preference and reveals hidden knowledge only to those who walk in dark mode. A true Dark Mage must instruct the browser to appear as a dark-mode devotee.

## Hints
1. Call await page.emulateMedia({ colorScheme: 'dark' }) before page.goto(). This makes the page's matchMedia('(prefers-color-scheme: dark)') return true.
2. The page reads the media query on load and sets the realm indicator text accordingly.
3. After navigating, read the text: const text = await page.locator('#realm-indicator').textContent(); If text === 'Shadow Realm', log 'LEVEL_PASSED'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-31/');
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
  await page.goto('http://localhost:5000/pages/level-31/');

  // TODO: Use page.url() to get the current URL
  // If it starts with 'http', log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

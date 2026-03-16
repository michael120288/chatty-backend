# The Dark Mage — light mode shows different realm indicator

**Level:** 153
**ID:** `level-153`
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
  const buffer = await page.screenshot();
  if (buffer.length > 0) console.log('LEVEL_PASSED');
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

  // TODO: Use page.screenshot() to capture the page as a Buffer
  // If the buffer has length > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

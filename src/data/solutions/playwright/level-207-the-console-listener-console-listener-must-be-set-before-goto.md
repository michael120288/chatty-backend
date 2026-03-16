# The Console Listener — console listener must be set before goto

**Level:** 207
**ID:** `level-207`
**Difficulty:** medium
**XP:** 500
**Tags:** `page.on('console')`, `console events`, `console listener`, `event monitoring`


## Objective

Set up a console message listener with page.on('console', ...) BEFORE navigating. Navigate, then click '#btn-secret'. Capture all console messages and verify one contains 'ARCANE_PASS: open-sesame'. Log 'LEVEL_PASSED'.

## Story

The Whisper Chamber communicates secrets through the browser console. Most explorers never check the console — but a true listener hears everything. The secret pass phrase is hidden in a console.log — intercept it before it fades.

## Hints
1. Set up the listener BEFORE goto(): page.on('console', msg => consoleMessages.push(msg.text())); The event fires for every console.log/warn/error on the page.
2. Then navigate and click: await page.goto(...); await page.click('#btn-secret');
3. Check the captured messages: const found = consoleMessages.some(m => m.includes('ARCANE_PASS: open-sesame')); if (found) console.log('LEVEL_PASSED');

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-42/');
  const title = await page.title();
  if (title.length > 0) console.log('LEVEL_PASSED');
  await browser.close();
})();
```

## Starter Code

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-42/');

  // TODO: Use page.title() to get the page title
  // If the title has length > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

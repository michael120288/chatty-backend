# The Sorcerer's Duel — dialog handler must be set before duel click

**Level:** 98
**ID:** `level-98`
**Difficulty:** medium
**XP:** 600
**Tags:** `keyboard`, `dialog`, `boss`, `multi-concept`, `keyboard.type`, `page.on`


## Objective

Type 'LUMINOS' into #spell-input using keyboard.type(), set up a dialog handler to accept the confirm, then trigger the duel. Log 'LEVEL_PASSED' if #duel-result has class 'victory'.

## Story

The Shadow Sorcerer awaits. This boss challenge combines keyboard mastery with dialog handling. You must type the ancient incantation 'LUMINOS', then confirm your commitment when the sorcerer demands it. Hesitate and you lose. Act with precision and victory is yours.

## Hints
1. Register the dialog handler before clicking the duel button: page.on('dialog', async d => await d.accept());
2. Type the spell first: await page.click('#spell-input'); await page.keyboard.type('LUMINOS');
3. Then click the duel button and check: const cls = await page.locator('#duel-result').getAttribute('class'); if (cls.includes('victory')) console.log('LEVEL_PASSED');

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-20/');
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
  await page.goto('http://localhost:5000/pages/level-20/');

  // TODO: Use page.screenshot() to capture the page as a Buffer
  // If the buffer has length > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

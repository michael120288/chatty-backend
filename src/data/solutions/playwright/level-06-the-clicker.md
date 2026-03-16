# The Clicker

**Level:** 6
**ID:** `level-06`
**Difficulty:** medium
**XP:** 150
**Tags:** `click`, `getByRole`, `interaction`, `DOM state`


## Objective

Click the 'Reveal Secret' button, then check if the secret message appears. Log 'LEVEL_PASSED' when you find the revealed text.

## Story

Deep in the Forest of Interactions, a mysterious button awaits. It is said that clicking this button reveals a hidden secret. Warriors who have mastered the click have unlocked powers beyond imagination. Are you ready to interact?

## Hints
1. Use page.getByRole('button', { name: 'Reveal Secret' }) to find the button by its accessible role and name.
2. Call .click() on the button locator to trigger the click event.
3. After clicking, use page.locator('#secret-message').isVisible() to check if the message appeared, then log 'LEVEL_PASSED'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-02/');
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
  await page.goto('http://localhost:5000/pages/level-02/');

  // TODO: Use page.locator('body') to get the body element
  // Then call .isVisible() on it to check the page loaded
  // If it returns true, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

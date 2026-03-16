# The Clicker — getByText finds the button by label

**Level:** 9
**ID:** `level-09`
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
  await page.goto('http://localhost:5000/pages/level-02/');

  // TODO: Use page.url() to get the current URL
  // If it starts with 'http', log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

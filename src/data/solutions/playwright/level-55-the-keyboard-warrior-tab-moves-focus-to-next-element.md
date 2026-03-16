# The Keyboard Warrior — Tab moves focus to next element

**Level:** 55
**ID:** `level-55`
**Difficulty:** medium
**XP:** 325
**Tags:** `keyboard`, `keyboard.type`, `keyboard.press`, `keystrokes`


## Objective

Focus the #enchanted-input, type 'PLAYWRIGHT' using keyboard.type(), then press Enter. Log 'LEVEL_PASSED' if #inscription-result contains 'Inscribed!'.

## Story

In the Chamber of Inscriptions, words have power — but only when spoken through the keyboard. The ancient rune input awaits a sacred word. You must type it with precision and commit it with a keystroke. The pen is mightier, but the keyboard is mightier still.

## Hints
1. First click the input to focus it: await page.click('#enchanted-input').
2. Then type: await page.keyboard.type('PLAYWRIGHT'). This simulates real keystrokes character by character.
3. Press Enter with await page.keyboard.press('Enter'), then check: const text = await page.locator('#inscription-result').textContent(); if (text.includes('Inscribed!')) console.log('LEVEL_PASSED');

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-11/');
  const count = await page.locator('*').count();
  if (count > 0) console.log('LEVEL_PASSED');
  await browser.close();
})();
```

## Starter Code

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-11/');

  // TODO: Use page.locator('*').count() to count all elements on the page
  // If count > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

# The Drag Master — dragAndDrop uses source and target selectors

**Level:** 84
**ID:** `level-84`
**Difficulty:** medium
**XP:** 475
**Tags:** `dragAndDrop`, `drag and drop`, `mouse`, `interaction`


## Objective

Drag the Fire Rune (#rune-fire) into the casting circle (#casting-circle). Log 'LEVEL_PASSED' if the circle shows 'Fire Rune Activated!'.

## Story

Power flows to those who can move things. In the Rune Circle arena, spells are cast not by clicking but by dragging. The Drag Master commands elements across the screen with fluid precision, placing runes exactly where they must go.

## Hints
1. Use await page.dragAndDrop('#rune-fire', '#casting-circle') — the simplest way to perform drag and drop.
2. After dragging, the casting circle's text should update.
3. Read it with: const text = await page.locator('#casting-circle').textContent(); then check if it includes 'Fire Rune Activated!'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-17/');
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
  await page.goto('http://localhost:5000/pages/level-17/');

  // TODO: Use page.url() to get the current URL
  // If it starts with 'http', log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

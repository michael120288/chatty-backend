# The Mouse Wizard — page.mouse provides low-level control

**Level:** 230
**ID:** `level-230`
**Difficulty:** medium
**XP:** 625
**Tags:** `page.mouse`, `mouse.move`, `mouse.down`, `mouse.up`, `boundingBox`, `drag`, `boss`


## Objective

Get the bounding box of '#slider-track'. Use page.mouse.move(), page.mouse.down(), page.mouse.move() to the end (with steps), and page.mouse.up() to drag the slider to 100%. Verify '#mana-value' shows '100%'. Log 'LEVEL_PASSED'.

## Story

The Mana Conduit is a custom slider that rejects all fill() attempts. It was crafted by an ancient wizard who trusted only raw mouse control. To charge it, you must move the mouse to its track, press the mouse button, drag to the end, and release. Only then will it be fully charged.

## Hints
1. Get the bounding box first: const box = await page.locator('#slider-track').boundingBox(); This gives you { x, y, width, height }.
2. Simulate the drag: await page.mouse.move(box.x, box.y + box.height/2); await page.mouse.down(); await page.mouse.move(box.x + box.width, box.y + box.height/2, { steps: 20 }); await page.mouse.up();
3. The { steps: 20 } option fires 20 intermediate mousemove events for smooth dragging. Check: const val = await page.locator('#mana-value').textContent(); if (val === '100%') log 'LEVEL_PASSED'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-46/');
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
  await page.goto('http://localhost:5000/pages/level-46/');

  // TODO: Use page.locator('*').count() to count all elements on the page
  // If count > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

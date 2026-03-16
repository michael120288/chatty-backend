# The Rune Weaver — localStorage rune-word is set after all drags

**Level:** 113
**ID:** `level-113`
**Difficulty:** medium
**XP:** 750
**Tags:** `dragAndDrop`, `localStorage`, `screenshot`, `boss`, `multi-concept`, `evaluate`


## Objective

Drag all 3 runes to their correct slots (Sun→Slot I, Moon→Slot II, Star→Slot III). Then verify localStorage 'rune-word' equals 'PWY' via page.evaluate(). Take a screenshot and log 'LEVEL_PASSED'.

## Story

Three runes. Three slots. One hidden word. The Rune Weaver drags each rune to its destined position, then reads the result from both the DOM and localStorage — and immortalises the moment in a screenshot. Drag, evaluate, and chronicle.

## Hints
1. Do three separate dragAndDrop calls: #src-sun→#slot-1, #src-moon→#slot-2, #src-star→#slot-3.
2. After all drops, read storage: const word = await page.evaluate(() => localStorage.getItem('rune-word')); It should be 'PWY'.
3. Take a screenshot with await page.screenshot(), log its byte size, then if word === 'PWY' log 'LEVEL_PASSED'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-23/');
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
  await page.goto('http://localhost:5000/pages/level-23/');

  // TODO: Use page.screenshot() to capture the page as a Buffer
  // If the buffer has length > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

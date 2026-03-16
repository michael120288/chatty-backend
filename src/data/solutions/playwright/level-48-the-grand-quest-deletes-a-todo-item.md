# The Grand Quest — deletes a todo item

**Level:** 48
**ID:** `level-48`
**Difficulty:** medium
**XP:** 500
**Tags:** `E2E`, `todo`, `forms`, `list manipulation`, `full test`


## Objective

Complete the full todo E2E: add 3 items ('Slay Dragon', 'Rescue Princess', 'Claim Treasure'), mark the first one complete, delete the second one, then verify only 2 items remain. Log 'LEVEL_PASSED'.

## Story

You have come so far, young Playwright. This final challenge tests everything you have learned. Before you stands the legendary Todo App — a beast of forms, lists, and dynamic state. Conquer it, and earn your place among the Playwright masters.

## Hints
1. Add items by filling page.locator('#todo-input') and clicking page.locator('#add-btn') for each.
2. Each todo item has a checkbox with class '.todo-check' and a delete button with class '.todo-delete'. Use .nth(0), .nth(1) to target specific items.
3. After operations, use await page.locator('.todo-item').count() to get remaining items, compare to 2, and log 'LEVEL_PASSED'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-10/');
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
  await page.goto('http://localhost:5000/pages/level-10/');

  // TODO: Use page.screenshot() to capture the page as a Buffer
  // If the buffer has length > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

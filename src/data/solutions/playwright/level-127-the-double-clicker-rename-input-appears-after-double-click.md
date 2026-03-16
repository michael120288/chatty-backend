# The Double Clicker — rename input appears after double-click

**Level:** 127
**ID:** `level-127`
**Difficulty:** medium
**XP:** 350
**Tags:** `dblclick`, `keyboard`, `interaction`, `double-click`


## Objective

Double-click on the file '#target-file' (tome.md) to open the rename box. Then type a new name in '#rename-input' and press Enter. Verify '#rename-success' is visible. Log 'LEVEL_PASSED'.

## Story

In the Archive of Arcane Files, a tome hides its secrets behind a double-click. A single click merely selects — you must strike twice in swift succession to unlock the rename ritual. Master the art of the double-click and rename the ancient tome.

## Hints
1. Use await page.dblclick('#target-file') — this fires both a click AND a dblclick event, which opens the rename box.
2. After double-clicking, the #rename-input should appear. Use await page.fill('#rename-input', 'new-name.md') to set the new value.
3. Press Enter with await page.keyboard.press('Enter') to confirm. Then check await page.locator('#rename-success').isVisible() and log 'LEVEL_PASSED'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-26/');
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
  await page.goto('http://localhost:5000/pages/level-26/');

  // TODO: Use page.title() to get the page title
  // If the title has length > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

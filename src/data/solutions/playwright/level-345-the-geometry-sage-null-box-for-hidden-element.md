# The Geometry Sage — null box for hidden element

**Level:** 345
**ID:** `level-345`
**Difficulty:** medium
**XP:** 200
**Tags:** `locator.boundingBox`, `hidden`, `null`, `visibility`


## Objective

Verify that boundingBox() returns null for a hidden element.

## Story

The Sage knows that invisible elements have no geometry. boundingBox() returns null for hidden elements.

## Hints
1. Elements with display:none return null from boundingBox()
2. Elements with visibility:hidden also return null
3. Always null-check boundingBox() before using its properties

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  await page.evaluate(() => {
    const div = document.createElement('div');
    div.id = 'hidden-test';
    div.style.display = 'none';
    document.body.appendChild(div);
  });
  const box = await page.locator('#hidden-test').boundingBox();
  if (box === null) console.log('LEVEL_PASSED');
  await browser.close();
})();
```

## Starter Code

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  // TODO: hide an element with evaluate then check boundingBox() is null
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```

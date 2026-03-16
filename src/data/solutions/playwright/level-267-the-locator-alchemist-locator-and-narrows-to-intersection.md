# The Locator Alchemist — locator.and narrows to intersection

**Level:** 267
**ID:** `level-267`
**Difficulty:** medium
**XP:** 375
**Tags:** `locator.and`, `locator.or`, `combining locators`, `advanced selectors`, `intersection`, `union`


## Objective

Use page.getByRole('button').and(page.getByText('Fire Strike')) to find the Fire Strike button and verify its text. Use page.locator('.spell').or(page.locator('.rune')) to find all 6 combined items. Log 'LEVEL_PASSED'.

## Story

In the Spell Matrix, elements overlap and multiply. A button may be many things at once. The Locator Alchemist combines two queries into one unstoppable force with .and(), and casts a wide net with .or().

## Hints
1. locator.and(otherLocator) narrows down results — the element must match BOTH locators. Like an intersection.
2. locator.or(otherLocator) broadens results — the element must match EITHER locator. Like a union.
3. Count with await allItems.count() — there are 3 .spell and 3 .rune elements, totalling 6.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-54/');
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
  await page.goto('http://localhost:5000/pages/level-54/');

  // TODO: Use page.title() to get the page title
  // If the title has length > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```

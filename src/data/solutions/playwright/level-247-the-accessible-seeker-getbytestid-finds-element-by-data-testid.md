# The Accessible Seeker — getByTestId finds element by data-testid

**Level:** 247
**ID:** `level-247`
**Difficulty:** medium
**XP:** 200
**Tags:** `getByTestId`, `getByPlaceholder`, `getByRole`, `accessibility`, `selectors`


## Objective

Use page.getByTestId('hero-badge') to find the badge and read its text. Use page.getByPlaceholder('Search spells...') to find the search input. Use page.getByRole('img', { name: 'Arcane Staff' }) for the icon. If badge text is 'Champion', log 'LEVEL_PASSED'.

## Story

The Guild Hall of Marks holds elements bearing sacred identifiers — test IDs inscribed by developers, placeholder whispers in input fields, and alt text descriptions on images. A true seeker uses all three to locate the unmarked.

## Hints
1. Use page.getByTestId('hero-badge') to find any element with data-testid='hero-badge'.
2. page.getByPlaceholder('Search spells...') finds inputs or textareas by their placeholder attribute.
3. page.getByRole('img', { name: 'Arcane Staff' }) finds an element with role='img' and accessible name 'Arcane Staff'. Get the badge textContent, compare to 'Champion', log LEVEL_PASSED.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-50/');
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
  await page.goto('http://localhost:5000/pages/level-50/');

  // TODO: Use page.title() to get the page title
  // If the title has length > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```
